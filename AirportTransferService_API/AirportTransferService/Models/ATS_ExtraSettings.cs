using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_ExtraSettings
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="es_id"></param>
    /// <param name="visible"></param>
    /// <param name="type"></param>
    /// <param name="name"></param>
    /// <param name="price"></param>
    public class ATS_ExtraSettings(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? es_id = null,
        string? visible = null,
        string? type = null,
        string? name = null,
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
        /// es_id
        /// </summary>
        [Key]
        public string? es_id { get; } = es_id;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;

        /// <summary>
        /// type
        /// </summary>
        public string? type { get; } = type;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;

        /// <summary>
        /// price
        /// </summary>
        public decimal? price { get; } = price;
    }

    /// <summary>
    /// CreateATS_ExtraSettingsParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="visible"></param>
    /// <param name="type"></param>
    /// <param name="name"></param>
    /// <param name="price"></param>
    public class CreateATS_ExtraSettingsParam(
        string? cre_userid,
        DateTime? cre_time,
        string? visible,
        string? type,
        string? name,
        decimal? price) : ATS_ExtraSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            visible: visible,
            type: type,
            name: name,
            price: price)
    {
    }

    /// <summary>
    /// UpdateATS_ExtraSettingsParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="es_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="visible"></param>
    /// <param name="type"></param>
    /// <param name="name"></param>
    /// <param name="price"></param>
    public class UpdateATS_ExtraSettingsParam(
        DateTime? cre_time,
        string? upd_userid,
        DateTime? upd_time,
        string? es_id,
        string? cre_userid = api_string_param_no_pass,
        string? visible = api_string_param_no_pass,
        string? type = api_string_param_no_pass,
        string? name = api_string_param_no_pass,
        decimal? price = api_numeric_param_no_pass) : ATS_ExtraSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            upd_userid: upd_userid,
            upd_time: upd_time,
            es_id: es_id,
            visible: visible,
            type: type,
            name: name,
            price: price)
    {
    }

    /// <summary>
    /// SearchATS_ExtraSettingsParam
    /// </summary>
    /// <param name="es_id"></param>
    /// <param name="visible"></param>
    /// <param name="type"></param>
    /// <param name="name"></param>
    /// <param name="price"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_ExtraSettingsParam(
        string? es_id = null,
        string? visible = null,
        string? type = null,
        string? name = null,
        decimal? price = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// es_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_ExtraSettings.es_id")]
        public string? es_id { get; } = es_id;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_ExtraSettings.visible")]
        public string? visible { get; } = visible;

        /// <summary>
        /// type
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_ExtraSettings.type")]
        public string? type { get; } = type;

        /// <summary>
        /// name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_ExtraSettings.name")]
        public string? name { get; } = name;

        /// <summary>
        /// price
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_ExtraSettings.price")]
        public decimal? price { get; } = price;

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
    /// SearchATS_ExtraSettingsResult
    /// </summary>
    public class SearchATS_ExtraSettingsResult : IEquatable<SearchATS_ExtraSettingsResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_ExtraSettings.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_ExtraSettings.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_ExtraSettings.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_ExtraSettings.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// es_id
        /// </summary>
        [SQLSource("ATS_ExtraSettings.es_id")]
        public string? es_id { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("ATS_ExtraSettings.visible")]
        public string? visible { get; set; }

        /// <summary>
        /// type
        /// </summary>
        [SQLSource("ATS_ExtraSettings.type")]
        public string? type { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("ATS_ExtraSettings.name")]
        public string? name { get; set; }

        /// <summary>
        /// price
        /// </summary>
        [SQLSource("ATS_ExtraSettings.price")]
        public decimal? price { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_ExtraSettingsResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_ExtraSettingsResult? searchATS_ExtraSettingsResult)
        {
            if (searchATS_ExtraSettingsResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_ExtraSettingsResult)) return true;

            return
                cre_userid == searchATS_ExtraSettingsResult.cre_userid &&
                cre_time == searchATS_ExtraSettingsResult.cre_time &&
                upd_userid == searchATS_ExtraSettingsResult.upd_userid &&
                upd_time == searchATS_ExtraSettingsResult.upd_time &&
                es_id == searchATS_ExtraSettingsResult.es_id &&
                visible == searchATS_ExtraSettingsResult.visible &&
                type == searchATS_ExtraSettingsResult.type &&
                name == searchATS_ExtraSettingsResult.name &&
                price == searchATS_ExtraSettingsResult.price;
        }
    }

    #region API
    /// <summary>
    /// ATS_ExtraSettingsCreate
    /// </summary>
    public class ATS_ExtraSettingsCreate
    {
        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見"), Required(ErrorMessage = "請輸入{0}")]
        public string? visible { get; set; } = "N";

        /// <summary>
        /// 類別
        /// </summary>
        [Display(Name = "類別"), Required(ErrorMessage = "請輸入{0}")]
        public string? type { get; set; } = "";

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱"), Required(ErrorMessage = "請輸入{0}")]
        public string? name { get; set; } = "";

        /// <summary>
        /// 價錢
        /// </summary>
        [Display(Name = "價錢"), Required(ErrorMessage = "請輸入{0}")]
        public decimal? price { get; set; } = 0;
    }

    /// <summary>
    /// ATS_ExtraSettingsUpdate
    /// </summary>
    public class ATS_ExtraSettingsUpdate : ATS_ExtraSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? es_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_ExtraSettingsSearch
    /// </summary>
    public class ATS_ExtraSettingsSearch : ATS_ExtraSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? es_id { get; set; } = "";

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
        [Display(Name = "是否可見")]
        public new string? visible { get; set; } = "N";

        /// <summary>
        /// 類別
        /// </summary>
        [Display(Name = "類別")]
        public new string? type { get; set; } = "";

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱")]
        public new string? name { get; set; } = "";

        /// <summary>
        /// 價錢
        /// </summary>
        [Display(Name = "價錢")]
        public new decimal? price { get; set; } = 0;
    }

    /// <summary>
    /// ATS_ExtraSettingsSearchResult
    /// </summary>
    public class ATS_ExtraSettingsSearchResponse : ATS_ExtraSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? es_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_ExtraSettingsDelete
    /// </summary>
    public class ATS_ExtraSettingsDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? es_id { get; set; } = "";
    }
    #endregion
}
