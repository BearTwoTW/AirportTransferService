using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_AirportTerminalSettings
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ats_id"></param>
    /// <param name="visible"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    public class ATS_AirportTerminalSettings(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? ats_id = null,
        string? visible = null,
        string? airport = null,
        string? terminal = null)
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
        /// ats_id
        /// </summary>
        [Key]
        public string? ats_id { get; } = ats_id;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;

        /// <summary>
        /// airport
        /// </summary>
        public string? airport { get; } = airport;

        /// <summary>
        /// terminal
        /// </summary>
        public string? terminal { get; } = terminal;
    }

    /// <summary>
    /// CreateATS_AirportTerminalSettingsParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="visible"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    public class CreateATS_AirportTerminalSettingsParam(
        string? cre_userid,
        DateTime? cre_time,
        string? visible,
        string? airport,
        string? terminal) : ATS_AirportTerminalSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            visible: visible,
            airport: airport,
            terminal: terminal)
    {
    }

    /// <summary>
    /// UpdateATS_AirportTerminalSettingsParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ats_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="visible"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    public class UpdateATS_AirportTerminalSettingsParam(
        DateTime? cre_time,
        string? upd_userid,
        DateTime? upd_time,
        string? ats_id,
        string? cre_userid = api_string_param_no_pass,
        string? visible = api_string_param_no_pass,
        string? airport = api_string_param_no_pass,
        string? terminal = api_string_param_no_pass) : ATS_AirportTerminalSettings(
            cre_userid: cre_userid,
            cre_time: cre_time,
            upd_userid: upd_userid,
            upd_time: upd_time,
            ats_id: ats_id,
            visible: visible,
            airport: airport,
            terminal: terminal)
    {
    }

    /// <summary>
    /// SearchATS_AirportTerminalSettingsParam
    /// </summary>
    /// <param name="ats_id"></param>
    /// <param name="visible"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_AirportTerminalSettingsParam(
        string? ats_id = null,
        string? visible = null,
        string? airport = null,
        string? terminal = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// ats_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_AirportTerminalSettings.ats_id")]
        public string? ats_id { get; } = ats_id;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_AirportTerminalSettings.visible")]
        public string? visible { get; } = visible;

        /// <summary>
        /// airport
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_AirportTerminalSettings.airport")]
        public string? airport { get; } = airport;

        /// <summary>
        /// terminal
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_AirportTerminalSettings.terminal")]
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
    /// SearchATS_AirportTerminalSettingsResult
    /// </summary>
    public class SearchATS_AirportTerminalSettingsResult : IEquatable<SearchATS_AirportTerminalSettingsResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_AirportTerminalSettings.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_AirportTerminalSettings.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_AirportTerminalSettings.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_AirportTerminalSettings.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ats_id
        /// </summary>
        [SQLSource("ATS_AirportTerminalSettings.ats_id")]
        public string? ats_id { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("ATS_AirportTerminalSettings.visible")]
        public string? visible { get; set; }

        /// <summary>
        /// airport
        /// </summary>
        [SQLSource("ATS_AirportTerminalSettings.airport")]
        public string? airport { get; set; }

        /// <summary>
        /// terminal
        /// </summary>
        [SQLSource("ATS_AirportTerminalSettings.terminal")]
        public string? terminal { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_AirportTerminalSettingsResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_AirportTerminalSettingsResult? searchATS_AirportTerminalSettingsResult)
        {
            if (searchATS_AirportTerminalSettingsResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_AirportTerminalSettingsResult)) return true;

            return
                cre_userid == searchATS_AirportTerminalSettingsResult.cre_userid &&
                cre_time == searchATS_AirportTerminalSettingsResult.cre_time &&
                upd_userid == searchATS_AirportTerminalSettingsResult.upd_userid &&
                upd_time == searchATS_AirportTerminalSettingsResult.upd_time &&
                ats_id == searchATS_AirportTerminalSettingsResult.ats_id &&
                visible == searchATS_AirportTerminalSettingsResult.visible &&
                airport == searchATS_AirportTerminalSettingsResult.airport &&
                terminal == searchATS_AirportTerminalSettingsResult.terminal;
        }
    }

    #region API
    /// <summary>
    /// ATS_AirportTerminalSettingsCreate
    /// </summary>
    public class ATS_AirportTerminalSettingsCreate
    {
        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = "n";

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
    }

    /// <summary>
    /// ATS_AirportTerminalSettingsUpdate
    /// </summary>
    public class ATS_AirportTerminalSettingsUpdate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? ats_id { get; set; } = "";

        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 機場
        /// </summary>
        [Display(Name = "機場")]
        public string? airport { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 航廈
        /// </summary>
        [Display(Name = "航廈")]
        public string? terminal { get; set; } = api_string_param_no_pass;
    }

    /// <summary>
    /// ATS_AirportTerminalSettingsSearch
    /// </summary>
    public class ATS_AirportTerminalSettingsSearch : ATS_AirportTerminalSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? ats_id { get; set; } = "";

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
        /// 機場
        /// </summary>
        [Display(Name = "機場")]
        public new string? airport { get; set; } = "";

        /// <summary>
        /// 航廈
        /// </summary>
        [Display(Name = "航廈")]
        public new string? terminal { get; set; } = "";
    }

    /// <summary>
    /// ATS_AirportTerminalSettingsSearchResult
    /// </summary>
    public class ATS_AirportTerminalSettingsSearchResponse : ATS_AirportTerminalSettingsCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? ats_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_AirportTerminalSettingsDelete
    /// </summary>
    public class ATS_AirportTerminalSettingsDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "編號")]
        public string? ats_id { get; set; } = "";
    }
    #endregion
}
