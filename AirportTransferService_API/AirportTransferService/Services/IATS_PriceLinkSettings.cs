﻿namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_PriceLinkSettings
    /// </summary>
    public interface IATS_PriceLinkSettings
    {
        /// <summary>
        /// CreateATS_PriceLinkSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_PriceLinkSettings(CreateATS_PriceLinkSettingsParam param);

        /// <summary>
        /// SearchATS_PriceLinkSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_PriceLinkSettingsResult> SearchATS_PriceLinkSettings(SearchATS_PriceLinkSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_PriceLinkSettings
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_PriceLinkSettings(UpdateATS_PriceLinkSettingsParam param);

        /// <summary>
        /// DeleteATS_PriceLinkSettings
        /// </summary>
        /// <param name="pls_id"></param>
        void DeleteATS_PriceLinkSettings(string pls_id);
    }

    /// <summary>
    /// IATS_PriceLinkSettings_IMPL
    /// </summary>
    public class IATS_PriceLinkSettings_IMPL : IATS_PriceLinkSettings
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_PriceLinkSettings_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_PriceLinkSettings_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_PriceLinkSettings
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_PriceLinkSettings(CreateATS_PriceLinkSettingsParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_PriceLinkSettings", "", 99999999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string pls_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(pls_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_PriceLinkSettings({str_column})
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
        /// SearchATS_PriceLinkSettings
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_PriceLinkSettingsResult> SearchATS_PriceLinkSettings(SearchATS_PriceLinkSettingsParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_PriceLinkSettingsResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_PriceLinkSettingsResult>(columns)}
                from ATS_PriceLinkSettings
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_PriceLinkSettingsResult>(sort_columns, "order by ATS_PriceLinkSettings.price,ATS_PriceLinkSettings.city,ATS_PriceLinkSettings.area,ATS_PriceLinkSettings.type desc")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_PriceLinkSettingsResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_PriceLinkSettingsResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    pls_id = dt.Columns.Contains("pls_id") ? dr["pls_id"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    type = dt.Columns.Contains("type") ? dr["type"].ToString() : null,
                    city = dt.Columns.Contains("city") ? dr["city"].ToString() : null,
                    area = dt.Columns.Contains("area") ? dr["area"].ToString() : null,
                    price = dt.Columns.Contains("price") ? dr.Field<decimal>("price") : null,
                    link = dt.Columns.Contains("link") ? dr["link"].ToString() : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_PriceLinkSettings
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_PriceLinkSettings(UpdateATS_PriceLinkSettingsParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_PriceLinkSettings", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_PriceLinkSettings
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
        /// DeleteATS_PriceLinkSettings
        /// </summary>
        /// <param name="pls_id"></param>
        public void DeleteATS_PriceLinkSettings(string pls_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_PriceLinkSettings where pls_id=@pls_id;";
                    myCommand.Parameters.AddWithValue("@pls_id", pls_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}