namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_WebSettings
    /// </summary>
    public interface IATS_WebSettings
    {
        /// <summary>
        /// CreateATS_WebSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_WebSettings(CreateATS_WebSettingsParam param);

        /// <summary>
        /// SearchATS_WebSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_WebSettingsResult> SearchATS_WebSettings(SearchATS_WebSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_WebSettings
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_WebSettings(UpdateATS_WebSettingsParam param);

        /// <summary>
        /// DeleteATS_WebSettings
        /// </summary>
        /// <param name="ws_id"></param>
        void DeleteATS_WebSettings(string ws_id);
    }

    /// <summary>
    /// IATS_WebSettings_IMPL
    /// </summary>
    public class IATS_WebSettings_IMPL : IATS_WebSettings
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_WebSettings_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_WebSettings_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_WebSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_WebSettings(CreateATS_WebSettingsParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_WebSettings", "", 99999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string ws_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(ws_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_WebSettings({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@ws_id", ws_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return ws_id;
            }
        }

        /// <summary>
        /// SearchATS_WebSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_WebSettingsResult> SearchATS_WebSettings(SearchATS_WebSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_WebSettingsResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_WebSettingsResult>(columns)}
                from ATS_WebSettings
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_WebSettingsResult>(sort_columns, "order by ATS_WebSettings.ws_id desc")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_WebSettingsResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_WebSettingsResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    ws_id = dt.Columns.Contains("ws_id") ? dr["ws_id"].ToString() : null,
                    title = dt.Columns.Contains("title") ? dr["title"].ToString() : null,
                    image = dt.Columns.Contains("image") ? dr["image"].ToString() : null,
                    text1 = dt.Columns.Contains("text1") ? dr["text1"].ToString() : null,
                    text2 = dt.Columns.Contains("text2") ? dr["text2"].ToString() : null,
                    text3 = dt.Columns.Contains("text3") ? dr["text3"].ToString() : null,
                    html1 = dt.Columns.Contains("html1") ? dr["html1"].ToString() : null,
                    html2 = dt.Columns.Contains("html2") ? dr["html2"].ToString() : null,
                    html3 = dt.Columns.Contains("html3") ? dr["html3"].ToString() : null,
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_WebSettings
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_WebSettings(UpdateATS_WebSettingsParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_WebSettings", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_WebSettings
                    {str}
                    {column_log_output_str}
                    where ws_id=@ws_id
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
        /// DeleteATS_WebSettings
        /// </summary>
        /// <param name="ws_id"></param>
        public void DeleteATS_WebSettings(string ws_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_WebSettings where ws_id=@ws_id;";
                    myCommand.Parameters.AddWithValue("@ws_id", ws_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}