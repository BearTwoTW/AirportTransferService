using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    public class Files(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? file_id = null,
        string? file_code = null,
        string? belong = null,
        string? id = null,
        string? type = null,
        string? path = null,
        string? isvalid = null,
        string? custom_key1 = null,
        string? custom_key2 = null,
        int? seq = null,
        string? url = null)
    {
        public string? cre_userid { get; } = cre_userid;
        public DateTime? cre_time { get; } = cre_time;
        public string? upd_userid { get; } = upd_userid;
        public DateTime? upd_time { get; } = upd_time;
        [Key]
        public int? file_id { get; } = file_id;
        [Key]
        public string? file_code { get; } = file_code;
        public string? belong { get; } = belong;
        public string? id { get; } = id;
        public string? type { get; } = type;
        public string? path { get; } = path;
        public string? isvalid { get; } = isvalid;
        public string? custom_key1 { get; } = custom_key1;
        public string? custom_key2 { get; } = custom_key2;
        public int? seq { get; } = seq;
        public string? url { get; } = url;
    }

    public class CreateFilesParam(
        string cre_userid,
        DateTime cre_time,
        string? belong,
        string? id,
        string? type,
        string? path,
        string? isvalid,
        string? file_code = null,
        string? custom_key1 = null,
        string? custom_key2 = null,
        int? seq = null,
        string? url = null) : Files(
              cre_userid: cre_userid,
              cre_time: cre_time,
              belong: belong,
              id: id,
              type: type,
              path: path,
              isvalid: isvalid,
              file_code: file_code,
              custom_key1: custom_key1,
              custom_key2: custom_key2,
              seq: seq,
              url: url)
    {
    }

    public class UpdateFilesParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int file_id,
        string? cre_userid = api_string_param_no_pass,
        string? file_code = api_string_param_no_pass,
        string? belong = api_string_param_no_pass,
        string? id = api_string_param_no_pass,
        string? type = api_string_param_no_pass,
        string? path = api_string_param_no_pass,
        string? isvalid = api_string_param_no_pass,
        string? custom_key1 = api_string_param_no_pass,
        string? custom_key2 = api_string_param_no_pass,
        int? seq = api_numeric_param_no_pass,
        string? url = api_string_param_no_pass) : Files(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              file_id: file_id,
              file_code: file_code,
              belong: belong,
              id: id,
              type: type,
              path: path,
              isvalid: isvalid,
              custom_key1: custom_key1,
              custom_key2: custom_key2,
              seq: seq,
              url: url)
    {
    }

    public class SearchFilesParam(
        int? file_id = null,
        string? file_code = null,
        List<string>? belongs = null,
        List<string>? ids = null,
        List<string>? types = null,
        string? isvalid = null,
        DateTime? cre_time_start = null,
        DateTime? cre_time_end = null,
        string? custom_key1 = null,
        string? custom_key2 = null,
        int page = 0,
        int num_per_page = 0)
    {

        [SQLSearchCondition(SQLSearchConditionType.Equal, "Files.file_id")]
        public int? file_id { get; } = file_id;

        [SQLSearchCondition(SQLSearchConditionType.Like, "Files.file_code")]
        public string? file_code { get; } = file_code;

        [SQLSearchCondition(SQLSearchConditionType.In, "Files.belong")]
        public List<string>? belongs { get; } = belongs;

        [SQLSearchCondition(SQLSearchConditionType.In, "Files.id")]
        public List<string>? ids { get; } = ids;

        [SQLSearchCondition(SQLSearchConditionType.In, "Files.type")]
        public List<string>? types { get; } = types;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "Files.isvalid")]
        public string? isvalid { get; } = isvalid;

        [SQLSearchCondition(SQLSearchConditionType.RangeStart, "Files.cre_time")]
        public DateTime? cre_time_start { get; } = cre_time_start;

        [SQLSearchCondition(SQLSearchConditionType.RangeEnd, "Files.cre_time")]
        public DateTime? cre_time_end { get; } = cre_time_end;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "Files.custom_key1")]
        public string? custom_key1 { get; } = custom_key1;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "Files.custom_key2")]
        public string? custom_key2 { get; } = custom_key2;
        public int page { get; } = page;
        public int num_per_page { get; } = num_per_page;
    }

    public class SearchFilesResult
    {
        [SQLSource("Files.cre_userid")]
        public string? cre_userid { get; set; }

        [SQLSource("Files.cre_time")]
        public DateTime? cre_time { get; set; }

        [SQLSource("Files.upd_userid")]
        public string? upd_userid { get; set; }

        [SQLSource("Files.upd_time")]
        public DateTime? upd_time { get; set; }

        [SQLSource("Files.file_id")]
        public int? file_id { get; set; }

        [SQLSource("Files.file_code")]
        public string? file_code { get; set; }

        [SQLSource("Files.belong")]
        public string? belong { get; set; }

        [SQLSource("Files.id")]
        public string? id { get; set; }

        [SQLSource("Files.type")]
        public string? type { get; set; }

        [SQLSource("Files.path")]
        public string? path { get; set; }

        [SQLSource("Files.isvalid")]
        public string? isvalid { get; set; }

        [SQLSource("Files.custom_key1")]
        public string? custom_key1 { get; set; }

        [SQLSource("Files.custom_key2")]
        public string? custom_key2 { get; set; }

        [SQLSource("Files.seq")]
        public int? seq { get; set; }

        [SQLSource("Files.url")]
        public string? url { get; set; }
    }

    public class UploadFile
    {
        [Display(Name = "檔案代號")]
        public string file_code { get; set; } = "";

        [Required]
        [Display(Name = "檔案所屬")]
        public string belong { get; set; } = "";

        [Required]
        [Display(Name = "檔案類型")]
        public string type { get; set; } = "";

        [Required]
        [Display(Name = "所屬流水號")]
        public string id { get; set; } = "";

        [Display(Name = "圖片Base64字串")]
        public string base64string { get; set; } = "";

        [Display(Name = "自訂key1")]
        public string custom_key1 { get; set; } = "";

        [Display(Name = "自訂key2")]
        public string custom_key2 { get; set; } = "";

        [Display(Name = "排序")]
        public int? seq { get; set; } = 0;

        [Display(Name = "連結")]
        public string? url { get; set; } = "";
    }

    public class DeleteFile
    {
        [Required]
        [Display(Name = "檔案流水號")]
        public int file_id { get; set; } = 0;
    }

    public class SearchFile
    {
        [Display(Name = "檔案流水號")]
        public int? file_id { get; set; }

        [Display(Name = "檔案所屬")]
        public string? belong { get; set; }

        [Display(Name = "檔案類型")]
        public string? type { get; set; }

        [Display(Name = "所屬流水號")]
        public string? id { get; set; }

        [Display(Name = "建立時間起")]
        public DateTime? cre_time_start { get; set; }

        [Display(Name = "建立時間迄")]
        public DateTime? cre_time_end { get; set; }

        [Display(Name = "是否blob")]
        public bool blob { get; set; } = false;

        [Display(Name = "是否有效")]
        public string? isvalid { get; set; }
    }

    public class MoveFile
    {
        [Display(Name = "檔案流水號")]
        public int file_id { get; set; } = 0;

        [Display(Name = "新檔案所屬")]
        public string belong { get; set; } = "";

        [Display(Name = "新檔案類型")]
        public string type { get; set; } = "";

        [Display(Name = "新所屬流水號")]
        public string id { get; set; } = "";
    }

    public class UploadHtmlPDF : UploadFile
    {
        [Required]
        [Display(Name = "要轉pdf的html")]
        public string pdf_html { get; set; } = "";

        [Display(Name = "html的header")]
        public string header_html { get; set; } = "";

        [Display(Name = "html的header的高度(inch)")]
        public int header_height { get; set; } = 150;

        [Display(Name = "html的footer")]
        public string footer_html { get; set; } = "";

        [Display(Name = "公司代碼")]
        public string company_code { get; set; } = "";
    }

    public class GetFile
    {
        [Required]
        [Display(Name = "檔案流水號")]
        public int file_id { get; set; } = 0;
    }

    public class UploadFileResponse
    {
        public int file_id { get; set; } = 0;
        public string path { get; set; } = "";
        public string upload_key { get; set; } = "";
    }

    public class SearchFileResponse : SearchFilesResult
    {
        public string filename { get; set; } = "";
        public string custom_name1 { get; set; } = "";
        public string custom_name2 { get; set; } = "";

        /// <summary>
        /// 各種檔案類型要放的怪內容1
        /// </summary>
        public string custom_value1 { get; set; } = "";

        /// <summary>
        /// 各種檔案類型要放的怪內容2
        /// </summary>
        public string custom_value2 { get; set; } = "";

        public HttpResponseMessage? blob_result { get; set; }
    }

    public class UpdateFile
    {
        /// <summary>
        /// 檔案流水號
        /// </summary>
        [Display(Name = "檔案流水號"), Required(ErrorMessage = "請輸入{0}")]
        public int file_id { get; set; } = 0;

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; } = 0;

        /// <summary>
        /// 連結
        /// </summary>
        [Display(Name = "連結")]
        public string? url { get; set; } = "";

        /// <summary>
        /// 所屬流水號
        /// </summary>
        [Display(Name = "所屬流水號")]
        public string? id { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 自訂key1
        /// </summary>
        [Display(Name = "自訂key1")]
        public string custom_key1 { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 自訂key2
        /// </summary>
        [Display(Name = "自訂key2")]
        public string custom_key2 { get; set; } = api_string_param_no_pass;
    }
}