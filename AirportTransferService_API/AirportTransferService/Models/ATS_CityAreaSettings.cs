using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_CityAreaSettings
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="visible"></param>
    /// <param name="cas_id"></param>
    /// <param name="zip"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    public class ATS_CityAreaSettings(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? cas_id = null,
        string? visible = null,
        string? zip = null,
        string? city = null,
        string? area = null,
        string? road = null,
        string? section = null)
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
        /// cas_id
        /// </summary>
        [Key]
        public string? cas_id { get; } = cas_id;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;

        /// <summary>
        /// zip
        /// </summary>
        public string? zip { get; } = zip;

        /// <summary>
        /// city
        /// </summary>
        public string? city { get; } = city;

        /// <summary>
        /// area
        /// </summary>
        public string? area { get; } = area;

        /// <summary>
        /// road
        /// </summary>
        public string? road { get; } = road;

        /// <summary>
        /// section
        /// </summary>
        public string? section { get; } = section;
    }

    /// <summary>
    /// CreateATS_CityAreaSettingsParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="visible"></param>
    /// <param name="zip"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    public class CreateATS_CityAreaSettingsParam(
        string? cre_userid,
        DateTime? cre_time,
        string? visible,
        string? zip,
        string? city,
        string? area,
        string? road,
        string? section) : ATS_CityAreaSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            visible: visible,
            zip: zip,
            city: city,
            area: area,
            road: road,
            section: section)
    {
    }

    /// <summary>
    /// UpdateATS_CityAreaSettingsParam
    /// </summary>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="cas_id"></param>
    /// <param name="visible"></param>
    /// <param name="zip"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    public class UpdateATS_CityAreaSettingsParam(
        string? upd_userid,
        DateTime? upd_time,
        string? cas_id,
        string? visible = api_string_param_no_pass,
        string? zip = api_string_param_no_pass,
        string? city = api_string_param_no_pass,
        string? area = api_string_param_no_pass,
        string? road = api_string_param_no_pass,
        string? section = api_string_param_no_pass) : ATS_CityAreaSettings(
            upd_userid: upd_userid,
            upd_time: upd_time,
            visible: visible,
            cas_id: cas_id,
            zip: zip,
            city: city,
            area: area,
            road: road,
            section: section)
    {
    }

    /// <summary>
    /// SearchATS_CityAreaSettingsParam
    /// </summary>
    /// <param name="cas_id"></param>
    /// <param name="visible"></param>
    /// <param name="zip"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_CityAreaSettingsParam(
        string? cas_id = null,
        string? visible = null,
        string? zip = null,
        string? city = null,
        string? area = null,
        string? road = null,
        string? section = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// cas_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CityAreaSettings.cas_id")]
        public string? cas_id { get; } = cas_id;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CityAreaSettings.visible")]
        public string? visible { get; } = visible;

        /// <summary>
        /// zip
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CityAreaSettings.zip")]
        public string? zip { get; } = zip;

        /// <summary>
        /// city
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CityAreaSettings.city")]
        public string? city { get; } = city;

        /// <summary>
        /// area
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CityAreaSettings.area")]
        public string? area { get; } = area;

        /// <summary>
        /// road
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CityAreaSettings.road")]
        public string? road { get; } = road;

        /// <summary>
        /// section
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_CityAreaSettings.section")]
        public string? section { get; } = section;

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
    /// SearchATS_CityAreaSettingsResult
    /// </summary>
    public class SearchATS_CityAreaSettingsResult : IEquatable<SearchATS_CityAreaSettingsResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// cas_id
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.cas_id")]
        public string? cas_id { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.visible")]
        public string? visible { get; set; }

        /// <summary>
        /// zip
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.zip")]
        public string? zip { get; set; }

        /// <summary>
        /// city
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.city")]
        public string? city { get; set; }

        /// <summary>
        /// area
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.area")]
        public string? area { get; set; }

        /// <summary>
        /// road
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.road")]
        public string? road { get; set; }

        /// <summary>
        /// section
        /// </summary>
        [SQLSource("ATS_CityAreaSettings.section")]
        public string? section { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_CityAreaSettingsResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_CityAreaSettingsResult? searchATS_CityAreaSettingsResult)
        {
            if (searchATS_CityAreaSettingsResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_CityAreaSettingsResult)) return true;

            return
                cre_userid == searchATS_CityAreaSettingsResult.cre_userid &&
                cre_time == searchATS_CityAreaSettingsResult.cre_time &&
                upd_userid == searchATS_CityAreaSettingsResult.upd_userid &&
                upd_time == searchATS_CityAreaSettingsResult.upd_time &&
                cas_id == searchATS_CityAreaSettingsResult.cas_id &&
                visible == searchATS_CityAreaSettingsResult.visible &&
                zip == searchATS_CityAreaSettingsResult.zip &&
                city == searchATS_CityAreaSettingsResult.city &&
                area == searchATS_CityAreaSettingsResult.area &&
                road == searchATS_CityAreaSettingsResult.road &&
                section == searchATS_CityAreaSettingsResult.section;
        }
    }

    #region API
    /// <summary>
    /// ATS_CityAreaSettingsCreate
    /// </summary>
    public class ATS_CityAreaSettingsCreate
    {
        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見"), YN]
        public string? visible { get; set; } = "Y";

        /// <summary>
        /// 郵遞區號
        /// </summary>
        [Display(Name = "郵遞區號")]
        public string? zip { get; set; } = "";

        /// <summary>
        /// 城市
        /// </summary>
        [Display(Name = "城市"), Required(ErrorMessage = "請輸入{0}")]
        public string? city { get; set; } = "";

        /// <summary>
        /// 區域
        /// </summary>
        [Display(Name = "區域"), Required(ErrorMessage = "請輸入{0}")]
        public string? area { get; set; } = "";

        /// <summary>
        /// 路
        /// </summary>
        [Display(Name = "路")]
        public string? road { get; set; } = "";

        /// <summary>
        /// 段
        /// </summary>
        [Display(Name = "段")]
        public string? section { get; set; } = "";
    }

    /// <summary>
    /// ATS_CityAreaSettingsUpdate
    /// </summary>
    public class ATS_CityAreaSettingsUpdate : ATS_CityAreaSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? cas_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_CityAreaSettingsSearch
    /// </summary>
    public class ATS_CityAreaSettingsSearch : ATS_CityAreaSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? cas_id { get; set; } = "";

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
        /// 城市
        /// </summary>
        [Display(Name = "城市")]
        public new string? city { get; set; } = "";

        /// <summary>
        /// 區域
        /// </summary>
        [Display(Name = "區域")]
        public new string? area { get; set; } = "";
    }

    /// <summary>
    /// ATS_CityAreaSettingsSearchResult
    /// </summary>
    public class ATS_CityAreaSettingsSearchResponse : ATS_CityAreaSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? cas_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_CityAreaSettingsDelete
    /// </summary>
    public class ATS_CityAreaSettingsDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? cas_id { get; set; } = "";
    }
    #endregion
}