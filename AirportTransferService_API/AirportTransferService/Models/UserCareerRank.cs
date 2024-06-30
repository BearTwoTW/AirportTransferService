using static AirportTransferService.App_Code.Appsettings;
namespace AirportTransferService.Models
{
    #region UserCareerRank
    /// <summary>
    /// UserCareerRank
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ucr_id"></param>
    /// <param name="career_rank"></param>
    /// <param name="salary_basic"></param>
    /// <param name="salary_diff_per_level"></param>
    /// <param name="max_career_level"></param>
    /// <param name="bonus_json"></param>
    public class UserCareerRank(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? ucr_id = null,
        int? career_rank = null,
        decimal? salary_basic = null,
        decimal? salary_diff_per_level = null,
        int? max_career_level = null,
        string? bonus_json = null)
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
        /// ucr_id
        /// </summary>
        [Key]
        public int? ucr_id { get; } = ucr_id;

        /// <summary>
        /// career_rank
        /// </summary>
        public int? career_rank { get; } = career_rank;

        /// <summary>
        /// salary_basic
        /// </summary>
        public decimal? salary_basic { get; } = salary_basic;

        /// <summary>
        /// salary_diff_per_level
        /// </summary>
        public decimal? salary_diff_per_level { get; } = salary_diff_per_level;

        /// <summary>
        /// max_career_level
        /// </summary>
        public int? max_career_level { get; } = max_career_level;

