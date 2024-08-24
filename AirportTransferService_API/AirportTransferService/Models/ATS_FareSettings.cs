using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_FareSettings
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="fs_id"></param>
    /// <param name="visible"></param>
    /// <param name="cms_id"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    /// <param name="price"></param>
    public class ATS_FareSettings(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? fs_id = null,
        string? visible = null,
        string? cms_id = null,
        string? city = null,
        string? area = null,
        string? road = null,
        string? section = null,
        string? airport = null,
        string? terminal = null,
        decimal? price = null)
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
        /// fs_id
        /// </summary>
        [Key]
        public string? fs_id { get; } = fs_id;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;

        /// <summary>
        /// cms_id
        /// </summary>
        public string? cms_id { get; } = cms_id;

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

        /// <summary>
        /// airport
        /// </summary>
        public string? airport { get; } = airport;

        /// <summary>
        /// terminal
        /// </summary>
        public string? terminal { get; } = terminal;

        /// <summary>
        /// price
        /// </summary>
        public decimal? price { get; } = price;
    }

    /// <summary>
    /// CreateATS_FareSettingsParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="visible"></param>
    /// <param name="cms_id"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    /// <param name="price"></param>
    public class CreateATS_FareSettingsParam(
        string? cre_userid,
        DateTime? cre_time,
        string? visible,
        string? cms_id,
        string? city,
        string? area,
        string? road,
        string? section,
        string? airport,
        string? terminal,
        decimal? price) : ATS_FareSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            visible: visible,
            cms_id: cms_id,
            city: city,
            area: area,
            road: road,
            section: section,
            airport: airport,
            terminal: terminal,
            price: price)
    {
    }

    /// <summary>
    /// UpdateATS_FareSettingsParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="fs_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="visible"></param>
    /// <param name="cms_id"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    /// <param name="price"></param>
    public class UpdateATS_FareSettingsParam(
        DateTime? cre_time,
        string? upd_userid,
        DateTime? upd_time,
        string? fs_id,
        string? cre_userid = api_string_param_no_pass,
        string? visible = api_string_param_no_pass,
        string? cms_id = api_string_param_no_pass,
        string? city = api_string_param_no_pass,
        string? area = api_string_param_no_pass,
        string? road = api_string_param_no_pass,
        string? section = api_string_param_no_pass,
        string? airport = api_string_param_no_pass,
        string? terminal = api_string_param_no_pass,
        decimal? price = api_numeric_param_no_pass) : ATS_FareSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            upd_userid: upd_userid,
            upd_time: upd_time,
            fs_id: fs_id,
            visible: visible,
            cms_id: cms_id,
            city: city,
            area: area,
            road: road,
            section: section,
            airport: airport,
            terminal: terminal,
            price: price)
    {
    }

    /// <summary>
    /// SearchATS_FareSettingsParam
    /// </summary>
    /// <param name="fs_id"></param>
    /// <param name="visible"></param>
    /// <param name="cms_id"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_FareSettingsParam(
        string? fs_id = null,
        string? visible = null,
        string? cms_id = null,
        string? city = null,
        string? area = null,
        string? road = null,
        string? section = null,
        string? airport = null,
        string? terminal = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// fs_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_FareSettings.fs_id")]
        public string? fs_id { get; } = fs_id;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_FareSettings.visible")]
        public string? visible { get; } = visible;

        /// <summary>
        /// cms_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_FareSettings.cms_id")]
        public string? cms_id { get; } = cms_id;

        /// <summary>
        /// city
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_FareSettings.city")]
        public string? city { get; } = city;

        /// <summary>
        /// area
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_FareSettings.area")]
        public string? area { get; } = area;

        /// <summary>
        /// road
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_FareSettings.road")]
        public string? road { get; } = road;

        /// <summary>
        /// section
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_FareSettings.section")]
        public string? section { get; } = section;

        /// <summary>
        /// airport
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_FareSettings.airport")]
        public string? airport { get; } = airport;

        /// <summary>
        /// terminal
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_FareSettings.terminal")]
        public string? terminal { get; } = terminal;

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
    /// SearchATS_FareSettingsResult
    /// </summary>
    public class SearchATS_FareSettingsResult : IEquatable<SearchATS_FareSettingsResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_FareSettings.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_FareSettings.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_FareSettings.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_FareSettings.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// fs_id
        /// </summary>
        [SQLSource("ATS_FareSettings.fs_id")]
        public string? fs_id { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("ATS_FareSettings.visible")]
        public string? visible { get; set; }

        /// <summary>
        /// cms_id
        /// </summary>
        [SQLSource("ATS_FareSettings.cms_id")]
        public string? cms_id { get; set; }

        /// <summary>
        /// city
        /// </summary>
        [SQLSource("ATS_FareSettings.city")]
        public string? city { get; set; }

        /// <summary>
        /// area
        /// </summary>
        [SQLSource("ATS_FareSettings.area")]
        public string? area { get; set; }

        /// <summary>
        /// road
        /// </summary>
        [SQLSource("ATS_FareSettings.road")]
        public string? road { get; set; }

        /// <summary>
        /// section
        /// </summary>
        [SQLSource("ATS_FareSettings.section")]
        public string? section { get; set; }

        /// <summary>
        /// airport
        /// </summary>
        [SQLSource("ATS_FareSettings.airport")]
        public string? airport { get; set; }

        /// <summary>
        /// terminal
        /// </summary>
        [SQLSource("ATS_FareSettings.terminal")]
        public string? terminal { get; set; }

        /// <summary>
        /// price
        /// </summary>
        [SQLSource("ATS_FareSettings.price")]
        public decimal? price { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_FareSettingsResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_FareSettingsResult? searchATS_FareSettingsResult)
        {
            if (searchATS_FareSettingsResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_FareSettingsResult)) return true;

            return
                cre_userid == searchATS_FareSettingsResult.cre_userid &&
                cre_time == searchATS_FareSettingsResult.cre_time &&
                upd_userid == searchATS_FareSettingsResult.upd_userid &&
                upd_time == searchATS_FareSettingsResult.upd_time &&
                fs_id == searchATS_FareSettingsResult.fs_id &&
                visible == searchATS_FareSettingsResult.visible &&
                cms_id == searchATS_FareSettingsResult.cms_id &&
                city == searchATS_FareSettingsResult.city &&
                area == searchATS_FareSettingsResult.area &&
                road == searchATS_FareSettingsResult.road &&
                section == searchATS_FareSettingsResult.section &&
                airport == searchATS_FareSettingsResult.airport &&
                terminal == searchATS_FareSettingsResult.terminal &&
                price == searchATS_FareSettingsResult.price;
        }

        /// <summary>
        /// GetHashCode
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            return (city?.GetHashCode() ?? 0) ^ (area?.GetHashCode() ?? 0);
        }
    }

    #region API
    /// <summary>
    /// ATS_FareSettingsCreate
    /// </summary>
    public class ATS_FareSettingsCreate
    {
        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見"), Required(ErrorMessage = "請輸入{0}")]
        public string? visible { get; set; } = "";

        /// <summary>
        /// 車型編號
        /// </summary>
        [Display(Name = "車型編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? cms_id { get; set; } = "";

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

        /// <summary>
        /// 機場
        /// </summary>
        [Display(Name = "機場"), Required(ErrorMessage = "請輸入{0}")]
        public string? airport { get; set; } = "";

        /// <summary>
        /// 航廈
        /// </summary>
        [Display(Name = "航廈"), Required(ErrorMessage = "請輸入{0}")]
        public string? terminal { get; set; } = "";

        /// <summary>
        /// 價錢
        /// </summary>
        [Display(Name = "價錢"), Required(ErrorMessage = "請輸入{0}")]
        public decimal? price { get; set; } = 0;
    }

    /// <summary>
    /// ATS_FareSettingsUpdate
    /// </summary>
    public class ATS_FareSettingsUpdate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? fs_id { get; set; } = "";

        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 價錢
        /// </summary>
        [Display(Name = "價錢")]
        public decimal? price { get; set; } = api_numeric_param_no_pass;
    }

    /// <summary>
    /// ATS_FareSettingsSearch
    /// </summary>
    public class ATS_FareSettingsSearch
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? fs_id { get; set; } = "";

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
        /// 是否過濾重複
        /// </summary>
        [Display(Name = "是否過濾重複"), YN]
        public string distinct { get; set; } = "N";

        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見"), YN]
        public string? visible { get; set; } = "Y";

        /// <summary>
        /// 車型編號
        /// </summary>
        [Display(Name = "車型編號")]
        public string? cms_id { get; set; } = "";

        /// <summary>
        /// 城市
        /// </summary>
        [Display(Name = "城市")]
        public string? city { get; set; } = "";

        /// <summary>
        /// 區域
        /// </summary>
        [Display(Name = "區域")]
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

        /// <summary>
        /// 機場
        /// </summary>
        [Display(Name = "機場")]
        public string? airport { get; set; } = "";

        /// <summary>
        /// 航廈
        /// </summary>
        [Display(Name = "航廈")]
        public string? terminal { get; set; } = "";
    }

    /// <summary>
    /// ATS_FareSettingsSearchResult
    /// </summary>
    public class ATS_FareSettingsSearchResponse : ATS_FareSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? fs_id { get; set; } = "";

        /// <summary>
        /// 車型名稱
        /// </summary>
        [Display(Name = "車型名稱")]
        public string? cms_name { get; set; } = "";
    }

    /// <summary>
    /// ATS_FareSettingsDelete
    /// </summary>
    public class ATS_FareSettingsDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? fs_id { get; set; } = "";
    }
    #endregion
}
