using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// SystemSettingsController
    /// </summary>
    /// <param name="dealerSetting"></param>
    /// <param name="config"></param>
    /// <param name="baseService"></param>
    /// <param name="page"></param>
    /// <param name="user"></param>
    /// <param name="userLevel"></param>
    /// <param name="userDuty"></param>
    public class SystemSettingsController(ISystemSettings systemSettings, IDealerSetting dealerSetting, IConfiguration config, IBaseService baseService, IPage page
            , IUser user, IUserLevel userLevel, IUserDuty userDuty) : CustomControllerBase(baseService)
    {
        private readonly IConfiguration _config = config;
        private readonly ISystemSettings _systemSettings = systemSettings;
        private readonly IDealerSetting _dealerSetting = dealerSetting;
        private readonly IUser _user = user;
        private readonly IUserLevel _userLevel = userLevel;
        private readonly IUserDuty _userDuty = userDuty;
        private readonly IPage _page = page;

        private new readonly IBaseService _baseService = baseService;

        /// <summary>
        /// 全部設定(admin、權限、代碼選單)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<object> AllSettings(AllSettings data)
        {
            data.database_name = _config["Database"];
            //permission
            ResultObject<object> resultData = SetAdmin(data);
            //drop down menu
            //if (resultData.success) resultData = SetDropDownMenu(data);

            //return
            if (resultData.success) return new ResultObject<object> { success = true, message = "全部建置成功" };
            else return resultData;
        }

        /// <summary>
        /// SetAdmin
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<object> SetAdmin(AllSettings data)
        {
            SearchDealerSettingResult? searchDealerSettingResult = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(ds_code: data.company_code), ["ds_id", "ds_code", "ds_dbname"], out int page_count).FirstOrDefault();
            if (searchDealerSettingResult == null || searchDealerSettingResult.ds_id == null) return new ResultObject<object> { success = false, message = "查無經銷商設定" };

            //切換經銷商連線
            _page.RefreshstrConn(data.company_code);
            _user.RefreshstrConn(data.company_code);
            PageController PC = new(_page, _user, _userLevel, _userDuty, _dealerSetting, _config, _baseService)
            { ControllerContext = ControllerContext };

            UserDealerInfo udi = new UserDealerInfo
            {
                ds_id = searchDealerSettingResult.ds_id ?? 0,
                ds_code = searchDealerSettingResult.ds_code ?? "",
                ds_name = searchDealerSettingResult.ds_name ?? "",
                ds_dbname = searchDealerSettingResult.ds_dbname ?? ""
            };
            return PC.ResetAdminPermission(udi);
        }

        /// <summary>
        /// 查看appsettings版本
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public string GetAppsettings()
        {
            return _config["Database"] + " " + _config["Test"];
        }


        /// <summary>
        /// 特殊系統設定查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SystemSettingSearchResponse>> SystemSettingSearch(SystemSettingSearch data)
        {
            List<SearchSystemSettingResult> searchSystemSettingResults = _systemSettings.SearchSystemSetting(
                new SearchSystemSettingParam(ssm_name: data.ssm_name), ["ssm_id", "ssm_name", "value_json", "note"], out int page_count);

            List<SystemSettingSearchResponse> response = [];

            foreach (SearchSystemSettingResult obj in searchSystemSettingResults)
            {
                response.Add(new SystemSettingSearchResponse
                {
                    ssm_id = obj.ssm_id ?? 0,
                    ssm_name = obj.ssm_name ?? "",
                    value_json = obj.value_json ?? "",
                    note = obj.note ?? ""
                });
            }

            return new ResultObject<List<SystemSettingSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 特殊系統設定新建
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<int> SystemSettingCreate([FromBody] SystemSettingCreate data)
        {
            DateTime cre_time = DateTime.Now;

            //查出現有的內容
            List<SearchSystemSettingResult> SearchSystemSetting_result = _systemSettings.SearchSystemSetting(
                new SearchSystemSettingParam(), ["ssm_name"], out int page_count);
            if (SearchSystemSetting_result.Exists(x => (x.ssm_name ?? "").Equals(data.ssm_name))) return new ResultObject<int> { success = false, message = "系統規則名稱重複" };

            //特殊系統設定新建
            int ssm_id = _systemSettings.CreateSystemSetting(new CreateSystemSettingParam(
                cre_userid: jwtObject.user_id,
                cre_time: cre_time,
                ssm_name: data.ssm_name,
                value_json: JsonConvert.SerializeObject(data.value_json)));

            return new ResultObject<int> { success = true, message = "新建成功", data = ssm_id };
        }

        /// <summary>
        /// 特殊系統設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject SystemSettingUpdate([FromBody] SystemSettingUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查出現有的內容
            List<SearchSystemSettingResult> SearchSystemSetting_result = _systemSettings.SearchSystemSetting(
                new SearchSystemSettingParam(ssm_id: data.ssm_id), ["value_json"], out int page_count);
            if (SearchSystemSetting_result.Count == 0) return new ResultObject { success = false, message = "查無系統規則" };

            string value_json_origin = SearchSystemSetting_result[0].value_json ?? "";
            if (string.IsNullOrEmpty(value_json_origin)) return new ResultObject { success = false, message = "系統規則內容遺失" };

            //List<DictionarySystemSetting> value_json_db = JsonConvert.DeserializeObject<List<DictionarySystemSetting>>(value_json_origin) ?? [];

            ////稽查該有的key是不是都有出現
            //foreach (DictionarySystemSetting kv in value_json_db)
            //{
            //    if (!data.value_json.Exists(x => x.key.Equals(kv.key)))
            //    {
            //        return new ResultObject
            //        {
            //            success = false,
            //            message = string.Format("key值{0}遺失", kv.key)
            //        };
            //    }
            //}

            //特殊系統設定修改
            _systemSettings.UpdateSystemSetting(new UpdateSystemSettingParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                ssm_id: data.ssm_id,
                value_json: JsonConvert.SerializeObject(data.value_json)));

            return new ResultObject { success = true, message = "修改成功" };
        }


        #region TEST
        /// <summary>
        /// 測試API功能
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<object> APITest(APITestModal data)
        {
            return new ResultObject<object>
            {
                success = true,
                message = "測試成功",
                data = data
            };
        }
        public class APITestModal
        {
            [Required(ErrorMessage = "請輸入{0}")]
            public string? null_required_string { get; set; }

            [Required(ErrorMessage = "請輸入{0}")]
            public string notnull_required_string { get; set; } = "";

            public string? null_option_string { get; set; } = "你沒給";

            public string notnull_option_string { get; set; } = "";
        }
        #endregion
    }
}
