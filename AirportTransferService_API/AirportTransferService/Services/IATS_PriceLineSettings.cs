namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_PriceLineSettings
    /// </summary>
    public interface IATS_PriceLineSettings
    {
        /// <summary>
        /// CreateATS_PriceLineSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_PriceLineSettings(CreateATS_PriceLineSettingsParam param);

        /// <summary>
        /// SearchATS_PriceLineSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_PriceLineSettingsResult> SearchATS_PriceLineSettings(SearchATS_PriceLineSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_PriceLineSettings
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_PriceLineSettings(UpdateATS_PriceLineSettingsParam param);

        /// <summary>
        /// DeleteATS_PriceLineSettings
        /// </summary>
        /// <param name="pls_id"></param>
        void DeleteATS_PriceLineSettings(string pls_id);
    }

    /// <summary>
    /// IATS_PriceLineSettings_IMPL
    /// </summary>
    public class IATS_PriceLineSettings_IMPL : IATS_PriceLineSettings
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_PriceLineSettings_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_PriceLineSettings_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_PriceLineSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_PriceLineSettings(CreateATS_PriceLineSettingsParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_PriceLineSettings", "", 99999999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string pls_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(pls_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_PriceLineSettings({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@pls_id", pls_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return pls_id;
            }
        }

        /// <summary>
        /// SearchATS_PriceLineSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_PriceLineSettingsResult> SearchATS_PriceLineSettings(SearchATS_PriceLineSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_PriceLineSettingsResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_PriceLineSettingsResult>(columns)}
                from ATS_PriceLineSettings
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_PriceLineSettingsResult>(sort_columns, "order by ATS_PriceLineSettings.pls_id desc")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_PriceLineSettingsResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_PriceLineSettingsResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    pls_id = dt.Columns.Contains("pls_id") ? dr["pls_id"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    price = dt.Columns.Contains("price") ? dr.Field<decimal>("price") : null,
                    link = dt.Columns.Contains("link") ? dr["link"].ToString() : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_PriceLineSettings
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_PriceLineSettings(UpdateATS_PriceLineSettingsParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_PriceLineSettings", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_PriceLineSettings
                    {str}
                    {column_log_output_str}
                    where pls_id=@pls_id
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
        /// DeleteATS_PriceLineSettings
        /// </summary>
        /// <param name="pls_id"></param>
        public void DeleteATS_PriceLineSettings(string pls_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_PriceLineSettings where pls_id=@pls_id;";
                    myCommand.Parameters.AddWithValue("@pls_id", pls_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}