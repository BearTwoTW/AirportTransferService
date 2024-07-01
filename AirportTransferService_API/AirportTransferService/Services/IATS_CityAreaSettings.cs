namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_CityAreaSettings
    /// </summary>
    public interface IATS_CityAreaSettings
    {
        /// <summary>
        /// CreateATS_CityAreaSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_CityAreaSettings(CreateATS_CityAreaSettingsParam param);

        /// <summary>
        /// SearchATS_CityAreaSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_CityAreaSettingsResult> SearchATS_CityAreaSettings(SearchATS_CityAreaSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_CityAreaSettings
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_CityAreaSettings(UpdateATS_CityAreaSettingsParam param);

        /// <summary>
        /// DeleteATS_CityAreaSettings
        /// </summary>
        /// <param name="cas_id"></param>
        void DeleteATS_CityAreaSettings(string cas_id);
    }

    /// <summary>
    /// IATS_CityAreaSettings_IMPL
    /// </summary>
    public class IATS_CityAreaSettings_IMPL : IATS_CityAreaSettings
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_CityAreaSettings_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_CityAreaSettings_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_CityAreaSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_CityAreaSettings(CreateATS_CityAreaSettingsParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_CityAreaSettings", "", 99999999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string cas_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(cas_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_CityAreaSettings({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@cas_id", cas_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return cas_id;
            }
        }

        /// <summary>
        /// SearchATS_CityAreaSettmings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_CityAreaSettingsResult> SearchATS_CityAreaSettings(SearchATS_CityAreaSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_CityAreaSettingsResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_CityAreaSettingsResult>(columns)}
                from ATS_CityAreaSettings
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_CityAreaSettingsResult>(sort_columns, "order by ATS_CityAreaSettings.zip desc")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_CityAreaSettingsResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_CityAreaSettingsResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    cas_id = dt.Columns.Contains("cas_id") ? dr["cas_id"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    zip = dt.Columns.Contains("zip") ? dr["zip"].ToString() : null,
                    city = dt.Columns.Contains("city") ? dr["city"].ToString() : null,
                    area = dt.Columns.Contains("area") ? dr["area"].ToString() : null,
                    road = dt.Columns.Contains("road") ? dr["road"].ToString() : null,
                    section = dt.Columns.Contains("section") ? dr["section"].ToString() : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_CityAreaSettings
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_CityAreaSettings(UpdateATS_CityAreaSettingsParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_CityAreaSettings", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_CityAreaSettings
                    {str}
                    {column_log_output_str}
                    where cas_id=@cas_id
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
        /// DeleteATS_CityAreaSettings
        /// </summary>
        /// <param name="cas_id"></param>
        public void DeleteATS_CityAreaSettings(string cas_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_CityAreaSettings where cas_id=@cas_id;";
                    myCommand.Parameters.AddWithValue("@cas_id", cas_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}
