using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    [Authorization]
    public class PermissionFunctionController(IPermissionFunction permissionFunction, ISystemSettings systemSettings, IUserDuty userDuty, IBaseService baseService) : CustomControllerBase(baseService)
    {
        private readonly IPermissionFunction _permissionFunction = permissionFunction;
        private readonly ISystemSettings _systemSettings = systemSettings;
        private readonly IUserDuty _userDuty = userDuty;

        /// <summary>
        /// 權限功能查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchPermissionFunctionResult>> PermissionFunctionSearch(PermissionFunctionSearch data)
        {
            List<SearchPermissionFunctionResult> SearchPermissionFunction_result = _permissionFunction.SearchPermissionFunction(
                new SearchPermissionFunctionParam(data.pfl_id, data.name, data.page, data.num_per_page),
                ["pfl_id", "type", "name", "api_name", "join_limit"],
                out int page_count);

            return new ResultObject<List<SearchPermissionFunctionResult>> { success = true, data = SearchPermissionFunction_result, page = page_count };
        }

        /// <summary>
        /// 新增權限功能
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject PermissionFunctionCreate(PermissionFunctionCreate data)
        {
            DateTime cre_time = DateTime.Now;

            List<SearchPermissionFunctionResult> SearchPermissionFunction_result = _permissionFunction.SearchPermissionFunction(
                new SearchPermissionFunctionParam(),
                ["name", "api_name"],
                out int page_count);

            //名稱或api名稱是否重複
            if (SearchPermissionFunction_result.Exists(x => (x.name ?? "").Equals(data.name) || (x.api_name ?? "").Equals(data.api_name)))
                return new ResultObject { success = false, message = "新增失敗，名稱重複" };

            //新增權限功能
            _permissionFunction.CreatePermissionFunction(
                new CreatePermissionFunctionParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    name: data.name,
                    api_name: data.api_name,
                    join_limit: data.join_limit));

            return new ResultObject { success = true, message = "新增成功" };
        }

        /// <summary>
        /// 修改權限功能
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject PermissionFunctionUpdate(PermissionFunctionUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            List<SearchPermissionFunctionResult> SearchPermissionFunction_result = _permissionFunction.SearchPermissionFunction(
                new SearchPermissionFunctionParam(),
                ["pfl_id", "name", "api_name"],
                out int page_count);
            SearchPermissionFunctionResult SearchPermissionFunction_result_origin = SearchPermissionFunction_result.Where(x => x.pfl_id == data.pfl_id).First();

            //名稱或api名稱是否重複
            if (SearchPermissionFunction_result.Exists(x => data.pfl_id != x.pfl_id
            && ((data.name ?? SearchPermissionFunction_result_origin.name ?? "").Equals(x.name)
            || (data.api_name ?? SearchPermissionFunction_result_origin.api_name ?? "").Equals(x.api_name))))
                return new ResultObject { success = false, message = "修改失敗，名稱重複" };

            //修改權限功能
            _permissionFunction.UpdatePermissionFunction(new UpdatePermissionFunctionParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                pfl_id: data.pfl_id,
                name: data.name,
                api_name: data.api_name,
                join_limit: data.join_limit));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 權限功能細項  連職責一起
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<PermissionFunctionDetailResponse> PermissionFunctionDetail(PermissionFunctionDetail data)
        {
            List<SearchPermissionFunctionResult> DetailPermissionFunction_result = _permissionFunction.SearchPermissionFunction(
                new SearchPermissionFunctionParam(pfl_id: data.pfl_id),
                ["pfl_id", "type", "name", "api_name", "join_limit"],
                out int _);

            List<SearchPermissionFunctionUserDutyJoinResult> SearchPermissionFunctionUserDutyJoin_result = _permissionFunction.SearchPermissionFunctionUserDutyJoin(
                new SearchPermissionFunctionUserDutyJoinParam(pfl_id: data.pfl_id));

            return new ResultObject<PermissionFunctionDetailResponse>
            {
                success = true,
                data = new PermissionFunctionDetailResponse
                {
                    info = DetailPermissionFunction_result.FirstOrDefault(),
                    duty = SearchPermissionFunctionUserDutyJoin_result
                }
            };
        }

        /// <summary>
        /// 更新權限功能對應職責
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject PermissionFunctionUpdateUserDuty(PermissionFunctionUpdateUserDuty data)
        {
            DateTime cre_time = DateTime.Now;

            //查詢綁定數量限制
            SearchPermissionFunctionResult? DetailPermissionFunction_result = _permissionFunction.SearchPermissionFunction(
                new SearchPermissionFunctionParam(pfl_id: data.pfl_id),
                ["join_limit"],
                out int _).FirstOrDefault();
            if (DetailPermissionFunction_result == null) return new ResultObject { success = false, message = "查無權限功能" };
            if (DetailPermissionFunction_result.join_limit != 0 && DetailPermissionFunction_result.join_limit < data.ud_ids.Count) return new ResultObject { success = false, message = "超過可綁定數量" };

            _permissionFunction.DeletePermissionFunctionUserDutyJoin(data.pfl_id, null);

            foreach (int ud_id in data.ud_ids)
            {
                _permissionFunction.CreatePermissionFunctionUserDutyJoin(new CreatePermissionFunctionUserDutyJoinParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    pfl_id: data.pfl_id,
                    ud_id: ud_id));
            }

            return new ResultObject { success = true, message = "更新成功" };
        }

        /// <summary>
        /// "查詢"層級檢查
        /// 檢查功能對應職責 比較傳入使用者編號和職務擁有的職責是否在功能對應職責裡 回傳階層最高的職務做篩選
        /// </summary>
        /// <param name="user_id"></param>
        /// <param name="ul_id"></param>
        /// <param name="api_name"></param>
        /// <param name="baseService"></param>
        /// <returns></returns>
        public static int CheckSearchPermission(string user_id, int ul_id, string api_name, IBaseService baseService)
        {
            try
            {
                if (ul_id.Equals("1")) return ul_id;

                //查使用者擁有的職責&排除額外移除的
                IUserDuty_IMPL UserDuty_IMPL = new(Appsettings.ConfigurationManager._config, baseService);
                List<SearchUserOwnDutyResult> SearchUserOwnDuty_result = UserDuty_IMPL.SearchUserOwnDuty(user_id);

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

                //查權限功能對應的職責有沒有在user_uds裡面
                IPermissionFunction_IMPL PermissionFunction_IMPL = new(Appsettings.ConfigurationManager._config, baseService);
                List<SearchPermissionFunctionUserDutyJoinResult> SearchPermissionFunctionUserDutyJoin_result = PermissionFunction_IMPL.SearchPermissionFunctionUserDutyJoin(
                    new SearchPermissionFunctionUserDutyJoinParam(api_name: api_name, ud_ids: user_uds.Select(x => x.Item2).ToList()));

                SearchPermissionFunctionUserDutyJoin_result = SearchPermissionFunctionUserDutyJoin_result.Where(x => (x.api_name ?? "").Equals(api_name)).ToList();
                if (SearchPermissionFunctionUserDutyJoin_result.Count == 0) return ul_id;

                //紀錄相關職責的邏輯主管編號
                List<int> ul_ids = [ul_id];
                foreach (SearchPermissionFunctionUserDutyJoinResult item in SearchPermissionFunctionUserDutyJoin_result)
                {
                    ul_ids.Add(item.logic_ul_id ?? 0);
                }

                //查全部層級
                IUserLevel_IMPL UserLevel_IMPL = new(Appsettings.ConfigurationManager._config, baseService);
                List<UserLevelTree> SearchUserLevelTree_result = UserLevel_IMPL.SearchUserLevelTreeESC(2, 0);

                //一路跑下來第一個符合的職務流水號就是最高level的職務流水號
                foreach (UserLevelTree item in SearchUserLevelTree_result)
                {
                    if (ul_ids.Contains(item.ul_id)) return item.ul_id;
                }
                return ul_id;
            }
            catch (Exception)
            {
                return ul_id;
            }
        }

        /// <summary>
        /// 查詢api_name對應的職責的邏輯主管職務流水號ul_id
        /// </summary>
        /// <param name="api_name"></param>
        /// <param name="baseService"></param>
        /// <returns></returns>
        public static List<int> CheckLogicUserLevelPermission(string api_name, IBaseService baseService)
        {
            List<int> ul_ids = [];
            try
            {
                //查權限功能對應的職責有沒有在user_uds裡面
                IPermissionFunction_IMPL PermissionFunction_IMPL = new(Appsettings.ConfigurationManager._config, baseService);
                List<SearchPermissionFunctionUserDutyJoinResult> SearchPermissionFunctionUserDutyJoin_result = PermissionFunction_IMPL.SearchPermissionFunctionUserDutyJoin(
                    new SearchPermissionFunctionUserDutyJoinParam(api_name: api_name));

                SearchPermissionFunctionUserDutyJoin_result = SearchPermissionFunctionUserDutyJoin_result.Where(x => (x.api_name ?? "").Equals(api_name)).ToList();

                foreach (SearchPermissionFunctionUserDutyJoinResult item in SearchPermissionFunctionUserDutyJoin_result)
                {
                    ul_ids.Add(item.logic_ul_id ?? 0);
                }
                return ul_ids.Count == 0 ? [-1] : ul_ids;
            }
            catch (Exception)
            {
                return ul_ids.Count == 0 ? [-1] : ul_ids;
            }
        }

        /// <summary>
        /// 檢查功能對應職責 檢查登入帳號是否有權限做某些特殊的事
        /// </summary>
        /// <param name="jwtObject"></param>
        /// <param name="api_name"></param>
        /// <param name="baseService"></param>
        /// <returns></returns>
        [NonAction]
        public static bool CheckValidPermission(AuthObject jwtObject, string api_name, IBaseService baseService)
        {
            try
            {
                //查使用者擁有的職責&排除額外移除的
                IUserDuty_IMPL UserDuty_IMPL = new(Appsettings.ConfigurationManager._config, baseService);
                List<SearchUserOwnDutyResult> SearchUserOwnDuty_result = UserDuty_IMPL.SearchUserOwnDuty(jwtObject.user_id);

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

                //查權限功能對應的職責有沒有在user_uds裡面
                IPermissionFunction_IMPL PermissionFunction_IMPL = new(Appsettings.ConfigurationManager._config, baseService);
                List<SearchPermissionFunctionUserDutyJoinResult> SearchPermissionFunctionUserDutyJoin_result = PermissionFunction_IMPL.SearchPermissionFunctionUserDutyJoin(
                    new SearchPermissionFunctionUserDutyJoinParam(api_name: api_name, ud_ids: user_uds.Select(x => x.Item2).ToList()));

                SearchPermissionFunctionUserDutyJoin_result = SearchPermissionFunctionUserDutyJoin_result.Where(x => (x.api_name ?? "").Equals(api_name)).ToList();

                if (SearchPermissionFunctionUserDutyJoin_result.Count == 0) return false;
                else return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// 檢查使用者在某權限可操作的日期起
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject CheckValidDatePermission(CheckValidDatePermission data)
        {
            try
            {
                DateTime datetime_now = DateTime.Now;
                string time_now = datetime_now.ToString("yyyyMMddHHmmss");

                switch (data.type)
                {
                    case "排班":
                        //無條件異動未來班表
                        if (CheckValidPermission(jwtObject, "ScheduleXEmployeeUpdate", _baseService))
                        {
                            return new ResultObject { success = true, data = time_now[..8] };
                        }
                        //有條件異動未來班表
                        else if (CheckValidPermission(jwtObject, "ScheduleXEmployeeUpdateCond", _baseService))
                        {
                            List<DictionaryKeyValue> kvs = [];
                            //查異動下個月班表期限
                            List<SearchSystemSettingResult> SearchSystemSetting_result = _systemSettings.SearchSystemSetting(
                                new SearchSystemSettingParam(),
                                ["value_json", "ssm_name"],
                                out int page_count);
                            SearchSystemSettingResult? SearchSystemSetting_target = SearchSystemSetting_result.Where(x => (x.ssm_name ?? "").Equals("異動下個月班表期限")).FirstOrDefault();
                            if (SearchSystemSetting_target == null || SearchSystemSetting_target.value_json == null) return new ResultObject { success = false, message = "系統設定遺失" };
                            kvs = JsonConvert.DeserializeObject<List<DictionaryKeyValue>>(SearchSystemSetting_target.value_json) ?? [];

                            string date_limit = $"00{kvs.Where(x => x.key.Equals("每個月幾號")).FirstOrDefault()?.value}";
                            date_limit = string.Concat(time_now.AsSpan(0, 6), date_limit.AsSpan(date_limit.Length - 2, 2));
                            //超過異動期限只能異動下下個月之後
                            if (string.Compare(time_now[..8], date_limit) > 0)
                            {
                                return new ResultObject
                                {
                                    success = true,
                                    data = $"{Tool.DatetimeToString(datetime_now.AddMonths(2), 8)[..6]}01"
                                };
                            }
                            //沒超過異動期限能異動下個月之後
                            else
                            {
                                return new ResultObject
                                {
                                    success = true,
                                    data = $"{Tool.DatetimeToString(datetime_now.AddMonths(1), 8)[..6]}01"
                                };
                            }
                        }
                        //兩個都沒設定就直接下下個月
                        else
                        {
                            return new ResultObject
                            {
                                success = true,
                                data = $"{Tool.DatetimeToString(datetime_now.AddMonths(2), 8)[..6]}01"
                            };
                        }
                    case "加班":
                    case "調班":
                    case "請假":
                        //無權補申請
                        if (!CheckValidPermission(jwtObject, "MakeUpApply", _baseService))
                        {
                            return new ResultObject
                            {
                                success = true,
                                data = time_now[..8]
                            };
                        }
                        else
                        {
                            //查補請期限
                            List<DictionaryKeyValue> kvs = [];
                            List<SearchSystemSettingResult> SearchSystemSetting_result = _systemSettings.SearchSystemSetting(
                                new SearchSystemSettingParam(),
                                ["value_json", "ssm_name"],
                                out int page_count);
                            SearchSystemSettingResult? SearchSystemSetting_target = SearchSystemSetting_result.Where(x => (x.ssm_name ?? "").Equals("補請上個月加調班期限")).FirstOrDefault();
                            if (SearchSystemSetting_target == null || SearchSystemSetting_target.value_json == null) return new ResultObject { success = false, message = "系統設定遺失" };
                            kvs = JsonConvert.DeserializeObject<List<DictionaryKeyValue>>(SearchSystemSetting_target.value_json) ?? [];

                            string date_limit = $"00{kvs.Where(x => x.key.Equals("每個月幾號")).FirstOrDefault()?.value}";
                            date_limit = string.Concat(time_now.AsSpan(0, 6), date_limit.AsSpan(date_limit.Length - 2, 2));

                            //超過補請期限只能申請當月以後
                            if (string.Compare(time_now[..8], date_limit) > 0)
                            {
                                return new ResultObject
                                {
                                    success = true,
                                    data = $"{time_now[..6]}01"
                                };
                            }
                            //沒超過補請期限只能申請上個月以後
                            else
                            {
                                return new ResultObject
                                {
                                    success = true,
                                    data = $"{Tool.DatetimeToString(datetime_now.AddMonths(-1), 8)[..6]}01"
                                };
                            }
                        }
                    default:
                        return new ResultObject
                        {
                            success = false,
                            message = "未知類型"
                        };
                }
            }
            catch (Exception e)
            {
                return new ResultObject
                {
                    success = false,
                    message = "未知類型",
                    data = e
                };
            }
        }

        /// <summary>
        /// 前台呼叫列出帳號&系統功能綁定關係
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<DictionaryKeyValue>> PermissionCheckValid()
        {
            List<DictionaryKeyValue> output_kvs = [];
            //查使用者擁有的職責&排除額外移除的
            List<SearchUserOwnDutyResult> SearchUserOwnDuty_result = _userDuty.SearchUserOwnDuty(jwtObject.user_id);

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

            //查權限功能對應的職責有沒有在user_uds裡面
            List<SearchPermissionFunctionUserDutyJoinResult> SearchPermissionFunctionUserDutyJoin_result = _permissionFunction.SearchPermissionFunctionUserDutyJoin(
                new SearchPermissionFunctionUserDutyJoinParam(ud_ids: user_uds.Select(x => x.Item2).ToList()));

            foreach (SearchPermissionFunctionUserDutyJoinResult item in SearchPermissionFunctionUserDutyJoin_result)
            {
                if (!output_kvs.Exists(x => x.key.Equals(item.api_name)))
                {
                    output_kvs.Add(new DictionaryKeyValue { key = item.api_name ?? "", value = item.ud_id == null ? "N" : "Y" });
                }
                else
                {
                    output_kvs.Where(x => x.key.Equals(item.api_name)).SetValue(x => x.value = item.ud_id == null ? x.value : "Y");
                }
            }

            return new ResultObject<List<DictionaryKeyValue>> { success = true, data = output_kvs };
        }
    }
}