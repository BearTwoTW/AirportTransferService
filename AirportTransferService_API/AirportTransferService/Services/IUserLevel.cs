namespace AirportTransferService.Services
{
    public interface IUserLevel
    {
        #region UserLevel
        int CreateUserLevel(CreateUserLevelParam param);
        List<SearchUserLevelResult> SearchUserLevel(SearchUserLevelParam param, List<string> columns, out int page_count);

        List<SearchUserLevelResult> SearchUserLevelAll(SearchUserLevelParam param, List<string> columns, out int page_count);
        void UpdateUserLevel(UpdateUserLevelParam param);
        void DeleteUserLevel(int ul_id);

        List<UserLevelTree> SearchUserLevelTreeESC(int top_ul_id, int level);
        List<UserLevelTree> SearchUserLevelTreeDESC(int top_ul_id, int level);
        #endregion

        #region UserLevelDutyJoin
        void CreateUserLevelDutyJoin(CreateUserLevelDutyJoinParam param);
        List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin(SearchUserLevelDutyJoinParam param, List<string> columns, out int page_count);
        void DeleteUserLevelDutyJoin(int? ul_id, int? ud_id);
        #endregion

        #region UserLevelDutyHistory
        List<SearchUserLevelDutyHistoryResult> SearchUserLevelDutyHistory(SearchUserLevelDutyHistoryParam param, List<string> columns, out int page_count);
        int CreateUserLevelDutyHistory(CreateUserLevelDutyHistoryParam param);
        void UpdateUserLevelDutyHistory(UpdateUserLevelDutyHistoryParam param);
        #endregion
    }

    public class IUserLevel_IMPL : IUserLevel
    {
        public readonly IConfiguration _config;
        public readonly IBaseService _baseService;
        public readonly UserDealerInfo _userDealerInfo;
        private readonly string db_name = "";

        private readonly string strConn = "";
        public IUserLevel_IMPL(IConfiguration config, IBaseService baseService)
        {
            _config = config;
            _baseService = baseService;
            _userDealerInfo = _baseService.GetUserDealerInfo();
            db_name = _config["Database"];
            strConn = _config["sql_conn"].Replace(db_name, _userDealerInfo.ds_dbname);
        }

        #region UserLevel
        public int CreateUserLevel(CreateUserLevelParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int ul_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                insert into UserLevel({str_column})
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
                        ul_id = Convert.ToInt32(dr.GetValue(0));
                        myCommand.Cancel();
                        dr.Close();
                    }
                }
            }
            return ul_id;
        }

        public void DeleteUserLevel(int ul_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = @"delete UserLevel where ul_id in (select ul_id from UserLevelTreeESC(@ul_id,0,100))";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    myCommand.Parameters.AddWithValue("@ul_id", ul_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchUserLevelResult> SearchUserLevel(SearchUserLevelParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchUserLevelResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"with ULT as (select * from UserLevelTreeESC(@top_ul_id,0,100))
                                   select 
                                      {SQL.GenerateSQLSelectQuery<SearchUserLevelResult>(columns)}
                                  from UserLevel as UL
                                  left join UserCareerRank on UserCareerRank.ucr_id=UL.lowest_ucr_id
                                  left join (select sps_id,spp_id,name from SPS) as company on company.spp_id='COM' and company.sps_id=UL.company_id
                                  left join (select sps_id,spp_id,name from SPS) as general_manager on general_manager.spp_id='GMO' and general_manager.sps_id=UL.general_manager_id
                                  left join (select sps_id,spp_id,name from SPS) as department on department.spp_id='DEP' and department.sps_id=UL.department_id
                                  left join (select sps_id,spp_id,name from SPS) as position on position.spp_id='POS' and position.sps_id=UL.position_id
                                  left join (select sps_id,spp_id,name from SPS) as class on class.spp_id='CLA' and class.sps_id=UL.class_id
                                  left join (select sps_id,spp_id,name from SPS) as [group] on [group].spp_id='GRP' and [group].sps_id=UL.group_id
                                  left join (select sps_id,spp_id,name from SPS) as office on office.spp_id='OFC' and office.sps_id=UL.office_id
							      left join (select ul_id,name from UserLevel) as UL_parent on UL_parent.ul_id=UL.parent_id
                                  where UL.ul_id in (select ul_id from ULT)  
                                    {SQL.GenerateSQLWhereQuery(param)}
                                    order by UL.cre_time desc ";
                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";
                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchUserLevelResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserLevelResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    ul_id = dt.Columns.Contains("ul_id") ? dr.Field<int?>("ul_id") : null,
                    code = dt.Columns.Contains("code") ? dr["code"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    parent_id = dt.Columns.Contains("parent_id") ? dr.Field<int?>("parent_id") : null,
                    parent_name = dt.Columns.Contains("parent_name") ? dr["parent_name"].ToString() : null,
                    company_id = dt.Columns.Contains("company_id") ? dr["company_id"].ToString() : null,
                    general_manager_id = dt.Columns.Contains("general_manager_id") ? dr["general_manager_id"].ToString() : null,
                    department_id = dt.Columns.Contains("department_id") ? dr["department_id"].ToString() : null,
                    position_id = dt.Columns.Contains("position_id") ? dr["position_id"].ToString() : null,
                    class_id = dt.Columns.Contains("class_id") ? dr["class_id"].ToString() : null,
                    group_id = dt.Columns.Contains("group_id") ? dr["group_id"].ToString() : null,
                    office_id = dt.Columns.Contains("office_id") ? dr["office_id"].ToString() : null,
                    email = dt.Columns.Contains("email") ? dr["email"].ToString() : null,
                    phone = dt.Columns.Contains("phone") ? dr["phone"].ToString() : null,
                    salary_type = dt.Columns.Contains("salary_type") ? dr["salary_type"].ToString() : null,
                    title = dt.Columns.Contains("title") ? dr["title"].ToString() : null,
                    maximum = dt.Columns.Contains("maximum") ? dr.Field<int?>("maximum") : null,
                    note = dt.Columns.Contains("note") ? dr["note"].ToString() : null,
                    lowest_ucr_id = dt.Columns.Contains("lowest_ucr_id") ? dr.Field<int?>("lowest_ucr_id") : null,
                    lowest_career_level = dt.Columns.Contains("lowest_career_level") ? dr.Field<int?>("lowest_career_level") : null,
                    leave_day_audit = dt.Columns.Contains("leave_day_audit") ? dr.Field<int?>("leave_day_audit") : null,
                    level_audit_type = dt.Columns.Contains("level_audit_type") ? dr["level_audit_type"].ToString() : null,
                    perfect_attendance_bonus = dt.Columns.Contains("perfect_attendance_bonus") ? dr.Field<decimal?>("perfect_attendance_bonus") : null,
                    order_over_discount_audit = dt.Columns.Contains("order_over_discount_audit") ? dr.Field<decimal?>("order_over_discount_audit") : null,
                    pdi_price_audit = dt.Columns.Contains("pdi_price_audit") ? dr.Field<decimal?>("pdi_price_audit") : null,
                    company_name = dt.Columns.Contains("company_name") ? dr["company_name"].ToString() : null,
                    general_manager_name = dt.Columns.Contains("general_manager_name") ? dr["general_manager_name"].ToString() : null,
                    department_name = dt.Columns.Contains("department_name") ? dr["department_name"].ToString() : null,
                    position_name = dt.Columns.Contains("position_name") ? dr["position_name"].ToString() : null,
                    class_name = dt.Columns.Contains("class_name") ? dr["class_name"].ToString() : null,
                    group_name = dt.Columns.Contains("group_name") ? dr["group_name"].ToString() : null,
                    office_name = dt.Columns.Contains("office_name") ? dr["office_name"].ToString() : null,
                    career_rank = dt.Columns.Contains("career_rank") ? dr.Field<int?>("career_rank") : null
                });
            }

            return result;
        }

        public List<SearchUserLevelResult> SearchUserLevelAll(SearchUserLevelParam param, List<string> columns, out int page_count)
        {

            if (!SQL.CheckSearchColumn<SearchUserLevelResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"select 
                                      {SQL.GenerateSQLSelectQuery<SearchUserLevelResult>(columns)}
                                  from UserLevel as UL
                                  left join UserCareerRank on UserCareerRank.ucr_id=UL.lowest_ucr_id
                                  left join (select sps_id,spp_id,name from SPS) as company on company.spp_id='COM' and company.sps_id=UL.company_id
                                  left join (select sps_id,spp_id,name from SPS) as general_manager on general_manager.spp_id='GMO' and general_manager.sps_id=UL.general_manager_id
                                  left join (select sps_id,spp_id,name from SPS) as department on department.spp_id='DEP' and department.sps_id=UL.department_id
                                  left join (select sps_id,spp_id,name from SPS) as position on position.spp_id='POS' and position.sps_id=UL.position_id
                                  left join (select sps_id,spp_id,name from SPS) as class on class.spp_id='CLA' and class.sps_id=UL.class_id
                                  left join (select sps_id,spp_id,name from SPS) as [group] on [group].spp_id='GRP' and [group].sps_id=UL.group_id
                                  left join (select sps_id,spp_id,name from SPS) as office on office.spp_id='OFC' and office.sps_id=UL.office_id
							      left join (select ul_id,name from UserLevel) as UL_parent on UL_parent.ul_id=UL.parent_id
                                  where 1=1 
                                    {SQL.GenerateSQLWhereQuery(param)}
                                    order by UL.cre_time desc ";
                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";
                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchUserLevelResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserLevelResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    ul_id = dt.Columns.Contains("ul_id") ? dr.Field<int?>("ul_id") : null,
                    code = dt.Columns.Contains("code") ? dr["code"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    parent_id = dt.Columns.Contains("parent_id") ? dr.Field<int?>("parent_id") : null,
                    parent_name = dt.Columns.Contains("parent_name") ? dr["parent_name"].ToString() : null,
                    company_id = dt.Columns.Contains("company_id") ? dr["company_id"].ToString() : null,
                    general_manager_id = dt.Columns.Contains("general_manager_id") ? dr["general_manager_id"].ToString() : null,
                    department_id = dt.Columns.Contains("department_id") ? dr["department_id"].ToString() : null,
                    position_id = dt.Columns.Contains("position_id") ? dr["position_id"].ToString() : null,
                    class_id = dt.Columns.Contains("class_id") ? dr["class_id"].ToString() : null,
                    group_id = dt.Columns.Contains("group_id") ? dr["group_id"].ToString() : null,
                    office_id = dt.Columns.Contains("office_id") ? dr["office_id"].ToString() : null,
                    email = dt.Columns.Contains("email") ? dr["email"].ToString() : null,
                    phone = dt.Columns.Contains("phone") ? dr["phone"].ToString() : null,
                    salary_type = dt.Columns.Contains("salary_type") ? dr["salary_type"].ToString() : null,
                    title = dt.Columns.Contains("title") ? dr["title"].ToString() : null,
                    maximum = dt.Columns.Contains("maximum") ? dr.Field<int?>("maximum") : null,
                    note = dt.Columns.Contains("note") ? dr["note"].ToString() : null,
                    lowest_ucr_id = dt.Columns.Contains("lowest_ucr_id") ? dr.Field<int?>("lowest_ucr_id") : null,
                    lowest_career_level = dt.Columns.Contains("lowest_career_level") ? dr.Field<int?>("lowest_career_level") : null,
                    leave_day_audit = dt.Columns.Contains("leave_day_audit") ? dr.Field<int?>("leave_day_audit") : null,
                    level_audit_type = dt.Columns.Contains("level_audit_type") ? dr["level_audit_type"].ToString() : null,
                    perfect_attendance_bonus = dt.Columns.Contains("perfect_attendance_bonus") ? dr.Field<decimal?>("perfect_attendance_bonus") : null,
                    order_over_discount_audit = dt.Columns.Contains("order_over_discount_audit") ? dr.Field<decimal?>("order_over_discount_audit") : null,
                    pdi_price_audit = dt.Columns.Contains("pdi_price_audit") ? dr.Field<decimal?>("pdi_price_audit") : null,
                    company_name = dt.Columns.Contains("company_name") ? dr["company_name"].ToString() : null,
                    general_manager_name = dt.Columns.Contains("general_manager_name") ? dr["general_manager_name"].ToString() : null,
                    department_name = dt.Columns.Contains("department_name") ? dr["department_name"].ToString() : null,
                    position_name = dt.Columns.Contains("position_name") ? dr["position_name"].ToString() : null,
                    class_name = dt.Columns.Contains("class_name") ? dr["class_name"].ToString() : null,
                    group_name = dt.Columns.Contains("group_name") ? dr["group_name"].ToString() : null,
                    office_name = dt.Columns.Contains("office_name") ? dr["office_name"].ToString() : null,
                    career_rank = dt.Columns.Contains("career_rank") ? dr.Field<int?>("career_rank") : null
                });
            }

            return result;
        }

        public void UpdateUserLevel(UpdateUserLevelParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"update UserLevel
                                    {str}
                                    where ul_id=@ul_id";
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

        public List<UserLevelTree> SearchUserLevelTreeESC(int top_ul_id, int level)
        {
            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = @"select ul_id,code,name,parent_id,level from [UserLevelTreeESC](@top_ul_id,@level,100)";
                using (SqlCommand myCommand = new(strSql, myConn))
                {
                    using (SqlDataAdapter myAdapter = new())
                    {
                        myAdapter.SelectCommand = myCommand;
                        myCommand.Parameters.AddWithValue("@top_ul_id", top_ul_id);
                        myCommand.Parameters.AddWithValue("@level", level);
                        myAdapter.Fill(dt);
                        myCommand.Cancel();
                    }
                }
            }

            List<UserLevelTree> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new UserLevelTree(
                dr.Field<int>("ul_id"),
                dr["code"].ToString() ?? "",
                dr["name"].ToString() ?? "",
                dr.Field<int>("parent_id"),
                dr.Field<int>("level")
                ));
            }

            return result;
        }

        public List<UserLevelTree> SearchUserLevelTreeDESC(int top_ul_id, int level)
        {
            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = @"select ul_id,code,name,parent_id,level,level_audit_type from [UserLevelTreeDESC](@top_ul_id,@level,100)";
                using (SqlCommand myCommand = new(strSql, myConn))
                {
                    using (SqlDataAdapter myAdapter = new())
                    {
                        myAdapter.SelectCommand = myCommand;
                        myCommand.Parameters.AddWithValue("@top_ul_id", top_ul_id);
                        myCommand.Parameters.AddWithValue("@level", level);
                        myAdapter.Fill(dt);
                        myCommand.Cancel();
                    }
                }
            }

            List<UserLevelTree> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new UserLevelTree(
                dr.Field<int>("ul_id"),
                dr["code"].ToString() ?? "",
                dr["name"].ToString() ?? "",
                dr.Field<int>("parent_id"),
                dr.Field<int>("level")
                ));
            }

            return result;
        }
        #endregion

        #region UserLevelDutyJoin
        public void CreateUserLevelDutyJoin(CreateUserLevelDutyJoinParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                insert into UserLevelDutyJoin({str_column})
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
        public void DeleteUserLevelDutyJoin(int? ul_id, int? ud_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = @"delete from UserLevelDutyJoin where 1=1 ";
                if (ul_id != null) strSql += @" and ul_id=@ul_id";
                if (ud_id != null) strSql += @" and ud_id=@ud_id";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    if (ul_id != null) myCommand.Parameters.AddWithValue("@ul_id", ul_id);
                    if (ud_id != null) myCommand.Parameters.AddWithValue("@ud_id", ud_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
        public List<SearchUserLevelDutyJoinResult> SearchUserLevelDutyJoin(SearchUserLevelDutyJoinParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchUserLevelDutyJoinResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchUserLevelDutyJoinResult>(columns)}
                from UserLevelDutyJoin
                where 1 = 1
                {SQL.GenerateSQLWhereQuery(param)}
                order by cre_time desc ";

                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";
                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchUserLevelDutyJoinResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserLevelDutyJoinResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    id = dt.Columns.Contains("id") ? dr.Field<int?>("id") : null,
                    ul_id = dt.Columns.Contains("ul_id") ? dr.Field<int?>("ul_id") : null,
                    ud_id = dt.Columns.Contains("ud_id") ? dr.Field<int?>("ud_id") : null
                });
            }
            return result;
        }
        #endregion

        #region UserLevelDutyHistory
        public int CreateUserLevelDutyHistory(CreateUserLevelDutyHistoryParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int uldh_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                insert into UserLevelDutyHistory({str_column})
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
                        uldh_id = Convert.ToInt32(dr.GetValue(0));
                        myCommand.Cancel();
                        dr.Close();
                    }
                }
            }
            return uldh_id;
        }

        public List<SearchUserLevelDutyHistoryResult> SearchUserLevelDutyHistory(SearchUserLevelDutyHistoryParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchUserLevelDutyHistoryResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select 
                {SQL.GenerateSQLSelectQuery<SearchUserLevelDutyHistoryResult>(columns)}
                from UserLevelDutyHistory as ULDH
                left join UserLevel on UserLevel.ul_id=ULDH.ul_id
                where 1=1{SQL.GenerateSQLWhereQuery(param)}
                order by ULDH.cre_time desc ";
                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchUserLevelDutyHistoryResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserLevelDutyHistoryResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    uldh_id = dt.Columns.Contains("uldh_id") ? dr.Field<int?>("uldh_id") : null,
                    user_id = dt.Columns.Contains("user_id") ? dr["user_id"].ToString() : null,
                    date_start = (dt.Columns.Contains("date_start") && dr.Field<DateTime?>("date_start") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("date_start")) : null,
                    date_end = (dt.Columns.Contains("date_end") && dr.Field<DateTime?>("date_end") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("date_end")) : null,
                    ul_id = dt.Columns.Contains("ul_id") ? dr.Field<int?>("ul_id") : null,
                    duty_json = dt.Columns.Contains("duty_json") ? dr["duty_json"].ToString() : null,
                    note = dt.Columns.Contains("note") ? dr["note"].ToString() : null,
                    ul_code = dt.Columns.Contains("ul_code") ? dr["ul_code"].ToString() : null,
                    ul_name = dt.Columns.Contains("ul_name") ? dr["ul_name"].ToString() : null
                });
            }

            return result;
        }
        public void UpdateUserLevelDutyHistory(UpdateUserLevelDutyHistoryParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                update UserLevelDutyHistory
                {str}
                where uldh_id=@uldh_id";
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
        #endregion
    }
}
