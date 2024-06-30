using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    #region PermissionFunction
    public class PermissionFunction(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? pfl_id = null,
        string? type = null,
        string? name = null,
        string? api_name = null,
        int? join_limit = null)
    {
        public string? cre_userid { get; } = cre_userid;
        public DateTime? cre_time { get; } = cre_time;
        public string? upd_userid { get; } = upd_userid;
        public DateTime? upd_time { get; } = upd_time;
        [Key]
        public int? pfl_id { get; } = pfl_id;
        public string? type { get; } = type;
        public string? name { get; } = name;
        public string? api_name { get; } = api_name;
        public int? join_limit { get; } = join_limit;
    }

    public class CreatePermissionFunctionParam(
        string cre_userid,
        DateTime cre_time,
        string? type = null,
        string? name = null,
        string? api_name = null,
        int? join_limit = null) : PermissionFunction(
              cre_userid: cre_userid,
              cre_time: cre_time,
              type: type,
              name: name,
              api_name: api_name,
              join_limit: join_limit)
    {
    }

    public class UpdatePermissionFunctionParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int pfl_id,
        string? cre_userid = null,
        string? type = null,
        string? name = null,
        string? api_name = null,
        int? join_limit = null) : PermissionFunction(
              upd_userid: upd_userid,
              upd_time: upd_time,
              pfl_id: pfl_id,
              type: type,
              name: name,
              api_name: api_name,
              join_limit: join_limit)
    {
    }

    public class SearchPermissionFunctionParam(
        int? pfl_id = null,
        string? name = null,
        int page = 0,
        int num_per_page = 0)
    {
        [SQLSearchCondition(SQLSearchConditionType.Equal, "PermissionFunctionList.pfl_id")]
        public int? pfl_id { get; } = pfl_id;

        [SQLSearchCondition(SQLSearchConditionType.Like, "PermissionFunctionList.name")]
        public string? name { get; } = name;
        public int page { get; } = page;
        public int num_per_page { get; } = num_per_page;
    }

    public class SearchPermissionFunctionResult
    {
        [SQLSource("PermissionFunctionList.cre_userid")]
        public string? cre_userid { get; set; }

        [SQLSource("PermissionFunctionList.cre_time")]
        public DateTime? cre_time { get; set; }

        [SQLSource("PermissionFunctionList.upd_userid")]
        public string? upd_userid { get; set; }

        [SQLSource("PermissionFunctionList.upd_time")]
        public DateTime? upd_time { get; set; }

        [SQLSource("PermissionFunctionList.pfl_id")]
        public int? pfl_id { get; set; }

        [SQLSource("PermissionFunctionList.type")]
        public string? type { get; set; }

        [SQLSource("PermissionFunctionList.name")]
        public string? name { get; set; }

        [SQLSource("PermissionFunctionList.api_name")]
        public string? api_name { get; set; }

        [SQLSource("PermissionFunctionList.join_limit")]
        public int? join_limit { get; set; }
    }
    #endregion

    #region PermissionFunctionUserDutyJoin
    public class PermissionFunctionUserDutyJoin(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? pfl_id = null,
        int? ud_id = null)
    {
        public string? cre_userid { get; } = cre_userid;
        public DateTime? cre_time { get; } = cre_time;
        public string? upd_userid { get; } = upd_userid;
        public DateTime? upd_time { get; } = upd_time;
        [Key]
        public int? pfl_id { get; } = pfl_id;
        [Key]
        public int? ud_id { get; } = ud_id;
    }

    public class CreatePermissionFunctionUserDutyJoinParam(
        string cre_userid,
        DateTime cre_time,
        int pfl_id,
        int ud_id) : PermissionFunctionUserDutyJoin(
              cre_userid: cre_userid,
              cre_time: cre_time,
              pfl_id: pfl_id,
              ud_id: ud_id)
    {
    }

    public class SearchPermissionFunctionUserDutyJoinParam(
        int? pfl_id = null,
        string? api_name = null,
        List<int>? ud_ids = null)
    {
        public int? pfl_id { get; } = pfl_id;
        public string? api_name { get; } = api_name;
        public List<int>? ud_ids { get; } = ud_ids;
    }

    public class SearchPermissionFunctionUserDutyJoinResult
    {
        public string? cre_userid { get; set; }
        public DateTime? cre_time { get; set; }
        public string? upd_userid { get; set; }
        public DateTime? upd_time { get; set; }
        public int? pfl_id { get; set; }
        public int? ud_id { get; set; }
        public string? ud_code { get; set; }
        public string? ud_name { get; set; }
        public string? api_name { get; set; }
        public int? logic_ul_id { get; set; }
    }
    #endregion

    public class PermissionFunctionSearch
    {
        [Display(Name = "流水號")]
        public int? pfl_id { get; set; }

        [Display(Name = "顯示名稱")]
        public string? name { get; set; } = "";

        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 0;
    }

    public class PermissionFunctionCreate
    {
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "顯示名稱")]
        public string name { get; set; } = "";

        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "api名稱(系統用不給看不給改)")]
        public string api_name { get; set; } = "";

        [Display(Name = "綁定數量限制0就是不限")]
        public int join_limit { get; set; } = 0;
    }

    public class PermissionFunctionUpdate
    {
        [IsNumeric]
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int pfl_id { get; set; } = 0;

        [Display(Name = "顯示名稱")]
        public string? name { get; set; } = api_string_param_no_pass;

        [Display(Name = "api名稱(系統用不給看不給改)")]
        public string? api_name { get; set; } = api_string_param_no_pass;

        [Display(Name = "綁定數量限制0就是不限")]
        public int? join_limit { get; set; } = api_numeric_param_no_pass;
    }

    public class PermissionFunctionDetail
    {
        [IsNumeric]
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int pfl_id { get; set; } = 0;
    }

    public class PermissionFunctionUpdateUserDuty
    {
        [IsNumeric]
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int pfl_id { get; set; } = 0;

        [Display(Name = "職責代碼們")]
        public List<int> ud_ids { get; set; } = [];
    }

    public class CheckValidDatePermission
    {
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "類型")]
        public string type { get; set; } = "";
    }

    public class PermissionFunctionDetailResponse
    {
        public SearchPermissionFunctionResult? info { get; set; }
        public List<SearchPermissionFunctionUserDutyJoinResult>? duty { get; set; }
    }
}

