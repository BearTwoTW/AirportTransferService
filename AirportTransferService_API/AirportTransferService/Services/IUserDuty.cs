namespace AirportTransferService.Services
{
    public interface IUserDuty
    {
        #region UserDuty
        int CreateUserDuty(CreateUserDutyParam param);
        List<SearchUserDutyResult> SearchUserDuty(SearchUserDutyParam param, List<string> columns, out int page_count);
        void UpdateUserDuty(UpdateUserDutyParam user_duty);
        void DeleteUserDuty(int ud_id);
        #endregion

        #region UserDutyJoin
        void CreateUserDutyJoin(CreateUserDutyJoinParam param);
        List<SearchUserDutyJoinResult> SearchUserDutyJoin(SearchUserDutyJoinParam param, List<string> columns, out int page_count);
        void DeleteUserDutyJoin(string? user_id, int? ud_id);
        #endregion

        #region UserDutyPermissionJoin
        void CreateUserDutyPermissionJoin(CreateUserDutyPermissionJoinParam param);
        List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin(SearchUserDutyPermissionJoinParam param, List<string> columns, out int page_count);
        void DeleteUserDutyPermissionJoin(int? pg_id, int? page_id, int? pc_id, int? ud_id);
        #endregion
        List<SearchUserOwnDutyResult> SearchUserOwnDuty(string user_id);
    }

    public class IUserDuty_IMPL : IUserDuty
    {
        public readonly IConfiguration _config;
        public readonly IBaseService _baseService;
        public readonly UserDealerInfo _userDealerInfo;

        private readonly string strConn = "";
        private readonly string db_name = "";
        private readonly string head_office_dbo = "";

        public IUserDuty_IMPL(IConfiguration config, IBaseService baseService)
        {
            _config = config;
            _baseService = baseService;
            _userDealerInfo = _baseService.GetUserDealerInfo();
            db_name = _config["Database"];
            strConn = _config["sql_conn"].Replace(db_name, _userDealerInfo.ds_dbname);
            head_office_dbo = $"[{db_name}].[dbo].";
        }

        public int CreateUserDuty(CreateUserDutyParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int ud_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                insert into UserDuty({str_column})
                values({str_value});
                select @@IDENTITY";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    using (SqlDataReader dr = myCommand.ExecuteReader())
                    {
                        dr.Read();
                        ud_id = Convert.ToInt32(dr.GetValue(0));
                        myCommand.Cancel();
                        dr.Close();
                    }
                }
            }
            return ud_id;
        }

        public void DeleteUserDuty(int ud_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = @"delete from UserDuty where ud_id=@ud_id;
                                  delete from UserDutyJoin where ud_id=@ud_id;
                                  delete from UserDutyPermissionJoin where ud_id=@ud_id;
                                  delete from UserLevelDutyHistory where ud_id=@ud_id;
                                  delete from UserLevelDutyJoin where ud_id=@ud_id;";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    myCommand.Parameters.AddWithValue("@ud_id", ud_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchUserDutyResult> SearchUserDuty(SearchUserDutyParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchUserDutyResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select 
                {SQL.GenerateSQLSelectQuery<SearchUserDutyResult>(columns)}
                from UserDuty as UD
                left join UserLevel as UL on UL.ul_id = UD.ul_id
                where 1 = 1  
                {SQL.GenerateSQLWhereQuery(param)}
                order by UD.cre_time desc ";
                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchUserDutyResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserDutyResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    ud_id = dt.Columns.Contains("ud_id") ? dr.Field<int?>("ud_id") : null,
                    code = dt.Columns.Contains("code") ? dr["code"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    ul_id = dt.Columns.Contains("ul_id") ? dr.Field<int?>("ul_id") : null,
                    is_calculate_salary = dt.Columns.Contains("is_calculate_salary") ? dr["is_calculate_salary"].ToString() : null,
                    ul_name = dt.Columns.Contains("ul_name") ? dr["ul_name"].ToString() : null
                });
            }
            return result;
        }

        public void UpdateUserDuty(UpdateUserDutyParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                update UserDuty
                {str}
                where ud_id=@ud_id";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public void CreateUserDutyJoin(CreateUserDutyJoinParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                insert into UserDutyJoin({str_column})
                values({str_value})";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchUserDutyJoinResult> SearchUserDutyJoin(SearchUserDutyJoinParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchUserDutyJoinResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select
                {SQL.GenerateSQLSelectQuery<SearchUserDutyJoinResult>(columns)}
                from UserDutyJoin
                where 1 = 1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by cre_time desc ";
                
                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";
                using (SqlCommand myCommand = new(strSql, myConn))
                {
                    using (SqlDataAdapter myAdapter = new())
                    {
                        if (!string.IsNullOrEmpty(param.user_id)) myCommand.Parameters.AddWithValue("@user_id", param.user_id);
                        if (param.ud_id != null) myCommand.Parameters.AddWithValue("@ud_id", param.ud_id);
                        if (!string.IsNullOrEmpty(param.isneed)) myCommand.Parameters.AddWithValue("@isneed", param.isneed);
                        myAdapter.SelectCommand = myCommand;
                        myAdapter.Fill(dt);
                        myCommand.Cancel();
                    }
                }
            }
            //分頁 把datatable的總筆數拿出來後刪掉
            page_count = (param.page == 0 || param.num_per_page == 0 || dt.Rows.Count == 0) ? 0 : (int)Math.Ceiling(Convert.ToInt32(dt.Rows[0]["C"]) / (decimal)param.num_per_page);

            List<SearchUserDutyJoinResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserDutyJoinResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    id = dt.Columns.Contains("id") ? dr.Field<int?>("id") : null,
                    user_id = dt.Columns.Contains("user_id") ? dr["user_id"].ToString() : null,
                    ud_id = dt.Columns.Contains("ud_id") ? dr.Field<int?>("ud_id") : null,
                    isneed = dt.Columns.Contains("isneed") ? dr["isneed"].ToString() : null
                });
            }
            return result;
        }

        public void DeleteUserDutyJoin(string? user_id, int? ud_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = @"delete from UserDutyJoin where 1=1 ";
                if (!string.IsNullOrEmpty(user_id)) strSql += @" and user_id=@user_id";
                if (ud_id != null) strSql += @" and ud_id=@ud_id";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    if (!string.IsNullOrEmpty(user_id)) myCommand.Parameters.AddWithValue("@user_id", user_id);
                    if (ud_id != null) myCommand.Parameters.AddWithValue("@ud_id", ud_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public void CreateUserDutyPermissionJoin(CreateUserDutyPermissionJoinParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                insert into UserDutyPermissionJoin({str_column})
                values({str_value})";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchUserDutyPermissionJoinResult> SearchUserDutyPermissionJoin(SearchUserDutyPermissionJoinParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchUserDutyPermissionJoinResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select
                {SQL.GenerateSQLSelectQuery<SearchUserDutyPermissionJoinResult>(columns)}
                from UserDutyPermissionJoin
                where 1 = 1  
                {SQL.GenerateSQLWhereQuery(param)}
                order by cre_time desc ";
                
                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";
                
                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchUserDutyPermissionJoinResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserDutyPermissionJoinResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    id = dt.Columns.Contains("id") ? dr.Field<int?>("id") : null,
                    pg_id = dt.Columns.Contains("pg_id") ? dr.Field<int?>("pg_id") : null,
                    page_id = dt.Columns.Contains("page_id") ? dr.Field<int?>("page_id") : null,
                    pc_id = dt.Columns.Contains("pc_id") ? dr.Field<int?>("pc_id") : null,
                    ud_id = dt.Columns.Contains("ud_id") ? dr.Field<int?>("ud_id") : null
                });
            }
            return result;
        }

        public void DeleteUserDutyPermissionJoin(int? pg_id, int? page_id, int? pc_id, int? ud_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = @"delete from UserDutyPermissionJoin where 1=1 ";
                if (pg_id != null) strSql += @" and pg_id=@pg_id";
                if (page_id != null) strSql += @" and page_id=@page_id";
                if (pc_id != null) strSql += @" and pc_id=@pc_id";
                if (ud_id != null) strSql += @" and ud_id=@ud_id";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    if (pg_id != null) myCommand.Parameters.AddWithValue("@pg_id", pg_id);
                    if (page_id != null) myCommand.Parameters.AddWithValue("@page_id", page_id);
                    if (pc_id != null) myCommand.Parameters.AddWithValue("@pc_id", pc_id);
                    if (ud_id != null) myCommand.Parameters.AddWithValue("@ud_id", ud_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchUserOwnDutyResult> SearchUserOwnDuty(string user_id)
        {
            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                with h_正在請假期間且指定我代理的假單的使用者編號們 as(
                    select user_id
                    from LeaveRecord
                    where proxy_user_id=@user_id
                         and GETDATE() between leave_time_start and leave_time_end
                         and status='審核通過'
                    union
                    select @user_id
                    )
                    ,h_使用者們的職務 as(
                    select Users.user_id,ul_id
                    from h_正在請假期間且指定我代理的假單的使用者編號們
                    left join {head_office_dbo}Users on Users.user_id=h_正在請假期間且指定我代理的假單的使用者編號們.user_id
                    )
                    ,h_使用者們有的職責 as(
                    select user_id,ud_id,'' as isneed 
                    from h_使用者們的職務 
                    left join UserLevelDutyJoin on UserLevelDutyJoin.ul_id=h_使用者們的職務.ul_id
                    union
                    select user_id,ud_id,isneed from UserDutyJoin where user_id in (select user_id from h_使用者們的職務)
                    )
                    ,h_使用者本身和代理得到的職責們 as (
                    select a.user_id,a.ud_id,a.isneed from h_使用者們有的職責 a
                    LEFT JOIN (SELECT user_id, ud_id, user_id+convert(varchar,ud_id) AS x FROM h_使用者們有的職責 WHERE isneed = 'N' and user_id<>@user_id) b
                    ON a.ud_id = b.ud_id AND a.user_id = b.user_id
                    where a.ud_id is not null AND b.ud_id IS NULL
                    )
                    select distinct UserDuty.ud_id
                          ,UserDuty.code
                          ,UserDuty.name
                          ,CASE WHEN h_使用者本身和代理得到的職責們.user_id=@user_id THEN h_使用者本身和代理得到的職責們.isneed ELSE '' END as isneed
                          ,UserDuty.is_calculate_salary
                          ,h_使用者本身和代理得到的職責們.user_id as source_user_id
                    from h_使用者本身和代理得到的職責們
                    left join (select ud_id,code,name,is_calculate_salary from UserDuty) as UserDuty on UserDuty.ud_id=h_使用者本身和代理得到的職責們.ud_id";
                using (SqlCommand myCommand = new(strSql, myConn))
                {
                    using (SqlDataAdapter myAdapter = new())
                    {
                        myCommand.Parameters.AddWithValue("@user_id", user_id);
                        myAdapter.SelectCommand = myCommand;
                        myAdapter.Fill(dt);
                        myCommand.Cancel();
                    }
                }
            }

            List<SearchUserOwnDutyResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserOwnDutyResult
                {
                    ud_id = dr.Field<int>("ud_id"),
                    code = dr["code"].ToString() ?? "",
                    name = dr["name"].ToString() ?? "",
                    is_calculate_salary = dr["is_calculate_salary"].ToString() ?? "",
                    isneed = dr["isneed"].ToString() ?? "",
                    source_user_id = dr["source_user_id"].ToString() ?? ""
                });
            }
            return result;
        }
    }
}
