using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_WebSettings
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ws_id"></param>
    /// <param name="title"></param>
    /// <param name="image"></param>
    /// <param name="text1"></param>
    /// <param name="text2"></param>
    /// <param name="text3"></param>
    /// <param name="html1"></param>
    /// <param name="html2"></param>
    /// <param name="html3"></param>
    public class ATS_WebSettings(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? ws_id = null,
        string? title = null,
        string? image = null,
        string? text1 = null,
        string? text2 = null,
        string? text3 = null,
        string? html1 = null,
        string? html2 = null,
        string? html3 = null)
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
        /// ws_id
        /// </summary>
        [Key]
        public string? ws_id { get; } = ws_id;

        /// <summary>
        /// title
        /// </summary>
        public string? title { get; } = title;

        /// <summary>
        /// image
        /// </summary>
        public string? image { get; } = image;

        /// <summary>
        /// text1
        /// </summary>
        public string? text1 { get; } = text1;

        /// <summary>
        /// text2
        /// </summary>
        public string? text2 { get; } = text2;

        /// <summary>
        /// text3
        /// </summary>
        public string? text3 { get; } = text3;

        /// <summary>
        /// html1
        /// </summary>
        public string? html1 { get; } = html1;

        /// <summary>
        /// html2
        /// </summary>
        public string? html2 { get; } = html2;

        /// <summary>
        /// html3
        /// </summary>
        public string? html3 { get; } = html3;
    }

    /// <summary>
    /// CreateATS_WebSettingsParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="title"></param>
    /// <param name="image"></param>
    /// <param name="text1"></param>
    /// <param name="text2"></param>
    /// <param name="text3"></param>
    /// <param name="html1"></param>
    /// <param name="html2"></param>
    /// <param name="html3"></param>
    public class CreateATS_WebSettingsParam(
        string? cre_userid,
        DateTime? cre_time,
        string? title,
        string? image,
        string? text1,
        string? text2,
        string? text3,
        string? html1,
        string? html2,
        string? html3) : ATS_WebSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            title: title,
            image: image,
            text1: text1,
            text2: text2,
            text3: text3,
            html1: html1,
            html2: html2,
            html3: html3)
    {
    }

    /// <summary>
    /// UpdateATS_WebSettingsParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ws_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="title"></param>
    /// <param name="image"></param>
    /// <param name="text1"></param>
    /// <param name="text2"></param>
    /// <param name="text3"></param>
    /// <param name="html1"></param>
    /// <param name="html2"></param>
    /// <param name="html3"></param>
    public class UpdateATS_WebSettingsParam(
        DateTime? cre_time,
        string? upd_userid,
        DateTime? upd_time,
        string? ws_id,
        string? cre_userid = api_string_param_no_pass,
        string? title = api_string_param_no_pass,
        string? image = api_string_param_no_pass,
        string? text1 = api_string_param_no_pass,
        string? text2 = api_string_param_no_pass,
        string? text3 = api_string_param_no_pass,
        string? html1 = api_string_param_no_pass,
        string? html2 = api_string_param_no_pass,
        string? html3 = api_string_param_no_pass) : ATS_WebSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            upd_userid: upd_userid,
            upd_time: upd_time,
            ws_id: ws_id,
            title: title,
            image: image,
            text1: text1,
            text2: text2,
            text3: text3,
            html1: html1,
            html2: html2,
            html3: html3)
    {
    }

    /// <summary>
    /// SearchATS_WebSettingsParam
    /// </summary>
    /// <param name="ws_id"></param>
    /// <param name="title"></param>
    /// <param name="image"></param>
    /// <param name="text1"></param>
    /// <param name="text2"></param>
    /// <param name="text3"></param>
    /// <param name="html1"></param>
    /// <param name="html2"></param>
    /// <param name="html3"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_WebSettingsParam(
        string? ws_id = null,
        string? title = null,
        string? image = null,
        string? text1 = null,
        string? text2 = null,
        string? text3 = null,
        string? html1 = null,
        string? html2 = null,
        string? html3 = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// ws_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_WebSettings.ws_id")]
        public string? ws_id { get; } = ws_id;

        /// <summary>
        /// title
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_WebSettings.title")]
        public string? title { get; } = title;

        /// <summary>
        /// image
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_WebSettings.image")]
        public string? image { get; } = image;

        /// <summary>
        /// text1
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_WebSettings.text1")]
        public string? text1 { get; } = text1;

        /// <summary>
        /// text2
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_WebSettings.text2")]
        public string? text2 { get; } = text2;

        /// <summary>
        /// text3
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_WebSettings.text3")]
        public string? text3 { get; } = text3;

        /// <summary>
        /// html1
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_WebSettings.html1")]
        public string? html1 { get; } = html1;

        /// <summary>
        /// html2
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_WebSettings.html2")]
        public string? html2 { get; } = html2;

        /// <summary>
        /// html3
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_WebSettings.html3")]
        public string? html3 { get; } = html3;

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
    /// SearchATS_WebSettingsResult
    /// </summary>
    public class SearchATS_WebSettingsResult : IEquatable<SearchATS_WebSettingsResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_WebSettings.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_WebSettings.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_WebSettings.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_WebSettings.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ws_id
        /// </summary>
        [SQLSource("ATS_WebSettings.ws_id")]
        public string? ws_id { get; set; }

        /// <summary>
        /// title
        /// </summary>
        [SQLSource("ATS_WebSettings.title")]
        public string? title { get; set; }

        /// <summary>
        /// image
        /// </summary>
        [SQLSource("ATS_WebSettings.image")]
        public string? image { get; set; }

        /// <summary>
        /// text1
        /// </summary>
        [SQLSource("ATS_WebSettings.text1")]
        public string? text1 { get; set; }

        /// <summary>
        /// text2
        /// </summary>
        [SQLSource("ATS_WebSettings.text2")]
        public string? text2 { get; set; }

        /// <summary>
        /// text3
        /// </summary>
        [SQLSource("ATS_WebSettings.text3")]
        public string? text3 { get; set; }

        /// <summary>
        /// html1
        /// </summary>
        [SQLSource("ATS_WebSettings.html1")]
        public string? html1 { get; set; }

        /// <summary>
        /// html2
        /// </summary>
        [SQLSource("ATS_WebSettings.html2")]
        public string? html2 { get; set; }

        /// <summary>
        /// html3
        /// </summary>
        [SQLSource("ATS_WebSettings.html3")]
        public string? html3 { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_WebSettingsResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_WebSettingsResult? searchATS_WebSettingsResult)
        {
            if (searchATS_WebSettingsResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_WebSettingsResult)) return true;

            return
                cre_userid == searchATS_WebSettingsResult.cre_userid &&
                cre_time == searchATS_WebSettingsResult.cre_time &&
                upd_userid == searchATS_WebSettingsResult.upd_userid &&
                upd_time == searchATS_WebSettingsResult.upd_time &&
                ws_id == searchATS_WebSettingsResult.ws_id &&
                title == searchATS_WebSettingsResult.title &&
                image == searchATS_WebSettingsResult.image &&
                text1 == searchATS_WebSettingsResult.text1 &&
                text2 == searchATS_WebSettingsResult.text2 &&
                text3 == searchATS_WebSettingsResult.text3 &&
                html1 == searchATS_WebSettingsResult.html1 &&
                html2 == searchATS_WebSettingsResult.html2 &&
                html3 == searchATS_WebSettingsResult.html3;
        }
    }

    #region API
    /// <summary>
    /// ATS_WebSettingsCreate
    /// </summary>
    public class ATS_WebSettingsCreate
    {
        /// <summary>
        /// 標題
        /// </summary>
        [Display(Name = "標題"), Required(ErrorMessage = "請輸入{0}")]
        public string? title { get; set; } = "";

        /// <summary>
        /// 圖片連結
        /// </summary>
        [Display(Name = "圖片連結")]
        public string? image { get; set; } = "";

        /// <summary>
        /// 文字1
        /// </summary>
        [Display(Name = "文字1")]
        public string? text1 { get; set; } = "";

        /// <summary>
        /// 文字2
        /// </summary>
        [Display(Name = "文字2")]
        public string? text2 { get; set; } = "";

        /// <summary>
        /// 文字3
        /// </summary>
        [Display(Name = "文字3")]
        public string? text3 { get; set; } = "";

        /// <summary>
        /// html1
        /// </summary>
        [Display(Name = "html1")]
        public string? html1 { get; set; } = "";

        /// <summary>
        /// html2
        /// </summary>
        [Display(Name = "html2")]
        public string? html2 { get; set; } = "";

        /// <summary>
        /// html3
        /// </summary>
        [Display(Name = "html3")]
        public string? html3 { get; set; } = "";
    }

    /// <summary>
    /// ATS_WebSettingsUpdate
    /// </summary>
    public class ATS_WebSettingsUpdate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? ws_id { get; set; } = "";

        /// <summary>
        /// 標題
        /// </summary>
        [Display(Name = "標題")]
        public string? title { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 圖片連結
        /// </summary>
        [Display(Name = "圖片連結")]
        public string? image { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 文字1
        /// </summary>
        [Display(Name = "文字1")]
        public string? text1 { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 文字2
        /// </summary>
        [Display(Name = "文字2")]
        public string? text2 { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 文字3
        /// </summary>
        [Display(Name = "文字3")]
        public string? text3 { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// html1
        /// </summary>
        [Display(Name = "html1")]
        public string? html1 { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// html2
        /// </summary>
        [Display(Name = "html2")]
        public string? html2 { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// html3
        /// </summary>
        [Display(Name = "html3")]
        public string? html3 { get; set; } = api_string_param_no_pass;
    }

    /// <summary>
    /// ATS_WebSettingsSearch
    /// </summary>
    public class ATS_WebSettingsSearch : ATS_WebSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? ws_id { get; set; } = "";

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
        /// 標題
        /// </summary>
        [Display(Name = "標題")]
        public new string? title { get; set; } = "";
    }

    /// <summary>
    /// ATS_WebSettingsSearchResult
    /// </summary>
    public class ATS_WebSettingsSearchResponse : ATS_WebSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? ws_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_WebSettingsDelete
    /// </summary>
    public class ATS_WebSettingsDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? ws_id { get; set; } = "";
    }
    #endregion
}
