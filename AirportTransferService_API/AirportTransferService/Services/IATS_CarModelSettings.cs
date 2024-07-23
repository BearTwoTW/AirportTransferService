namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_CarModelSettings
    /// </summary>
    public interface IATS_CarModelSettings
    {
        /// <summary>
        /// CreateATS_CarModelSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_CarModelSettings(CreateATS_CarModelSettingsParam param);

        /// <summary>
        /// SearchATS_CarModelSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_CarModelSettingsResult> SearchATS_CarModelSettings(SearchATS_CarModelSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_CarModelSettings
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_CarModelSettings(UpdateATS_CarModelSettingsParam param);

        /// <summary>
        /// DeleteATS_CarModelSettings
        /// </summary>
        /// <param name="cms_id"></param>
        void DeleteATS_CarModelSettings(string cms_id);
    }

    /// <summary>
    /// IATS_CarModelSettings_IMPL
    /// </summary>
    public class IATS_CarModelSettings_IMPL : IATS_CarModelSettings
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_CarModelSettings_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_CarModelSettings_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_CarModelSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_CarModelSettings(CreateATS_CarModelSettingsParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_CarModelSettings", "", 99999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string cms_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(cms_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_CarModelSettings({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@cms_id", cms_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return cms_id;
            }
        }

        /// <summary>
        /// SearchATS_CarModelSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_CarModelSettingsResult> SearchATS_CarModelSettings(SearchATS_CarModelSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_CarModelSettingsResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_CarModelSettingsResult>(columns)}
                from ATS_CarModelSettings
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_CarModelSettingsResult>(sort_columns, "order by ATS_CarModelSettings.cms_id")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_CarModelSettingsResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_CarModelSettingsResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    cms_id = dt.Columns.Contains("cms_id") ? dr["cms_id"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    max_passengers = dt.Columns.Contains("max_passengers") ? dr.Field<int?>("max_passengers") : null,
                    max_luggage = dt.Columns.Contains("max_luggage") ? dr.Field<int?>("max_luggage") : null,
                    max_child_seats = dt.Columns.Contains("max_child_seats") ? dr.Field<int?>("max_child_seats") : null,
                    max_service_extras = dt.Columns.Contains("max_service_extras") ? dr.Field<int?>("max_service_extras") : null,
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_CarModelSettings
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_CarModelSettings(UpdateATS_CarModelSettingsParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_CarModelSettings", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_CarModelSettings
                    {str}
                    {column_log_output_str}
                    where cms_id=@cms_id
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
        /// DeleteATS_CarModelSettings
        /// </summary>
        /// <param name="cms_id"></param>
        public void DeleteATS_CarModelSettings(string cms_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_CarModelSettings where cms_id=@cms_id;";
                    myCommand.Parameters.AddWithValue("@cms_id", cms_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}