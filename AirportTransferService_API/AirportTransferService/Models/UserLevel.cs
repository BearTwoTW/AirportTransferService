using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    #region UserLevel
    /// <summary>
    /// UserLevel
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ul_id"></param>
    /// <param name="code"></param>
    /// <param name="name"></param>
    /// <param name="parent_id"></param>
    /// <param name="company_id"></param>
    /// <param name="general_manager_id"></param>
    /// <param name="department_id"></param>
    /// <param name="position_id"></param>
    /// <param name="class_id"></param>
    /// <param name="group_id"></param>
    /// <param name="office_id"></param>
    /// <param name="email"></param>
    /// <param name="phone"></param>
    /// <param name="salary_type"></param>
    /// <param name="title"></param>
    /// <param name="maximum"></param>
    /// <param name="note"></param>
    /// <param name="lowest_ucr_id"></param>
    /// <param name="lowest_career_level"></param>
    /// <param name="leave_day_audit"></param>
    /// <param name="level_audit_type"></param>
    /// <param name="perfect_attendance_bonus"></param>
    /// <param name="order_over_discount_audit"></param>
    /// <param name="pdi_price_audit"></param>
    public class UserLevel(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? ul_id = null,
        string? code = null,
        string? name = null,
        int? parent_id = null,
        string? company_id = null,
        string? general_manager_id = null,
        string? department_id = null,
        string? position_id = null,
        string? class_id = null,
        string? group_id = null,
        string? office_id = null,
        string? email = null,
        string? phone = null,
        string? salary_type = null,
        string? title = null,
        int? maximum = null,
        string? note = null,
        int? lowest_ucr_id = null,
        int? lowest_career_level = null,
        int? leave_day_audit = null,
        string? level_audit_type = null,
        decimal? perfect_attendance_bonus = null,
        decimal? order_over_discount_audit = null,
        decimal? pdi_price_audit = null)
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
        /// ul_id
        /// </summary>
        [Key]
        public int? ul_id { get; } = ul_id;

        /// <summary>
        /// code
        /// </summary>
        public string? code { get; } = code;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;

        /// <summary>
        /// parent_id
        /// </summary>
        public int? parent_id { get; } = parent_id;

        /// <summary>
        /// company_id
        /// </summary>
        public string? company_id { get; } = company_id;

        /// <summary>
        /// general_manager_id
        /// </summary>
        public string? general_manager_id { get; } = general_manager_id;

        /// <summary>
        /// department_id
        /// </summary>
        public string? department_id { get; } = department_id;

        /// <summary>
        /// position_id
        /// </summary>
        public string? position_id { get; } = position_id;

        /// <summary>
        /// class_id
        /// </summary>
        public string? class_id { get; } = class_id;

        /// <summary>
        /// group_id
        /// </summary>
        public string? group_id { get; } = group_id;

        /// <summary>
        /// office_id
        /// </summary>
        public string? office_id { get; } = office_id;

        /// <summary>
        /// email
        /// </summary>
        public string? email { get; } = email;

        /// <summary>
        /// phone
        /// </summary>
        public string? phone { get; } = phone;

        /// <summary>
        /// salary_type
        /// </summary>
        public string? salary_type { get; } = salary_type;

        /// <summary>
        /// title
        /// </summary>
        public string? title { get; } = title;

        /// <summary>
        /// maximum
        /// </summary>
        public int? maximum { get; } = maximum;

        /// <summary>
        /// note
        /// </summary>
        public string? note { get; } = note;

        /// <summary>
        /// lowest_ucr_id
        /// </summary>
        public int? lowest_ucr_id { get; } = lowest_ucr_id;

        /// <summary>
        /// lowest_career_level
        /// </summary>
        public int? lowest_career_level { get; } = lowest_career_level;

        /// <summary>
        /// leave_day_audit
        /// </summary>
        public int? leave_day_audit { get; } = leave_day_audit;

        /// <summary>
        /// level_audit_type
        /// </summary>
        public string? level_audit_type { get; } = level_audit_type;

        /// <summary>
        /// perfect_attendance_bonus
        /// </summary>
        public decimal? perfect_attendance_bonus { get; } = perfect_attendance_bonus;

        /// <summary>
        /// order_over_discount_audit
        /// </summary>
        public decimal? order_over_discount_audit { get; } = order_over_discount_audit;

        /// <summary>
        /// pdi_price_audit
        /// </summary>
        public decimal? pdi_price_audit { get; } = pdi_price_audit;
    }

    /// <summary>
    /// CreateUserLevelParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="name"></param>
    /// <param name="parent_id"></param>
    /// <param name="code"></param>
    /// <param name="company_id"></param>
    /// <param name="general_manager_id"></param>
    /// <param name="department_id"></param>
    /// <param name="position_id"></param>
    /// <param name="class_id"></param>
    /// <param name="group_id"></param>
    /// <param name="office_id"></param>
    /// <param name="email"></param>
    /// <param name="phone"></param>
    /// <param name="salary_type"></param>
    /// <param name="title"></param>
    /// <param name="maximum"></param>
    /// <param name="note"></param>
    /// <param name="lowest_ucr_id"></param>
    /// <param name="lowest_career_level"></param>
    /// <param name="leave_day_audit"></param>
    /// <param name="level_audit_type"></param>
    /// <param name="perfect_attendance_bonus"></param>
    /// <param name="order_over_discount_audit"></param>
    /// <param name="pdi_price_audit"></param>
    public class CreateUserLevelParam(
        string cre_userid,
        DateTime cre_time,
        string name,
        int parent_id,
        string? code = null,
        string? company_id = null,
        string? general_manager_id = null,
        string? department_id = null,
        string? position_id = null,
        string? class_id = null,
        string? group_id = null,
        string? office_id = null,
        string? email = null,
        string? phone = null,
        string? salary_type = null,
        string? title = null,
        int? maximum = null,
        string? note = null,
        int? lowest_ucr_id = null,
        int? lowest_career_level = null,
        int? leave_day_audit = null,
        string? level_audit_type = null,
        decimal? perfect_attendance_bonus = null,
        decimal? order_over_discount_audit = null,
        decimal? pdi_price_audit = null) : UserLevel(
              cre_userid: cre_userid,
              cre_time: cre_time,
              code: code,
              name: name,
              parent_id: parent_id,
              company_id: company_id,
              general_manager_id: general_manager_id,
              department_id: department_id,
              position_id: position_id,
              class_id: class_id,
              group_id: group_id,
              office_id: office_id,
              email: email,
              phone: phone,
              salary_type: salary_type,
              title: title,
              maximum: maximum,
              note: note,
              lowest_ucr_id: lowest_ucr_id,
              lowest_career_level: lowest_career_level,
              leave_day_audit: leave_day_audit,
              level_audit_type: level_audit_type,
              perfect_attendance_bonus: perfect_attendance_bonus,
              order_over_discount_audit: order_over_discount_audit,
              pdi_price_audit: pdi_price_audit)
    {
    }

    /// <summary>
    /// UpdateUserLevelParam
    /// </summary>
    public class UpdateUserLevelParam : UserLevel
    {
        /// <summary>
        /// UpdateUserLevelParam
        /// </summary>
        /// <param name="cre_time"></param>
        /// <param name="upd_userid"></param>
        /// <param name="upd_time"></param>
        /// <param name="ul_id"></param>
        /// <param name="cre_userid"></param>
        /// <param name="name"></param>
        /// <param name="parent_id"></param>
        /// <param name="code"></param>
        /// <param name="company_id"></param>
        /// <param name="general_manager_id"></param>
        /// <param name="department_id"></param>
        /// <param name="position_id"></param>
        /// <param name="class_id"></param>
        /// <param name="group_id"></param>
        /// <param name="office_id"></param>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="salary_type"></param>
        /// <param name="title"></param>
        /// <param name="maximum"></param>
        /// <param name="note"></param>
        /// <param name="lowest_ucr_id"></param>
        /// <param name="lowest_career_level"></param>
        /// <param name="leave_day_audit"></param>
        /// <param name="level_audit_type"></param>
        /// <param name="perfect_attendance_bonus"></param>
        /// <param name="order_over_discount_audit"></param>
        /// <param name="pdi_price_audit"></param>
        /// <exception cref="NullReferenceException"></exception>
        /// <exception cref="Exception"></exception>
        public UpdateUserLevelParam(
            DateTime cre_time,
            string upd_userid,
            DateTime upd_time,
            int ul_id,
            string cre_userid = api_string_param_no_pass,
            string? name = api_string_param_no_pass,
            int? parent_id = api_numeric_param_no_pass,
            string? code = api_string_param_no_pass,
            string? company_id = api_string_param_no_pass,
            string? general_manager_id = api_string_param_no_pass,
            string? department_id = api_string_param_no_pass,
            string? position_id = api_string_param_no_pass,
            string? class_id = api_string_param_no_pass,
            string? group_id = api_string_param_no_pass,
            string? office_id = api_string_param_no_pass,
            string? email = api_string_param_no_pass,
            string? phone = api_string_param_no_pass,
            string? salary_type = api_string_param_no_pass,
            string? title = api_string_param_no_pass,
            int? maximum = api_numeric_param_no_pass,
            string? note = api_string_param_no_pass,
            int? lowest_ucr_id = api_numeric_param_no_pass,
            int? lowest_career_level = api_numeric_param_no_pass,
            int? leave_day_audit = api_numeric_param_no_pass,
            string? level_audit_type = api_string_param_no_pass,
            decimal? perfect_attendance_bonus = api_numeric_param_no_pass,
            decimal? order_over_discount_audit = api_numeric_param_no_pass,
            decimal? pdi_price_audit = api_numeric_param_no_pass)
            : base(
                  cre_userid: cre_userid,
                  cre_time: cre_time,
                  upd_userid: upd_userid,
                  upd_time: upd_time,
                  ul_id: ul_id,
                  code: code,
                  name: name,
                  parent_id: parent_id,
                  company_id: company_id,
                  general_manager_id: general_manager_id,
                  department_id: department_id,
                  position_id: position_id,
                  class_id: class_id,
                  group_id: group_id,
                  office_id: office_id,
                  email: email,
                  phone: phone,
                  salary_type: salary_type,
                  title: title,
                  maximum: maximum,
                  note: note,
                  lowest_ucr_id: lowest_ucr_id,
                  lowest_career_level: lowest_career_level,
                  leave_day_audit: leave_day_audit,
                  level_audit_type: level_audit_type,
                  perfect_attendance_bonus: perfect_attendance_bonus,
                  order_over_discount_audit: order_over_discount_audit,
                  pdi_price_audit: pdi_price_audit)
        {
            if (ul_id <= 0) throw new NullReferenceException(message: "Wrong ul_id");
            if (name != null && name.Equals("")) throw new Exception(message: "Empty user_id");
        }
    }

    /// <summary>
    /// SearchUserLevelParam
    /// </summary>
    /// <param name="top_ul_id"></param>
    /// <param name="ul_id"></param>
    /// <param name="ul_ids"></param>
    /// <param name="code"></param>
    /// <param name="name"></param>
    /// <param name="parent_id"></param>
    /// <param name="company_id"></param>
    /// <param name="general_manager_id"></param>
    /// <param name="department_id"></param>
    /// <param name="position_id"></param>
    /// <param name="class_id"></param>
    /// <param name="group_id"></param>
    /// <param name="office_id"></param>
    /// <param name="salary_type"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserLevelParam(
        int top_ul_id = 1,
        int? ul_id = null,
        List<int?>? ul_ids = null,
        string? code = null,
        string? name = null,
        int? parent_id = null,
        string? company_id = null,
        string? general_manager_id = null,
        string? department_id = null,
        string? position_id = null,
        string? class_id = null,
        string? group_id = null,
        string? office_id = null,
        string? salary_type = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// top_ul_id
        /// </summary>
        public int top_ul_id { get; } = top_ul_id;

        /// <summary>
        /// ul_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.ul_id")]
        public int? ul_id { get; } = ul_id;

        /// <summary>
        /// ul_ids
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.In, "UL.ul_id")]
        public List<int?> ul_ids { get; } = ul_ids;

        /// <summary>
        /// code
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "UL.code")]
        public string? code { get; } = code;

        /// <summary>
        /// name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "UL.name")]
        public string? name { get; } = name;

        /// <summary>
        /// parent_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.parent_id")]
        public int? parent_id { get; } = parent_id;

        /// <summary>
        /// company_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.company_id")]
        public string? company_id { get; } = company_id;

        /// <summary>
        /// general_manager_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.general_manager_id")]
        public string? general_manager_id { get; } = general_manager_id;

        /// <summary>
        /// department_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.department_id")]
        public string? department_id { get; } = department_id;

        /// <summary>
        /// position_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.position_id")]
        public string? position_id { get; } = position_id;

        /// <summary>
        /// class_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.class_id")]
        public string? class_id { get; } = class_id;

        /// <summary>
        /// group_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.group_id")]
        public string? group_id { get; } = group_id;

        /// <summary>
        /// office_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.office_id")]
        public string? office_id { get; } = office_id;

        /// <summary>
        /// salary_type
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UL.salary_type")]
        public string? salary_type { get; } = salary_type;

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
    /// SearchUserLevelResult
    /// </summary>
    public class SearchUserLevelResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UL.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UL.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("UL.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("UL.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ul_id
        /// </summary>
        [SQLSource("UL.ul_id")]
        public int? ul_id { get; set; }

        /// <summary>
        /// code
        /// </summary>
        [SQLSource("UL.code")]
        public string? code { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("UL.name")]
        public string? name { get; set; }

        /// <summary>
        /// parent_id
        /// </summary>
        [SQLSource("UL.parent_id")]
        public int? parent_id { get; set; }

        /// <summary>
        /// parent_name
        /// </summary>
        [SQLSource("ISNULL(UL_parent.name,'')")]
        public string? parent_name { get; set; }

        /// <summary>
        /// company_id
        /// </summary>
        [SQLSource("UL.company_id")]
        public string? company_id { get; set; }

        /// <summary>
        /// general_manager_id
        /// </summary>
        [SQLSource("UL.general_manager_id")]
        public string? general_manager_id { get; set; }

        /// <summary>
        /// department_id
        /// </summary>
        [SQLSource("UL.department_id")]
        public string? department_id { get; set; }

        /// <summary>
        /// position_id
        /// </summary>
        [SQLSource("UL.position_id")]
        public string? position_id { get; set; }

        /// <summary>
        /// class_id
        /// </summary>
        [SQLSource("UL.class_id")]
        public string? class_id { get; set; }

        /// <summary>
        /// group_id
        /// </summary>
        [SQLSource("UL.group_id")]
        public string? group_id { get; set; }

        /// <summary>
        /// office_id
        /// </summary>
        [SQLSource("UL.office_id")]
        public string? office_id { get; set; }

        /// <summary>
        /// email
        /// </summary>
        [SQLSource("UL.email")]
        public string? email { get; set; }

        /// <summary>
        /// phone
        /// </summary>
        [SQLSource("UL.phone")]
        public string? phone { get; set; }

        /// <summary>
        /// salary_type
        /// </summary>
        [SQLSource("UL.salary_type")]
        public string? salary_type { get; set; }

        /// <summary>
        /// title
        /// </summary>
        [SQLSource("UL.title")]
        public string? title { get; set; }

        /// <summary>
        /// maximum
        /// </summary>
        [SQLSource("UL.maximum")]
        public int? maximum { get; set; }

        /// <summary>
        /// note
        /// </summary>
        [SQLSource("UL.note")]
        public string? note { get; set; }

        /// <summary>
        /// lowest_ucr_id
        /// </summary>
        [SQLSource("UL.lowest_ucr_id")]
        public int? lowest_ucr_id { get; set; }

        /// <summary>
        /// lowest_career_level
        /// </summary>
        [SQLSource("UL.lowest_career_level")]
        public int? lowest_career_level { get; set; }

        /// <summary>
        /// leave_day_audit
        /// </summary>
        [SQLSource("UL.leave_day_audit")]
        public int? leave_day_audit { get; set; }

        /// <summary>
        /// level_audit_type
        /// </summary>
        [SQLSource("UL.level_audit_type")]
        public string? level_audit_type { get; set; }

        /// <summary>
        /// perfect_attendance_bonus
        /// </summary>
        [SQLSource("UL.perfect_attendance_bonus")]
        public decimal? perfect_attendance_bonus { get; set; }

        /// <summary>
        /// order_over_discount_audit
        /// </summary>
        [SQLSource("UL.order_over_discount_audit")]
        public decimal? order_over_discount_audit { get; set; }

        /// <summary>
        /// pdi_price_audit
        /// </summary>
        [SQLSource("UL.pdi_price_audit")]
        public decimal? pdi_price_audit { get; set; }

        /// <summary>
        /// company_name
        /// </summary>
        [SQLSource("ISNULL(company.name,'')")]
        public string? company_name { get; set; }

        /// <summary>
        /// general_manager_name
        /// </summary>
        [SQLSource("ISNULL(general_manager.name,'')")]
        public string? general_manager_name { get; set; }

        /// <summary>
        /// department_name
        /// </summary>
        [SQLSource("ISNULL(department.name,'')")]
        public string? department_name { get; set; }

        /// <summary>
        /// position_name
        /// </summary>
        [SQLSource("ISNULL(position.name,'')")]
        public string? position_name { get; set; }

        /// <summary>
        /// class_name
        /// </summary>
        [SQLSource("ISNULL(class.name,'')")]
        public string? class_name { get; set; }

        /// <summary>
        /// group_name
        /// </summary>
        [SQLSource("ISNULL([group].name,'')")]
        public string? group_name { get; set; }

        /// <summary>
        /// office_name
        /// </summary>
        [SQLSource("ISNULL(office.name,'')")]
        public string? office_name { get; set; }

        /// <summary>
        /// career_rank
        /// </summary>
        [SQLSource("ISNULL(UserCareerRank.career_rank,0)")]
        public int? career_rank { get; set; }
    }

    /// <summary>
    /// UserLevelTree
    /// </summary>
    /// <param name="ul_id"></param>
    /// <param name="code"></param>
    /// <param name="name"></param>
    /// <param name="parent_id"></param>
    /// <param name="level"></param>
    public class UserLevelTree(int ul_id, string code, string name, int parent_id, int level)
    {
        /// <summary>
        /// ul_id
        /// </summary>
        public int ul_id { get; } = ul_id;

        /// <summary>
        /// code
        /// </summary>
        public string code { get; } = code;

        /// <summary>
        /// name
        /// </summary>
        public string name { get; } = name;

        /// <summary>
        /// parent_id
        /// </summary>
        public int parent_id { get; } = parent_id;

        /// <summary>
        /// level
        /// </summary>
        public int level { get; } = level;

        /// <summary>
        /// level_audit_type
        /// </summary>
        public string level_audit_type { get; }
    }
    #endregion

    #region UserLevelDutyJoin
    /// <summary>
    /// UserLevelDutyJoin
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="id"></param>
    /// <param name="ul_id"></param>
    /// <param name="ud_id"></param>
    public class UserLevelDutyJoin(
        string? cre_userid = null,
        DateTime? cre_time = null,
        int? id = null,
        int? ul_id = null,
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
        /// ul_id
        /// </summary>
        public int? ul_id { get; } = ul_id;

        /// <summary>
        /// ud_id
        /// </summary>
        public int? ud_id { get; } = ud_id;
    }

    /// <summary>
    /// CreateUserLevelDutyJoinParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="ul_id"></param>
    /// <param name="ud_id"></param>
    public class CreateUserLevelDutyJoinParam(
        string cre_userid,
        DateTime cre_time,
        int ul_id,
        int ud_id) : UserLevelDutyJoin(
              cre_userid: cre_userid,
              cre_time: cre_time,
              ul_id: ul_id,
              ud_id: ud_id)
    {
    }

    /// <summary>
    /// SearchUserLevelDutyJoinParam
    /// </summary>
    /// <param name="id"></param>
    /// <param name="ul_id"></param>
    /// <param name="ud_id"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserLevelDutyJoinParam(
        int? id = null,
        int? ul_id = null,
        int? ud_id = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevelDutyJoin.id")]
        public int? id { get; } = id;

        /// <summary>
        /// ul_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevelDutyJoin.ul_id")]
        public int? ul_id { get; } = ul_id;

        /// <summary>
        /// ud_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevelDutyJoin.ud_id")]
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
    /// SearchUserLevelDutyJoinResult
    /// </summary>
    public class SearchUserLevelDutyJoinResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UserLevelDutyJoin.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UserLevelDutyJoin.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// id
        /// </summary>
        [SQLSource("UserLevelDutyJoin.id")]
        public int? id { get; set; }

        /// <summary>
        /// ul_id
        /// </summary>
        [SQLSource("UserLevelDutyJoin.ul_id")]
        public int? ul_id { get; set; }

        /// <summary>
        /// ud_id
        /// </summary>
        [SQLSource("UserLevelDutyJoin.ud_id")]
        public int? ud_id { get; set; }
    }
    #endregion

    #region UserLevelDutyHistory
    /// <summary>
    /// UserLevelDutyHistory
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="uldh_id"></param>
    /// <param name="user_id"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="ul_id"></param>
    /// <param name="duty_json"></param>
    /// <param name="note"></param>
    public class UserLevelDutyHistory(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? uldh_id = null,
        string? user_id = null,
        DateOnly? date_start = null,
        DateOnly? date_end = null,
        int? ul_id = null,
        string? duty_json = null,
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
        /// uldh_id
        /// </summary>
        [Key]
        public int? uldh_id { get; } = uldh_id;

        /// <summary>
        /// user_id
        /// </summary>
        public string? user_id { get; } = user_id;

        /// <summary>
        /// date_start
        /// </summary>
        public DateOnly? date_start { get; } = date_start;

        /// <summary>
        /// date_end
        /// </summary>
        public DateOnly? date_end { get; } = date_end;

        /// <summary>
        /// ul_id
        /// </summary>
        public int? ul_id { get; } = ul_id;

        /// <summary>
        /// duty_json
        /// </summary>
        public string? duty_json { get; } = duty_json;

        /// <summary>
        /// note
        /// </summary>
        public string? note { get; } = note;
    }

    /// <summary>
    /// CreateUserLevelDutyHistoryParam
    /// </summary>
    public class CreateUserLevelDutyHistoryParam : UserLevelDutyHistory
    {
        /// <summary>
        /// CreateUserLevelDutyHistoryParam
        /// </summary>
        /// <param name="cre_userid"></param>
        /// <param name="cre_time"></param>
        /// <param name="user_id"></param>
        /// <param name="date_start"></param>
        /// <param name="date_end"></param>
        /// <param name="ul_id"></param>
        /// <param name="duty_json"></param>
        /// <param name="note"></param>
        /// <exception cref="NullReferenceException"></exception>
        public CreateUserLevelDutyHistoryParam(
            string cre_userid,
            DateTime cre_time,
            string user_id,
            DateOnly? date_start = null,
            DateOnly? date_end = null,
            int? ul_id = null,
            string? duty_json = null,
            string? note = null)
            : base(
                  cre_userid: cre_userid,
                  cre_time: cre_time,
                  user_id: user_id,
                  date_start: date_start,
                  date_end: date_end,
                  ul_id: ul_id,
                  duty_json: duty_json,
                  note: note)
        {
            if (string.IsNullOrEmpty(user_id)) throw new NullReferenceException(message: "Empty user_id");
        }
    }

    /// <summary>
    /// UpdateUserLevelDutyHistoryParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="uldh_id"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="cre_userid"></param>
    /// <param name="user_id"></param>
    /// <param name="ul_id"></param>
    /// <param name="duty_json"></param>
    /// <param name="note"></param>
    public class UpdateUserLevelDutyHistoryParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int uldh_id,
        DateOnly? date_start,
        DateOnly? date_end,
        string cre_userid = api_string_param_no_pass,
        string? user_id = api_string_param_no_pass,
        int? ul_id = api_numeric_param_no_pass,
        string? duty_json = api_string_param_no_pass,
        string? note = api_string_param_no_pass) : UserLevelDutyHistory(
              cre_time: cre_time,
              cre_userid: cre_userid,
              upd_userid: upd_userid,
              upd_time: upd_time,
              uldh_id: uldh_id,
              user_id: user_id,
              date_start: date_start,
              date_end: date_end,
              ul_id: ul_id,
              duty_json: duty_json,
              note: note)
    {
    }

    /// <summary>
    /// SearchUserLevelDutyHistoryParam
    /// </summary>
    /// <param name="uldh_id"></param>
    /// <param name="user_id"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserLevelDutyHistoryParam(
        int? uldh_id = null,
        string? user_id = null,
        DateOnly? date_start = null,
        DateOnly? date_end = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// uldh_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ULDH.uldh_id")]
        public int? uldh_id { get; } = uldh_id;

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ULDH.user_id")]
        public string? user_id { get; } = user_id;

        /// <summary>
        /// date_start
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeStart, "ULDH.date_start")]
        public DateOnly? date_start { get; } = date_start;

        /// <summary>
        /// date_end
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeEnd, "ULDH.date_end")]
        public DateOnly? date_end { get; } = date_end;

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
    /// SearchUserLevelDutyHistoryResult
    /// </summary>
    public class SearchUserLevelDutyHistoryResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ULDH.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ULDH.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ULDH.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ULDH.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// uldh_id
        /// </summary>
        [SQLSource("ULDH.uldh_id")]
        public int? uldh_id { get; set; }

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSource("ULDH.user_id")]
        public string? user_id { get; set; }

        /// <summary>
        /// date_start
        /// </summary>
        [SQLSource("ULDH.date_start")]
        public DateOnly? date_start { get; set; }

        /// <summary>
        /// date_end
        /// </summary>
        [SQLSource("ULDH.date_end")]
        public DateOnly? date_end { get; set; }

        /// <summary>
        /// ul_id
        /// </summary>
        [SQLSource("ULDH.ul_id")]
        public int? ul_id { get; set; }

        /// <summary>
        /// duty_json
        /// </summary>
        [SQLSource("ULDH.duty_json")]
        public string? duty_json { get; set; }

        /// <summary>
        /// note
        /// </summary>
        [SQLSource("ULDH.note")]
        public string? note { get; set; }

        /// <summary>
        /// ul_code
        /// </summary>
        [SQLSource("ISNULL(UserLevel.code,'')")]
        public string? ul_code { get; set; }

        /// <summary>
        /// ul_name
        /// </summary>
        [SQLSource("ISNULL(UserLevel.name,'')")]
        public string? ul_name { get; set; }
    }
    #endregion

    #region API
    /// <summary>
    /// UserLevelSearch
    /// </summary>
    public class UserLevelSearch
    {
        /// <summary>
        /// 代碼
        /// </summary>
        [Display(Name = "代碼")]
        public string? code { get; set; }

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; }

        /// <summary>
        /// 母職務編號
        /// </summary>
        [IsNumeric]
        [Display(Name = "母職務編號")]
        public int? parent_id { get; set; }

        /// <summary>
        /// 公司流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "公司流水號")]
        public string? company_id { get; set; }

        /// <summary>
        /// 總經理室流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "總經理室流水號")]
        public string? general_manager_id { get; set; }

        /// <summary>
        /// 部門流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "部門流水號")]
        public string? department_id { get; set; }

        /// <summary>
        /// 據點流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "據點流水號")]
        public string? position_id { get; set; }

        /// <summary>
        /// 課級流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "課級流水號")]
        public string? class_id { get; set; }

        /// <summary>
        /// 組級流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "組級流水號")]
        public string? group_id { get; set; }

        /// <summary>
        /// 辦公室流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "辦公室流水號")]
        public string? office_id { get; set; }

        /// <summary>
        /// 頁碼
        /// </summary>
        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        /// <summary>
        /// 一頁幾筆
        /// </summary>
        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 0;
    }

    /// <summary>
    /// UserLevelSearchResponse
    /// </summary>
    public class UserLevelSearchResponse
    {
        /// <summary>
        /// 職務編號
        /// </summary>
        [Display(Name = "職務編號")]
        public int ul_id { get; set; } = 0;

        /// <summary>
        /// 代碼
        /// </summary>
        [Display(Name = "代碼")]
        public string code { get; set; } = "";

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// 部門名稱
        /// </summary>
        [Display(Name = "部門名稱")]
        public string department_name { get; set; } = "";

        /// <summary>
        /// 據點名稱
        /// </summary>
        [Display(Name = "據點名稱")]
        public string position_name { get; set; } = "";

        /// <summary>
        /// 母層職務名稱
        /// </summary>
        [Display(Name = "母層職務名稱")]
        public string parent_name { get; set; } = "";
    }

    /// <summary>
    /// UserLevelExist
    /// </summary>
    public class UserLevelExist
    {
        /// <summary>
        /// 代碼
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "代碼")]
        public string code { get; set; } = "";
    }

    /// <summary>
    /// UserLevelCreate
    /// </summary>
    public class UserLevelCreate
    {
        /// <summary>
        /// 代碼
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "代碼")]
        public string code { get; set; } = "";

        /// <summary>
        /// 名稱
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// 母職務編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "母職務編號")]
        public int parent_id { get; set; } = 0;

        /// <summary>
        /// 公司流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "公司流水號")]
        public string? company_id { get; set; }

        /// <summary>
        /// 總經理室流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "總經理室流水號")]
        public string? general_manager_id { get; set; }

        /// <summary>
        /// 部門流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "部門流水號")]
        public string? department_id { get; set; }

        /// <summary>
        /// 據點流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "據點流水號")]
        public string? position_id { get; set; }

        /// <summary>
        /// 課級流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "課級流水號")]
        public string? class_id { get; set; }

        /// <summary>
        /// 組級流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "組級流水號")]
        public string? group_id { get; set; }

        /// <summary>
        /// 辦公室流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "辦公室流水號")]
        public string? office_id { get; set; }

        /// <summary>
        /// 職務信箱
        /// </summary>
        [MaxLength(255, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "職務信箱")]
        public string? email { get; set; }

        /// <summary>
        /// 聯絡方式
        /// </summary>
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "聯絡方式")]
        public string? phone { get; set; }

        /// <summary>
        /// 薪水種類
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "薪水種類")]
        public string? salary_type { get; set; }

        /// <summary>
        /// 職稱
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "職稱")]
        public string? title { get; set; }

        /// <summary>
        /// 可編制人數上限
        /// </summary>
        [IsNumeric]
        [Display(Name = "可編制人數上限")]
        public int? maximum { get; set; }

        /// <summary>
        /// 備註
        /// </summary>
        [Display(Name = "備註")]
        public string? note { get; set; }

        /// <summary>
        /// 最低職等職級流水號
        /// </summary>
        [IsNumeric]
        [Display(Name = "最低職等職級流水號")]
        public int? lowest_ucr_id { get; set; }

        /// <summary>
        /// 最低職級
        /// </summary>
        [IsNumeric]
        [Display(Name = "最低職級")]
        public int? lowest_career_level { get; set; }

        /// <summary>
        /// 請假超過幾天就要審核
        /// </summary>
        [IsNumeric]
        [Display(Name = "請假超過幾天就要審核")]
        public int? leave_day_audit { get; set; }

        /// <summary>
        /// 審核名目和種類們
        /// </summary>
        [Display(Name = "審核名目和種類們")]
        public List<DictionaryKeyValue> level_audit_type { get; set; } = [];

        /// <summary>
        /// 全勤獎金
        /// </summary>
        [IsPlusFloat]
        [Display(Name = "全勤獎金")]
        public decimal? perfect_attendance_bonus { get; set; }

        /// <summary>
        /// 訂單超折金額多少以上要審核
        /// </summary>
        [IsPlusFloat]
        [Display(Name = "訂單超折金額多少以上要審核")]
        public decimal? order_over_discount_audit { get; set; }

        /// <summary>
        /// PDI金額多少以上要審核
        /// </summary>
        [IsNumeric]
        [Display(Name = "PDI金額多少以上要審核")]
        public decimal? pdi_price_audit { get; set; }
    }

    /// <summary>
    /// UserLevelDetail
    /// </summary>
    public class UserLevelDetail
    {
        /// <summary>
        /// 職務編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "職務編號")]
        public int ul_id { get; set; } = 0;
    }

    /// <summary>
    /// UserLevelDetailResponse
    /// </summary>
    public class UserLevelDetailResponse
    {
        /// <summary>
        /// info
        /// </summary>
        public SearchUserLevelResult? info { get; set; }

        /// <summary>
        /// duty
        /// </summary>
        public List<SearchUserDutyResult> duty { get; set; } = [];

        /// <summary>
        /// pages
        /// </summary>
        public List<int?> pages { get; set; } = [];

        /// <summary>
        /// pageControl
        /// </summary>
        public List<int?> pageControl { get; set; } = [];
    }

    /// <summary>
    /// UserLevelUpdate
    /// </summary>
    public class UserLevelUpdate
    {
        /// <summary>
        /// 職務編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "職務編號")]
        public int ul_id { get; set; } = 0;

        /// <summary>
        /// 代碼
        /// </summary>
        [Display(Name = "代碼")]
        public string? code { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 母職務編號
        /// </summary>
        [Display(Name = "母職務編號")]
        public int? parent_id { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 公司流水號
        /// </summary>
        [Display(Name = "公司流水號")]
        public string? company_id { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 總經理室流水號
        /// </summary>
        [Display(Name = "總經理室流水號")]
        public string? general_manager_id { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 部門流水號
        /// </summary>
        [Display(Name = "部門流水號")]
        public string? department_id { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 據點流水號
        /// </summary>
        [Display(Name = "據點流水號")]
        public string? position_id { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 課級流水號
        /// </summary>
        [Display(Name = "課級流水號")]
        public string? class_id { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 組級流水號
        /// </summary>
        [Display(Name = "組級流水號")]
        public string? group_id { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 辦公室流水號
        /// </summary>
        [Display(Name = "辦公室流水號")]
        public string? office_id { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 職務信箱
        /// </summary>
        [Display(Name = "職務信箱")]
        public string? email { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 聯絡方式
        /// </summary>
        [Display(Name = "聯絡方式")]
        public string? phone { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 薪水種類
        /// </summary>
        [Display(Name = "薪水種類")]
        public string? salary_type { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 職稱
        /// </summary>
        [Display(Name = "職稱")]
        public string? title { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 可編制人數上限
        /// </summary>
        [Display(Name = "可編制人數上限")]
        public int? maximum { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 備註
        /// </summary>
        [Display(Name = "備註")]
        public string? note { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 最低職等職級流水號
        /// </summary>
        [Display(Name = "最低職等職級流水號")]
        public int? lowest_ucr_id { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 最低職級
        /// </summary>
        [Display(Name = "最低職級")]
        public int? lowest_career_level { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 請假超過幾天就要審核
        /// </summary>
        [Display(Name = "請假超過幾天就要審核")]
        public int? leave_day_audit { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 審核名目和種類們
        /// </summary>
        [Display(Name = "審核名目和種類們")]
        public List<DictionaryKeyValue> level_audit_type { get; set; } = [];

        /// <summary>
        /// 全勤獎金
        /// </summary>
        [Display(Name = "全勤獎金")]
        public decimal? perfect_attendance_bonus { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 訂單超折金額多少以上要審核
        /// </summary>
        [Display(Name = "訂單超折金額多少以上要審核")]
        public decimal? order_over_discount_audit { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// PDI金額多少以上要審核
        /// </summary>
        [Display(Name = "PDI金額多少以上要審核")]
        public decimal? pdi_price_audit { get; set; } = api_numeric_param_no_pass;
    }

    /// <summary>
    /// UserLevelUpdateAuditType
    /// </summary>
    public class UserLevelUpdateAuditType
    {
        /// <summary>
        /// 職務編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "職務編號")]
        public int ul_id { get; set; } = 0;

        /// <summary>
        /// 審核名目和種類們
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "審核名目和種類們")]
        public List<DictionaryKeyValue> level_audit_type { get; set; } = [];
    }

    /// <summary>
    /// UserLevelUpdateOrderRelate
    /// </summary>
    public class UserLevelUpdateOrderRelate
    {
        /// <summary>
        /// 職務編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "職務編號")]
        public int ul_id { get; set; } = 0;

        /// <summary>
        /// 訂單超折金額多少以上要審核
        /// </summary>
        [Display(Name = "訂單超折金額多少以上要審核")]
        public decimal? order_over_discount_audit { get; set; } = api_numeric_param_no_pass;
    }

    /// <summary>
    /// UserlevelUpdatePDIRelate
    /// </summary>
    public class UserLevelUpdatePDIRelate
    {
        /// <summary>
        /// 職務編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "職務編號")]
        public int ul_id { get; set; } = 0;

        /// <summary>
        /// PDI金額多少以上要審核
        /// </summary>
        [Display(Name = "PDI金額多少以上要審核")]
        public decimal? pdi_price_audit { get; set; } = api_numeric_param_no_pass;
    }

    /// <summary>
    /// UserLevelUpdateDuty
    /// </summary>
    public class UserLevelUpdateDuty
    {
        /// <summary>
        /// 職務編號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "職務編號")]
        public int ul_id { get; set; } = 0;

        /// <summary>
        /// 職責代碼們
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "職責代碼們")]
        public List<int> ud_ids { get; set; } = [];
    }

    /// <summary>
    /// UserLevelTreeDiagram
    /// </summary>
    public class UserLevelTreeDiagram
    {
        private string _ul_id = "2";
        /// <summary>
        /// 職務編號
        /// </summary>
        [IsNumeric]
        [Display(Name = "職務編號")]
        public string ul_id { get { return _ul_id; } set { _ul_id = value; } }
    }
    #endregion
}

