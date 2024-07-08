namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_FareSettings
    /// </summary>
    public interface IATS_FareSettings
    {
        /// <summary>
        /// CreateATS_FareSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_FareSettings(CreateATS_FareSettingsParam param);

        /// <summary>
        /// SearchATS_FareSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_FareSettingsResult> SearchATS_FareSettings(SearchATS_FareSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_FareSettings
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_FareSettings(UpdateATS_FareSettingsParam param);

        /// <summary>
        /// DeleteATS_FareSettings
        /// </summary>
        /// <param name="fs_id"></param>
        void DeleteATS_FareSettings(string fs_id);
    }

    /// <summary>
    /// IATS_FareSettings_IMPL
    /// </summary>
    public class IATS_FareSettings_IMPL : IATS_FareSettings
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_FareSettings_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_FareSettings_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_FareSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_FareSettings(CreateATS_FareSettingsParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_FareSettings", "", 99999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string fs_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(fs_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_FareSettings({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@fs_id", fs_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return fs_id;
            }
        }

        /// <summary>
        /// SearchATS_FareSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_FareSettingsResult> SearchATS_FareSettings(SearchATS_FareSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_FareSettingsResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_FareSettingsResult>(columns)}
                from ATS_FareSettings
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_FareSettingsResult>(sort_columns, "order by ATS_FareSettings.fs_id desc")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_FareSettingsResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_FareSettingsResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    fs_id = dt.Columns.Contains("fs_id") ? dr["fs_id"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    cms_id = dt.Columns.Contains("cms_id") ? dr["cms_id"].ToString() : null,
                    city = dt.Columns.Contains("city") ? dr["city"].ToString() : null,
                    area = dt.Columns.Contains("area") ? dr["area"].ToString() : null,
                    road = dt.Columns.Contains("road") ? dr["road"].ToString() : null,
                    section = dt.Columns.Contains("section") ? dr["section"].ToString() : null,
                    airport = dt.Columns.Contains("airport") ? dr["airport"].ToString() : null,
                    terminal = dt.Columns.Contains("terminal") ? dr["terminal"].ToString() : null,
                    price = dt.Columns.Contains("price") ? dr.Field<decimal>("price") : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_FareSettings
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_FareSettings(UpdateATS_FareSettingsParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_FareSettings", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_FareSettings
                    {str}
                    {column_log_output_str}
                    where fs_id=@fs_id
                    {column_log_insert_str}";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        /// <summary>
        /// DeleteATS_FareSettings
        /// </summary>
        /// <param name="fs_id"></param>
        public void DeleteATS_FareSettings(string fs_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_FareSettings where fs_id=@fs_id;";
                    myCommand.Parameters.AddWithValue("@fs_id", fs_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}