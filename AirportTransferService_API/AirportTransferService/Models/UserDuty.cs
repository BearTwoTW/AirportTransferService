using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    #region UserDuty
    /// <summary>
    /// UserDuty
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ud_id"></param>
    /// <param name="code"></param>
    /// <param name="name"></param>
    /// <param name="ul_id"></param>
    /// <param name="is_calculate_salary"></param>
    public class UserDuty(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? ud_id = null,
        string? code = null,
        string? name = null,
        int? ul_id = null,
        string? is_calculate_salary = null)
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
        /// ud_id
        /// </summary>
        [Key]
        public int? ud_id { get; } = ud_id;

        /// <summary>
        /// code
        /// </summary>
        public string? code { get; } = code;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;

        /// <summary>
        /// ul_id
        /// </summary>
        public int? ul_id { get; } = ul_id;

        /// <summary>
        /// is_calculate_salary
        /// </summary>
        public string? is_calculate_salary { get; } = is_calculate_salary;
    }

    /// <summary>
    /// CreateUserDutyParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="name"></param>
    /// <param name="code"></param>
    /// <param name="ul_id"></param>
    /// <param name="is_calculate_salary"></param>
    public class CreateUserDutyParam(
        string cre_userid,
        DateTime cre_time,
        string? name,
        string? code = null,
        int? ul_id = null,
        string? is_calculate_salary = null) : UserDuty(
              cre_userid: cre_userid,
              cre_time: cre_time,
              code: code,
              name: name,
              ul_id: ul_id,
              is_calculate_salary: is_calculate_salary)
    {
    }

    /// <summary>
    /// UpdateUserDutyParam
    /// </summary>
    public class UpdateUserDutyParam : UserDuty
    {
        /// <summary>
        /// UpdateUserDutyParam
        /// </summary>
        /// <param name="cre_time"></param>
        /// <param name="upd_userid"></param>
        /// <param name="upd_time"></param>
        /// <param name="ud_id"></param>
        /// <param name="cre_userid"></param>
        /// <param name="name"></param>
        /// <param name="code"></param>
        /// <param name="ul_id"></param>
        /// <param name="is_calculate_salary"></param>
        /// <exception cref="NullReferenceException"></exception>
        public UpdateUserDutyParam(
            DateTime cre_time,
            string upd_userid,
            DateTime upd_time,
            int ud_id,
            string cre_userid = api_string_param_no_pass,
            string? name = api_string_param_no_pass,
            string? code = api_string_param_no_pass,
            int? ul_id = api_numeric_param_no_pass,
            string? is_calculate_salary = api_string_param_no_pass)
            : base(
                  cre_userid: cre_userid,
                  cre_time: cre_time,
                  upd_userid: upd_userid,
                  upd_time: upd_time,
                  ud_id: ud_id,
                  code: code,
                  name: name,
                  ul_id: ul_id,
                  is_calculate_salary: is_calculate_salary)
        {
            if (ud_id <= 0) throw new NullReferenceException(message: "Wrong ud_id");
        }
    }

    /// <summary>
    /// SearchUserDutyParam
    /// </summary>
    /// <param name="ud_id"></param>
    /// <param name="code"></param>
    /// <param name="name"></param>
    /// <param name="ul_id"></param>
    /// <param name="is_calculate_salary"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserDutyParam(
        int? ud_id = null,
        string? code = null,
        string? name = null,
        int? ul_id = null,
        string? is_calculate_salary = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// ud_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UD.ud_id")]
        public int? ud_id { get; } = ud_id;

        /// <summary>
        /// code
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "UD.code")]
        public string? code { get; } = code;

        /// <summary>
        /// name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "UD.name")]
        public string? name { get; } = name;

        /// <summary>
        /// ul_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UD.ul_id")]
        public int? ul_id { get; } = ul_id;

        /// <summary>
        /// is_calculate_salary
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UD.is_calculate_salary")]
        public string? is_calculate_salary { get; } = is_calculate_salary;

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
    /// SearchUserDutyResult
    /// </summary>
    public class SearchUserDutyResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UD.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UD.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("UD.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("UD.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ud_id
        /// </summary>
        [SQLSource("UD.ud_id")]
        public int? ud_id { get; set; }

        /// <summary>
        /// code
        /// </summary>
        [SQLSource("UD.code")]
        public string? code { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("UD.name")]
        public string? name { get; set; }

        /// <summary>
        /// ul_id
        /// </summary>
        [SQLSource("UD.ul_id")]
        public int? ul_id { get; set; }

        /// <summary>
        /// is_calculate_salary
        /// </summary>
        [SQLSource("UD.is_calculate_salary")]
        public string? is_calculate_salary { get; set; }

        /// <summary>
        /// ul_name
        /// </summary>
        [SQLSource("ISNULL(UL.name,'')")]
        public string? ul_name { get; set; }
    }

    /// <summary>
    /// SearchUserOwnDutyResult
    /// </summary>
    public class SearchUserOwnDutyResult
    {
        /// <summary>
        /// ud_id
        /// </summary>
        public int ud_id { get; set; }

        /// <summary>
        /// code
        /// </summary>
        public string code { get; set; } = "";

        /// <summary>
        /// name
        /// </summary>
        public string name { get; set; } = "";

        /// <summary>
        /// ul_id
        /// </summary>
        public int ul_id { get; set; }

        /// <summary>
        /// is_calculate_salary
        /// </summary>
        public string is_calculate_salary { get; set; } = "";

        /// <summary>
        /// isneed
        /// </summary>
        public string isneed { get; set; } = "";

        /// <summary>
        /// source_user_id
        /// </summary>
        public string source_user_id { get; set; } = "";
    }
    #endregion

    #region UserDutyJoin
    /// <summary>
    /// UserDutyJoin
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="id"></param>
    /// <param name="user_id"></param>
    /// <param name="ud_id"></param>
    /// <param name="isneed"></param>
    public class UserDutyJoin(
        string? cre_userid = null,
        DateTime? cre_time = null,
        int? id = null,
        string? user_id = null,
        int? ud_id = null,
        string? isneed = null)
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
        /// id
        /// </summary>
        [Key]
        public int? id { get; } = id;

        /// <summary>
        /// user_id
        /// </summary>
        public string? user_id { get; } = user_id;

        /// <summary>
        /// ud_id
        /// </summary>
        public int? ud_id { get; } = ud_id;

        /// <summary>
        /// isneed
        /// </summary>
        public string? isneed { get; } = isneed;
    }

    /// <summary>
    /// CreateUserDutyJoinParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="user_id"></param>
    /// <param name="ud_id"></param>
    /// <param name="isneed"></param>
    public class CreateUserDutyJoinParam(
        string cre_userid,
        DateTime cre_time,
        string? user_id,
        int? ud_id,
        string? isneed) : UserDutyJoin(
              cre_userid: cre_userid,
              cre_time: cre_time,
              user_id: user_id,
              ud_id: ud_id,
              isneed: isneed)
    {
    }

    /// <summary>
    /// SearchUserDutyJoinParam
    /// </summary>
    /// <param name="id"></param>
    /// <param name="user_id"></param>
    /// <param name="ud_id"></param>
    /// <param name="isneed"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserDutyJoinParam(
        int? id = null,
        string? user_id = null,
        int? ud_id = null,
        string? isneed = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserDutyJoin.id")]
        public int? id { get; } = id;

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserDutyJoin.user_id")]
        public string? user_id { get; } = user_id;

        /// <summary>
        /// ud_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserDutyJoin.ud_id")]
        public int? ud_id { get; } = ud_id;

        /// <summary>
        /// isneed
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserDutyJoin.isneed")]
        public string? isneed { get; } = isneed;

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
    /// SearchUserDutyJoinResult
    /// </summary>
    public class SearchUserDutyJoinResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UserDutyJoin.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UserDutyJoin.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// id
        /// </summary>
        [SQLSource("UserDutyJoin.id")]
        public int? id { get; set; }

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSource("UserDutyJoin.user_id")]
        public string? user_id { get; set; }

        /// <summary>
        /// ud_id
        /// </summary>
        [SQLSource("UserDutyJoin.ud_id")]
        public int? ud_id { get; set; }

        /// <summary>
        /// isneed
        /// </summary>
        [SQLSource("UserDutyJoin.isneed")]
        public string? isneed { get; set; }
    }
    #endregion

    #region UserDutyPermissionJoin
    /// <summary>
    /// UserDutyPermissionJoin
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="id"></param>
    /// <param name="pg_id"></param>
    /// <param name="page_id"></param>
    /// <param name="pc_id"></param>
    /// <param name="ud_id"></param>
    public class UserDutyPermissionJoin(
        string? cre_userid = null,
        DateTime? cre_time = null,
        int? id = null,
        int? pg_id = null,
        int? page_id = null,
        int? pc_id = null,
        int? ud_id = null)
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
        /// id
        /// </summary>
        [Key]
        public int? id { get; } = id;

        /// <summary>
        /// pg_id
        /// </summary>
        public int? pg_id { get; } = pg_id;

        /// <summary>
        /// page_id
        /// </summary>
        public int? page_id { get; } = page_id;

        /// <summary>
        /// pc_id
        /// </summary>
        public int? pc_id { get; } = pc_id;

        /// <summary>
        /// ud_id
        /// </summary>
        public int? ud_id { get; } = ud_id;
    }

    /// <summary>
    /// CreateUserDutyPermissionJoinParam
    /// </summary>
    public class CreateUserDutyPermissionJoinParam : UserDutyPermissionJoin
    {
        /// <summary>
        /// CreateUserDutyPermissionJoinParam
        /// </summary>
        /// <param name="cre_userid"></param>
        /// <param name="cre_time"></param>
        /// <param name="ud_id"></param>
        /// <param name="pg_id"></param>
        /// <param name="page_id"></param>
        /// <param name="pc_id"></param>
        /// <exception cref="NullReferenceException"></exception>
        public CreateUserDutyPermissionJoinParam(
            string cre_userid,
            DateTime cre_time,
            int ud_id,
            int? pg_id = null,
            int? page_id = null,
            int? pc_id = null)
            : base(
                  cre_userid: cre_userid,
                  cre_time: cre_time,
                  pg_id: pg_id,
                  page_id: page_id,
                  pc_id: pc_id,
                  ud_id: ud_id)
        {
            if (ud_id <= 0) throw new NullReferenceException(message: "Wrong ud_id");
        }
    }

    /// <summary>
    /// SearchUserDutyPermissionJoinParam
    /// </summary>
    /// <param name="id"></param>
    /// <param name="pg_id"></param>
    /// <param name="page_id"></param>
    /// <param name="pc_id"></param>
    /// <param name="ud_id"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserDutyPermissionJoinParam(
        int? id = null,
        int? pg_id = null,
        int? page_id = null,
        int? pc_id = null,
        int? ud_id = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserDutyPermissionJoin.id")]
        public int? id { get; } = id;

        /// <summary>
        /// pg_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserDutyPermissionJoin.pg_id")]
        public int? pg_id { get; } = pg_id;

        /// <summary>
        /// page_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserDutyPermissionJoin.page_id")]
        public int? page_id { get; } = page_id;

        /// <summary>
        /// pc_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserDutyPermissionJoin.pc_id")]
        public int? pc_id { get; } = pc_id;

        /// <summary>
        /// ud_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserDutyPermissionJoin.ud_id")]
        public int? ud_id { get; } = ud_id;

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
    /// SearchUserDutyPermissionJoinResult
    /// </summary>
    public class SearchUserDutyPermissionJoinResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UserDutyPermissionJoin.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UserDutyPermissionJoin.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// id
        /// </summary>
        [SQLSource("UserDutyPermissionJoin.id")]
        public int? id { get; set; }

        /// <summary>
        /// pg_id
        /// </summary>
        [SQLSource("UserDutyPermissionJoin.pg_id")]
        public int? pg_id { get; set; }

        /// <summary>
        /// page_id
        /// </summary>
        [SQLSource("UserDutyPermissionJoin.page_id")]
        public int? page_id { get; set; }

        /// <summary>
        /// pc_id
        /// </summary>
        [SQLSource("UserDutyPermissionJoin.pc_id")]
        public int? pc_id { get; set; }

        /// <summary>
        /// ud_id
        /// </summary>
        [SQLSource("UserDutyPermissionJoin.ud_id")]
        public int? ud_id { get; set; }
    }
    #endregion

    #region API
    /// <summary>
    /// UserDutySearch
    /// </summary>
    public class UserDutySearch
    {
        /// <summary>
        /// code
        /// </summary>
        [Display(Name = "代碼")]
        public string? code { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; }

        /// <summary>
        /// is_calculate_salary
        /// </summary>
        [Display(Name = "是否計薪")]
        public string? is_calculate_salary { get; set; }

        /// <summary>
        /// ul_id
        /// </summary>
        [Display(Name = "職務編號")]
        public int? ul_id { get; set; }

        /// <summary>
        /// page
        /// </summary>
        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        /// <summary>
        /// num_per_page
        /// </summary>
        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 0;
    }

    /// <summary>
    /// UserDutyExist
    /// </summary>
    public class UserDutyExist
    {
        /// <summary>
        /// code
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "代碼")]
        public string code { get; set; } = "";
    }

    /// <summary>
    /// UserDutyCreate
    /// </summary>
    public class UserDutyCreate
    {
        /// <summary>
        /// code
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "代碼")]
        public string code { get; set; } = "";

        /// <summary>
        /// name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// is_calculate_salary
        /// </summary>
        [YN]
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "是否計薪")]
        public string is_calculate_salary { get; set; } = "";

        /// <summary>
        /// ul_id
        /// </summary>
        [Display(Name = "職務編號")]
        public int? ul_id { get; set; }
    }

    /// <summary>
    /// UserDutyDetail
    /// </summary>
    public class UserDutyDetail
    {
        /// <summary>
        /// ud_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "職責編號")]
        public int ud_id { get; set; } = 0;
    }

    /// <summary>
    /// UserDutyDetailResponse
    /// </summary>
    public class UserDutyDetailResponse
    {
        /// <summary>
        /// info
        /// </summary>
        public SearchUserDutyResult info { get; set; } = new();

        /// <summary>
        /// pages
        /// </summary>
        public List<int> pages { get; set; } = [];

        /// <summary>
        /// pageControl
        /// </summary>
        public List<int> pageControl { get; set; } = [];
    }

    /// <summary>
    /// UserDutyUpdate
    /// </summary>
    public class UserDutyUpdate
    {
        /// <summary>
        /// ud_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "職責編號")]
        public int ud_id { get; set; }

        /// <summary>
        /// code
        /// </summary>
        [Display(Name = "代碼")]
        public string? code { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// is_calculate_salary
        /// </summary>
        [Display(Name = "是否計薪")]
        public string is_calculate_salary { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// ul_id
        /// </summary>
        [Display(Name = "職務編號")]
        public int? ul_id { get; set; } = api_numeric_param_no_pass;
    }

    /// <summary>
    /// UserDutyUpdatePermission
    /// </summary>
    public class UserDutyUpdatePermission
    {
        /// <summary>
        /// ud_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "職責編號")]
        public int ud_id { get; set; } = 0;

        /// <summary>
        /// permission_list
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "權限代碼")]
        public List<PermissionObject> permission_list { get; set; } = [];
    }

    /// <summary>
    /// UserOwnDutySearch
    /// </summary>
    public class UserOwnDutySearch
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "帳號編號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// page
        /// </summary>
        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        /// <summary>
        /// num_per_page
        /// </summary>
        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 0;
    }
    #endregion
}