namespace AirportTransferService.Services
{
    /// <summary>
    /// IUserCareerRank
    /// </summary>
    public interface IUserCareerRank
    {
        #region UserCareerRank
        /// <summary>
        /// CreateUserCareerRank
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        int CreateUserCareerRank(CreateUserCareerRankParam param);

        /// <summary>
        /// SearchUserCareerRank
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchUserCareerRankResult> SearchUserCareerRank(SearchUserCareerRankParam param, List<string> columns, out int page_count);

        /// <summary>
        /// UpdateUserCareerRank
        /// </summary>
        /// <param name="param"></param>
        void UpdateUserCareerRank(UpdateUserCareerRankParam param);

        /// <summary>
        /// DeleteUserCareerRank
        /// </summary>
        /// <param name="ucr_id"></param>
        void DeleteUserCareerRank(int ucr_id);
        #endregion

        #region UserCareerRankHistory
        /// <summary>
        /// SearchUserCareerRankHistory
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchUserCareerRankHistoryResult> SearchUserCareerRankHistory(SearchUserCareerRankHistoryParam param, List<string> columns, out int page_count);

        /// <summary>
        /// CreateUserCareerRankHistory
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        int CreateUserCareerRankHistory(CreateUserCareerRankHistoryParam param);

        /// <summary>
        /// UpdateUserCareerRankHistory
        /// </summary>
        /// <param name="param"></param>
        void UpdateUserCareerRankHistory(UpdateUserCareerRankHistoryParam param);
        #endregion
    }

    /// <summary>
    /// IUserCareerRank_IMPL
    /// </summary>
    public class IUserCareerRank_IMPL : IUserCareerRank
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;

        /// <summary>
        /// _baseService
        /// </summary>
        public readonly IBaseService _baseService;

        /// <summary>
        /// _userDealerInfo
        /// </summary>
        public readonly UserDealerInfo _userDealerInfo;
        private readonly string strConn = "";
        private readonly string db_name = "";

        /// <summary>
        /// IUserCareerRank_IMPL
        /// </summary>
        /// <param name="config"></param>
        /// <param name="baseService"></param>
        public IUserCareerRank_IMPL(IConfiguration config, IBaseService baseService)
        {
            _config = config;
            _baseService = baseService;
            _userDealerInfo = _baseService.GetUserDealerInfo();
            db_name = _config["Database"];
            strConn = _config["sql_conn"].Replace(db_name, _userDealerInfo.ds_dbname);
        }

        #region UserCareerRank
        /// <summary>
        /// CreateUserCareerRank
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public int CreateUserCareerRank(CreateUserCareerRankParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int ucr_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into UserCareerRank({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    ucr_id = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }
            return ucr_id;
        }

        /// <summary>
        /// DeleteUserCareerRank
        /// </summary>
        /// <param name="ucr_id"></param>
        public void DeleteUserCareerRank(int ucr_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from UserCareerRank where ucr_id=@ucr_id";
                    myCommand.Parameters.AddWithValue("@ucr_id", ucr_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        /// <summary>
        /// SearchUserCareerRank
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchUserCareerRankResult> SearchUserCareerRank(SearchUserCareerRankParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchUserCareerRankResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select 
                {SQL.GenerateSQLSelectQuery<SearchUserCareerRankResult>(columns)}
                from UserCareerRank
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                order by career_rank 
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchUserCareerRankResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserCareerRankResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    ucr_id = dt.Columns.Contains("ucr_id") ? dr.Field<int?>("ucr_id") : null,
                    career_rank = dt.Columns.Contains("career_rank") ? dr.Field<int?>("career_rank") : null,
                    salary_basic = dt.Columns.Contains("salary_basic") ? dr.Field<decimal?>("salary_basic") : null,
                    salary_diff_per_level = dt.Columns.Contains("salary_diff_per_level") ? dr.Field<decimal?>("salary_diff_per_level") : null,
                    max_career_level = dt.Columns.Contains("max_career_level") ? dr.Field<int?>("max_career_level") : null,
                    bonus_json = dt.Columns.Contains("bonus_json") ? dr["bonus_json"].ToString() : null
                });
            }

            return result;
        }

        /// <summary>
        /// UpdateUserCareerRank
        /// </summary>
        /// <param name="param"></param>
        public void UpdateUserCareerRank(UpdateUserCareerRankParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update UserCareerRank
                    {str}
                    where ucr_id=@ucr_id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
        #endregion

        #region UserCareerRankHistory
        /// <summary>
        /// SearchUserCareerRankHistory
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchUserCareerRankHistoryResult> SearchUserCareerRankHistory(SearchUserCareerRankHistoryParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchUserCareerRankHistoryResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchUserCareerRankHistoryResult>(columns)}
                from UserCareerRankHistory
                left join UserCareerRank on UserCareerRank.ucr_id=UserCareerRankHistory.ucr_id
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by UserCareerRankHistory.cre_time desc 
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchUserCareerRankHistoryResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserCareerRankHistoryResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    ucrh_id = dt.Columns.Contains("ucrh_id") ? dr.Field<int?>("ucrh_id") : null,
                    user_id = dt.Columns.Contains("user_id") ? dr["user_id"].ToString() : null,
                    date_start = (dt.Columns.Contains("date_start") && dr.Field<DateTime?>("date_start") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("date_start")) : null,
                    date_end = (dt.Columns.Contains("date_end") && dr.Field<DateTime?>("date_end") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("date_end")) : null,
                    ucr_id = dt.Columns.Contains("ucr_id") ? dr.Field<int?>("ucr_id") : null,
                    career_level = dt.Columns.Contains("career_level") ? dr.Field<int?>("career_level") : null,
                    career_rank = dt.Columns.Contains("career_rank") ? dr.Field<int?>("career_rank") : null,
                    note = dt.Columns.Contains("note") ? dr["note"].ToString() : null
                });
            }

            return result;
        }

        /// <summary>
        /// CreateUserCareerRankHistory
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public int CreateUserCareerRankHistory(CreateUserCareerRankHistoryParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int ucrh_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into UserCareerRankHistory({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    ucrh_id = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }
            return ucrh_id;
        }

        /// <summary>
        /// UpdateUserCareerRankHistory
        /// </summary>
        /// <param name="param"></param>
        public void UpdateUserCareerRankHistory(UpdateUserCareerRankHistoryParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update UserCareerRankHistory
                    {str}
                    where ucrh_id=@ucrh_id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
        #endregion
    }
}
