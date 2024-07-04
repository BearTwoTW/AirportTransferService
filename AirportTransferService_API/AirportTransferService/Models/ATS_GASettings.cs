using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_GASettings
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="gas_id"></param>
    /// <param name="tracking_code"></param>
    /// <param name="keyword"></param>
    /// <param name="summary"></param>
    /// <param name="descriptive_url"></param>
    public class ATS_GASettings(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? gas_id = null,
        string? tracking_code = null,
        string? keyword = null,
        string? summary = null,
        string? descriptive_url = null)
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        public string? cre_userid { get; } = cre_userid;

        /// <summary>
        /// cre_time
        /// </summary>
        public DateTime? cre_time { get; } = cre_time;

        /// <summary>
        /// upd_userid
        /// </summary>
        public string? upd_userid { get; } = upd_userid;

        /// <summary>
        /// upd_time
        /// </summary>
        public DateTime? upd_time { get; } = upd_time;

        /// <summary>
        /// gas_id
        /// </summary>
        [Key]
        public string? gas_id { get; } = gas_id;

        /// <summary>
        /// tracking_code
        /// </summary>
        public string? tracking_code { get; } = tracking_code;

        /// <summary>
        /// keyword
        /// </summary>
        public string? keyword { get; } = keyword;

        /// <summary>
        /// summary
        /// </summary>
        public string? summary { get; } = summary;

        /// <summary>
        /// descriptive_url
        /// </summary>
        public string? descriptive_url { get; } = descriptive_url;
    }

    /// <summary>
    /// CreateATS_GASettingsParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="tracking_code"></param>
    /// <param name="keyword"></param>
    /// <param name="summary"></param>
    /// <param name="descriptive_url"></param>
    public class CreateATS_GASettingsParam(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? tracking_code = null,
        string? keyword = null,
        string? summary = null,
        string? descriptive_url = null) : ATS_GASettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            tracking_code: tracking_code,
            keyword: keyword,
            summary: summary,
            descriptive_url: descriptive_url)
    {
    }

    /// <summary>
    /// UpdateATS_GASettingsParam
    /// </summary>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="gas_id"></param>
    /// <param name="tracking_code"></param>
    /// <param name="keyword"></param>
    /// <param name="summary"></param>
    /// <param name="descriptive_url"></param>
    public class UpdateATS_GASettingsParam(
        string? upd_userid,
        DateTime? upd_time,
        string? gas_id,
        string? tracking_code = api_string_param_no_pass,
        string? keyword = api_string_param_no_pass,
        string? summary = api_string_param_no_pass,
        string? descriptive_url = api_string_param_no_pass) : ATS_GASettings(
            upd_userid: upd_userid,
            upd_time: upd_time,
            gas_id: gas_id,
            tracking_code: tracking_code,
            keyword: keyword,
            summary: summary,
            descriptive_url: descriptive_url)
    {
    }

    /// <summary>
    /// SearchATS_GASettingsParam
    /// </summary>
    /// <param name="gas_id"></param>
    /// <param name="tracking_code"></param>
    /// <param name="keyword"></param>
    /// <param name="summary"></param>
    /// <param name="descriptive_url"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_GASettingsParam(
        string? gas_id = null,
        string? tracking_code = null,
        string? keyword = null,
        string? summary = null,
        string? descriptive_url = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// gas_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_GASettings.gas_id")]

        public string? gas_id { get; } = gas_id;

        /// <summary>
        /// tracking_code
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_GASettings.tracking_code")]

        public string? tracking_code { get; } = tracking_code;

        /// <summary>
        /// keyword
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_GASettings.keyword")]

        public string? keyword { get; } = keyword;

        /// <summary>
        /// summary
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_GASettings.summary")]

        public string? summary { get; } = summary;

        /// <summary>
        /// descriptive_url
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_GASettings.descriptive_url")]

        public string? descriptive_url { get; } = descriptive_url;

        /// <summary>
        /// page
        /// </summary>
        public int page { get; } = page;

        /// <summary>
        /// num_per_page
        /// </summary>
        public int num_per_page { get; } = num_per_page;
    }

    /// <summary>
    /// SearchATS_GASettingsResult
    /// </summary>
    public class SearchATS_GASettingsResult : IEquatable<SearchATS_GASettingsResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_GASettings.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_GASettings.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_GASettings.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_GASettings.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// gas_id
        /// </summary>
        [SQLSource("ATS_GASettings.gas_id")]
        public string? gas_id { get; set; }

        /// <summary>
        /// tracking_code
        /// </summary>
        [SQLSource("ATS_GASettings.tracking_code")]
        public string? tracking_code { get; set; }

        /// <summary>
        /// keyword
        /// </summary>
        [SQLSource("ATS_GASettings.keyword")]
        public string? keyword { get; set; }

        /// <summary>
        /// summary
        /// </summary>
        [SQLSource("ATS_GASettings.summary")]
        public string? summary { get; set; }

        /// <summary>
        /// descriptive_url
        /// </summary>
        [SQLSource("ATS_GASettings.descriptive_url")]
        public string? descriptive_url { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_GASettingsResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_GASettingsResult? searchATS_GASettingsResult)
        {
            if (searchATS_GASettingsResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_GASettingsResult)) return true;

            return
                cre_userid == searchATS_GASettingsResult.cre_userid &&
                cre_time == searchATS_GASettingsResult.cre_time &&
                upd_userid == searchATS_GASettingsResult.upd_userid &&
                upd_time == searchATS_GASettingsResult.upd_time &&
                gas_id == searchATS_GASettingsResult.gas_id &&
                tracking_code == searchATS_GASettingsResult.tracking_code &&
                keyword == searchATS_GASettingsResult.keyword &&
                summary == searchATS_GASettingsResult.summary &&
                descriptive_url == searchATS_GASettingsResult.descriptive_url;
        }
    }

    #region API
    /// <summary>
    /// ATS_GASettingsCreate
    /// </summary>
    public class ATS_GASettingsCreate
    {
        /// <summary>
        /// 追蹤碼
        /// </summary>
        [Display(Name = "追蹤碼")]
        public string? tracking_code { get; set; } = "";

        /// <summary>
        /// 關鍵字
        /// </summary>
        [Display(Name = "關鍵字")]
        public string? keyword { get; set; } = "";

        /// <summary>
        /// 簡介
        /// </summary>
        [Display(Name = "簡介")]
        public string? summary { get; set; } = "";

        /// <summary>
        /// 描述性URL
        /// </summary>
        [Display(Name = "描述性URL")]
        public string? descriptive_url { get; set; } = "";
    }

    /// <summary>
    /// ATS_GASettingsUpdate
    /// </summary>
    public class ATS_GASettingsUpdate : ATS_GASettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "編號")]
        public string? gas_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_GASettingsSearch
    /// </summary>
    public class ATS_GASettingsSearch : ATS_GASettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? gas_id { get; set; } = "";

        /// <summary>
        /// 頁碼
        /// </summary>
        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        /// <summary>
        /// 一頁幾筆
        /// </summary>
        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 10;

        /// <summary>
        /// 是否匯出
        /// </summary>
        [YN]
        [Display(Name = "是否匯出")]
        public string excel { get; set; } = "N";
    }

    /// <summary>
    /// ATS_GASettingsSearchResult
    /// </summary>
    public class ATS_GASettingsSearchResponse : ATS_GASettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? gas_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_GASettingsDelete
    /// </summary>
    public class ATS_GASettingsDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "編號")]
        public string? gas_id { get; set; } = "";
    }
    #endregion
}