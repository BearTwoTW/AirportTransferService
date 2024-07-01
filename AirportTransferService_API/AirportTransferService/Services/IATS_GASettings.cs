namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_GASettings
    /// </summary>
    public interface IATS_GASettings
    {
        /// <summary>
        /// CreateATS_GASettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_GASettings(CreateATS_GASettingsParam param);

        /// <summary>
        /// SearchATS_GASettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_GASettingsResult> SearchATS_GASettings(SearchATS_GASettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_GASettings
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_GASettings(UpdateATS_GASettingsParam param);

        /// <summary>
        /// DeleteATS_GASettings
        /// </summary>
        /// <param name="gas_id"></param>
        void DeleteATS_GASettings(string gas_id);
    }

    /// <summary>
    /// IATS_GASettings_IMPL
    /// </summary>
    public class IATS_GASettings_IMPL : IATS_GASettings
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_GASettings_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_GASettings_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_GASettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_GASettings(CreateATS_GASettingsParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_GASettings", "", 99999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string gas_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(gas_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_GASettings({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@gas_id", gas_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return gas_id;
            }
        }

        /// <summary>
        /// SearchATS_GASettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_GASettingsResult> SearchATS_GASettings(SearchATS_GASettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_GASettingsResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_GASettingsResult>(columns)}
                from ATS_GASettings
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_GASettingsResult>(sort_columns, "order by ATS_GASettings.cre_time desc")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_GASettingsResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_GASettingsResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    gas_id = dt.Columns.Contains("gas_id") ? dr["gas_id"].ToString() : null,
                    tracking_code = dt.Columns.Contains("tracking_code") ? dr["tracking_code"].ToString() : null,
                    keyword = dt.Columns.Contains("keyword") ? dr["keyword"].ToString() : null,
                    summary = dt.Columns.Contains("summary") ? dr["summary"].ToString() : null,
                    descriptive_url = dt.Columns.Contains("descriptive_url") ? dr["descriptive_url"].ToString() : null,
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_GASettings
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_GASettings(UpdateATS_GASettingsParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_GASettings", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_GASettings
                    {str}
                    {column_log_output_str}
                    where gas_id=@gas_id
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
        /// DeleteATS_GASettings
        /// </summary>
        /// <param name="gas_id"></param>
        public void DeleteATS_GASettings(string gas_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_GASettings where gas_id=@gas_id;";
                    myCommand.Parameters.AddWithValue("@gas_id", gas_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}