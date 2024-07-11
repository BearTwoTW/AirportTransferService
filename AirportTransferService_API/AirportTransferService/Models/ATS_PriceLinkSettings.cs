using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_PriceLinkSettings
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="pls_id"></param>
    /// <param name="visible"></param>
    /// <param name="price"></param>
    /// <param name="link"></param>
    public class ATS_PriceLinkSettings(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? pls_id = null,
        string? visible = null,
        decimal? price = null,
        string? link = null)
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
        /// pls_id
        /// </summary>
        [Key]
        public string? pls_id { get; } = pls_id;

        /// <summary>
        /// title
        /// </summary>
        public string? visible { get; } = visible;

        /// <summary>
        /// image
        /// </summary>
        public decimal? price { get; } = price;

        /// <summary>
        /// text1
        /// </summary>
        public string? link { get; } = link;
    }

    /// <summary>
    /// CreateATS_PriceLinkSettingsParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="visible"></param>
    /// <param name="price"></param>
    /// <param name="link"></param>
    public class CreateATS_PriceLinkSettingsParam(
        string? cre_userid,
        DateTime? cre_time,
        string? visible,
        decimal? price,
        string? link) : ATS_PriceLinkSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            visible: visible,
            price: price,
            link: link)
    {
    }

    /// <summary>
    /// UpdateATS_PriceLinkSettingsParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="pls_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="visible"></param>
    /// <param name="price"></param>
    /// <param name="link"></param>
    public class UpdateATS_PriceLinkSettingsParam(
        DateTime? cre_time,
        string? upd_userid,
        DateTime? upd_time,
        string? pls_id,
        string? cre_userid = api_string_param_no_pass,
        string? visible = api_string_param_no_pass,
        decimal? price = api_numeric_param_no_pass,
        string? link = api_string_param_no_pass) : ATS_PriceLinkSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            upd_userid: upd_userid,
            upd_time: upd_time,
            pls_id: pls_id,
            visible: visible,
            price: price,
            link: link)
    {
    }

    /// <summary>
    /// SearchATS_PriceLinkSettingsParam
    /// </summary>
    /// <param name="pls_id"></param>
    /// <param name="visible"></param>
    /// <param name="price"></param>
    /// <param name="link"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_PriceLinkSettingsParam(
        string? pls_id = null,
        string? visible = null,
        decimal? price = null,
        string? link = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// pls_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_PriceLinkSettings.pls_id")]
        public string? pls_id { get; } = pls_id;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_PriceLinkSettings.visible")]
        public string? visible { get; } = visible;

        /// <summary>
        /// price
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_PriceLinkSettings.price")]
        public decimal? price { get; } = price;

        /// <summary>
        /// link
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_PriceLinkSettings.link")]
        public string? link { get; } = link;

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
    /// SearchATS_PriceLinkSettingsResult
    /// </summary>
    public class SearchATS_PriceLinkSettingsResult : IEquatable<SearchATS_PriceLinkSettingsResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_PriceLinkSettings.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_PriceLinkSettings.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_PriceLinkSettings.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_PriceLinkSettings.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// pls_id
        /// </summary>
        [SQLSource("ATS_PriceLinkSettings.pls_id")]
        public string? pls_id { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("ATS_PriceLinkSettings.visible")]
        public string? visible { get; set; }

        /// <summary>
        /// price
        /// </summary>
        [SQLSource("ATS_PriceLinkSettings.price")]
        public decimal? price { get; set; }

        /// <summary>
        /// link
        /// </summary>
        [SQLSource("ATS_PriceLinkSettings.link")]
        public string? link { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_PriceLinkSettingsResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_PriceLinkSettingsResult? searchATS_PriceLinkSettingsResult)
        {
            if (searchATS_PriceLinkSettingsResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_PriceLinkSettingsResult)) return true;

            return
                cre_userid == searchATS_PriceLinkSettingsResult.cre_userid &&
                cre_time == searchATS_PriceLinkSettingsResult.cre_time &&
                upd_userid == searchATS_PriceLinkSettingsResult.upd_userid &&
                upd_time == searchATS_PriceLinkSettingsResult.upd_time &&
                pls_id == searchATS_PriceLinkSettingsResult.pls_id &&
                visible == searchATS_PriceLinkSettingsResult.visible &&
                price == searchATS_PriceLinkSettingsResult.price &&
                link == searchATS_PriceLinkSettingsResult.link;
        }
    }

    #region API
    /// <summary>
    /// ATS_PriceLinkSettingsCreate
    /// </summary>
    public class ATS_PriceLinkSettingsCreate
    {
        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見"), YN]
        public string? visible { get; set; } = "Y";

        /// <summary>
        /// 價錢
        /// </summary>
        [Display(Name = "價錢"), Required(ErrorMessage = "請輸入{0}")]
        public decimal? price { get; set; } = 0;

        /// <summary>
        /// 連結
        /// </summary>
        [Display(Name = "連結")]
        public string? link { get; set; } = "";
    }

    /// <summary>
    /// ATS_PriceLinkSettingsUpdate
    /// </summary>
    public class ATS_PriceLinkSettingsUpdate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? pls_id { get; set; } = "";

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

        /// <summary>
        /// 連結
        /// </summary>
        [Display(Name = "連結")]
        public string? link { get; set; } = api_string_param_no_pass;
    }

    /// <summary>
    /// ATS_PriceLinkSettingsSearch
    /// </summary>
    public class ATS_PriceLinkSettingsSearch
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? pls_id { get; set; } = "";

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
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見"), YN]
        public string? visible { get; set; } = "N";

        /// <summary>
        /// 價錢
        /// </summary>
        [Display(Name = "價錢")]
        public decimal? price { get; set; } = 0;

        /// <summary>
        /// 連結
        /// </summary>
        [Display(Name = "連結")]
        public string? link { get; set; } = "";
    }

    /// <summary>
    /// ATS_PriceLinkSettingsSearchResult
    /// </summary>
    public class ATS_PriceLinkSettingsSearchResponse : ATS_PriceLinkSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? pls_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_PriceLinkSettingsDelete
    /// </summary>
    public class ATS_PriceLinkSettingsDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? pls_id { get; set; } = "";
    }
    #endregion
}
