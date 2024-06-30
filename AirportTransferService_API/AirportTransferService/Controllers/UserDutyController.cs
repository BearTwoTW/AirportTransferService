using AirportTransferService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.Arm;

namespace AirportTransferService.Controllers
{
    [Authorization]
    public class UserDutyController(IUserDuty userDuty, IUserLevel userLevel, IUser user, IDealerSetting dealerSetting
            , IConfiguration config, IBaseService baseService, IPage page) : CustomControllerBase(baseService)
    {
        private readonly IConfiguration _config = config;
        private readonly IUserDuty _userDuty = userDuty;
        private readonly IUserLevel _userLevel = userLevel;
        private readonly IUser _user = user;
        private readonly IDealerSetting _dealerSetting = dealerSetting;
        private readonly IPage _page = page;

        /// <summary>
        /// 搜尋職責
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchUserDutyResult>> UserDutySearch(UserDutySearch data)
        {
            List<SearchUserDutyResult> SearchUserDuty_result = _userDuty.SearchUserDuty(new SearchUserDutyParam(
                code: data.code,
                name: data.name,
                ul_id: data.ul_id,
                is_calculate_salary: data.is_calculate_salary,
                page: data.page,
                num_per_page: data.num_per_page),
                ["ud_id", "code", "name", "is_calculate_salary", "ul_name"],
                out int page_count);

            return new ResultObject<List<SearchUserDutyResult>> { success = true, data = SearchUserDuty_result, page = page_count };
        }

        /// <summary>
        /// 新建職責
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<int> UserDutyCreate(UserDutyCreate data)
        {
            DateTime cre_time = DateTime.Now;
            int ud_id = 0;

            List<SearchUserDutyResult> SearchUserDuty_result = _userDuty.SearchUserDuty(
                new SearchUserDutyParam(code: data.code),
                ["code"],
                out int page_count);

            //職責代碼是否重複
            if (SearchUserDuty_result.Exists(x => (x.code ?? "").Equals(data.code))) return new ResultObject<int> { success = false, message = "新增失敗，此職責代碼已建檔" };

            ud_id = _userDuty.CreateUserDuty(new CreateUserDutyParam(
                cre_userid: jwtObject.user_id,
                cre_time: cre_time,
                code: data.code,
                name: data.name,
                ul_id: data.ul_id,
                is_calculate_salary: data.is_calculate_salary));

            return new ResultObject<int> { success = true, message = "新增成功", data = ud_id };
        }

        /// <summary>
        /// 職責細項 連權限一起
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<UserDutyDetailResponse> UserDutyDetail(UserDutyDetail data)
        {
            SearchUserDutyResult? SearchUserDuty_result = _userDuty.SearchUserDuty(
                new SearchUserDutyParam(ud_id: data.ud_id),
                ["ud_id", "code", "name", "ul_id", "is_calculate_salary", "ul_name"],
                out int page_count).First();

            List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin_result = _userDuty.SearchUserDutyPermissionJoin(
                new SearchUserDutyPermissionJoinParam(ud_id: data.ud_id),
                ["pg_id", "page_id", "pc_id", "ud_id"],
                out page_count);

            return new ResultObject<UserDutyDetailResponse>
            {
                success = true,
                data = new UserDutyDetailResponse
                {
                    info = SearchUserDuty_result,
                    pages = SearchUserDutyPermissionJoin_result.Where(x => x.pc_id == null && x.page_id != null).Select(x => x.page_id ?? 0).Distinct().ToList(),
                    pageControl = SearchUserDutyPermissionJoin_result.Where(x => x.pc_id != null).Select(x => x.pc_id ?? 0).Distinct().ToList()
                }
            };
        }

        /// <summary>
        /// 修改職責
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UserDutyUpdate(UserDutyUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            List<SearchUserDutyResult> SearchUserDuty_result = _userDuty.SearchUserDuty(
                new SearchUserDutyParam(),
                ["ud_id", "code"],
                out int page_count);

            SearchUserDutyResult? SearchUserDuty_result_origin = SearchUserDuty_result.FirstOrDefault(x => x.ud_id == data.ud_id);
            if (SearchUserDuty_result_origin == null) return new ResultObject { success = false, message = "查無職責" };

            //職責代碼是否重複
            if (data.code != Appsettings.api_string_param_no_pass
                && SearchUserDuty_result.Exists(x => (data.code ?? SearchUserDuty_result_origin.code ?? "").Equals(x.code)
                && x.ud_id != data.ud_id))
                return new ResultObject { success = false, message = "修改失敗，此職責代碼已建檔" };

            _userDuty.UpdateUserDuty(new UpdateUserDutyParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                ud_id: data.ud_id,
                code: data.code,
                name: data.name,
                ul_id: data.ul_id,
                is_calculate_salary: data.is_calculate_salary));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 刪除職責***相關權限處理m
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UserDutyDelete(UserDutyDetail data)
        {
            //查影響到的帳號們
            //使用者職責綁定
            List<SearchUserDutyJoinResult> SearchUserDutyJoin_result = _userDuty.SearchUserDutyJoin(
                new SearchUserDutyJoinParam(ud_id: data.ud_id),
                ["user_id"],
                out int page_count);

            //職務職責綁定
            List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin_result = _userLevel.SearchUserLevelDutyJoin(
                new SearchUserLevelDutyJoinParam(ud_id: data.ud_id),
                ["ul_id"],
                out page_count);

            //使用者
            List<SearchUserResult> SearchUser_result = _user.SearchUser(
                new SearchUserParam(
                ds_dbname: userDealerInfo.ds_dbname,
                own_user_id: "",
                top_ul_id: 1),
                ["user_id", "ul_id"],
                out page_count);

            _userDuty.DeleteUserDuty(data.ud_id);

            foreach (string? user_id in SearchUser_result.Where(x =>
                                        SearchUserDutyJoin_result.Exists(y => (y.user_id ?? "").Equals(x.user_id))
                                        || SearchUserLevelDutyJoin_result.Exists(y => y.ul_id == x.ul_id)).Select(x => x.user_id))
            {
                if (string.IsNullOrEmpty(user_id)) continue;
                //reset user permission file
                PageController PC = new(_page, _user, _userLevel, _userDuty, _dealerSetting, _config, _baseService)
                { ControllerContext = ControllerContext };
                ResultObject<object> rObj = PC.ResetUserPermission(user_id);
                if (!rObj.success) continue;
            }

            return new ResultObject { success = true, message = "刪除成功" };
        }

        /// <summary>
        /// 更新職責對應權限
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UserDutyUpdatePermission([FromBody] UserDutyUpdatePermission data)
        {
            using (TransactionScope tx = new(TransactionScopeAsyncFlowOption.Enabled))
            {
                DateTime cre_time = DateTime.Now;

                //刪掉現有的
                _userDuty.DeleteUserDutyPermissionJoin(null, null, null, data.ud_id);
                //新建新的
                foreach (PermissionObject item in data.permission_list)
                {
                    _userDuty.CreateUserDutyPermissionJoin(new CreateUserDutyPermissionJoinParam(
                        cre_userid: jwtObject.user_id,
                        cre_time: cre_time,
                        pg_id: item.pg_id,
                        page_id: item.page_id,
                        pc_id: item.pc_id,
                        ud_id: data.ud_id));
                }

                //查有這個職責的職務
                List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin_result = _userLevel.SearchUserLevelDutyJoin(
                    new SearchUserLevelDutyJoinParam(ud_id: data.ud_id),
                    ["ul_id"],
                    out int page_count);

                //查額外給或不給這個職責的使用者
                List<SearchUserDutyJoinResult> SearchUserDutyJoin_result = _userDuty.SearchUserDutyJoin(
                    new SearchUserDutyJoinParam(ud_id: data.ud_id),
                    ["isneed", "user_id"],
                    out page_count);

                //查使用者
                List<SearchUserResult> SearchUser_result = _user.SearchUser(
                    new SearchUserParam(
                    ds_dbname: userDealerInfo.ds_dbname,
                    own_user_id: "",
                    top_ul_id: 1),
                    ["user_id", "ul_id"],
                    out page_count);

                //過濾有這個職責的使用者
                List<string?> user_ids = SearchUser_result.Where(x =>
                SearchUserLevelDutyJoin_result.Exists(y => y.ul_id == x.ul_id)
                && (SearchUserDutyJoin_result.Count == 0
                    || (SearchUserDutyJoin_result.Exists(y => !(y.isneed ?? "").Equals("N") && (y.user_id ?? "").Equals(x.user_id))
                        && !SearchUserDutyJoin_result.Exists(y => (y.isneed ?? "").Equals("N") && (y.user_id ?? "").Equals(x.user_id))))
                        ).Select(x => x.user_id).ToList();

                //TODO:查有這個職責的使用者  審核通過且包括當天的假單的代理人更新職責權限

                //重作權限檔案  本人
                foreach (string? user_id in user_ids)
                {
                    if (string.IsNullOrEmpty(user_id)) continue;
                    //reset user permission file
                    PageController PC = new(_page, _user, _userLevel, _userDuty, _dealerSetting, _config, _baseService)
                    { ControllerContext = ControllerContext };
                    ResultObject<object> rObj = PC.ResetUserPermission(user_id);
                    if (!rObj.success) continue;
                }

                //TODO:重作權限檔案  代理人
                //foreach (DataRow row in dt_proxy.Rows)
                //{
                //    //reset user permission file
                //    ResultObject rObj = await App_Code.Permission.ResetUserPermission(jwtObject, row["proxy_user_id"].ToString());
                //    if (!rObj.success) continue;
                //}

                tx.Complete();

                return new ResultObject { success = true, message = "新增成功" };
            }
        }

        /// <summary>
        /// 查詢使用者擁有的職責
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchUserOwnDutyResult>> UserOwnDutySearch(UserOwnDutySearch data)
        {
            return new ResultObject<List<SearchUserOwnDutyResult>> { success = true, data = _userDuty.SearchUserOwnDuty(data.user_id) };
        }
    }
}