using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    [Authorization]
    public class UserLevelController(IUserLevel userLevel, IUserCareerRank userCareerRank, IUser user, ISystemSettings systemSettings
            , IUserDuty userDuty, ISystemParam systemParam, IDealerSetting dealerSetting, IConfiguration config, IBaseService baseService, UserCache userCache, IPage page) : CustomControllerBase(baseService)
    {
        private readonly IConfiguration _config = config;
        private readonly IUserLevel _userLevel = userLevel;
        private readonly IUser _user = user;
        private readonly IUserCareerRank _userCareerRank = userCareerRank;
        private readonly IUserDuty _userDuty = userDuty;
        private readonly ISystemSettings _systemSettings = systemSettings;
        private readonly ISystemParam _systemParam = systemParam;
        private readonly IDealerSetting _dealerSetting = dealerSetting;
        private readonly UserCache _userCache = userCache;
        private readonly IPage _page = page;

        /// <summary>
        /// 職務查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<UserLevelSearchResponse>> UserLevelSearch(UserLevelSearch data)
        {
            //查可查詢最高層級職務
            int top_ul_id = PermissionFunctionController.CheckSearchPermission(jwtObject.user_id, jwtObject.ul_id, "UserLevelSearch", _baseService);

            List<SearchUserLevelResult> result = _userLevel.SearchUserLevel(new SearchUserLevelParam(
                top_ul_id: top_ul_id,
                code: data.code,
                name: data.name,
                parent_id: data.parent_id,
                company_id: data.company_id,
                general_manager_id: data.general_manager_id,
                department_id: data.department_id,
                position_id: data.position_id,
                class_id: data.class_id,
                group_id: data.group_id,
                office_id: data.office_id,
                page: data.page,
                num_per_page: data.num_per_page),
                ["ul_id", "code", "name", "department_name", "position_name", "parent_name"],
                out int page_count);

            List<UserLevelSearchResponse> response = [];
            foreach (SearchUserLevelResult obj in result)
            {
                response.Add(new UserLevelSearchResponse
                {
                    ul_id = obj.ul_id ?? 0,
                    code = obj.code ?? "",
                    name = obj.name ?? "",
                    department_name = obj.department_name ?? "",
                    position_name = obj.position_name ?? "",
                    parent_name = obj.parent_name ?? ""
                });
            }

            return new ResultObject<List<UserLevelSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 職務查詢(無視權限選所有職務  職責選邏輯主管用 設定錯誤使用者才有辦法自行調整回來)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchUserLevelResult>> UserLevelSearchAll(UserLevelSearch data)
        {
            List<SearchUserLevelResult> result = _userLevel.SearchUserLevel(new SearchUserLevelParam(
                code: data.code,
                name: data.name,
                parent_id: data.parent_id,
                company_id: data.company_id,
                general_manager_id: data.general_manager_id,
                department_id: data.department_id,
                position_id: data.position_id,
                class_id: data.class_id,
                group_id: data.group_id,
                office_id: data.office_id,
                page: data.page,
                num_per_page: data.num_per_page
                ),
                ["ul_id", "code", "name"],
                out int page_count);

            return new ResultObject<List<SearchUserLevelResult>> { success = true, data = result, page = page_count };
        }

        /// <summary>
        /// 新增某職務下的職務***相關權限處理
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<int> UserLevelCreate(UserLevelCreate data)
        {
            DateTime cre_time = DateTime.Now;

            int ul_id = 0;

            List<SearchUserLevelResult> SearchUserLevel_result = _userLevel.SearchUserLevel(new SearchUserLevelParam(), ["code"], out int page_count);

            //職務代碼是否重複
            if (SearchUserLevel_result.Exists(x => (x.code ?? "").Equals(data.code))) return new ResultObject<int> { success = false, message = "新增失敗，此職務代碼已建檔" };

            //檢查最低職等職級是否有誤
            List<SearchUserCareerRankResult> SearchUserCareerRank_result = _userCareerRank.SearchUserCareerRank(new SearchUserCareerRankParam(), ["ucr_id", "max_career_level"], out page_count);
            if (!SearchUserCareerRank_result.Exists(x => x.ucr_id == data.lowest_ucr_id))
                data.lowest_career_level = 0;
            else
            {
                if (data.lowest_career_level > SearchUserCareerRank_result.Where(x => x.ucr_id == data.lowest_ucr_id).FirstOrDefault()?.max_career_level)
                    return new ResultObject<int> { success = false, message = "最低職級超過上限" };
            }

            //新建職務
            ul_id = _userLevel.CreateUserLevel(new CreateUserLevelParam(
                cre_userid: jwtObject.user_id,
                cre_time: cre_time,
                code: data.code,
                name: data.name,
                parent_id: data.parent_id,
                company_id: data.company_id,
                general_manager_id: data.general_manager_id,
                department_id: data.department_id,
                position_id: data.position_id,
                class_id: data.class_id,
                group_id: data.group_id,
                office_id: data.office_id,
                email: data.email,
                phone: data.phone,
                salary_type: data.salary_type,
                title: data.title,
                maximum: data.maximum,
                note: data.note,
                lowest_ucr_id: data.lowest_ucr_id,
                lowest_career_level: data.lowest_career_level,
                leave_day_audit: data.leave_day_audit,
                level_audit_type: JsonConvert.SerializeObject(data.level_audit_type),
                perfect_attendance_bonus: data.perfect_attendance_bonus,
                order_over_discount_audit: data.order_over_discount_audit,
                pdi_price_audit: data.pdi_price_audit));

            return new ResultObject<int> { success = true, message = "新增成功", data = ul_id };
        }

        /// <summary>
        /// 職務細項  連職責權限一起
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<UserLevelDetailResponse> UserLevelDetail(UserLevelDetail data)
        {
            //職務
            SearchUserLevelResult? DetailUserLevel_result = _userLevel.SearchUserLevel(
                new SearchUserLevelParam(ul_id: data.ul_id),
                ["cre_userid", "cre_time", "upd_userid", "upd_time", "ul_id", "code", "name", "parent_id", "parent_name", "company_id", "general_manager_id", "department_id", "position_id", "class_id", "group_id", "office_id", "email", "phone", "salary_type", "title", "maximum", "note", "lowest_ucr_id", "lowest_career_level", "leave_day_audit", "level_audit_type", "perfect_attendance_bonus", "order_over_discount_audit", "pdi_price_audit", "company_name", "general_manager_name", "department_name", "position_name", "class_name", "group_name", "office_name", "career_rank"],
                out int page_count).FirstOrDefault();

            //職務綁職責
            List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin_result = _userLevel.SearchUserLevelDutyJoin(
                new SearchUserLevelDutyJoinParam(ul_id: data.ul_id),
                ["ud_id"],
                out page_count);

            //職責
            List<SearchUserDutyResult> SearchUserDuty_result = _userDuty.SearchUserDuty(
                new SearchUserDutyParam(),
                ["ud_id"],
                out int SearchUserDuty_page_count);

            //職責綁權限
            List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin_result = _userDuty.SearchUserDutyPermissionJoin(
                new SearchUserDutyPermissionJoinParam(),
                ["pc_id", "ud_id", "page_id"],
                out page_count);

            return new ResultObject<UserLevelDetailResponse>
            {
                success = true,
                data = new UserLevelDetailResponse
                {
                    info = DetailUserLevel_result,
                    duty = SearchUserDuty_result.Where(x => SearchUserLevelDutyJoin_result.Exists(y => y.ud_id == x.ud_id)).ToList(),
                    pages = SearchUserDutyPermissionJoin_result.Where(x => x.pc_id == 0 && SearchUserLevelDutyJoin_result.Exists(y => y.ud_id == x.ud_id)).Select(x => x.page_id).Distinct().ToList(),
                    pageControl = SearchUserDutyPermissionJoin_result.Where(x => x.pc_id != 0 && SearchUserLevelDutyJoin_result.Exists(y => y.ud_id == x.ud_id)).Select(x => x.pc_id).Distinct().ToList()
                }
            };
        }

        /// <summary>
        /// 修改職務***在職人數不能比職務數量還多 審核名目和種類們不在這
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UserLevelUpdate(UserLevelUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            if (data.ul_id.Equals(data.parent_id)) return new ResultObject { success = false, message = "母職務編號不能是自己" };

            List<SearchUserLevelResult> SearchUserLevel_result = _userLevel.SearchUserLevel(
                new SearchUserLevelParam(),
                ["code", "ul_id", "lowest_career_level", "maximum"],
                out int page_count);

            SearchUserLevelResult? SearchUserLevel_result_origin = SearchUserLevel_result.FirstOrDefault(x => x.ul_id == data.ul_id);
            if (SearchUserLevel_result_origin == null) return new ResultObject { success = false, message = "查無職務" };

            //職務代碼是否重複
            if (data.code != Appsettings.api_string_param_no_pass
                && SearchUserLevel_result.Exists(x => (data.code ?? SearchUserLevel_result_origin.code ?? "").Equals(x.code)
                && x.ul_id != data.ul_id))
                return new ResultObject { success = false, message = "修改失敗，此職務代碼已建檔" };

            //在職人數不能比職務數量多
            List<SearchUserResult> SearchUser_result = _user.SearchUser(
                new SearchUserParam(
                ds_dbname: userDealerInfo.ds_dbname,
                own_user_id: "",
                top_ul_id: 1,
                disable: "N",
                ul_id: data.ul_id),
                ["ucr_id", "career_level"],
                out page_count);

            if (data.maximum != Appsettings.api_numeric_param_no_pass && SearchUser_result.Count > (data.maximum ?? 0)) return new ResultObject { success = false, message = "修改失敗，在職人數超過最大數量" };

            //檢查最低職等職級是否有誤
            int level_lowest_career_rank = 0;//職務的新最低職等
            int level_lowest_career_level = data.lowest_career_level == Appsettings.api_numeric_param_no_pass ? SearchUserLevel_result_origin.lowest_career_level ?? 0 : data.lowest_career_level ?? 0;//職務的新最低職級
            List<SearchUserCareerRankResult> SearchUserCareerRank_result = _userCareerRank.SearchUserCareerRank(
                new SearchUserCareerRankParam(),
                ["ucr_id", "career_rank", "max_career_level"],
                out page_count);
            if (!SearchUserCareerRank_result.Exists(x => x.ucr_id == data.lowest_ucr_id))
                level_lowest_career_level = 0;
            else
            {
                level_lowest_career_rank = SearchUserCareerRank_result.Where(x => x.ucr_id == data.lowest_ucr_id).FirstOrDefault()?.career_rank ?? 0;
                if (level_lowest_career_level > SearchUserCareerRank_result.Where(x => x.ucr_id == data.lowest_ucr_id).FirstOrDefault()?.max_career_level)
                {
                    return new ResultObject { success = false, message = "最低職級超過上限" };
                }
            }

            //檢查該職務的員工職等職級
            foreach (SearchUserResult user in SearchUser_result)
            {
                int career_rank = SearchUserCareerRank_result.Where(x => x.ucr_id == user.ucr_id).Select(x => x.career_rank).FirstOrDefault() ?? 0;
                if (career_rank < level_lowest_career_rank
                    || (career_rank == level_lowest_career_rank
                        && user.career_level < level_lowest_career_level))
                {
                    return new ResultObject { success = false, message = "職務員工低於最低職等職級" };
                }
            }

            //檢查是否造成迴圈指定母層職務
            List<UserLevelTree> SearchUserLevelTree_result = _userLevel.SearchUserLevelTreeESC(data.ul_id, 0);
            if (SearchUserLevelTree_result.Exists(x => x.ul_id == data.parent_id))
                return new ResultObject { success = false, message = "母層職務設定有誤，將造成無窮迴圈..." };

            //修改職務
            _userLevel.UpdateUserLevel(new UpdateUserLevelParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                ul_id: data.ul_id,
                code: data.code,
                name: data.name,
                parent_id: data.parent_id,
                company_id: data.company_id,
                general_manager_id: data.general_manager_id,
                department_id: data.department_id,
                position_id: data.position_id,
                class_id: data.class_id,
                group_id: data.group_id,
                office_id: data.office_id,
                email: data.email,
                phone: data.phone,
                salary_type: data.salary_type,
                title: data.title,
                maximum: data.maximum,
                note: data.note,
                lowest_ucr_id: data.lowest_ucr_id,
                lowest_career_level: data.lowest_career_level,
                leave_day_audit: data.leave_day_audit,
                level_audit_type: JsonConvert.SerializeObject(data.level_audit_type),
                perfect_attendance_bonus: data.perfect_attendance_bonus,
                order_over_discount_audit: data.order_over_discount_audit,
                pdi_price_audit: data.pdi_price_audit));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 修改職務的審核名目和種類
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UserLevelUpdateAuditType(UserLevelUpdateAuditType data)
        {
            DateTime upd_time = DateTime.Now;

            //修改職務
            _userLevel.UpdateUserLevel(new UpdateUserLevelParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                ul_id: data.ul_id,
                level_audit_type: JsonConvert.SerializeObject(data.level_audit_type)));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 修改職務的訂單相關欄位
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UserLevelUpdateOrderRelate(UserLevelUpdateOrderRelate data)
        {
            DateTime upd_time = DateTime.Now;
            //修改職務
            _userLevel.UpdateUserLevel(new UpdateUserLevelParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                ul_id: data.ul_id,
                order_over_discount_audit: data.order_over_discount_audit));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 修改職務的PDI相關欄位
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UserLevelUpdatePDIRelate(UserLevelUpdatePDIRelate data)
        {
            DateTime upd_time = DateTime.Now;
            //修改職務
            _userLevel.UpdateUserLevel(new UpdateUserLevelParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                ul_id: data.ul_id,
                pdi_price_audit: data.pdi_price_audit));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 刪除職務***本職務+底下的職務的現職人數0才能刪
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UserLevelDelete(UserLevelDetail data)
        {
            //本職務+底下的職務的現職人數0才能刪
            List<UserLevelTree> userLevelTrees = _userLevel.SearchUserLevelTreeESC(data.ul_id, 0);
            //查使用者
            List<SearchUserResult> SearchUser_result = _user.SearchUser(new SearchUserParam(
                ds_dbname: userDealerInfo.ds_dbname,
                disable: "N",
                top_ul_id: 1,
                ul_ids: userLevelTrees.Count == 0 ? [-100] : userLevelTrees.Select(x => x.ul_id).ToList(),
                own_user_id: "不要保證查自己"),
                [],
                out int page_count);
            if (SearchUser_result.Count > 0) return new ResultObject { success = false, message = "修改失敗，本職務下還有在職員工" };

            //刪除職務
            _userLevel.DeleteUserLevel(data.ul_id);

            return new ResultObject { success = true, message = "刪除成功" };
        }

        /// <summary>
        /// 更新職務對應職責***相關權限處理
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UserLevelUpdateDuty(UserLevelUpdateDuty data)
        {
            using (TransactionScope tx = new(TransactionScopeAsyncFlowOption.Enabled))
            {
                DateTime cre_time = DateTime.Now;

                //刪掉舊的對應
                _userLevel.DeleteUserLevelDutyJoin(data.ul_id, null);

                //新增新對應
                foreach (int ud_id in data.ud_ids)
                {
                    _userLevel.CreateUserLevelDutyJoin(new CreateUserLevelDutyJoinParam(
                        cre_userid: jwtObject.user_id,
                        cre_time: cre_time,
                        ul_id: data.ul_id,
                        ud_id: ud_id));
                }

                //TODO:查有這個職責的使用者  審核通過且包括當天的假單的代理人更新職責權限
                List<SearchUserResult> SearchUser_result = _user.SearchUser(new SearchUserParam(
                ds_dbname: userDealerInfo.ds_dbname,
                    disable: "N",
                    ul_id: data.ul_id,
                    top_ul_id: 1,
                    own_user_id: ""),
                    ["user_id"],
                    out int page_count);

                //新增職務職責異動紀錄  本人
                UserController uc = new(_user, _userLevel, _userCareerRank, _systemSettings, _userDuty, _dealerSetting, _config, _baseService, _userCache, _page)
                { ControllerContext = ControllerContext };
                foreach (SearchUserResult user in SearchUser_result)
                {
                    if (string.IsNullOrEmpty(user.user_id)) continue;
                    UserLevelDutyHistoryCreate uldsc_data = new() { user_id = user.user_id };
                    ResultObject<object> uldsc_res = uc.UserLevelDutyHistoryCreate(uldsc_data);
                    if (!uldsc_res.success) return new ResultObject { success = false, message = "新增職務職責異動紀錄失敗", data = uldsc_res.message };
                    //reset user permission file
                    PageController PC = new(_page, _user, _userLevel, _userDuty, _dealerSetting, _config, _baseService)
                    { ControllerContext = ControllerContext };
                    ResultObject<object> rObj = PC.ResetUserPermission(user.user_id);
                    if (!rObj.success) continue;
                }

                //TODO:新增職務職責異動紀錄  代理人
                //foreach (DataRow dr in dt_proxy.Rows)
                //{
                //    UserController uc = new UserController { ControllerContext = ControllerContext };
                //    UserLevelDutyHistoryCreate uldsc_data = new UserLevelDutyHistoryCreate() { user_id = dr["proxy_user_id"].ToString() };
                //    ResultObject uldsc_res = uc.UserLevelDutyHistoryCreate(uldsc_data);
                //    if (!uldsc_res.success) return new ResultObject { success = false, message = "新增職務職責異動紀錄失敗", data = uldsc_res.message };
                //    //reset user permission file
                //    ResultObject rObj = await App_Code.Permission.ResetUserPermission(jwtObject, dr["proxy_user_id"].ToString());
                //    if (!rObj.success) continue;
                //}

                tx.Complete();

                return new ResultObject { success = true, message = "新增成功" };
            }
        }

        /// <summary>
        /// 職務更新審核名目們(增加新項目時要叫一下)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject UserLevelUpdateLevelAuditType()
        {
            DateTime upd_time = DateTime.Now;

            //查所有職務
            SearchUserLevelParam SearchUserLevel_param = new();

            List<SearchUserLevelResult> SearchUserLevel_result = _userLevel.SearchUserLevel(
                SearchUserLevel_param,
                ["ul_id", "level_audit_type"],
                out int page_count);

            //查代碼檔
            List<SearchSPSResult> SearchSPS_result = _systemParam.SearchSPS(new SearchSPSParam(spp_id: "ADN", visible: "Y"));

            foreach (SearchUserLevelResult userlevel in SearchUserLevel_result)
            {
                List<DictionaryKeyValue> kvs = JsonConvert.DeserializeObject<List<DictionaryKeyValue>>(userlevel.level_audit_type ?? "[]") ?? [];
                foreach (SearchSPSResult sps in SearchSPS_result)
                {
                    if (!kvs.Exists(x => x.key.Equals(sps.sps_id)))
                    {
                        if (string.IsNullOrEmpty(sps.sps_id)) continue;
                        kvs.Add(new DictionaryKeyValue { key = sps.sps_id, value = "001" });
                    }
                }

                //修改職務
                _userLevel.UpdateUserLevel(new UpdateUserLevelParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: "SYSTEM",
                    upd_time: upd_time,
                    ul_id: userlevel.ul_id ?? 0,
                    level_audit_type: JsonConvert.SerializeObject(kvs.OrderBy(x => x.key).ToList())));
            }

            return new ResultObject { success = true };
        }
    }
}