        /// <summary>
        /// bonus_json
        /// </summary>
        public string? bonus_json { get; } = bonus_json;
    }

    /// <summary>
    /// CreateUserCareerRankParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="career_rank"></param>
    /// <param name="salary_basic"></param>
    /// <param name="salary_diff_per_level"></param>
    /// <param name="max_career_level"></param>
    /// <param name="bonus_json"></param>
    public class CreateUserCareerRankParam(
        string cre_userid,
        DateTime cre_time,
        int? career_rank = null,
        decimal? salary_basic = null,
        decimal? salary_diff_per_level = null,
        int? max_career_level = null,
        string? bonus_json = null) : UserCareerRank(
              cre_userid: cre_userid,
              cre_time: cre_time,
              career_rank: career_rank,
              salary_basic: salary_basic,
              salary_diff_per_level: salary_diff_per_level,
              max_career_level: max_career_level,
              bonus_json: bonus_json)
    {
    }

    /// <summary>
    /// UpdateUserCareerRankParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ucr_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="career_rank"></param>
    /// <param name="salary_basic"></param>
    /// <param name="salary_diff_per_level"></param>
    /// <param name="max_career_level"></param>
    /// <param name="bonus_json"></param>
    public class UpdateUserCareerRankParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int ucr_id,
        string? cre_userid = api_string_param_no_pass,
        int? career_rank = api_numeric_param_no_pass,
        decimal? salary_basic = api_numeric_param_no_pass,
        decimal? salary_diff_per_level = api_numeric_param_no_pass,
        int? max_career_level = api_numeric_param_no_pass,
        string? bonus_json = api_string_param_no_pass) : UserCareerRank(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              ucr_id: ucr_id,
              career_rank: career_rank,
              salary_basic: salary_basic,
              salary_diff_per_level: salary_diff_per_level,
              max_career_level: max_career_level,
              bonus_json: bonus_json)
    {
    }

    /// <summary>
    /// SearchUserCareerRankParam
    /// </summary>
    /// <param name="ucr_id"></param>
    /// <param name="career_rank"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserCareerRankParam(
        int? ucr_id = null,
        int? career_rank = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// ucr_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCareerRank.ucr_id")]
        public int? ucr_id { get; } = ucr_id;

        /// <summary>
        /// career_rank
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCareerRank.career_rank")]
        public int? career_rank { get; } = career_rank;

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
    /// SearchUserCareerRankResult
    /// </summary>
    public class SearchUserCareerRankResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UserCareerRank.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UserCareerRank.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("UserCareerRank.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("UserCareerRank.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ucr_id
        /// </summary>
        [SQLSource("UserCareerRank.ucr_id")]
        public int? ucr_id { get; set; }

        /// <summary>
        /// career_rank
        /// </summary>
        [SQLSource("UserCareerRank.career_rank")]
        public int? career_rank { get; set; }

        /// <summary>
        /// salary_basic
        /// </summary>
        [SQLSource("UserCareerRank.salary_basic")]
        public decimal? salary_basic { get; set; }

        /// <summary>
        /// salary_diff_per_level
        /// </summary>
        [SQLSource("UserCareerRank.salary_diff_per_level")]
        public decimal? salary_diff_per_level { get; set; }

        /// <summary>
        /// max_career_level
        /// </summary>
        [SQLSource("UserCareerRank.max_career_level")]
        public int? max_career_level { get; set; }

        /// <summary>
        /// bounty_json
        /// </summary>
        [SQLSource("UserCareerRank.bonus_json")]
        public string? bonus_json { get; set; }
    }
    #endregion

    #region UserCareerRankHistory
    /// <summary>
    /// UserCareerRankHistory
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ucrh_id"></param>
    /// <param name="user_id"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="ucr_id"></param>
    /// <param name="career_level"></param>
    /// <param name="note"></param>
    public class UserCareerRankHistory(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? ucrh_id = null,
        string? user_id = null,
        DateOnly? date_start = null,
        DateOnly? date_end = null,
        int? ucr_id = null,
        int? career_level = null,
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
        /// ucrh_id
        /// </summary>
        [Key]
        public int? ucrh_id { get; } = ucrh_id;

        /// <summary>
        /// user_id
        /// </summary>
        public string? user_id { get; } = user_id;

        /// <summary>
        /// date_start
        /// </summary>
        public DateOnly? date_start { get; } = date_start;

        /// <summary>
        /// date
        /// </summary>
        public DateOnly? date_end { get; } = date_end;

        /// <summary>
        /// ucr_id
        /// </summary>
        public int? ucr_id { get; } = ucr_id;

        /// <summary>
        /// career_level
        /// </summary>
        public int? career_level { get; } = career_level;

        /// <summary>
        /// note
        /// </summary>
        public string? note { get; } = note;
    }

    /// <summary>
    /// CreateUserCareerRankHistoryParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="user_id"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="ucr_id"></param>
    /// <param name="career_level"></param>
    /// <param name="note"></param>
    public class CreateUserCareerRankHistoryParam(
        string cre_userid,
        DateTime cre_time,
        string? user_id = null,
        DateOnly? date_start = null,
        DateOnly? date_end = null,
        int? ucr_id = null,
        int? career_level = null,
        string? note = null) : UserCareerRankHistory(
              cre_userid: cre_userid,
              cre_time: cre_time,
              user_id: user_id,
              date_start: date_start,
              date_end: date_end,
              ucr_id: ucr_id,
              career_level: career_level,
              note: note)
    {
    }

    /// <summary>
    /// UpdateUserCareerRankHistoryParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ucrh_id"></param>
    /// <param name="user_id"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="cre_userid"></param>
    /// <param name="ucr_id"></param>
    /// <param name="career_level"></param>
    /// <param name="note"></param>
    public class UpdateUserCareerRankHistoryParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int ucrh_id,
        string? user_id,
        DateOnly? date_start,
        DateOnly? date_end,
        string? cre_userid = api_string_param_no_pass,
        int? ucr_id = api_numeric_param_no_pass,
        int? career_level = api_numeric_param_no_pass,
        string? note = api_string_param_no_pass) : UserCareerRankHistory(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              ucrh_id: ucrh_id,
              user_id: user_id,
              date_start: date_start,
              date_end: date_end,
              ucr_id: ucr_id,
              career_level: career_level,
              note: note)
    {
    }

    /// <summary>
    /// SearchUserCareerRankHistoryParam
    /// </summary>
    /// <param name="ucrh_id"></param>
    /// <param name="user_id"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserCareerRankHistoryParam(
        int? ucrh_id = null,
        string? user_id = null,
        DateOnly? date_start = null,
        DateOnly? date_end = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// ucrh_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCareerRankHistory.ucrh_id")]
        public int? ucrh_id { get; } = ucrh_id;

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserCareerRankHistory.user_id")]
        public string? user_id { get; } = user_id;

        /// <summary>
        /// date_start
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeStart, "UserCareerRankHistory.date_start")]
        public DateOnly? date_start { get; } = date_start;

        /// <summary>
        /// data_end
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeEnd, "UserCareerRankHistory.date_end")]
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
    /// SearchUserCareerRankHistoryResult
    /// </summary>
    public class SearchUserCareerRankHistoryResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("UserCareerRankHistory.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("UserCareerRankHistory.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("UserCareerRankHistory.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("UserCareerRankHistory.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ucrh_id
        /// </summary>
        [SQLSource("UserCareerRankHistory.ucrh_id")]
        public int? ucrh_id { get; set; }

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSource("UserCareerRankHistory.user_id")]
        public string? user_id { get; set; }

        /// <summary>
        /// date_start
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [SQLSource("UserCareerRankHistory.date_start")]
        public DateOnly? date_start { get; set; }

        /// <summary>
        /// date_end
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [SQLSource("UserCareerRankHistory.date_end")]
        public DateOnly? date_end { get; set; }

        /// <summary>
        /// ucr_id
        /// </summary>
        [SQLSource("UserCareerRank.ucr_id")]
        public int? ucr_id { get; set; }

        /// <summary>
        /// career_level
        /// </summary>
        [SQLSource("ISNULL(UserCareerRank.career_rank,0)")]
        public int? career_rank { get; set; }

        /// <summary>
        /// career_level
        /// </summary>
        [SQLSource("UserCareerRankHistory.career_level")]
        public int? career_level { get; set; }

        /// <summary>
        /// note
        /// </summary>
        [SQLSource("UserCareerRankHistory.note")]
        public string? note { get; set; }
    }
    #endregion

    /// <summary>
    /// UserCareerRankCreate
    /// </summary>
    public class UserCareerRankCreate
    {
        /// <summary>
        /// career_rank
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "職等")]
        public int career_rank { get; set; } = 0;

        /// <summary>
        /// salary_basic
        /// </summary>
        [Display(Name = "本薪")]
        public decimal salary_basic { get; set; } = 0;

        /// <summary>
        /// salary_diff_per_level
        /// </summary>
        [Display(Name = "各級差額")]
        public decimal salary_diff_per_level { get; set; } = 0;

        /// <summary>
        /// max_career_level
        /// </summary>
        [IsNumeric]
        [Display(Name = "最大職級")]
        public int max_career_level { get; set; } = 0;

        /// <summary>
        /// bonus_KVs
        /// </summary>
        [Display(Name = "津貼們")]
        public List<DictionaryKeyValue> bonus_KVs { get; set; } = [];
    }

    /// <summary>
    /// UserCareerRankUpdate
    /// </summary>
    public class UserCareerRankUpdate
    {
        /// <summary>
        /// ucr_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int ucr_id { get; set; } = 0;

        /// <summary>
        /// career_rank
        /// </summary>
        [Display(Name = "職等")]
        public int? career_rank { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// salary_basic
        /// </summary>
        [Display(Name = "本薪")]
        public decimal? salary_basic { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// salary_diff_per_level
        /// </summary>
        [Display(Name = "各級差額")]
        public decimal? salary_diff_per_level { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// max_career_level
        /// </summary>
        [Display(Name = "最大職級")]
        public int? max_career_level { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// bouns_KVs
        /// </summary>
        [Display(Name = "津貼們")]
        public List<DictionaryKeyValue>? bonus_KVs { get; set; }
    }

    /// <summary>
    /// UserCareerRankSearch
    /// </summary>
    public class UserCareerRankSearch
    {
        /// <summary>
        /// career_rank
        /// </summary>
        [Display(Name = "職等")]
        public int? career_rank { get; set; }
    }

    /// <summary>
    /// UserCareerRankDelete
    /// </summary>
    public class UserCareerRankDelete
    {
        /// <summary>
        /// ucr_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int ucr_id { get; set; } = 0;
    }
}
