using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// CITYAREAZIP
    /// </summary>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="ZIP"></param>
    public class CITYAREAZIP(
        string city,
        string area,
        string ZIP)
    {
        /// <summary>
        /// city
        /// </summary>
        public string city { get; } = city;

        /// <summary>
        /// area
        /// </summary>
        public string area { get; } = area;

        /// <summary>
        /// ZIP
        /// </summary>
        public string ZIP { get; } = ZIP;
    }

    #region SystemSetting
    /// <summary>
    /// SystemSetting
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ssm_id"></param>
    /// <param name="ssm_name"></param>
    /// <param name="value_json"></param>
    /// <param name="note"></param>
    public class SystemSetting(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? ssm_id = null,
        string? ssm_name = null,
        string? value_json = null,
        string? note = null)
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
        /// ssm_id
        /// </summary>
        [Key]
        public int? ssm_id { get; } = ssm_id;

        /// <summary>
        /// ssm_name
        /// </summary>
        public string? ssm_name { get; } = ssm_name;

        /// <summary>
        /// value_json
        /// </summary>
        public string? value_json { get; } = value_json;

        /// <summary>
        /// note
        /// </summary>
        public string? note { get; } = note;
    }

    /// <summary>
    /// CreateSystemSettingParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="ssm_name"></param>
    /// <param name="value_json"></param>
    /// <param name="note"></param>
    public class CreateSystemSettingParam(
        string cre_userid,
        DateTime cre_time,
        string? ssm_name = null,
        string? value_json = null,
        string? note = null) : SystemSetting(
             cre_userid: cre_userid,
             cre_time: cre_time,
             ssm_name: ssm_name,
             value_json: value_json,
             note: note)
    {
    }

    /// <summary>
    /// UpdateSystemSettingParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ssm_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="ssm_name"></param>
    /// <param name="value_json"></param>
    /// <param name="note"></param>
    public class UpdateSystemSettingParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int ssm_id,
        string? cre_userid = api_string_param_no_pass,
        string? ssm_name = api_string_param_no_pass,
        string? value_json = api_string_param_no_pass,
        string? note = api_string_param_no_pass) : SystemSetting(
             cre_userid: cre_userid,
             cre_time: cre_time,
             upd_userid: upd_userid,
             upd_time: upd_time,
             ssm_id: ssm_id,
             ssm_name: ssm_name,
             value_json: value_json,
             note: note)
    {
    }

    /// <summary>
    /// SearchSystemSettingParam
    /// </summary>
    /// <param name="ssm_id"></param>
    /// <param name="ssm_name"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchSystemSettingParam(
        int? ssm_id = null,
        string? ssm_name = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// ssm_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "SystemSetting.ssm_id")]
        public int? ssm_id { get; } = ssm_id;

        /// <summary>
        /// ssm_name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "SystemSetting.ssm_name")]
        public string? ssm_name { get; } = ssm_name;

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
    /// SearchSystemSettingResult
    /// </summary>
    public class SearchSystemSettingResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("SystemSetting.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("SystemSetting.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("SystemSetting.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("SystemSetting.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ssm_id
        /// </summary>
        [SQLSource("SystemSetting.ssm_id")]
        public int? ssm_id { get; set; }

        /// <summary>
        /// ssm_name
        /// </summary>
        [SQLSource("SystemSetting.ssm_name")]
        public string? ssm_name { get; set; }

        /// <summary>
        /// value_json
        /// </summary>
        [SQLSource("SystemSetting.value_json")]
        public string? value_json { get; set; }

        /// <summary>
        /// note
        /// </summary>
        [SQLSource("SystemSetting.note")]
        public string? note { get; set; }
    }
    #endregion

    /// <summary>
    /// AllSettings
    /// </summary>
    public class AllSettings
    {
        /// <summary>
        /// database_name
        /// </summary>
        [Display(Name = "資料庫名稱")]
        public string database_name { get; set; } = "";

        /// <summary>
        /// company_code
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "公司代碼")]
        public string company_code { get; set; } = "";
    }

    /// <summary>
    /// SystemSettingSearch
    /// </summary>
    public class SystemSettingSearch
    {
        /// <summary>
        /// ssm_name
        /// </summary>
        [Display(Name = "規則名稱")]
        public string ssm_name { get; set; } = "";
    }

    /// <summary>
    /// SystemSettingSearchResponse
    /// </summary>
    public class SystemSettingSearchResponse
    {
        /// <summary>
        /// ssm_id
        /// </summary>
        [Display(Name = "流水號")]
        public int ssm_id { get; set; } = 0;

        /// <summary>
        /// ssm_name
        /// </summary>
        [Display(Name = "規則名稱")]
        public string ssm_name { get; set; } = "";

        /// <summary>
        /// value_json
        /// </summary>
        [Display(Name = "內容們")]
        public string value_json { get; set; } = "";

        /// <summary>
        /// note
        /// </summary>
        [Display(Name = "備註")]
        public string note { get; set; } = "";
    }

    /// <summary>
    /// SystemSettingUpdate
    /// </summary>
    public class SystemSettingUpdate
    {
        /// <summary>
        /// ssm_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int ssm_id { get; set; }

        /// <summary>
        /// value_json
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "內容們")]
        public List<DictionarySystemSetting> value_json { get; set; } = new List<DictionarySystemSetting>();
    }

    /// <summary>
    /// SystemSettingCreate
    /// </summary>
    public class SystemSettingCreate
    {
        /// <summary>
        /// ssm_name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度固定為{1}")]
        [Display(Name = "規則名稱")]
        public string ssm_name { get; set; } = "";

        /// <summary>
        /// value_json
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "內容們")]
        public List<DictionarySystemSetting> value_json { get; set; } = [];

        /// <summary>
        /// note
        /// </summary>
        [MaxLength(50, ErrorMessage = "{0}長度固定為{1}")]
        [Display(Name = "備註")]
        public string note { get; set; } = "";
    }

    /// <summary>
    /// DateTimeTest
    /// </summary>
    public class DateTimeTest
    {
        /// <summary>
        /// datetime
        /// </summary>
        public DateTime? datetime { get; set; }

        /// <summary>
        /// dateonly
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly? dateonly { get; set; }

        //[JsonConverter(typeof(TimeOnlyJsonConverter))]
        //public TimeOnly? timeonly { get; set; }


        //[Required(ErrorMessage = "請輸入{0}")]
        //public List<DictionaryKeyValue>? ss { get; set; } = new List<DictionaryKeyValue>();
        //[Required(ErrorMessage = "請輸入{0}")]
        //public DictionaryKeyValue? s { get; set; } = new DictionaryKeyValue();
    }
}