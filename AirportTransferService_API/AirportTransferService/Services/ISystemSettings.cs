namespace AirportTransferService.Services
{
    public interface ISystemSettings
    {
        #region CITYAREAZIP
        List<CITYAREAZIP> SearchCITYAREAZIP();
        #endregion

        #region SystemSetting
        int CreateSystemSetting(CreateSystemSettingParam param);
        void UpdateSystemSetting(UpdateSystemSettingParam param);
        List<SearchSystemSettingResult> SearchSystemSetting(SearchSystemSettingParam param, List<string> columns, out int page_count);
        #endregion
    }

    public class ISystemSettings_IMPL : ISystemSettings
    {
        public readonly IConfiguration _config;
        public readonly IBaseService _baseService;
        public readonly UserDealerInfo _userDealerInfo;
        private readonly string db_name = "";

        private readonly string strConn = "";
        public ISystemSettings_IMPL(IConfiguration config, IBaseService baseService)
        {
            _config = config;
            _baseService = baseService;
            _userDealerInfo = _baseService.GetUserDealerInfo();
            db_name = _config["Database"];
            strConn = _config["sql_conn"].Replace(db_name, _userDealerInfo.ds_dbname);
        }

        public List<CITYAREAZIP> SearchCITYAREAZIP()
        {
            DataTable dt = new();
            using (SqlConnection myConn = new SqlConnection(strConn))
            {
                myConn.Open();

                string strSql = @"
                select city,area,ZIP
                from CITYAREAZIP";
                using (SqlCommand myCommand = new(strSql, myConn))
                {
                    using (SqlDataAdapter myAdapter = new())
                    {
                        myAdapter.SelectCommand = myCommand;
                        myAdapter.Fill(dt);
                        myCommand.Cancel();
                    }
                }
            }
            List<CITYAREAZIP> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new CITYAREAZIP
                    (
                    dr["city"].ToString() ?? "",
                    dr["area"].ToString() ?? "",
                    dr["ZIP"].ToString() ?? ""
                    )
                );
            }

            return result;
        }

        public List<SearchSystemSettingResult> SearchSystemSetting(SearchSystemSettingParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchSystemSettingResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchSystemSettingResult>(columns)}
                from SystemSetting
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by cre_time desc ";
                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";
                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchSystemSettingResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchSystemSettingResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    ssm_id = dt.Columns.Contains("ssm_id") ? dr.Field<int?>("ssm_id") : null,
                    ssm_name = dt.Columns.Contains("ssm_name") ? dr["ssm_name"].ToString() : null,
                    value_json = dt.Columns.Contains("value_json") ? dr["value_json"].ToString() : null,
                    note = dt.Columns.Contains("note") ? dr["note"].ToString() : null,
                }
                );
            }
            return result;
        }

        public int CreateSystemSetting(CreateSystemSettingParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int ssm_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                insert into SystemSetting({str_column})
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
                        ssm_id = Convert.ToInt32(dr.GetValue(0));
                        myCommand.Cancel();
                        dr.Close();
                    }
                }
            }

            return ssm_id;
        }

        public void UpdateSystemSetting(UpdateSystemSettingParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"
                update SystemSetting
                {str}
                where ssm_id=@ssm_id;";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                };
            }
        }
    }
}
