namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_ExtraSettings
    /// </summary>
    public interface IATS_ExtraSettings
    {
        /// <summary>
        /// CreateATS_ExtraSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_ExtraSettings(CreateATS_ExtraSettingsParam param);

        /// <summary>
        /// SearchATS_ExtraSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_ExtraSettingsResult> SearchATS_ExtraSettings(SearchATS_ExtraSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_ExtraSettings
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_ExtraSettings(UpdateATS_ExtraSettingsParam param);

        /// <summary>
        /// DeleteATS_ExtraSettings
        /// </summary>
        /// <param name="es_id"></param>
        void DeleteATS_ExtraSettings(string es_id);
    }

    /// <summary>
    /// IATS_ExtraSettings_IMPL
    /// </summary>
    public class IATS_ExtraSettings_IMPL : IATS_ExtraSettings
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_ExtraSettings_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_ExtraSettings_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_ExtraSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_ExtraSettings(CreateATS_ExtraSettingsParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_ExtraSettings", "", 99999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string es_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(es_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_ExtraSettings({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@es_id", es_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return es_id;
            }
        }

        /// <summary>
        /// SearchATS_ExtraSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_ExtraSettingsResult> SearchATS_ExtraSettings(SearchATS_ExtraSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_ExtraSettingsResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_ExtraSettingsResult>(columns)}
                from ATS_ExtraSettings
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_ExtraSettingsResult>(sort_columns, "order by ATS_ExtraSettings.es_id desc")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_ExtraSettingsResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_ExtraSettingsResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    es_id = dt.Columns.Contains("es_id") ? dr["es_id"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    type = dt.Columns.Contains("type") ? dr["type"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    price = dt.Columns.Contains("price") ? dr.Field<decimal?>("price") : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_ExtraSettings
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_ExtraSettings(UpdateATS_ExtraSettingsParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_ExtraSettings", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_ExtraSettings
                    {str}
                    {column_log_output_str}
                    where es_id=@es_id
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
        /// DeleteATS_ExtraSettings
        /// </summary>
        /// <param name="es_id"></param>
        public void DeleteATS_ExtraSettings(string es_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_ExtraSettings where es_id=@es_id;";
                    myCommand.Parameters.AddWithValue("@es_id", es_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}