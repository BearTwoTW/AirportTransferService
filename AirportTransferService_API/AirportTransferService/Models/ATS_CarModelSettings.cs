using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_CarModelSettings
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="cms_id"></param>
    /// <param name="visible"></param>
    /// <param name="name"></param>
    /// <param name="max_passengers"></param>
    /// <param name="max_luggage"></param>
    /// <param name="max_child_seats"></param>
    /// <param name="max_service_extras"></param>
    public class ATS_CarModelSettings(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? cms_id = null,
        string? visible = null,
        string? name = null,
        int? max_passengers = null,
        int? max_luggage = null,
        int? max_child_seats = null,
        int? max_service_extras = null)
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
        /// cms_id
        /// </summary>
        [Key]
        public string? cms_id { get; } = cms_id;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;

        /// <summary>
        /// max_passengers
        /// </summary>
        public int? max_passengers { get; } = max_passengers;

        /// <summary>
        /// max_luggage
        /// </summary>
        public int? max_luggage { get; } = max_luggage;

        /// <summary>
        /// max_child_seats
        /// </summary>
        public int? max_child_seats { get; } = max_child_seats;

        /// <summary>
        /// max_service_extras
        /// </summary>
        public int? max_service_extras { get; } = max_service_extras;
    }

    /// <summary>
    /// CreateATS_CarModelSettingsParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="visible"></param>
    /// <param name="name"></param>
    /// <param name="max_passengers"></param>
    /// <param name="max_luggage"></param>
    /// <param name="max_child_seats"></param>
    /// <param name="max_service_extras"></param>
    public class CreateATS_CarModelSettingsParam(
        string? cre_userid,
        DateTime? cre_time,
        string? visible,
        string? name,
        int? max_passengers,
        int? max_luggage,
        int? max_child_seats,
        int? max_service_extras) : ATS_CarModelSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            visible: visible,
            name: name,
            max_passengers: max_passengers,
            max_luggage: max_luggage,
            max_child_seats: max_child_seats,
            max_service_extras: max_service_extras)
    {
    }

    /// <summary>
    /// UpdateATS_CarModelSettingsParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="cms_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="visible"></param>
    /// <param name="name"></param>
    /// <param name="max_passengers"></param>
    /// <param name="max_luggage"></param>
    /// <param name="max_child_seats"></param>
    /// <param name="max_service_extras"></param>
    public class UpdateATS_CarModelSettingsParam(
        DateTime? cre_time,
        string? upd_userid,
        DateTime? upd_time,
        string? cms_id,
        string? cre_userid = api_string_param_no_pass,
        string? visible = api_string_param_no_pass,
        string? name = api_string_param_no_pass,
        int? max_passengers = api_numeric_param_no_pass,
        int? max_luggage = api_numeric_param_no_pass,
        int? max_child_seats = api_numeric_param_no_pass,
        int? max_service_extras = api_numeric_param_no_pass) : ATS_CarModelSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            upd_userid: upd_userid,
            upd_time: upd_time,
            cms_id: cms_id,
            visible: visible,
            name: name,
            max_passengers: max_passengers,
            max_luggage: max_luggage,
            max_child_seats: max_child_seats,
            max_service_extras: max_service_extras)
    {
    }

    /// <summary>
    /// SearchATS_CarModelSettingsParam
    /// </summary>
    /// <param name="cms_id"></param>
    /// <param name="visible"></param>
    /// <param name="name"></param>
    /// <param name="max_passengers"></param>
    /// <param name="max_luggage"></param>
    /// <param name="max_child_seats"></param>
    /// <param name="max_service_extras"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_CarModelSettingsParam(
        string? cms_id = null,
        string? visible = null,
        string? name = null,
        int? max_passengers = null,
        int? max_luggage = null,
        int? max_child_seats = null,
        int? max_service_extras = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// cms_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CarModelSettings.cms_id")]
        public string? cms_id { get; } = cms_id;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_CarModelSettings.visible")]
        public string? visible { get; } = visible;

        /// <summary>
        /// name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CarModelSettings.name")]
        public string? name { get; } = name;

        /// <summary>
        /// max_passengers
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CarModelSettings.max_passengers")]
        public int? max_passengers { get; } = max_passengers;

        /// <summary>
        /// max_luggage
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CarModelSettings.max_luggage")]
        public int? max_luggage { get; } = max_luggage;

        /// <summary>
        /// max_child_seats
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CarModelSettings.max_child_seats")]
        public int? max_child_seats { get; } = max_child_seats;

        /// <summary>
        /// max_service_extras
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CarModelSettings.max_service_extras")]
        public int? max_service_extras { get; } = max_service_extras;

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
    /// SearchATS_CarModelSettingsResult
    /// </summary>
    public class SearchATS_CarModelSettingsResult : IEquatable<SearchATS_CarModelSettingsResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_CarModelSettings.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_CarModelSettings.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_CarModelSettings.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_CarModelSettings.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// cms_id
        /// </summary>
        [SQLSource("ATS_CarModelSettings.cms_id")]
        public string? cms_id { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("ATS_CarModelSettings.visible")]
        public string? visible { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("ATS_CarModelSettings.name")]
        public string? name { get; set; }

        /// <summary>
        /// max_passengers
        /// </summary>
        [SQLSource("ATS_CarModelSettings.max_passengers")]
        public int? max_passengers { get; set; }

        /// <summary>
        /// max_luggage
        /// </summary>
        [SQLSource("ATS_CarModelSettings.max_luggage")]
        public int? max_luggage { get; set; }

        /// <summary>
        /// max_child_seats
        /// </summary>
        [SQLSource("ATS_CarModelSettings.max_child_seats")]
        public int? max_child_seats { get; set; }

        /// <summary>
        /// max_service_extras
        /// </summary>
        [SQLSource("ATS_CarModelSettings.max_service_extras")]
        public int? max_service_extras { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_CarModelSettingsResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_CarModelSettingsResult? searchATS_CarModelSettingsResult)
        {
            if (searchATS_CarModelSettingsResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_CarModelSettingsResult)) return true;

            return
                cre_userid == searchATS_CarModelSettingsResult.cre_userid &&
                cre_time == searchATS_CarModelSettingsResult.cre_time &&
                upd_userid == searchATS_CarModelSettingsResult.upd_userid &&
                upd_time == searchATS_CarModelSettingsResult.upd_time &&
                cms_id == searchATS_CarModelSettingsResult.cms_id &&
                visible == searchATS_CarModelSettingsResult.visible &&
                name == searchATS_CarModelSettingsResult.name &&
                max_passengers == searchATS_CarModelSettingsResult.max_passengers &&
                max_luggage == searchATS_CarModelSettingsResult.max_luggage &&
                max_child_seats == searchATS_CarModelSettingsResult.max_child_seats &&
                max_service_extras == searchATS_CarModelSettingsResult.max_service_extras;
        }
    }

    #region API
    /// <summary>
    /// ATS_CarModelSettingsCreate
    /// </summary>
    public class ATS_CarModelSettingsCreate
    {
        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見"), YN]
        public string? visible { get; set; } = "Y";

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱"), Required(ErrorMessage = "請輸入{0}")]
        public string? name { get; set; } = "";

        /// <summary>
        /// 乘車人數上限
        /// </summary>
        [Display(Name = "乘車人數上限")]
        public int? max_passengers { get; set; } = 0;

        /// <summary>
        /// 行李數上限
        /// </summary>
        [Display(Name = "行李數上限")]
        public int? max_luggage { get; set; } = 0;

        /// <summary>
        /// 安全座椅上限
        /// </summary>
        [Display(Name = "安全座椅上限")]
        public int? max_child_seats { get; set; } = 0;

        /// <summary>
        /// 服務加成項目上限
        /// </summary>
        [Display(Name = "服務加成項目上限")]
        public int? max_service_extras { get; set; } = 0;
    }

    /// <summary>
    /// ATS_CarModelSettingsUpdate
    /// </summary>
    public class ATS_CarModelSettingsUpdate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? cms_id { get; set; } = "";

        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 乘車人數上限
        /// </summary>
        [Display(Name = "乘車人數上限")]
        public int? max_passengers { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 行李數上限
        /// </summary>
        [Display(Name = "行李數上限")]
        public int? max_luggage { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 安全座椅上限
        /// </summary>
        [Display(Name = "安全座椅上限")]
        public int? max_child_seats { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 服務加成項目上限
        /// </summary>
        [Display(Name = "服務加成項目上限")]
        public int? max_service_extras { get; set; } = api_numeric_param_no_pass;
    }

    /// <summary>
    /// ATS_CarModelSettingsSearch
    /// </summary>
    public class ATS_CarModelSettingsSearch : ATS_CarModelSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? cms_id { get; set; } = "";

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
        [Display(Name = "是否匯出"), YN]
        public string excel { get; set; } = "N";

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱")]
        public new string? name { get; set; } = "";
    }

    /// <summary>
    /// ATS_CarModelSettingsSearchResult
    /// </summary>
    public class ATS_CarModelSettingsSearchResponse : ATS_CarModelSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? cms_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_CarModelSettingsDelete
    /// </summary>
    public class ATS_CarModelSettingsDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? cms_id { get; set; } = "";
    }
    #endregion
}
