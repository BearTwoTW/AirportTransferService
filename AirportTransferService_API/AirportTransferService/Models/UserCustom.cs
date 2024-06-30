using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    #region UserCustomMaster
    /// <summary>
    /// UserCustomMaster
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ucm_id"></param>
    /// <param name="ucm_name"></param>
    /// <param name="visible"></param>
    public class UserCustomMaster(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? ucm_id = null,
        string? ucm_name = null,
        string? visible = null)
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
        /// ucm_id
        /// </summary>
        [Key]
        public string? ucm_id { get; } = ucm_id;

        /// <summary>
        /// ucm_name
        /// </summary>
        public string? ucm_name { get; } = ucm_name;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;
    }

    /// <summary>
    /// CreateUserCustomMasterParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="ucm_name"></param>
    /// <param name="visible"></param>
    public class CreateUserCustomMasterParam(
        string cre_userid,
        DateTime cre_time,
        string? ucm_name,
        string? visible = null) : UserCustomMaster(
              cre_userid: cre_userid,
              cre_time: cre_time,
              ucm_name: ucm_name,
              visible: visible)
    {
    }

    /// <summary>
    /// UpdateUserCustomMasterParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ucm_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="ucm_name"></param>
    /// <param name="visible"></param>
    public class UpdateUserCustomMasterParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        string ucm_id,
        string cre_userid = api_string_param_no_pass,
        string? ucm_name = api_string_param_no_pass,
        string? visible = api_string_param_no_pass) : UserCustomMaster(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              ucm_id: ucm_id,
              ucm_name: ucm_name,
              visible: visible)
    {
    }

    /// <summary>
    /// SearchUserCustomMasterParam
    /// </summary>
    /// <param name="ucm_id"></param>
    /// <param name="ucm_name"></param>
    /// <param name="visible"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserCustomMasterParam(
        string? ucm_id = null,
        string? ucm_name = null,
        string? visible = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// ucm_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCustomMaster.ucm_id")]
        public string? ucm_id { get; } = ucm_id;

        /// <summary>
        /// ucm_name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "UserCustomMaster.ucm_name")]
        public string? ucm_name { get; } = ucm_name;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCustomMaster.visible")]
        public string? visible { get; } = visible;

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
    /// SearchUserCustomMasterResult
    /// </summary>
    public class SearchUserCustomMasterResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UserCustomMaster.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UserCustomMaster.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("UserCustomMaster.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("UserCustomMaster.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ucm_id
        /// </summary>
        [SQLSource("UserCustomMaster.ucm_id")]
        public string? ucm_id { get; set; }

        /// <summary>
        /// ucm_name
        /// </summary>
        [SQLSource("UserCustomMaster.ucm_name")]
        public string? ucm_name { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("UserCustomMaster.visible")]
        public string? visible { get; set; }
    }
    #endregion

    #region UserCustomDetail
    /// <summary>
    /// UserCustomDetail
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ucd_id"></param>
    /// <param name="ucm_id"></param>
    /// <param name="ucd_name"></param>
    /// <param name="type"></param>
    /// <param name="order"></param>
    /// <param name="visible"></param>
    public class UserCustomDetail(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? ucd_id = null,
        string? ucm_id = null,
        string? ucd_name = null,
        string? type = null,
        int? order = null,
        string? visible = null)
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
        /// ucd_id
        /// </summary>
        [Key]
        public int? ucd_id { get; } = ucd_id;

        /// <summary>
        /// ucm_id
        /// </summary>
        public string? ucm_id { get; } = ucm_id;

        /// <summary>
        /// ucd_name
        /// </summary>
        public string? ucd_name { get; } = ucd_name;

        /// <summary>
        /// type
        /// </summary>
        public string? type { get; } = type;

        /// <summary>
        /// order
        /// </summary>
        public int? order { get; } = order;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;
    }

    /// <summary>
    /// CreateUserCustomDetailParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="ucm_id"></param>
    /// <param name="ucd_name"></param>
    /// <param name="type"></param>
    /// <param name="order"></param>
    /// <param name="visible"></param>
    public class CreateUserCustomDetailParam(
        string cre_userid,
        DateTime cre_time,
        string ucm_id,
        string? ucd_name = null,
        string? type = null,
        int? order = null,
        string? visible = null) : UserCustomDetail(
              cre_userid: cre_userid,
              cre_time: cre_time,
              ucm_id: ucm_id,
              ucd_name: ucd_name,
              type: type,
              order: order,
              visible: visible)
    {
    }

    /// <summary>
    /// UpdateUserCustomDetailParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ucd_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="ucm_id"></param>
    /// <param name="ucd_name"></param>
    /// <param name="type"></param>
    /// <param name="order"></param>
    /// <param name="visible"></param>
    public class UpdateUserCustomDetailParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int ucd_id,
        string cre_userid = api_string_param_no_pass,
        string? ucm_id = api_string_param_no_pass,
        string? ucd_name = api_string_param_no_pass,
        string? type = api_string_param_no_pass,
        int? order = api_numeric_param_no_pass,
        string? visible = api_string_param_no_pass) : UserCustomDetail(
              upd_userid: upd_userid,
              upd_time: upd_time,
              ucd_id: ucd_id,
              ucm_id: ucm_id,
              ucd_name: ucd_name,
              type: type,
              order: order,
              visible: visible)
    {
    }

    /// <summary>
    /// SearchUserCustomDetailParam
    /// </summary>
    /// <param name="ucd_id"></param>
    /// <param name="ucm_id"></param>
    /// <param name="ucd_name"></param>
    /// <param name="type"></param>
    /// <param name="visible"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserCustomDetailParam(
        int? ucd_id = null,
        string? ucm_id = null,
        string? ucd_name = null,
        string? type = null,
        string? visible = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// ucd_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCustomDetail.ucd_id")]
        public int? ucd_id { get; } = ucd_id;

        /// <summary>
        /// ucd_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCustomDetail.ucm_id")]
        public string? ucm_id { get; } = ucm_id;

        /// <summary>
        /// ucd_name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "UserCustomDetail.ucd_name")]
        public string? ucd_name { get; } = ucd_name;

        /// <summary>
        /// type
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCustomDetail.type")]
        public string? type { get; } = type;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCustomDetail.visible")]
        public string? visible { get; } = visible;

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
    /// SearchUserCustomDetailResult
    /// </summary>
    public class SearchUserCustomDetailResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UserCustomDetail.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UserCustomDetail.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("UserCustomDetail.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("UserCustomDetail.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ucd_id
        /// </summary>
        [SQLSource("UserCustomDetail.ucd_id")]
        public int? ucd_id { get; set; }

        /// <summary>
        /// ucm_id
        /// </summary>
        [SQLSource("UserCustomDetail.ucm_id")]
        public string? ucm_id { get; set; }

        /// <summary>
        /// ucd_name
        /// </summary>
        [SQLSource("UserCustomDetail.ucd_name")]
        public string? ucd_name { get; set; }

        /// <summary>
        /// type
        /// </summary>
        [SQLSource("UserCustomDetail.type")]
        public string? type { get; set; }

        /// <summary>
        /// order
        /// </summary>
        [SQLSource("UserCustomDetail.[order]")]
        public int? order { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("UserCustomDetail.visible")]
        public string? visible { get; set; }
    }
    #endregion

    #region UserCustom
    /// <summary>
    /// UserCustom
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="uc_id"></param>
    /// <param name="user_id"></param>
    /// <param name="ucm_id"></param>
    /// <param name="ucd_contents"></param>
    public class UserCustom(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? uc_id = null,
        string? user_id = null,
        string? ucm_id = null,
        string? ucd_contents = null)
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
        /// uc_id
        /// </summary>
        [Key]
        public int? uc_id { get; } = uc_id;

        /// <summary>
        /// user_id
        /// </summary>
        public string? user_id { get; } = user_id;

        /// <summary>
        /// ucm_id
        /// </summary>
        public string? ucm_id { get; } = ucm_id;

        /// <summary>
        /// ucd_contents
        /// </summary>
        public string? ucd_contents { get; } = ucd_contents;
    }

    /// <summary>
    /// CreateUserCustomParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="user_id"></param>
    /// <param name="ucm_id"></param>
    /// <param name="ucd_contents"></param>
    public class CreateUserCustomParam(
        string cre_userid,
        DateTime cre_time,
        string? user_id,
        string? ucm_id,
        string? ucd_contents) : UserCustom(
              cre_userid: cre_userid,
              cre_time: cre_time,
              user_id: user_id,
              ucm_id: ucm_id,
              ucd_contents: ucd_contents)
    {
    }

    /// <summary>
    /// UpdateUserCustomParam
    /// </summary>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="uc_id"></param>
    /// <param name="user_id"></param>
    /// <param name="ucm_id"></param>
    /// <param name="ucd_contents"></param>
    public class UpdateUserCustomParam(
        string upd_userid,
        DateTime upd_time,
        int uc_id,
        string? user_id,
        string? ucm_id,
        string? ucd_contents) : UserCustom(
              upd_userid: upd_userid,
              upd_time: upd_time,
              uc_id: uc_id,
              user_id: user_id,
              ucm_id: ucm_id,
              ucd_contents: ucd_contents)
    {
    }

    /// <summary>
    /// SearchUserCustomParam
    /// </summary>
    /// <param name="uc_id"></param>
    /// <param name="user_id"></param>
    /// <param name="ucm_id"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserCustomParam(
        int? uc_id = null,
        string? user_id = null,
        string? ucm_id = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// uc_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCustom.uc_id")]
        public int? uc_id { get; } = uc_id;

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCustom.user_id")]
        public string? user_id { get; } = user_id;

        /// <summary>
        /// ucm_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCustom.ucm_id")]
        public string? ucm_id { get; } = ucm_id;

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
    /// SearchUserCustomResult
    /// </summary>
    public class SearchUserCustomResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UserCustom.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UserCustom.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("UserCustom.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("UserCustom.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// uc_id
        /// </summary>
        [SQLSource("UserCustom.uc_id")]
        public int? uc_id { get; set; }

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSource("UserCustom.user_id")]
        public string? user_id { get; set; }

        /// <summary>
        /// ucm_id
        /// </summary>
        [SQLSource("UserCustom.ucm_id")]
        public string? ucm_id { get; set; }

        /// <summary>
        /// ucd_contents
        /// </summary>
        [SQLSource("UserCustom.ucd_contents")]
        public string? ucd_contents { get; set; }
    }
    #endregion

    /// <summary>
    /// UserCustomMasterSearch
    /// </summary>
    public class UserCustomMasterSearch
    {
        /// <summary>
        /// ucm_id
        /// </summary>
        [Display(Name = "主項流水號")]
        public string? ucm_id { get; set; }

        /// <summary>
        /// ucm_name
        /// </summary>
        [Display(Name = "主項名稱")]
        public string? ucm_name { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; }

        /// <summary>
        /// page
        /// </summary>
        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        /// <summary>
        /// num_per_page
        /// </summary>
        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 10;
    }

    /// <summary>
    /// UserCustomMasterCreate
    /// </summary>
    public class UserCustomMasterCreate
    {
        /// <summary>
        /// ucm_name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "主項名稱")]
        public string ucm_name { get; set; } = "";
    }

    /// <summary>
    /// UserCustomMasterUpdate
    /// </summary>
    public class UserCustomMasterUpdate
    {
        /// <summary>
        /// ucm_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "主項流水號")]
        public string ucm_id { get; set; } = "";

        /// <summary>
        /// ucm_name
        /// </summary>
        [Display(Name = "主項名稱")]
        public string? ucm_name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// visible
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = api_string_param_no_pass;
    }

    /// <summary>
    /// UserCustomDetailSearch
    /// </summary>
    public class UserCustomDetailSearch
    {
        /// <summary>
        /// ucm_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "主項流水號")]
        public string ucm_id { get; set; } = "";

        /// <summary>
        /// ucd_id
        /// </summary>
        [Display(Name = "細項流水號")]
        public int? ucd_id { get; set; }

        /// <summary>
        /// ucd_name
        /// </summary>
        [Display(Name = "細項名稱")]
        public string? ucd_name { get; set; }

        /// <summary>
        /// type
        /// </summary>
        [Display(Name = "種類")]
        public string? type { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; }

        /// <summary>
        /// page
        /// </summary>
        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        /// <summary>
        /// num_per_page
        /// </summary>
        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 10;
    }

    /// <summary>
    /// UserCustomDetailCreate
    /// </summary>
    public class UserCustomDetailCreate
    {
        /// <summary>
        /// ucm_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "主項流水號")]
        public string ucm_id { get; set; } = "";

        /// <summary>
        /// UserCustomDetailCreate_objs
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "自訂細項內容們")]
        public List<UserCustomDetailCreate_obj> UserCustomDetailCreate_objs { get; set; } = [];
    }

    /// <summary>
    /// UserCustomDetailCreate_obj
    /// </summary>
    public class UserCustomDetailCreate_obj
    {
        /// <summary>
        /// ucd_name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "細項名稱")]
        public string ucd_name { get; set; } = "";

        /// <summary>
        /// type
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "種類")]
        public string type { get; set; } = "";

        /// <summary>
        /// order
        /// </summary>
        [IsNumeric]
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "順序")]
        public int order { get; set; } = 1;
    }

    /// <summary>
    /// UserCustomDetailUpdate
    /// </summary>
    public class UserCustomDetailUpdate
    {
        /// <summary>
        /// UserCustomDetailUpdate_objs
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "自訂細項內容們")]
        public List<UserCustomDetailUpdate_obj> UserCustomDetailUpdate_objs { get; set; } = [];
    }

    /// <summary>
    /// UserCustomDetailUpdate_obj
    /// </summary>
    public class UserCustomDetailUpdate_obj
    {
        /// <summary>
        /// ucd_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "細項流水號")]
        public int ucd_id { get; set; } = 0;

        /// <summary>
        /// ucd_name
        /// </summary>
        [Display(Name = "細項名稱")]
        public string ucd_name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// type
        /// </summary>
        [Display(Name = "類別")]
        public string type { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// order
        /// </summary>
        [Display(Name = "順序")]
        public int order { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// visible
        /// </summary>
        [Display(Name = "是否可見")]
        public string visible { get; set; } = api_string_param_no_pass;
    }

    /// <summary>
    /// UserUpdateCustom
    /// </summary>
    public class UserUpdateCustom
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "帳號編號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// ucm_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "自訂主項流水號")]
        public string ucm_id { get; set; } = "";

        /// <summary>
        /// ucd_contents
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "自訂細項編號和內容們")]
        public List<DictionaryKeyValue> ucd_contents { get; set; } = [];
    }

    /// <summary>
    /// UserSearchCustom
    /// </summary>
    public class UserSearchCustom
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "帳號編號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// ucm_id
        /// </summary>
        [Display(Name = "自訂主項流水號")]
        public string? ucm_id { get; set; }
    }

    /// <summary>
    /// UserRelatedCompanyRecordCreate
    /// </summary>
    public class UserRelatedCompanyRecordCreate
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "帳號編號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "企業名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// date_start
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "日期起")]
        public DateOnly? date_start { get; set; }

        /// <summary>
        /// date_end
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "日期迄")]
        public DateOnly? date_end { get; set; }
    }

    /// <summary>
    /// UserRelatedCompanyRecordUpdate
    /// </summary>
    public class UserRelatedCompanyRecordUpdate
    {
        /// <summary>
        /// rcr_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int rcr_id { get; set; } = 0;

        /// <summary>
        /// visible
        /// </summary>
        [YN]
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "是否可見")]
        public string visible { get; set; } = "";
    }

    /// <summary>
    /// UserRelatedCompanyRecordSearch
    /// </summary>
    public class UserRelatedCompanyRecordSearch
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Display(Name = "帳號編號")]
        public string? user_id { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// visible
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// page
        /// </summary>
        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        /// <summary>
        /// num_per_page
        /// </summary>
        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 10;
    }
}