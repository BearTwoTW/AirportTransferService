using AirportTransferService.Models;
using AirportTransferService.Services;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.Arm;
using System.Transactions;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// UserController
    /// </summary>
    /// <param name="baseService"></param>
    public class UserController(IUser user, IUserLevel userlevel, IUserCareerRank usercareerrank, ISystemSettings systemSettings,
        IUserDuty userduty, IDealerSetting dealerSetting, IConfiguration config, IBaseService baseService, UserCache userCache, IPage page) : CustomControllerBase(baseService)
    {
        private readonly IConfiguration _config = config;

        private readonly IUser _user = user;
        private readonly IUserLevel _userlevel = userlevel;
        private readonly IUserDuty _userduty = userduty;
        private readonly IUserCareerRank _usercareerrank = usercareerrank;
        private readonly ISystemSettings _systemSettings = systemSettings;
        private readonly IDealerSetting _dealerSetting = dealerSetting;
        private readonly UserCache _userCache = userCache;
        private readonly IPage _page = page;

        /// <summary>
        /// 使用者查詢(同職位&以下的)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<UserSearchResponse>> UserSearch(UserSearch data)
        {
            List<SearchUserResult> result = _user.SearchUser(
                new SearchUserParam(
                    ds_dbname: userDealerInfo.ds_dbname,
                    own_user_id: jwtObject.user_id,
                    top_ul_id: jwtObject.ul_id,
                    username: data.username,
                    name_en: string.IsNullOrEmpty(data.name) ? "" : Tool.GetStringFromHash(Tool.SHA256(data.name), true),
                    company_id: data.company_id,
                    general_manager_id: data.general_manager_id,
                    department_id: data.department_id,
                    position_id: data.position_id,
                    class_id: data.class_id,
                    group_id: data.group_id,
                    office_id: data.office_id,
                    disable: data.disable,
                    isresign: data.isresign,
                    ul_id: data.ul_id,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["disable", "user_id", "username", "name", "cre_time", "ul_name", "home_page_name"],
                out int page_count);

            List<UserSearchResponse> response = [];

            foreach (SearchUserResult item in result)
            {
                response.Add(new UserSearchResponse
                {
                    disable = item.disable ?? "",
                    user_id = item.user_id ?? "",
                    username = item.username ?? "",
                    name = Tool.Sy_Decoder(item.name, item.cre_time?.ToString("yyyyMMddHHmmss")),
                    ul_name = item.ul_name ?? "",
                    home_page_name = item.home_page_name ?? ""
                });
            }

            return new ResultObject<List<UserSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 使用者查詢(無視權限選所有在職的  請假選代理人用)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<UserSearchResponse>> UserSearchAll(UserSearch data)
        {
            //查可查詢最高層級職務
            int top_ul_id = 1;

            List<SearchUserResult> result = _user.SearchUser(
                new SearchUserParam(
                    ds_dbname: userDealerInfo.ds_dbname,
                    own_user_id: jwtObject.user_id,
                    top_ul_id: top_ul_id,
                    username: data.username,
                    name_en: string.IsNullOrEmpty(data.name) ? "" : Tool.GetStringFromHash(Tool.SHA256(data.name), true),
                    company_id: data.company_id,
                    general_manager_id: data.general_manager_id,
                    department_id: data.department_id,
                    position_id: data.position_id,
                    class_id: data.class_id,
                    group_id: data.group_id,
                    office_id: data.office_id,
                    disable: data.disable,
                    isresign: data.isresign,
                    ul_id: data.ul_id,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["disable", "user_id", "username", "name", "cre_time", "ul_name", "home_page_name"],
                out int page_count);

            List<UserSearchResponse> response = [];

            foreach (SearchUserResult item in result)
            {
                response.Add(new UserSearchResponse
                {
                    disable = item.disable ?? "",
                    user_id = item.user_id ?? "",
                    username = item.username ?? "",
                    name = Tool.Sy_Decoder(item.name, item.cre_time?.ToString("yyyyMMddHHmmss")),
                    ul_name = item.ul_name ?? "",
                    home_page_name = item.home_page_name ?? ""
                });
            }

            return new ResultObject<List<UserSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 使用者查詢(還沒被分配職務的ul_id=-1)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<UserSearchResponse>> UserSearchNoLevel(UserSearchNoLevel data)
        {
            List<SearchUserResult> result = _user.SearchUser(
                new SearchUserParam(
                    ds_dbname: userDealerInfo.ds_dbname,
                    own_user_id: "",
                    top_ul_id: 1,
                    username: data.username,
                    name_en: Tool.GetStringFromHash(Tool.SHA256(data.name), true),
                    ul_id: -1,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["disable", "user_id", "username", "name", "cre_time", "ul_name", "home_page_name"],
                out int page_count);

            List<UserSearchResponse> response = [];

            foreach (SearchUserResult item in result)
            {
                response.Add(new UserSearchResponse
                {
                    disable = item.disable ?? "",
                    user_id = item.user_id ?? "",
                    username = item.username ?? "",
                    name = Tool.Sy_Decoder(item.name, item.cre_time?.ToString("yyyyMMddHHmmss")),
                    ul_name = item.ul_name ?? "",
                    home_page_name = item.home_page_name ?? ""
                });
            }

            return new ResultObject<List<UserSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 使用者查詢(選代理人用的，上層一層+同職務+下層全部**排除自己)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<UserSearchResponse>> UserSearchProxy(UserDetail data)
        {
            List<UserLevelTree> SearchUserLevelTreeESC_result = _userlevel.SearchUserLevelTreeESC(jwtObject.ul_id, 0);
            List<UserLevelTree> SearchUserLevelTreeDESC_result = _userlevel.SearchUserLevelTreeDESC(jwtObject.ul_id, 1);

            //查系統設定裡請假代理人查詢方式
            List<DictionaryKeyValue> kvs = [];
            List<SearchSystemSettingResult> SearchSystemSetting_result = _systemSettings.SearchSystemSetting(
                new SearchSystemSettingParam(ssm_name: "請假代理人查詢方式"), ["value_json"], out int page_count);
            if (SearchSystemSetting_result.Count == 0) return new ResultObject<List<UserSearchResponse>> { success = false, message = "系統設定遺失" };
            kvs = JsonConvert.DeserializeObject<List<DictionaryKeyValue>>(SearchSystemSetting_result[0].value_json ?? "[]") ?? [];

            string setting_value = kvs.Where(x => x.value.Equals("Y")).FirstOrDefault()?.key ?? "";
            if (setting_value.Equals("全部帳號")) return UserSearchAll(new UserSearch());

            List<SearchUserResult> result = _user.SearchUser(
                new SearchUserParam(
                    ds_dbname: userDealerInfo.ds_dbname,
                    own_user_id: "",
                    top_ul_id: 1,
                    disable: "N",
                    isresign: "N",
                    page: 0,
                    num_per_page: 0),
                ["disable", "user_id", "username", "name", "cre_time", "ul_name", "home_page_name"],
                out page_count);
            result.RemoveAll(x => (x.user_id ?? "").Equals(jwtObject.user_id));

            List<SearchUserResult> result_proxy = result
                .Where(x => SearchUserLevelTreeESC_result.Exists(y => y.ul_id == x.ul_id)
                            || SearchUserLevelTreeDESC_result.Take(2).ToList().Exists(y => y.ul_id == x.ul_id)).ToList();

            List<UserSearchResponse> response_proxy = [];

            foreach (SearchUserResult item in result_proxy)
            {
                response_proxy.Add(new UserSearchResponse
                {
                    disable = item.disable ?? "",
                    user_id = item.user_id ?? "",
                    username = item.username ?? "",
                    name = Tool.Sy_Decoder(item.name, item.cre_time?.ToString("yyyyMMddHHmmss")),
                    ul_name = item.ul_name ?? "",
                    home_page_name = item.home_page_name ?? ""
                });
            }

            return new ResultObject<List<UserSearchResponse>> { success = true, data = response_proxy };
        }

        /// <summary>
        /// 使用者建立 ***僅限基本資料  職務職等職級修改不在這
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> UserCreate(UserCreate data)
        {
            DateTime cre_time = DateTime.Now;

            string _user_id = "";
            string password = userDealerInfo.ds_code + data.username;

            List<SearchUserResult> result = _user.SearchUser(
                new SearchUserParam(own_user_id: "", top_ul_id: 1, username: data.username), ["username"], out int page_count);

            if (result.Exists(x => (x.username ?? "").Equals(data.username))) return new ResultObject<string> { success = false, message = "新增失敗，此帳號已建檔" };

            _user_id = _user.CreateUser(new CreateUserParam(
                cre_userid: jwtObject.user_id,
                cre_time: cre_time,
                company_code: jwtObject.company_code,
                username: data.username,
                password: Tool.MD5(password),
                name: Tool.Sy_Encoder(data.name, cre_time.ToString("yyyyMMddHHmmss")),
                gender: data.gender,
                birthday: data.birthday,
                telephone: Tool.Sy_Encoder(data.telephone, cre_time.ToString("yyyyMMddHHmmss")),
                mobile_phone: Tool.Sy_Encoder(data.mobile_phone, cre_time.ToString("yyyyMMddHHmmss")),
                email: data.email,
                city: data.city,
                area: data.area,
                address: Tool.Sy_Encoder(data.address, cre_time.ToString("yyyyMMddHHmmss")),
                city_census: data.city_census,
                area_census: data.area_census,
                address_census: Tool.Sy_Encoder(data.address_census, cre_time.ToString("yyyyMMddHHmmss")),
                on_board_date: data.on_board_date,
                note: data.note,
                home_page: data.home_page,
                ul_id: -1,
                blood_type: data.blood_type,
                identity_card: Tool.Sy_Encoder(data.identity_card, cre_time.ToString("yyyyMMddHHmmss")),
                ucr_id: 0,
                career_level: 0,
                SMT_username: data.SMT_username,
                identity_card_en: Tool.GetStringFromHash(Tool.SHA256(data.identity_card), true),
                name_en: Tool.GetStringFromHash(Tool.SHA256(data.name), true),
                telephone_en: Tool.GetStringFromHash(Tool.SHA256(data.telephone), true),
                mobile_phone_en: Tool.GetStringFromHash(Tool.SHA256(data.mobile_phone), true),
                address_en: Tool.GetStringFromHash(Tool.SHA256(data.address), true),
                address_census_en: Tool.GetStringFromHash(Tool.SHA256(data.address_census), true),
                disable: "N",
                isresign: "N",
                ds_id: userDealerInfo.ds_id));

            //設定權限
            try
            {
                PageController PC = new(_page, _user, _userlevel, _userduty, _dealerSetting, _config, _baseService) { ControllerContext = ControllerContext };
                ResultObject<object> res = PC.ResetUserPermission(_user_id);
                if (!res.success) return new ResultObject<string> { success = false, message = "PermissionCreateFileError", data = res.data.ToString() };
            }
            catch (Exception e) { return new ResultObject<string> { success = false, message = "PermissionCreateFileError", data = e.Message }; }

            return new ResultObject<string> { success = true, message = "新增成功", data = _user_id };
        }

        /// <summary>
        /// 使用者細項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<UserDetailResponse> UserDetail(UserDetail data)
        {
            SearchUserResult? result = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, user_id: data.user_id, own_user_id: "", top_ul_id: 1),
                ["cre_userid", "cre_time", "upd_userid", "upd_time", "disable", "company_code", "user_id", "username", "password", "name", "gender", "birthday", "telephone", "mobile_phone", "email", "city", "area", "address", "city_census", "area_census", "address_census", "on_board_date", "note", "home_page", "signin_time", "ul_id", "blood_type", "identity_card", "ucr_id", "career_level", "isresign", "resign_date", "resign_reason", "SMT_username", "ul_name", "home_page_name", "position_id", "insurance_cancel_date"],
                out int page_count).FirstOrDefault();
            if (result == null) return new ResultObject<UserDetailResponse> { success = false, message = "查無使用者" };

            UserDetailResponse response = new()
            {
                cre_userid = result.cre_userid,
                cre_time = result.cre_time,
                upd_userid = result.upd_userid,
                upd_time = result.upd_time,
                disable = result.disable,
                company_code = result.company_code,
                user_id = result.user_id,
                username = result.username,
                password = result.password,
                name = Tool.Sy_Decoder(result.name, result.cre_time?.ToString("yyyyMMddHHmmss")),
                gender = result.gender,
                birthday = result.birthday,
                telephone = Tool.Sy_Decoder(result.telephone, result.cre_time?.ToString("yyyyMMddHHmmss")),
                mobile_phone = Tool.Sy_Decoder(result.mobile_phone, result.cre_time?.ToString("yyyyMMddHHmmss")),
                email = result.email,
                city = result.city,
                area = result.area,
                address = Tool.Sy_Decoder(result.address, result.cre_time?.ToString("yyyyMMddHHmmss")),
                city_census = result.city_census,
                area_census = result.area_census,
                address_census = Tool.Sy_Decoder(result.address_census, result.cre_time?.ToString("yyyyMMddHHmmss")),
                on_board_date = result.on_board_date,
                note = result.note,
                home_page = result.home_page,
                signin_time = result.signin_time,
                ul_id = result.ul_id,
                blood_type = result.blood_type,
                identity_card = Tool.Sy_Decoder(result.identity_card, result.cre_time?.ToString("yyyyMMddHHmmss")),
                ucr_id = result.ucr_id,
                career_level = result.career_level,
                isresign = result.isresign,
                resign_date = result.resign_date,
                resign_reason = result.resign_reason,
                SMT_username = result.SMT_username,
                ul_name = result.ul_name,
                home_page_name = result.home_page_name,
                position_id = result.position_id,
                insurance_cancel_date = result.insurance_cancel_date
            };

            return new ResultObject<UserDetailResponse> { success = true, data = response };
        }

        /// <summary>
        /// 使用者修改 ***僅限基本資料  職務職等職級修改不在這
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UserUpdate(UserUpdate data)
        {
            DateTime upd_time = DateTime.Now;
            List<SearchUserResult> result = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1), ["cre_time", "user_id", "username"], out int page_count);
            SearchUserResult? user_origin = result.FirstOrDefault(x => (x.user_id ?? "").Equals(data.user_id));
            if (user_origin == null) return new ResultObject<object> { success = false, message = "查無使用者" };

            if (data.username != Appsettings.api_string_param_no_pass
                && result.Exists(x => (data.username ?? user_origin.username ?? "").Equals(x.username)
                && !data.user_id.Equals(x.user_id)))
                return new ResultObject<object> { success = false, message = "修改失敗，此帳號已建檔" };

            if (user_origin.cre_time == null) return new ResultObject<object> { success = false, message = "查無使用者資料" };

            _user.UpdateUser(new UpdateUserParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                user_id: data.user_id,
                signin_time: Appsettings.api_datetime_param_no_pass,
                resign_date: Appsettings.api_dateonly_param_no_pass,
                company_code: jwtObject.company_code,
                username: data.username,
                name: data.name == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.Sy_Encoder(data.name, user_origin.cre_time?.ToString("yyyyMMddHHmmss")),
                gender: data.gender,
                birthday: data.birthday,
                telephone: data.telephone == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.Sy_Encoder(data.telephone, user_origin.cre_time?.ToString("yyyyMMddHHmmss")),
                mobile_phone: data.mobile_phone == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.Sy_Encoder(data.mobile_phone, user_origin.cre_time?.ToString("yyyyMMddHHmmss")),
                email: data.email,
                city: data.city,
                area: data.area,
                address: data.address == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.Sy_Encoder(data.address, user_origin.cre_time?.ToString("yyyyMMddHHmmss")),
                city_census: data.city_census,
                area_census: data.area_census,
                address_census: data.address_census == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.Sy_Encoder(data.address_census, user_origin.cre_time?.ToString("yyyyMMddHHmmss")),
                on_board_date: data.on_board_date,
                note: data.note,
                home_page: data.home_page,
                blood_type: data.blood_type,
                identity_card: data.identity_card == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.Sy_Encoder(data.identity_card, user_origin.cre_time?.ToString("yyyyMMddHHmmss")),
                SMT_username: data.SMT_username,
                identity_card_en: data.identity_card == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.GetStringFromHash(Tool.SHA256(data.identity_card), true),
                name_en: data.name == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.GetStringFromHash(Tool.SHA256(data.name), true),
                telephone_en: data.telephone == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.GetStringFromHash(Tool.SHA256(data.telephone), true),
                mobile_phone_en: data.mobile_phone == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.GetStringFromHash(Tool.SHA256(data.mobile_phone), true),
                address_en: data.address == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.GetStringFromHash(Tool.SHA256(data.address), true),
                address_census_en: data.address_census == Appsettings.api_string_param_no_pass ? Appsettings.api_string_param_no_pass : Tool.GetStringFromHash(Tool.SHA256(data.address_census), true),
                insurance_cancel_date: data.insurance_cancel_date));

            return new ResultObject<object> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 使用者停用開放
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UserUpdateDisable(UserUpdateDisable data)
        {
            DateTime upd_time = DateTime.Now;

            _user.UpdateUser(new UpdateUserParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                user_id: data.user_id,
                disable: data.disable,
                signin_time: Appsettings.api_datetime_param_no_pass,
                birthday: Appsettings.api_dateonly_param_no_pass,
                resign_date: Appsettings.api_dateonly_param_no_pass,
                on_board_date: Appsettings.api_dateonly_param_no_pass,
                insurance_cancel_date: Appsettings.api_dateonly_param_no_pass));

            return new ResultObject<object> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 使用者離職
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UserResign(UserResign data)
        {
            DateTime upd_time = DateTime.Now;

            _user.UpdateUser(new UpdateUserParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                user_id: data.user_id,
                disable: "Y",
                isresign: "Y",
                resign_date: data.resign_date,
                resign_reason: data.resign_reason,
                signin_time: Appsettings.api_datetime_param_no_pass,
                birthday: Appsettings.api_dateonly_param_no_pass,
                on_board_date: Appsettings.api_dateonly_param_no_pass,
                insurance_cancel_date: data.insurance_cancel_date));

            return new ResultObject<object> { success = true, message = "離職成功" };
        }

        /// <summary>
        /// 使用者修改密碼
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UpdatePassword(UpdatePassword data)
        {
            DateTime upd_time = DateTime.Now;
            SearchUserResult? result = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1, user_id: jwtObject.user_id), ["password"], out int page_count).FirstOrDefault();
            if (result == null || result.password == null) return new ResultObject<object> { success = false, message = "查無使用者" };
            if (!result.password.Equals(Tool.MD5(data.old_password))) return new ResultObject<object> { success = false, message = "修改失敗，原密碼錯誤" };

            _user.UpdateUser(new UpdateUserParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                user_id: jwtObject.user_id,
                password: Tool.MD5(data.new_password),
                signin_time: Appsettings.api_datetime_param_no_pass,
                birthday: Appsettings.api_dateonly_param_no_pass,
                resign_date: Appsettings.api_dateonly_param_no_pass,
                on_board_date: Appsettings.api_dateonly_param_no_pass,
                insurance_cancel_date: Appsettings.api_dateonly_param_no_pass));

            return new ResultObject<object> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 使用者重設密碼
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> ResetPassword(ResetPassword data)
        {
            DateTime upd_time = DateTime.Now;
            SearchUserResult? result = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1, user_id: jwtObject.user_id), ["disable"], out int page_count).FirstOrDefault();
            if (result == null) return new ResultObject<object> { success = false, message = "查無使用者" };

            if ((result.disable ?? "").Equals("Y")) return new ResultObject<object> { success = false, message = "重設失敗，使用者已停用" };

            _user.UpdateUser(new UpdateUserParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                user_id: data.user_id,
                password: Tool.MD5(data.new_password),
                signin_time: Appsettings.api_datetime_param_no_pass,
                birthday: Appsettings.api_dateonly_param_no_pass,
                resign_date: Appsettings.api_dateonly_param_no_pass,
                on_board_date: Appsettings.api_dateonly_param_no_pass,
                insurance_cancel_date: Appsettings.api_dateonly_param_no_pass));

            return new ResultObject<object> { success = true, message = "重設密碼成功" };
        }

        /// <summary>
        /// 使用者更新職務 可以順便改最低職等職級 檢查
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UserUpdateLevel(UserUpdateLevel data)
        {
            DateTime upd_time = DateTime.Now;

            //檢查職等職級
            int selected_career_rank = 0;//選擇的職等
            int selected_career_rank_max_career_level = 0;//選擇的職等的最大職級
            int selected_career_level = 0;//選擇的職級
            int level_lowest_career_rank = 0;//職務的最低職等
            int level_lowest_career_level = 0;//職務的最低職級

            SearchUserResult? searchUserResult = _user.SearchUser(
                new SearchUserParam(own_user_id: "", top_ul_id: 1, ds_dbname: userDealerInfo.ds_dbname, user_id: data.user_id), ["career_level"], out int page_count).FirstOrDefault();
            if (searchUserResult == null) return new ResultObject<object> { success = false, message = "查無使用者" };
            selected_career_level = data.career_level == Appsettings.api_numeric_param_no_pass ? searchUserResult.career_level ?? 0 : data.career_level ?? 0;

            List<SearchUserCareerRankResult> SearchUserCareerRank_result = _usercareerrank.SearchUserCareerRank(
                new SearchUserCareerRankParam(), ["ucr_id", "career_rank", "max_career_level"], out page_count);
            selected_career_rank = SearchUserCareerRank_result.Where(x => x.ucr_id == data.ucr_id).FirstOrDefault()?.career_rank ?? 0;
            selected_career_rank_max_career_level = SearchUserCareerRank_result.Where(x => x.ucr_id == data.ucr_id).FirstOrDefault()?.max_career_level ?? 0;

            SearchUserLevelResult? DetailUserLevel_result = _userlevel.SearchUserLevel(
                new SearchUserLevelParam(ul_id: data.ul_id), ["lowest_ucr_id", "lowest_career_level", "maximum"], out page_count).FirstOrDefault();
            if (DetailUserLevel_result == null) return new ResultObject<object> { success = false, message = "查無職務" };
            level_lowest_career_rank = SearchUserCareerRank_result.Where(x => x.ucr_id == DetailUserLevel_result.lowest_ucr_id).FirstOrDefault()?.career_rank ?? 0;
            level_lowest_career_level = DetailUserLevel_result.lowest_career_level ?? 0;

            if (selected_career_rank < level_lowest_career_rank
                || (selected_career_rank == level_lowest_career_rank
                    && selected_career_level < level_lowest_career_level))
            {
                return new ResultObject<object> { success = false, message = "低於職務最低職等職級" };
            }

            //在職人數不能比職務數量多
            List<SearchUserResult> result = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1, disable: "N", ul_id: data.ul_id), [], out page_count);

            if (result.Count >= DetailUserLevel_result.maximum) return new ResultObject<object> { success = false, message = "修改失敗，在職人數超過最大數量" };

            using (TransactionScope tx = new(TransactionScopeAsyncFlowOption.Enabled))
            {
                _user.UpdateUser(new UpdateUserParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    user_id: data.user_id,
                    ul_id: data.ul_id,
                    career_level: data.career_level,
                    signin_time: Appsettings.api_datetime_param_no_pass,
                    birthday: Appsettings.api_dateonly_param_no_pass,
                    resign_date: Appsettings.api_dateonly_param_no_pass,
                    on_board_date: Appsettings.api_dateonly_param_no_pass,
                    insurance_cancel_date: Appsettings.api_dateonly_param_no_pass));

                //TODO:查使用者審核通過且包括當天的假單的代理人更新職責權限
                //strSql = @"select distinct proxy_user_id from LeaveRecord
                //                    where @date between leave_date_start and leave_date_end
                //                        and status='審核通過' and proxy_user_id<>'' 
                //                        and user_id=@user_id";
                //using (myCommand = new SqlCommand(strSql, myConn))
                //{
                //    using (SqlDataAdapter myAdapter = new SqlDataAdapter())
                //    {
                //        myAdapter.SelectCommand = myCommand;
                //        myCommand.Parameters.AddWithValue("@user_id", data.user_id);
                //        myCommand.Parameters.AddWithValue("@date", upd_time.Substring(0, 8));
                //        myAdapter.Fill(dt);
                //        myCommand.Cancel();
                //    }
                //}

                //新增職務職責&職級職等異動紀錄
                //新增職務職責異動紀錄  本人
                ResultObject<object> uldsc_res = UserLevelDutyHistoryCreate(new UserLevelDutyHistoryCreate() { user_id = data.user_id });
                if (!uldsc_res.success) return new ResultObject<object> { success = false, message = "新增職務職責異動紀錄失敗", data = uldsc_res.message };
                //新增職級職等異動紀錄
                ResultObject<object> ucrhc_res = UserCareerRankHistoryCreate(new UserCareerRankHistoryCreate() { user_id = data.user_id });
                if (!ucrhc_res.success) return new ResultObject<object> { success = false, message = "新增職級職等異動紀錄失敗", data = ucrhc_res.message };

                //TODO:新增職務職責異動紀錄 代理人
                //foreach (DataRow dr in dt.Rows)
                //{
                //    UserLevelDutyHistoryCreate uldsc_data_proxy = new UserLevelDutyHistoryCreate() { user_id = dr["proxy_user_id"].ToString() };
                //    ResultObject<object> uldsc_res_proxy = UserLevelDutyHistoryCreate(uldsc_data_proxy);
                //    if (!uldsc_res_proxy.success) return new ResultObject<object> { success = false, message = "新增職務職責異動紀錄失敗", data = uldsc_res_proxy.message };

                //    ResultObject<object> rObj_proxy = await App_Code.Permission.ResetUserPermission(jwtObject, dr["proxy_user_id"].ToString());
                //    if (!rObj_proxy.success) return new ResultObject<object> { success = false, message = "權限檔案建立失敗" };
                //}
                PageController PC = new(_page, _user, _userlevel, _userduty, _dealerSetting, _config, _baseService) { ControllerContext = ControllerContext };
                ResultObject<object> rObj = PC.ResetUserPermission(data.user_id);
                if (!rObj.success) return new ResultObject<object> { success = false, message = "權限檔案建立失敗" };

                tx.Complete();
                return new ResultObject<object> { success = true, message = "更新成功" };
            }
        }

        /// <summary>
        /// 使用者更新職責
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UserUpdateDuty([FromBody] UserUpdateDuty data)
        {
            using (TransactionScope tx = new(TransactionScopeAsyncFlowOption.Enabled))
            {
                jwtObject.user_id = string.IsNullOrEmpty(jwtObject.user_id) ? "SYSTEM" : jwtObject.user_id;
                jwtObject.company_code = string.IsNullOrEmpty(jwtObject.company_code) ? _config["company_code"] : jwtObject.company_code;
                DateTime cre_time = DateTime.Now;

                _userduty.DeleteUserDutyJoin(data.user_id, null);

                foreach (DictionaryKeyValue ud_id in data.ud_ids)
                {
                    _userduty.CreateUserDutyJoin(new CreateUserDutyJoinParam(
                        cre_userid: jwtObject.user_id,
                        cre_time: cre_time,
                        user_id: data.user_id,
                        ud_id: Convert.ToInt32(ud_id.key),
                        isneed: ud_id.value));
                }

                //TODO:查使用者審核通過且包括當天的假單的代理人更新職責權限
                //strSql = @"select distinct proxy_user_id from LeaveRecord
                //                    where @date between leave_date_start and leave_date_end
                //                        and status='審核通過' and proxy_user_id<>'' 
                //                        and user_id=@user_id";
                //using (myCommand = new SqlCommand(strSql, myConn))
                //{
                //    using (SqlDataAdapter myAdapter = new SqlDataAdapter())
                //    {
                //        myAdapter.SelectCommand = myCommand;
                //        myCommand.Parameters.AddWithValue("@user_id", data.user_id);
                //        myCommand.Parameters.AddWithValue("@date", cre_time.Substring(0, 8));
                //        myAdapter.Fill(dt);
                //        myCommand.Cancel();
                //    }
                //}

                //新增職務職責異動紀錄  本人
                UserLevelDutyHistoryCreate uldsc_data = new() { user_id = data.user_id };
                ResultObject<object> uldsc_res = UserLevelDutyHistoryCreate(uldsc_data);
                if (!uldsc_res.success) return new ResultObject<object> { success = false, message = "新增職務職責異動紀錄失敗", data = uldsc_res.message };

                PageController PC = new(_page, _user, _userlevel, _userduty, _dealerSetting, _config, _baseService) { ControllerContext = ControllerContext };
                ResultObject<object> rObj = PC.ResetUserPermission(data.user_id);
                if (!rObj.success) return new ResultObject<object> { success = false, message = "權限檔案建立失敗" };

                //TODO新增職務職責異動紀錄 代理人
                //foreach (DataRow dr in dt.Rows)
                //{
                //    UserLevelDutyHistoryCreate uldsc_data_proxy = new UserLevelDutyHistoryCreate() { user_id = dr["proxy_user_id"].ToString() };
                //    ResultObject<object> uldsc_res_proxy = UserLevelDutyHistoryCreate(uldsc_data_proxy);
                //    if (!uldsc_res_proxy.success) return new ResultObject<object> { success = false, message = "新增職務職責異動紀錄失敗", data = uldsc_res_proxy.message };

                //    ResultObject<object> rObj_proxy = await App_Code.Permission.ResetUserPermission(jwtObject, dr["proxy_user_id"].ToString());
                //    if (!rObj_proxy.success) return new ResultObject<object> { success = false, message = "權限檔案建立失敗" };
                //}

                tx.Complete();

                return new ResultObject<object> { success = true, message = "更新成功" };
            }
        }

        /// <summary>
        /// 使用者更新職級職等
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UserUpdateCareerRank(UserUpdateCareerRank data)
        {
            DateTime upd_time = DateTime.Now;

            //檢查職等職級
            int selected_career_rank = 0;//選擇的職等
            int selected_career_rank_max_career_level = 0;//選擇的職等的最大職級
            int selected_career_level = 0;//選擇的職級
            int level_lowest_career_rank = 0;//職務的最低職等
            int level_lowest_career_level = 0;//職務的最低職級

            SearchUserResult? searchUserResult = _user.SearchUser(
                new SearchUserParam(own_user_id: "", top_ul_id: 1, ds_dbname: userDealerInfo.ds_dbname, user_id: data.user_id), ["career_level"], out int page_count).FirstOrDefault();
            if (searchUserResult == null) return new ResultObject<object> { success = false, message = "查無使用者" };
            selected_career_level = data.career_level == Appsettings.api_numeric_param_no_pass ? searchUserResult.career_level ?? 0 : data.career_level ?? 0;

            List<SearchUserCareerRankResult> SearchUserCareerRank_result = _usercareerrank.SearchUserCareerRank(
                new SearchUserCareerRankParam(), ["ucr_id", "career_rank"], out page_count);
            selected_career_rank = SearchUserCareerRank_result.Where(x => x.ucr_id == data.ucr_id).FirstOrDefault()?.career_rank ?? 0;
            selected_career_rank_max_career_level = SearchUserCareerRank_result.Where(x => x.ucr_id == data.ucr_id).FirstOrDefault()?.max_career_level ?? 0;
            SearchUserResult? DetailUser_result = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1, user_id: data.user_id), ["ul_id"], out page_count).FirstOrDefault();
            if (DetailUser_result == null) return new ResultObject<object> { success = false, message = "查無使用者" };

            SearchUserLevelResult? DetailUserLevel_result = _userlevel.SearchUserLevel(
                new SearchUserLevelParam(ul_id: DetailUser_result.ul_id), ["lowest_ucr_id", "lowest_career_level"], out page_count).FirstOrDefault();
            if (DetailUserLevel_result == null) return new ResultObject<object> { success = false, message = "查無職務" };

            level_lowest_career_rank = SearchUserCareerRank_result.Where(x => x.ucr_id == DetailUserLevel_result.lowest_ucr_id).FirstOrDefault()?.career_rank ?? 0;
            level_lowest_career_level = DetailUserLevel_result.lowest_career_level ?? 0;

            if (selected_career_rank < level_lowest_career_rank
                || (selected_career_rank == level_lowest_career_rank
                    && selected_career_level < level_lowest_career_level))
            {
                return new ResultObject<object> { success = false, message = "低於職務最低職等職級" };
            }

            using (TransactionScope tx = new(TransactionScopeAsyncFlowOption.Enabled))
            {
                _user.UpdateUser(new UpdateUserParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    user_id: data.user_id,
                    ucr_id: data.ucr_id,
                    career_level: data.career_level,
                    signin_time: Appsettings.api_datetime_param_no_pass,
                    birthday: Appsettings.api_dateonly_param_no_pass,
                    resign_date: Appsettings.api_dateonly_param_no_pass,
                    on_board_date: Appsettings.api_dateonly_param_no_pass,
                    insurance_cancel_date: Appsettings.api_dateonly_param_no_pass));

                //新增職級職等異動紀錄
                ResultObject<object> ucrhc_res = UserCareerRankHistoryCreate(new UserCareerRankHistoryCreate() { user_id = data.user_id });
                if (!ucrhc_res.success) return new ResultObject<object> { success = false, message = "新增職級職等異動紀錄失敗", data = ucrhc_res.message };

                PageController PC = new(_page, _user, _userlevel, _userduty, _dealerSetting, _config, _baseService) { ControllerContext = ControllerContext };
                ResultObject<object> rObj = PC.ResetUserPermission(data.user_id);
                if (!rObj.success) return new ResultObject<object> { success = false, message = "權限檔案建立失敗" };

                tx.Complete();

                return new ResultObject<object> { success = true, message = "更新成功" };
            }
        }

        /// <summary>
        /// 使用者職務職責異動紀錄新增
        /// </summary>
        /// <returns></returns>
        [NonAction]
        public ResultObject<object> UserLevelDutyHistoryCreate(UserLevelDutyHistoryCreate data)
        {
            jwtObject.user_id = string.IsNullOrEmpty(jwtObject.user_id) ? "SYSTEM" : jwtObject.user_id;
            jwtObject.company_code = string.IsNullOrEmpty(jwtObject.company_code) ? _config["company_code"] : jwtObject.company_code;

            DateTime upd_time = DateTime.Now;

            //查詢帳號擁有的職責
            List<SearchUserOwnDutyResult> SearchUserOwnDuty_result = _userduty.SearchUserOwnDuty(data.user_id);

            //查帳號職務
            SearchUserResult? DetailUser_result = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1, user_id: data.user_id), ["ul_id"], out int page_count).FirstOrDefault();
            if (DetailUser_result == null) return new ResultObject<object> { success = false, message = "查無使用者" };

            List<SearchUserLevelDutyHistoryResult> SearchUserLevelDutyHistory_result = _userlevel.SearchUserLevelDutyHistory(
                new SearchUserLevelDutyHistoryParam(user_id: data.user_id), ["cre_time", "uldh_id", "user_id", "date_start", "date_end", "ul_id", "duty_json", "note"], out page_count);
            SearchUserLevelDutyHistoryResult? SearchUserLevelDutyHistory_result_latest = SearchUserLevelDutyHistory_result.OrderByDescending(x => x.cre_time).Take(1).FirstOrDefault();

            //補上舊紀錄的日期迄
            if (SearchUserLevelDutyHistory_result_latest != null)
            {
                _userlevel.UpdateUserLevelDutyHistory(new UpdateUserLevelDutyHistoryParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    uldh_id: SearchUserLevelDutyHistory_result_latest.uldh_id ?? 0,
                    user_id: SearchUserLevelDutyHistory_result_latest.user_id,
                    date_start: SearchUserLevelDutyHistory_result_latest.date_start,
                    date_end: SearchUserLevelDutyHistory_result_latest.date_start == SearchUserLevelDutyHistory_result_latest.date_end
                              ? DateOnly.FromDateTime(upd_time)
                              : DateOnly.FromDateTime(upd_time).AddDays(-1),
                    ul_id: SearchUserLevelDutyHistory_result_latest.ul_id,
                    duty_json: SearchUserLevelDutyHistory_result_latest.duty_json,
                    note: SearchUserLevelDutyHistory_result_latest.note));
            }

            //新增新的職務職責異動紀錄 只有日期起沒有日期迄
            _userlevel.CreateUserLevelDutyHistory(new CreateUserLevelDutyHistoryParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: upd_time,
                    user_id: data.user_id,
                    date_start: DateOnly.FromDateTime(upd_time),
                    date_end: null,
                    ul_id: DetailUser_result.ul_id ?? 0,
                    duty_json: JsonConvert.SerializeObject(SearchUserOwnDuty_result),
                    note: data.note));

            return new ResultObject<object> { success = true, message = "新增成功" };
        }

        /// <summary>
        /// 使用者職等職級異動紀錄新增
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [NonAction]
        public ResultObject<object> UserCareerRankHistoryCreate(UserCareerRankHistoryCreate data)
        {
            DateTime upd_time = DateTime.Now;

            //查帳號職等職級
            SearchUserResult? DetailUser_result = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1, user_id: data.user_id), ["ucr_id", "career_level"], out int page_count).FirstOrDefault();
            if (DetailUser_result == null) return new ResultObject<object> { success = false, message = "查無使用者" };

            List<SearchUserCareerRankHistoryResult> SearchUserCareerRankHistory_result = _usercareerrank.SearchUserCareerRankHistory(
                new SearchUserCareerRankHistoryParam(user_id: data.user_id), ["ucrh_id", "user_id", "date_start", "date_end", "ucr_id", "career_level", "note"], out page_count);
            SearchUserCareerRankHistoryResult? SearchUserCareerRankHistory_result_latest = SearchUserCareerRankHistory_result.OrderByDescending(x => x.date_start).Take(1).FirstOrDefault();

            //補上舊紀錄的日期迄
            if (SearchUserCareerRankHistory_result_latest != null)
            {
                UpdateUserCareerRankHistoryParam UpdateUserCareerRankHistory_param = new(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    ucrh_id: SearchUserCareerRankHistory_result_latest.ucrh_id ?? 0,
                    user_id: SearchUserCareerRankHistory_result_latest.user_id,
                    date_start: SearchUserCareerRankHistory_result_latest.date_start,
                    date_end: SearchUserCareerRankHistory_result_latest.date_start == SearchUserCareerRankHistory_result_latest.date_end
                              ? DateOnly.FromDateTime(upd_time)
                              : DateOnly.FromDateTime(upd_time).AddDays(-1),
                    ucr_id: SearchUserCareerRankHistory_result_latest.ucr_id,
                    career_level: SearchUserCareerRankHistory_result_latest.career_level,
                    note: SearchUserCareerRankHistory_result_latest.note);
                _usercareerrank.UpdateUserCareerRankHistory(UpdateUserCareerRankHistory_param);
            }

            //新增新的職等職級異動紀錄 只有日期起沒有日期迄
            _usercareerrank.CreateUserCareerRankHistory(new CreateUserCareerRankHistoryParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: upd_time,
                    user_id: data.user_id,
                    date_start: DateOnly.FromDateTime(upd_time),
                    date_end: null,
                    ucr_id: DetailUser_result.ucr_id ?? 0,
                    career_level: DetailUser_result.career_level ?? 0,
                    note: data.note));

            return new ResultObject<object> { success = true, message = "新增成功" };
        }

        /// <summary>
        /// 使用者職務職責異動紀錄查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<UserLevelDutyHistorySearchResponse>> UserLevelDutyHistorySearch(UserLevelDutyHistorySearch data)
        {
            List<SearchUserLevelDutyHistoryResult> result = _userlevel.SearchUserLevelDutyHistory(
                new SearchUserLevelDutyHistoryParam(user_id: data.user_id, date_start: data.date_start, date_end: data.date_end),
                ["cre_userid", "cre_time", "upd_userid", "upd_time", "uldh_id", "user_id", "date_start", "date_end", "ul_id", "duty_json", "note", "ul_code", "ul_name"],
                out int page_count);
            List<UserLevelDutyHistorySearchResponse> response = [];

            foreach (SearchUserLevelDutyHistoryResult obj in result)
            {
                response.Add(new UserLevelDutyHistorySearchResponse
                {
                    cre_userid = obj.cre_userid,
                    cre_time = obj.cre_time,
                    upd_userid = obj.upd_userid,
                    upd_time = obj.upd_time,
                    uldh_id = obj.uldh_id,
                    user_id = obj.user_id,
                    date_start = obj.date_start,
                    date_end = obj.date_end,
                    ul_id = obj.ul_id,
                    duty_json = obj.duty_json,
                    note = obj.note,
                    ul_code = obj.ul_code,
                    ul_name = obj.ul_name
                });
            }

            return new ResultObject<List<UserLevelDutyHistorySearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 使用者職等職級異動紀錄查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchUserCareerRankHistoryResult>> UserCareerRankHistorySearch(UserCareerRankHistorySearch data)
        {
            List<SearchUserCareerRankHistoryResult> result = _usercareerrank.SearchUserCareerRankHistory(
                new SearchUserCareerRankHistoryParam(user_id: data.user_id, date_start: data.date_start, date_end: data.date_end),
                ["cre_userid", "cre_time", "upd_userid", "upd_time", "ucrh_id", "user_id", "date_start", "date_end", "ucr_id", "career_rank", "career_level", "note"],
                out int page_count);

            return new ResultObject<List<SearchUserCareerRankHistoryResult>> { success = true, data = result, page = page_count };
        }

        /// <summary>
        /// TODO:使用者檢查更新代理權限 服務每天呼叫 假單審核通過當下在請假日期範圍內也會呼叫
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        //[HttpPost, AllowAnonymous]
        //public async Task<ResultObject> UserUpdateProxyDuty(UserUpdateProxyDuty data)
        //{
        //    using (TransactionScope tx = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        //    {
        //        AuthObject jwtObject = new AuthObject { company_code = data.company_code };

        //        DataTable dt = new DataTable();

        //        DateTime date_today = isAWS ? DateTime.Now.AddHours(8) : DateTime.Now;

        //        using (SqlConnection myConn = new SqlConnection(strConn))
        //        {
        //            myConn.Open();

        //            //TODO:查出當天是 請假日期起 或是 請假日期迄的隔天 的假單代理人們
        //            string strSql = @"select distinct proxy_user_id from LeaveRecord
        //                            where (leave_date_start=@date_today or leave_date_end=@date_yesterday)
        //                                and status='審核通過' and proxy_user_id<>'' ";
        //            if (string.IsNullOrEmpty(data.user_id)) strSql += @"and user_id=@user_id";
        //            using (SqlCommand myCommand = new SqlCommand(strSql, myConn))
        //            {
        //                using (SqlDataAdapter myAdapter = new SqlDataAdapter())
        //                {
        //                    myAdapter.SelectCommand = myCommand;
        //                    if (string.IsNullOrEmpty(data.user_id)) myCommand.Parameters.AddWithValue("@user_id", data.user_id);
        //                    myCommand.Parameters.AddWithValue("@date_today", Tool.DatetimeToString(date_today, 8));
        //                    myCommand.Parameters.AddWithValue("@date_yesterday", Tool.DatetimeToString(date_today.AddDays(-1), 8));
        //                    myAdapter.Fill(dt);
        //                    myCommand.Cancel();
        //                }
        //            }
        //        }

        //        foreach (DataRow dr in dt.Rows)
        //        {
        //            //新增職務職責異動紀錄
        //            UserLevelDutyHistoryCreate uldsc_data = new UserLevelDutyHistoryCreate() { user_id = dr["proxy_user_id"].ToString() };
        //            ResultObject<object> uldsc_res = UserLevelDutyHistoryCreate(uldsc_data);
        //            if (!uldsc_res.success) return new ResultObject<object> { success = false, message = "新增職務職責異動紀錄失敗", data = uldsc_res.message };

        //            ResultObject<object> rObj = await App_Code.Permission.ResetUserPermission(jwtObject, dr["proxy_user_id"].ToString());
        //            if (!rObj.success) return new ResultObject<object> { success = false, message = "權限檔案建立失敗" };
        //        }
        //        tx.Complete();

        //        return new ResultObject
        //        {
        //            success = true,
        //            message = "代理權限更新完成"
        //        };
        //    }
        //}

        /// <summary>
        /// 新增使用者關係企業紀錄
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UserRelatedCompanyRecordCreate(UserRelatedCompanyRecordCreate data)
        {
            DateTime cre_time = DateTime.Now;

            //檢查日期重疊
            List<SearchRelatedCompanyRecordResult> result = _user.SearchRelatedCompanyRecord(
                new SearchRelatedCompanyRecordParam(user_id: data.user_id, visible: "Y"), ["date_start", "date_end"], out int page_count);
            if (result.Exists(x => x.date_end >= data.date_start && x.date_start <= data.date_end))
                return new ResultObject<object> { success = false, message = "日期重疊" };

            _user.CreateRelatedCompanyRecord(new CreateRelatedCompanyRecordParam(
                cre_userid: jwtObject.user_id,
                cre_time: cre_time,
                user_id: data.user_id,
                name: data.name,
                date_start: data.date_start,
                date_end: data.date_end,
                visible: "Y"));

            return new ResultObject<object> { success = true, message = "新增成功" };
        }

        /// <summary>
        /// 修改使用者關係企業紀錄(只能改visible怕死無對證)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UserRelatedCompanyRecordUpdate(UserRelatedCompanyRecordUpdate data)
        {
            DateTime upd_time = DateTime.Now;
            //檢查日期重疊
            SearchRelatedCompanyRecordResult? SearchRelatedCompanyRecord_result_origin = _user.SearchRelatedCompanyRecord(
                new SearchRelatedCompanyRecordParam(rcr_id: data.rcr_id), ["rcr_id", "user_id", "name", "date_start", "date_end"], out int page_count).FirstOrDefault();
            if (SearchRelatedCompanyRecord_result_origin == null) return new ResultObject<object> { success = false, message = "查無使用者關係企業紀錄" };

            List<SearchRelatedCompanyRecordResult> SearchRelatedCompanyRecord_result = _user.SearchRelatedCompanyRecord(
                new SearchRelatedCompanyRecordParam(user_id: SearchRelatedCompanyRecord_result_origin.user_id, visible: "Y"),
                ["rcr_id", "user_id", "name", "date_start", "date_end"],
                out page_count);

            if (SearchRelatedCompanyRecord_result
                .Exists(x => x.date_end >= SearchRelatedCompanyRecord_result_origin.date_start
                             && x.date_start <= SearchRelatedCompanyRecord_result_origin.date_end
                             && x.rcr_id != data.rcr_id))
                return new ResultObject<object> { success = false, message = "日期重疊" };

            _user.UpdateRelatedCompanyRecord(new UpdateRelatedCompanyRecordParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                rcr_id: data.rcr_id,
                user_id: SearchRelatedCompanyRecord_result_origin.user_id,
                name: SearchRelatedCompanyRecord_result_origin.name,
                date_start: SearchRelatedCompanyRecord_result_origin.date_start,
                date_end: SearchRelatedCompanyRecord_result_origin.date_end,
                visible: data.visible));

            return new ResultObject<object> { success = true, message = "修改改功" };
        }

        /// <summary>
        /// 查詢使用者關係企業紀錄
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchRelatedCompanyRecordResult>> UserRelatedCompanyRecordSearch(UserRelatedCompanyRecordSearch data)
        {
            List<SearchRelatedCompanyRecordResult> SearchRelatedCompanyRecord_result = _user.SearchRelatedCompanyRecord(
                new SearchRelatedCompanyRecordParam(user_id: data.user_id, visible: data.visible, page: data.page, num_per_page: data.num_per_page),
                ["cre_userid", "cre_time", "upd_userid", "upd_time", "rcr_id", "user_id", "name", "date_start", "date_end"],
                out int page_count);

            return new ResultObject<List<SearchRelatedCompanyRecordResult>> { success = true, data = SearchRelatedCompanyRecord_result, page = page_count };
        }
    }
}
