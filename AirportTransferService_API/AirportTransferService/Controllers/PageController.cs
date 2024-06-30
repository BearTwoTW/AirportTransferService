using AirportTransferService.Models;
using AirportTransferService.Services;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.Arm;
using System.Security;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// PageController
    /// </summary>
    /// <param name="page"></param>
    /// <param name="user"></param>
    /// <param name="userlevel"></param>
    /// <param name="userduty"></param>
    /// <param name="dealerSetting"></param>
    /// <param name="config"></param>
    /// <param name="baseService"></param>
    [Authorization]
    public class PageController(IPage page, IUser user, IUserLevel userlevel, IUserDuty userduty, IDealerSetting dealerSetting, IConfiguration config, IBaseService baseService) : CustomControllerBase(baseService)
    {
        private readonly IConfiguration _config = config;
        private readonly IPage _page = page;
        private readonly IUser _user = user;
        private readonly IUserLevel _userlevel = userlevel;
        private readonly IUserDuty _userduty = userduty;
        private readonly IDealerSetting _dealerSetting = dealerSetting;

        #region PageGroup
        /// <summary>
        /// 查詢頁面群組
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchPageGroupResult>> PageGroupList()
        {
            return new ResultObject<List<SearchPageGroupResult>>
            {
                success = true,
                data = _page.SearchPageGroup(
                    new SearchPageGroupParam(),
                    ["pg_id", "su", "seq", "system", "menus", "code", "icon", "name", "system_name", "menus_name"],
                    out int page_count)
            };
        }

        /// <summary>
        /// 新建頁面群組
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> AddPageGroup(AddPageGroup data)
        {
            DateTime cre_time = DateTime.Now;

            //頁面群組是否重複
            List<SearchPageGroupResult> SearchPageGroup_result = _page.SearchPageGroup(new SearchPageGroupParam(), ["system", "menus", "code"], out int page_count);
            if (SearchPageGroup_result.Exists(x => (x.system ?? "").Equals(data.system) && (x.menus ?? "").Equals(data.menus) && (x.code ?? "").Equals(data.code)))
                return new ResultObject<object> { success = false, message = "新增失敗，此頁面群組已建檔" };

            //新建頁面群組
            _page.CreatePageGroup(new CreatePageGroupParam(
                cre_userid: jwtObject.user_id,
                cre_time: cre_time,
                su: data.su,
                seq: data.seq,
                system: data.system,
                menus: data.menus,
                code: data.code,
                icon: data.icon,
                name: data.name));

            //更新所有經銷商的admin權限
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out page_count);
            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                //reset admin permission
                UserDealerInfo udi = new()
                {
                    ds_id = obj.ds_id ?? 0,
                    ds_code = obj.ds_code ?? "",
                    ds_name = obj.ds_name ?? "",
                    ds_dbname = obj.ds_dbname ?? ""
                };
                ResetAdminPermission(udi);
            }

            return new ResultObject<object> { success = true, message = "新增成功" };
        }

        /// <summary>
        /// 頁面群組細項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<SearchPageGroupResult> PageGroupEdit(PageGroupEdit data)
        {
            return new ResultObject<SearchPageGroupResult>
            {
                success = true,
                data = _page.SearchPageGroup(
                    new SearchPageGroupParam(pg_id: data.pg_id),
                    ["pg_id", "su", "seq", "system", "menus", "code", "icon", "name", "system_name", "menus_name"],
                    out int page_count).FirstOrDefault()
            };
        }

        /// <summary>
        /// 修改頁面群組
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UpdatePageGroup(UpdatePageGroup data)
        {
            DateTime upd_time = DateTime.Now;

            //頁面群組是否重複
            List<SearchPageGroupResult> SearchPageGroup_result = _page.SearchPageGroup(new SearchPageGroupParam(), ["system", "menus", "code", "pg_id"], out int page_count);

            SearchPageGroupResult? SearchPageGroup_result_origin = SearchPageGroup_result.FirstOrDefault(x => x.pg_id.Equals(data.pg_id));
            if (SearchPageGroup_result_origin == null) return new ResultObject<object> { success = false, message = "查無頁面群組" };

            if (SearchPageGroup_result.Exists(x => (data.system ?? SearchPageGroup_result_origin.system ?? "").Equals(x.system)
                                                && (data.menus ?? SearchPageGroup_result_origin.menus ?? "").Equals(x.menus)
                                                && (data.code ?? SearchPageGroup_result_origin.code ?? "").Equals(x.code)
                                                && !SearchPageGroup_result_origin.pg_id.Equals(x.pg_id)))
                return new ResultObject<object> { success = false, message = "修改失敗，此頁面群組已建檔" };

            //更新所有經銷商的admin權限
            //更新所有經銷商影響到的帳號的權限
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out page_count);
            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                //查影響到的帳號們
                //使用者
                List<SearchUserResult> SearchUser_result = _user.SearchUser(
                    new SearchUserParam(ds_dbname: obj.ds_dbname, own_user_id: "", top_ul_id: 1), ["user_id", "ul_id"], out page_count);

                //使用者職責綁定
                List<SearchUserDutyJoinResult> SearchUserDutyJoin_result = _userduty.SearchUserDutyJoin(
                    new SearchUserDutyJoinParam(), ["user_id", "ud_id"], out page_count);

                //職務職責綁定
                List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin_result = _userlevel.SearchUserLevelDutyJoin(
                    new SearchUserLevelDutyJoinParam(), ["ul_id", "ud_id"], out page_count);

                //職責權限綁定
                List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin_result = _userduty.SearchUserDutyPermissionJoin(
                    new SearchUserDutyPermissionJoinParam(pg_id: data.pg_id), ["ud_id"], out page_count);

                List<string> user_ids = SearchUser_result
                    .Where(x => SearchUserDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && (y.user_id ?? "").Equals(x.user_id))
                             || SearchUserLevelDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && y.ul_id == x.ul_id))
                    .Select(x => x.user_id ?? "").ToList();
                user_ids.RemoveAll(string.IsNullOrEmpty);

                //reset all user permission
                ResetAllUserPermission(user_ids);
                //reset admin permission
                UserDealerInfo udi = new()
                {
                    ds_id = obj.ds_id ?? 0,
                    ds_code = obj.ds_code ?? "",
                    ds_name = obj.ds_name ?? "",
                    ds_dbname = obj.ds_dbname ?? ""
                };
                ResetAdminPermission(udi);
            }

            //修改頁面群組
            _page.UpdatePageGroup(new UpdatePageGroupParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                pg_id: data.pg_id,
                su: data.su,
                seq: data.seq,
                system: data.system,
                menus: data.menus,
                code: data.code,
                icon: data.icon,
                name: data.name));

            return new ResultObject<object> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 刪除頁面群組
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> DeletePageGroup(PageGroupEdit data)
        {
            //查要刪的群組下的頁面們
            List<SearchPagesResult> SearchPages_result = _page.SearchPages(new SearchPagesParam(pg_id: data.pg_id), ["page_id"], out int page_count);
            foreach (SearchPagesResult page in SearchPages_result)
            {
                //查要刪的頁面下的控制項們
                List<SearchPageControlResult> SearchPageControl_result = _page.SearchPageControl(
                    new SearchPageControlParam(page_id: page.page_id), ["pc_id"], out page_count);
                foreach (SearchPageControlResult pageControl in SearchPageControl_result)
                {
                    //刪除頁面控制項PageControl
                    _page.DeletePageControl(pageControl.pc_id ?? 0);
                }
                //刪除頁面Pages
                _page.DeletePageGroup(page.page_id ?? 0);
            }
            //刪除頁面群組PageGroup
            _page.DeletePageGroup(data.pg_id);

            //更新所有經銷商的admin權限
            //更新所有經銷商影響到的帳號的權限
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out page_count);
            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                //查影響到的帳號們
                //使用者
                List<SearchUserResult> SearchUser_result = _user.SearchUser(
                    new SearchUserParam(ds_dbname: obj.ds_dbname, own_user_id: "", top_ul_id: 1), ["user_id", "ul_id"], out page_count);

                //使用者職責綁定
                List<SearchUserDutyJoinResult> SearchUserDutyJoin_result = _userduty.SearchUserDutyJoin(
                    new SearchUserDutyJoinParam(), ["user_id", "ud_id"], out page_count);

                //職務職責綁定
                List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin_result = _userlevel.SearchUserLevelDutyJoin(
                    new SearchUserLevelDutyJoinParam(), ["ul_id", "ud_id"], out page_count);

                //職責權限綁定
                List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin_result = _userduty.SearchUserDutyPermissionJoin(
                    new SearchUserDutyPermissionJoinParam(pg_id: data.pg_id), ["ud_id"], out page_count);

                List<string> user_ids = SearchUser_result
                    .Where(x => SearchUserDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && (y.user_id ?? "").Equals(x.user_id))
                                || SearchUserLevelDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && y.ul_id == x.ul_id))
                    .Select(x => x.user_id ?? "").ToList();
                user_ids.RemoveAll(string.IsNullOrEmpty);

                //刪除權限Permission
                _userduty.DeleteUserDutyPermissionJoin(data.pg_id, null, null, null);

                //reset all user permission
                ResetAllUserPermission(user_ids);
                //reset admin permission
                UserDealerInfo udi = new()
                {
                    ds_id = obj.ds_id ?? 0,
                    ds_code = obj.ds_code ?? "",
                    ds_name = obj.ds_name ?? "",
                    ds_dbname = obj.ds_dbname ?? ""
                };
                ResetAdminPermission(udi);
            }

            return new ResultObject<object> { success = true, message = "刪除成功" };
        }
        #endregion

        #region Page
        /// <summary>
        /// 查詢頁面
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchPagesResult>> PagesList(PageGroupEdit data)
        {
            return new ResultObject<List<SearchPagesResult>>
            {
                success = true,
                data = _page.SearchPages(new SearchPagesParam(pg_id: data.pg_id), ["page_id", "pg_id", "su", "seq", "code", "icon", "name"], out int page_count)
            };
        }

        /// <summary>
        /// 新增頁面
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> AddPages(AddPages data)
        {
            DateTime cre_time = DateTime.Now;

            //頁面是否重複
            List<SearchPagesResult> SearchPages_result = _page.SearchPages(
                new SearchPagesParam(pg_id: data.pg_id), ["code"], out int page_count);
            if (SearchPages_result.Exists(x => (x.code ?? "").Equals(data.code)))
                return new ResultObject<object> { success = false, message = "新增失敗，此頁面已建檔" };

            //新建頁面
            _page.CreatePages(new CreatePagesParam(
                cre_userid: jwtObject.user_id,
                cre_time: cre_time,
                pg_id: data.pg_id,
                su: data.su,
                seq: data.seq,
                code: data.code,
                icon: data.icon,
                name: data.name));

            //更新所有經銷商的admin權限
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out page_count);
            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                //reset admin permission
                UserDealerInfo udi = new()
                {
                    ds_id = obj.ds_id ?? 0,
                    ds_code = obj.ds_code ?? "",
                    ds_name = obj.ds_name ?? "",
                    ds_dbname = obj.ds_dbname ?? ""
                };
                ResetAdminPermission(udi);
            }

            return new ResultObject<object> { success = true, message = "新增成功" };
        }

        /// <summary>
        /// 頁面細項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<SearchPagesResult> PagesEdit(PagesEdit data)
        {
            return new ResultObject<SearchPagesResult>
            {
                success = true,
                data = _page.SearchPages(new SearchPagesParam(page_id: data.page_id), ["page_id", "pg_id", "su", "seq", "code", "icon", "name"], out int page_count).FirstOrDefault()
            };
        }

        /// <summary>
        /// 修改頁面
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UpdatePages(UpdatePages data)
        {
            DateTime upd_time = DateTime.Now;

            //頁面是否重複
            List<SearchPagesResult> SearchPages_result = _page.SearchPages(
                new SearchPagesParam(pg_id: data.pg_id), ["code", "page_id", "pg_id"], out int page_count);

            SearchPagesResult SearchPages_result_origin = SearchPages_result.Where(x => x.pg_id.Equals(data.pg_id) && x.page_id.Equals(data.page_id)).First();

            if (SearchPages_result.Exists(x => (data.code ?? SearchPages_result_origin.code ?? "").Equals(x.code)
                                                && !SearchPages_result_origin.page_id.Equals(x.page_id)))
                return new ResultObject<object> { success = false, message = "修改失敗，此頁面已建檔" };

            //更新所有經銷商的admin權限
            //更新所有經銷商影響到的帳號的權限
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out page_count);
            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                //查影響到的帳號們
                //使用者
                List<SearchUserResult> SearchUser_result = _user.SearchUser(
                    new SearchUserParam(ds_dbname: obj.ds_dbname, own_user_id: "", top_ul_id: 1), ["user_id", "ul_id"], out page_count);

                //使用者職責綁定
                List<SearchUserDutyJoinResult> SearchUserDutyJoin_result = _userduty.SearchUserDutyJoin(
                    new SearchUserDutyJoinParam(), ["user_id", "ud_id"], out page_count);

                //職務職責綁定
                List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin_result = _userlevel.SearchUserLevelDutyJoin(
                    new SearchUserLevelDutyJoinParam(), ["ul_id", "ud_id"], out page_count);

                //職責權限綁定
                List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin_result = _userduty.SearchUserDutyPermissionJoin(
                    new SearchUserDutyPermissionJoinParam(page_id: data.page_id), ["ud_id"], out page_count);

                List<string> user_ids = SearchUser_result
                    .Where(x => SearchUserDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && (y.user_id ?? "").Equals(x.user_id))
                                || SearchUserLevelDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && y.ul_id == x.ul_id))
                    .Select(x => x.user_id ?? "").ToList();
                user_ids.RemoveAll(string.IsNullOrEmpty);

                //reset all user permission
                ResetAllUserPermission(user_ids);
                //reset admin permission
                UserDealerInfo udi = new()
                {
                    ds_id = obj.ds_id ?? 0,
                    ds_code = obj.ds_code ?? "",
                    ds_name = obj.ds_name ?? "",
                    ds_dbname = obj.ds_dbname ?? ""
                };
                ResetAdminPermission(udi);
            }

            //修改頁面
            _page.UpdatePages(new UpdatePagesParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                page_id: data.page_id,
                pg_id: data.pg_id,
                su: data.su,
                seq: data.seq,
                code: data.code,
                icon: data.icon,
                name: data.name));

            return new ResultObject<object> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 刪除頁面
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> DeletePages(PagesEdit data)
        {
            //查要刪的頁面下的控制項們
            List<SearchPageControlResult> SearchPageControl_result = _page.SearchPageControl(
                new SearchPageControlParam(page_id: data.page_id), ["pc_id"], out int page_count);
            foreach (SearchPageControlResult pageControl in SearchPageControl_result)
            {
                //刪除頁面控制項PageControl
                _page.DeletePageControl(pageControl.pc_id ?? 0);
            }
            //刪除頁面Pages
            _page.DeletePages(data.page_id);

            //更新所有經銷商的admin權限
            //更新所有經銷商影響到的帳號的權限
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out page_count);
            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                //查影響到的帳號們
                //使用者
                List<SearchUserResult> SearchUser_result = _user.SearchUser(
                    new SearchUserParam(ds_dbname: obj.ds_dbname, own_user_id: "", top_ul_id: 1), ["user_id", "ul_id"], out page_count);

                //使用者職責綁定
                List<SearchUserDutyJoinResult> SearchUserDutyJoin_result = _userduty.SearchUserDutyJoin(
                    new SearchUserDutyJoinParam(), ["user_id", "ud_id"], out page_count);

                //職務職責綁定
                List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin_result = _userlevel.SearchUserLevelDutyJoin(
                    new SearchUserLevelDutyJoinParam(), ["ul_id", "ud_id"], out page_count);

                //職責權限綁定
                List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin_result = _userduty.SearchUserDutyPermissionJoin(
                    new SearchUserDutyPermissionJoinParam(page_id: data.page_id), ["ud_id"], out page_count);

                List<string> user_ids = SearchUser_result
                    .Where(x => SearchUserDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && (y.user_id ?? "").Equals(x.user_id))
                                || SearchUserLevelDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && y.ul_id == x.ul_id))
                    .Select(x => x.user_id ?? "").ToList();
                user_ids.RemoveAll(string.IsNullOrEmpty);

                //刪除權限Permission
                _userduty.DeleteUserDutyPermissionJoin(null, data.page_id, null, null);

                //reset all user permission
                ResetAllUserPermission(user_ids);
                //reset admin permission
                UserDealerInfo udi = new()
                {
                    ds_id = obj.ds_id ?? 0,
                    ds_code = obj.ds_code ?? "",
                    ds_name = obj.ds_name ?? "",
                    ds_dbname = obj.ds_dbname ?? ""
                };
                ResetAdminPermission(udi);
            }

            return new ResultObject<object> { success = true, message = "刪除成功" };
        }
        #endregion

        #region PageControl
        /// <summary>
        /// 查詢頁面控制項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchPageControlResult>> PageControlList(PagesEdit data)
        {
            return new ResultObject<List<SearchPageControlResult>>
            {
                success = true,
                data = _page.SearchPageControl(
                    new SearchPageControlParam(page_id: data.page_id), ["pc_id", "page_id", "su", "code", "ctrl_code", "name"], out int page_count)
            };
        }

        /// <summary>
        /// 新增頁面控制項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> AddPageControl(AddPageControl data)
        {
            DateTime cre_time = DateTime.Now;

            //頁面控制項是否重複
            List<SearchPageControlResult> SearchPageControl_result = _page.SearchPageControl(
                new SearchPageControlParam(page_id: data.page_id), ["code", "ctrl_code"], out int page_count);
            if (SearchPageControl_result.Exists(x => (x.code ?? "").Equals(data.code) && (x.ctrl_code ?? "").Equals(data.ctrl_code)))
                return new ResultObject<object> { success = false, message = "新增失敗，此頁面控制項已建檔" };

            //新建頁面控制項
            _page.CreatePageControl(new CreatePageControlParam(
                cre_userid: jwtObject.user_id,
                cre_time: cre_time,
                page_id: data.page_id,
                su: data.su,
                code: data.code,
                ctrl_code: data.ctrl_code,
                name: data.name));

            //更新所有經銷商的admin權限
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out page_count);

            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                //reset admin permission
                UserDealerInfo udi = new()
                {
                    ds_id = obj.ds_id ?? 0,
                    ds_code = obj.ds_code ?? "",
                    ds_name = obj.ds_name ?? "",
                    ds_dbname = obj.ds_dbname ?? ""
                };
                ResetAdminPermission(udi);
            }

            return new ResultObject<object> { success = true, message = "新增成功" };
        }

        /// <summary>
        /// 頁面控制項細項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<SearchPageControlResult> PageControlEdit(PageControlEdit data)
        {
            return new ResultObject<SearchPageControlResult>
            {
                success = true,
                data = _page.SearchPageControl(
                    new SearchPageControlParam(pc_id: data.pc_id), ["pc_id", "page_id", "su", "code", "ctrl_code", "name"], out int page_count).FirstOrDefault()
            };
        }

        /// <summary>
        /// 修改頁面控制項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UpdatePageControl(UpdatePageControl data)
        {
            DateTime upd_time = DateTime.Now;

            //頁面控制項是否重複
            List<SearchPageControlResult> SearchPageControl_result = _page.SearchPageControl(
                new SearchPageControlParam(page_id: data.page_id), ["code", "ctrl_code", "pc_id", "page_id"], out int page_count);

            SearchPageControlResult SearchPageControl_result_origin = SearchPageControl_result.Where(x => x.pc_id.Equals(data.pc_id) && x.page_id.Equals(data.page_id)).First();

            if (SearchPageControl_result.Exists(x => (data.code ?? SearchPageControl_result_origin.code ?? "").Equals(x.code)
                                                      && (data.ctrl_code ?? SearchPageControl_result_origin.ctrl_code ?? "").Equals(x.ctrl_code)
                                                      && !SearchPageControl_result_origin.pc_id.Equals(x.pc_id)))
                return new ResultObject<object> { success = false, message = "新增失敗，此頁面控制項已建檔" };

            //更新所有經銷商的admin權限
            //更新所有經銷商影響到的帳號的權限
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out page_count);
            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                //查影響到的帳號們
                //使用者
                List<SearchUserResult> SearchUser_result = _user.SearchUser(
                    new SearchUserParam(ds_dbname: obj.ds_dbname, own_user_id: "", top_ul_id: 1), ["user_id", "ul_id"], out page_count);

                //使用者職責綁定
                List<SearchUserDutyJoinResult> SearchUserDutyJoin_result = _userduty.SearchUserDutyJoin(
                    new SearchUserDutyJoinParam(), ["user_id", "ud_id"], out page_count);

                //職務職責綁定
                List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin_result = _userlevel.SearchUserLevelDutyJoin(
                    new SearchUserLevelDutyJoinParam(), ["ul_id", "ud_id"], out page_count);

                //職責權限綁定
                List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin_result = _userduty.SearchUserDutyPermissionJoin(
                    new SearchUserDutyPermissionJoinParam(pc_id: data.pc_id), ["ud_id"], out page_count);

                List<string> user_ids = SearchUser_result
                    .Where(x => SearchUserDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && (y.user_id ?? "").Equals(x.user_id))
                                || SearchUserLevelDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && y.ul_id == x.ul_id))
                    .Select(x => x.user_id ?? "").ToList();
                user_ids.RemoveAll(string.IsNullOrEmpty);

                //reset all user permission
                ResetAllUserPermission(user_ids);
                //reset admin permission
                UserDealerInfo udi = new()
                {
                    ds_id = obj.ds_id ?? 0,
                    ds_code = obj.ds_code ?? "",
                    ds_name = obj.ds_name ?? "",
                    ds_dbname = obj.ds_dbname ?? ""
                };
                ResetAdminPermission(udi);
            }

            //修改頁面控制項
            _page.UpdatePageControl(new UpdatePageControlParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                pc_id: data.pc_id,
                page_id: data.page_id,
                su: data.su,
                code: data.code,
                ctrl_code: data.ctrl_code,
                name: data.name));

            return new ResultObject<object> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 刪除頁面控制項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> DeletePageControl(PageControlEdit data)
        {
            //刪除頁面控制項PageControl
            _page.DeletePageControl(data.pc_id);

            //更新所有經銷商的admin權限
            //更新所有經銷商影響到的帳號的權限
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out int page_count);
            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                //查影響到的帳號們
                //使用者
                List<SearchUserResult> SearchUser_result = _user.SearchUser(
                    new SearchUserParam(ds_dbname: obj.ds_dbname, own_user_id: "", top_ul_id: 1), ["user_id", "ul_id"], out page_count);

                //使用者職責綁定
                List<SearchUserDutyJoinResult> SearchUserDutyJoin_result = _userduty.SearchUserDutyJoin(
                    new SearchUserDutyJoinParam(), ["user_id", "ud_id"], out page_count);

                //職務職責綁定
                List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin_result = _userlevel.SearchUserLevelDutyJoin(
                    new SearchUserLevelDutyJoinParam(), ["ul_id", "ud_id"], out page_count);

                //職責權限綁定
                List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin_result = _userduty.SearchUserDutyPermissionJoin(
                    new SearchUserDutyPermissionJoinParam(pc_id: data.pc_id), ["ud_id"], out page_count);

                List<string> user_ids = SearchUser_result
                    .Where(x => SearchUserDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && (y.user_id ?? "").Equals(x.user_id))
                                || SearchUserLevelDutyJoin_result.Exists(y => SearchUserDutyPermissionJoin_result.Exists(z => z.ud_id == y.ud_id) && y.ul_id == x.ul_id))
                    .Select(x => x.user_id ?? "").ToList();
                user_ids.RemoveAll(string.IsNullOrEmpty);

                //刪除權限Permission
                _userduty.DeleteUserDutyPermissionJoin(null, null, data.pc_id, null);

                //reset all user permission
                ResetAllUserPermission(user_ids);
                //reset admin permission
                UserDealerInfo udi = new()
                {
                    ds_id = obj.ds_id ?? 0,
                    ds_code = obj.ds_code ?? "",
                    ds_name = obj.ds_name ?? "",
                    ds_dbname = obj.ds_dbname ?? ""
                };
                ResetAdminPermission(udi);
            }

            return new ResultObject<object> { success = true, message = "刪除成功" };
        }
        #endregion

        /// <summary>
        /// 重設使用者權限
        /// </summary>
        /// <param name="user_id"></param>
        /// <returns></returns>
        [NonAction]
        public ResultObject<object> ResetUserPermission(string user_id)
        {
            //來源是admin直接換call的function
            if (user_id.Equals($"{userDealerInfo.ds_code}0001"))
            {
                ResetAdminPermission(userDealerInfo);
                return new ResultObject<object> { success = true };
            }
            string user_cre_time = "";
            string ec_user_id = "";

            //查使用者
            List<SearchUserResult> result = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1, user_id: user_id), ["cre_time"], out int page_count);
            if (result.Count == 0) return new ResultObject<object> { success = false, message = "查無使用者" };
            user_cre_time = result[0].cre_time?.ToString("yyyyMMddHHmmss") ?? "";

            //查使用者擁有的職責&排除額外移除的
            List<SearchUserOwnDutyResult> SearchUserOwnDuty_result = _userduty.SearchUserOwnDuty(user_id);

            //source_user_id,ud_id,isneed
            List<(string, int, string)> user_uds = [];
            List<(string, int)> user_uds_hasN = [];
            foreach (SearchUserOwnDutyResult item in SearchUserOwnDuty_result)
            {
                user_uds.Add((item.source_user_id, item.ud_id, item.isneed));
                if (item.isneed.Equals("N"))
                {
                    user_uds_hasN.Add((item.source_user_id, item.ud_id));
                }
            }
            user_uds.RemoveAll(x => user_uds_hasN.Contains((x.Item1, x.Item2)));

            //查職責權限綁定
            List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin_result = _userduty.SearchUserDutyPermissionJoin(
                new SearchUserDutyPermissionJoinParam(), ["pg_id", "page_id", "pc_id", "ud_id"], out page_count);

            //查詢權限群組
            List<SearchPageGroupResult> SearchPageGroup_result = _page.SearchPageGroup(
                new SearchPageGroupParam(), ["pg_id", "su", "seq", "system", "menus", "code", "icon", "name", "system_name", "menus_name"], out page_count);
            //system
            List<SearchPageGroupResult> SearchPageGroup_result_system = [.. SearchPageGroup_result
                .Where(x => SearchUserDutyPermissionJoin_result.Where(y => user_uds.Exists(z => z.Item2 == y.ud_id)).ToList().Exists(y => y.pg_id == x.pg_id))
                .Select(x => new SearchPageGroupResult { system = x.system, system_name = x.system_name })
                .Distinct().OrderBy(x => x.system)];
            //menus
            List<SearchPageGroupResult> SearchPageGroup_result_menus = [.. SearchPageGroup_result
                .Where(x => SearchUserDutyPermissionJoin_result.Where(y => user_uds.Exists(z => z.Item2 == y.ud_id)).ToList().Exists(y => y.pg_id == x.pg_id))
                .Select(x => new SearchPageGroupResult { system = x.system, menus = x.menus, menus_name = x.menus_name })
                .Distinct().OrderBy(x => x.system).ThenBy(x => x.menus)];
            //PageGroup
            List<SearchPageGroupResult> SearchPageGroup_result_pagegroup = [.. SearchPageGroup_result
                .Where(x => SearchUserDutyPermissionJoin_result.Where(y => user_uds.Exists(z => z.Item2 == y.ud_id)).ToList().Exists(y => y.pg_id == x.pg_id))
                .Select(x => new SearchPageGroupResult { pg_id = x.pg_id, su = x.su, seq = x.seq, system = x.system, menus = x.menus, code = x.code, icon = x.icon, name = x.name })
                .Distinct().OrderBy(x => x.system).ThenBy(x => x.menus)
                .ThenBy(x => x.seq).ThenBy(x => x.code).ThenBy(x => x.name)];
            //查詢權限頁面
            List<SearchPagesResult> SearchPages_result = _page.SearchPages(
                new SearchPagesParam(), ["page_id", "pg_id", "su", "seq", "code", "icon", "name"], out page_count);
            //Pages
            List<SearchPagesResult> SearchPages_result_pages = [.. SearchPages_result
                .Where(x => SearchUserDutyPermissionJoin_result.Where(y => user_uds.Exists(z => z.Item2 == y.ud_id)).ToList().Exists(y => y.page_id == x.page_id))
                .Select(x => new SearchPagesResult { page_id = x.page_id, pg_id = x.pg_id, su = x.su, seq = x.seq, code = x.code, icon = x.icon, name = x.name })
                .Distinct().OrderBy(x => x.pg_id)
                .ThenBy(x => x.seq).ThenBy(x => x.code).ThenBy(x => x.name)];
            //查詢權限頁面控制項
            List<SearchPageControlResult> SearchPageControl_result = _page.SearchPageControl(
                new SearchPageControlParam(), ["pc_id", "page_id", "su", "code", "ctrl_code", "name"], out page_count);
            //PageControl
            List<SearchPageControlResult> SearchPages_result_pagecontrol = SearchPageControl_result
                .Where(x => SearchUserDutyPermissionJoin_result.Where(y => user_uds.Exists(z => z.Item2 == y.ud_id)).ToList().Exists(y => y.pc_id == x.pc_id))
                .Select(x => new SearchPageControlResult { pc_id = x.pc_id, page_id = x.page_id, su = x.su, code = x.code, ctrl_code = x.ctrl_code, name = x.name })
            .Distinct().ToList();

            List<object> listSystem = PermissionJsonFileFormat(SearchPageGroup_result_system, SearchPageGroup_result_menus, SearchPageGroup_result_pagegroup, SearchPages_result_pages, SearchPages_result_pagecontrol);

            ec_user_id = "";
            try { ec_user_id = Tool.Sy_Encoder(user_id, user_cre_time); }
            catch (Exception e) { return new ResultObject<object> { success = false, message = "EncodeError", data = e }; }

            try { Tool.ResetJsonFile($@"\_{userDealerInfo.ds_code}\Users\{ec_user_id}\", "permission", listSystem); }
            catch (Exception e) { return new ResultObject<object> { success = false, message = "PermissionCreateFileError", data = e }; }

            return new ResultObject<object> { success = true };
        }

        /// <summary>
        /// 重設管理員權限
        /// </summary>
        [NonAction]
        public ResultObject<object> ResetAdminPermission(UserDealerInfo udi)
        {
            DateTime cre_time = DateTime.Now;
            string user_id = "";
            string user_cre_time = "";

            //查詢&建立admin帳號
            List<SearchUserResult> result = _user.SearchUser(
                new SearchUserParam(own_user_id: "", top_ul_id: 1, user_id: udi.ds_code + "0001"), ["user_id", "cre_time"], out int page_count);
            if (result.Count == 0)
            {
                user_id = _user.CreateUser(new CreateUserParam(
                    cre_userid: "",
                    cre_time: cre_time,
                    company_code: udi.ds_code,
                    username: $"{udi.ds_code}ADMIN",
                    password: Tool.MD5($"{udi.ds_code}ADMIN"),
                    name: Tool.Sy_Encoder("admin", cre_time.ToString("yyyyMMddHHmmss")),
                    on_board_date: new DateOnly(2016, 1, 18),
                    home_page: "001",
                    ul_id: 1,
                    name_en: Tool.GetStringFromHash(Tool.SHA256("admin"), true),
                    disable: "N",
                    isresign: "N",
                    ds_id: udi.ds_id));
                user_cre_time = cre_time.ToString("yyyyMMddHHmmss");
            }
            else
            {
                user_id = result[0].user_id ?? "";
                user_cre_time = result[0].cre_time?.ToString("yyyyMMddHHmmss") ?? "";
            }
            //查詢權限群組
            List<SearchPageGroupResult> SearchPageGroup_result = _page.SearchPageGroup(
                new SearchPageGroupParam(), ["pg_id", "su", "seq", "system", "menus", "code", "icon", "name", "system_name", "menus_name"], out page_count);
            //system
            List<SearchPageGroupResult> SearchPageGroup_result_system = [.. SearchPageGroup_result
                .Select(x => new SearchPageGroupResult{system = x.system,system_name = x.system_name})
                .Distinct().OrderBy(x => x.system)];
            //menus
            List<SearchPageGroupResult> SearchPageGroup_result_menus = [.. SearchPageGroup_result
                .Select(x => new SearchPageGroupResult { system = x.system, menus = x.menus, menus_name = x.menus_name })
                .Distinct().OrderBy(x => x.system).ThenBy(x => x.menus)];
            //PageGroup
            List<SearchPageGroupResult> SearchPageGroup_result_pagegroup = [.. SearchPageGroup_result
                .Select(x => new SearchPageGroupResult { pg_id = x.pg_id, su = x.su, seq = x.seq, system = x.system, menus = x.menus, code = x.code, icon = x.icon, name = x.name })
                .Distinct().OrderBy(x => x.system).ThenBy(x => x.menus)
                .ThenBy(x => x.seq).ThenBy(x => x.code).ThenBy(x => x.name)];
            //查詢權限頁面
            List<SearchPagesResult> SearchPages_result = _page.SearchPages(
                new SearchPagesParam(), ["page_id", "pg_id", "su", "seq", "code", "icon", "name"], out page_count);
            //Pages
            List<SearchPagesResult> SearchPages_result_pages = [.. SearchPages_result
                .Select(x => new SearchPagesResult { page_id = x.page_id, pg_id = x.pg_id, su = x.su, seq = x.seq, code = x.code, icon = x.icon, name = x.name })
                .Distinct().OrderBy(x => x.pg_id)
                .ThenBy(x => x.seq).ThenBy(x => x.code).ThenBy(x => x.name)]; ;
            //查詢權限頁面控制項
            List<SearchPageControlResult> SearchPageControl_result = _page.SearchPageControl(
                new SearchPageControlParam(), ["pc_id", "page_id", "su", "code", "ctrl_code", "name"], out page_count);
            //PageControl
            List<SearchPageControlResult> SearchPages_result_pagecontrol = SearchPageControl_result
                .Select(x => new SearchPageControlResult { pc_id = x.pc_id, page_id = x.page_id, su = x.su, code = x.code, ctrl_code = x.ctrl_code, name = x.name })
            .Distinct().ToList();

            List<object> listSystem = PermissionJsonFileFormat(SearchPageGroup_result_system, SearchPageGroup_result_menus, SearchPageGroup_result_pagegroup, SearchPages_result_pages, SearchPages_result_pagecontrol);

            string ec_user_id = "";
            try { ec_user_id = Tool.Sy_Encoder(user_id, user_cre_time); }
            catch (Exception e) { return new ResultObject<object> { success = false, message = "EncodeError", data = e }; }

            try { Tool.ResetJsonFile(@$"\_{udi.ds_code}\Users\{ec_user_id}\", "permission", listSystem); }
            catch (Exception e) { return new ResultObject<object> { success = false, message = "PermissionCreateFileError", data = e }; }

            return new ResultObject<object> { success = true, message = "建置成功" };
        }

        /// <summary>
        /// 重設全部使用者權限
        /// </summary>
        /// <returns></returns>
        [NonAction]
        public ResultObject<object> ResetAllUserPermission(List<string> user_ids)
        {
            ResultObject<object> rObj = new() { success = true };

            foreach (string user_id in user_ids)
            {
                if (rObj.success)
                    rObj = ResetUserPermission(user_id);
                else break;
            }

            return rObj;
        }

        /// <summary>
        /// 把查出來的權限們生成JSON物件
        /// </summary>
        /// <param name="dtSystem"></param>
        /// <param name="dtMenus"></param>
        /// <param name="dtPageGroup"></param>
        /// <param name="dtPages"></param>
        /// <param name="dtPageControl"></param>
        /// <returns>物件陣列</returns>
        public static List<object> PermissionJsonFileFormat(List<SearchPageGroupResult> dtSystem, List<SearchPageGroupResult> dtMenus, List<SearchPageGroupResult> dtPageGroup, List<SearchPagesResult> dtPages, List<SearchPageControlResult> dtPageControl)
        {
            List<object> listSystem = [];
            Dictionary<string, object?> system = [];
            List<object> listMenus = [];
            Dictionary<string, object?> menus = [];
            List<object> listPageGroup = [];
            Dictionary<string, object?> pageGroup = [];
            List<object> listPages = [];
            Dictionary<string, object?> pages = [];
            List<object> listPageControl = [];
            Dictionary<string, object?> pageControl = [];
            foreach (SearchPageGroupResult rowSystem in dtSystem)
            {
                system.Add("name", rowSystem.system_name);
                foreach (SearchPageGroupResult rowMenus in dtMenus)
                {
                    if (rowMenus.system != null && rowMenus.system.Equals(rowSystem.system))
                    {
                        menus.Add("name", rowMenus.menus_name);
                        foreach (SearchPageGroupResult rowPageGroup in dtPageGroup)
                        {
                            if (rowPageGroup.system != null && rowPageGroup.system.Equals(rowMenus.system) && rowPageGroup.menus != null && rowPageGroup.menus.Equals(rowMenus.menus))
                            {
                                pageGroup.Add("pg_id", rowPageGroup.pg_id);
                                pageGroup.Add("name", rowPageGroup.name);
                                pageGroup.Add("code", rowPageGroup.code);
                                pageGroup.Add("su", rowPageGroup.su);
                                pageGroup.Add("icon", rowPageGroup.icon);
                                foreach (SearchPagesResult rowPages in dtPages)
                                {
                                    if (rowPages.pg_id == rowPageGroup.pg_id)
                                    {
                                        pages.Add("pg_id", rowPages.pg_id);
                                        pages.Add("page_id", rowPages.page_id);
                                        pages.Add("name", rowPages.name);
                                        pages.Add("code", rowPages.code);
                                        pages.Add("su", rowPages.su);
                                        pages.Add("icon", rowPages.icon);
                                        pages.Add("path", $"/{rowPageGroup.code}/{rowPages.code}");
                                        foreach (SearchPageControlResult rowPageControl in dtPageControl)
                                        {
                                            if (rowPageControl.page_id == rowPages.page_id)
                                            {
                                                pageControl.Add("pg_id", rowPages.pg_id);
                                                pageControl.Add("page_id", rowPageControl.page_id);
                                                pageControl.Add("pc_id", rowPageControl.pc_id);
                                                pageControl.Add("su", rowPageControl.su);
                                                pageControl.Add("name", rowPageControl.name);
                                                pageControl.Add("code", rowPageControl.code);
                                                pageControl.Add("ctrl_code", rowPageControl.ctrl_code);
                                                pageControl.Add("path", string.IsNullOrEmpty(rowPageControl.code) ? "" : $"/{rowPageGroup.code}/{rowPageControl.code}");
                                                listPageControl.Add(new Dictionary<string, object?>(pageControl));
                                                pageControl.Clear();
                                            }
                                        }
                                        pages.Add("children", new List<object>(listPageControl));
                                        listPageControl.Clear();
                                        listPages.Add(new Dictionary<string, object?>(pages));
                                        pages.Clear();
                                    }
                                }
                                pageGroup.Add("children", new List<object>(listPages));
                                listPages.Clear();
                                listPageGroup.Add(new Dictionary<string, object?>(pageGroup));
                                pageGroup.Clear();
                            }
                        }
                        menus.Add("children", new List<object>(listPageGroup));
                        listPageGroup.Clear();
                        listMenus.Add(new Dictionary<string, object?>(menus));
                        menus.Clear();
                    }
                }
                system.Add("children", new List<object>(listMenus));
                listMenus.Clear();
                listSystem.Add(new Dictionary<string, object?>(system));
                system.Clear();
            }
            return listSystem;
        }
    }
}