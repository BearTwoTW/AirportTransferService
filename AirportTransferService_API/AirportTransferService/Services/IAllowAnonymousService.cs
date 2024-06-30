namespace AirportTransferService.Services
{
    /// <summary>
    /// IAllowAnonymousService
    /// </summary>
    public interface IAllowAnonymousService
    {
        /// <summary>
        /// 用傳來的ds_code查詢經銷商資料更換SQL連線字串
        /// </summary>
        /// <param name="ds_code"></param>
        /// <param name="strConn"></param>
        void RefreshstrConn(string ds_code, out string strConn);

        /// <summary>
        /// AllowAnonymous的API呼叫修改經銷商連線資訊
        /// </summary>
        /// 給繼承IAllowAnonymousService的interface實作修改自己的strConn
        /// <param name="ds_code"></param>
        void RefreshstrConn(string ds_code);
    }

    /// <summary>
    /// IAllowAnonymousService_IMPL
    /// </summary>
    /// <param name="config"></param>
    /// <param name="dealerSetting"></param>
    /// <param name="userDealerInfo"></param>
    public class IAllowAnonymousService_IMPL(IConfiguration config, IDealerSetting dealerSetting, UserDealerInfo userDealerInfo) : IAllowAnonymousService
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config = config;

        /// <summary>
        /// _dealerSetting
        /// </summary>
        private readonly IDealerSetting _dealerSetting = dealerSetting;

        /// <summary>
        /// _userDealerInfo
        /// </summary>
        public readonly UserDealerInfo _userDealerInfo = userDealerInfo;

        /// <summary>
        /// RefreshstrConn
        /// </summary>
        /// <param name="ds_code"></param>
        /// <param name="strConn"></param>
        /// <exception cref="BadHttpRequestException"></exception>
        public void RefreshstrConn(string ds_code, out string strConn)
        {
            SearchDealerSettingResult? searchDealerSettingResult = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(ds_code: ds_code), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out int page_count).FirstOrDefault();
            if (searchDealerSettingResult == null) throw new BadHttpRequestException(message: "Invalid Dealer Info");
            _userDealerInfo.ds_id = searchDealerSettingResult.ds_id ?? 0;
            _userDealerInfo.ds_code = searchDealerSettingResult.ds_code ?? "";
            _userDealerInfo.ds_name = searchDealerSettingResult.ds_name ?? "";
            _userDealerInfo.ds_dbname = searchDealerSettingResult.ds_dbname ?? "";
            _userDealerInfo.is_head_office = (searchDealerSettingResult.ds_code ?? "").Equals(_config["company_code"]);

            strConn = _config["sql_conn"].Replace(_config["Database"], _userDealerInfo.ds_dbname);
        }

        /// <summary>
        /// RefreshstrConn
        /// </summary>
        /// <param name="ds_code"></param>
        /// <exception cref="NotImplementedException"></exception>
        public void RefreshstrConn(string ds_code)
        {
            throw new NotImplementedException();
        }
    }
}