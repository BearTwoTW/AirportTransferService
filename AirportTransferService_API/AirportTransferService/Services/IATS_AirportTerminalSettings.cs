namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_AirportTerminalSettings
    /// </summary>
    public interface IATS_AirportTerminalSettings
    {
        /// <summary>
        /// CreateATS_AirportTerminalSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_AirportTerminalSettings(CreateATS_AirportTerminalSettingsParam param);

        /// <summary>
        /// SearchATS_AirportTerminalSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_AirportTerminalSettingsResult> SearchATS_AirportTerminalSettings(SearchATS_AirportTerminalSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_AirportTerminalSettings
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_AirportTerminalSettings(UpdateATS_AirportTerminalSettingsParam param);

        /// <summary>
        /// DeleteATS_AirportTerminalSettings
        /// </summary>
        /// <param name="ats_id"></param>
        void DeleteATS_AirportTerminalSettings(string ats_id);
    }

    /// <summary>
    /// IATS_AirportTerminalSettings_IMPL
    /// </summary>
    public class IATS_AirportTerminalSettings_IMPL : IATS_AirportTerminalSettings
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_AirportTerminalSettings_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_AirportTerminalSettings_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_AirportTerminalSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_AirportTerminalSettings(CreateATS_AirportTerminalSettingsParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_AirportTerminalSettings", "", 99999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string ats_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(ats_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_AirportTerminalSettings({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@ats_id", ats_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return ats_id;
            }
        }

        /// <summary>
        /// SearchATS_AirportTerminalSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_AirportTerminalSettingsResult> SearchATS_AirportTerminalSettings(SearchATS_AirportTerminalSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_AirportTerminalSettingsResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_AirportTerminalSettingsResult>(columns)}
                from ATS_AirportTerminalSettings
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_AirportTerminalSettingsResult>(sort_columns, "order by ATS_AirportTerminalSettings.ats_id")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_AirportTerminalSettingsResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_AirportTerminalSettingsResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    ats_id = dt.Columns.Contains("ats_id") ? dr["ats_id"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    airport = dt.Columns.Contains("airport") ? dr["airport"].ToString() : null,
                    terminal = dt.Columns.Contains("terminal") ? dr["terminal"].ToString() : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_AirportTerminalSettings
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_AirportTerminalSettings(UpdateATS_AirportTerminalSettingsParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_AirportTerminalSettings", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_AirportTerminalSettings
                    {str}
                    {column_log_output_str}
                    where ats_id=@ats_id
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
        /// DeleteATS_AirportTerminalSettings
        /// </summary>
        /// <param name="ats_id"></param>
        public void DeleteATS_AirportTerminalSettings(string ats_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_AirportTerminalSettings where ats_id=@ats_id;";
                    myCommand.Parameters.AddWithValue("@ats_id", ats_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}