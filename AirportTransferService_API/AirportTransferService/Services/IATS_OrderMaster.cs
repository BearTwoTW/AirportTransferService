namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_OrderMaster
    /// </summary>
    public interface IATS_OrderMaster
    {
        /// <summary>
        /// CreateATS_OrderMaster
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_OrderMaster(CreateATS_OrderMasterParam param);

        /// <summary>
        /// SearchATS_OrderMaster
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_OrderMasterResult> SearchATS_OrderMaster(SearchATS_OrderMasterParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// UpdateATS_OrderMaster
        /// </summary>
        /// <param name="param"></param>
        void UpdateATS_OrderMaster(UpdateATS_OrderMasterParam param);

        /// <summary>
        /// DeleteATS_OrderMaster
        /// </summary>
        /// <param name="o_id"></param>
        void DeleteATS_OrderMaster(string o_id);
    }

    /// <summary>
    /// IATS_OrderMaster_IMPL
    /// </summary>
    public class IATS_OrderMaster_IMPL : IATS_OrderMaster
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_OrderMaster_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_OrderMaster_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_OrderMaster
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_OrderMaster(CreateATS_OrderMasterParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_OrderMaster", "", 99999, true);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string o_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(o_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_OrderMaster({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@o_id", o_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return o_id;
            }
        }

        /// <summary>
        /// SearchATS_OrderMaster
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_OrderMasterResult> SearchATS_OrderMaster(SearchATS_OrderMasterParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_OrderMasterResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_OrderMasterResult>(columns)}
                from ATS_OrderMaster
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_OrderMasterResult>(sort_columns, "order by ATS_OrderMaster.o_id desc")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_OrderMasterResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_OrderMasterResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    o_id = dt.Columns.Contains("o_id") ? dr["o_id"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    type = dt.Columns.Contains("type") ? dr["type"].ToString() : null,
                    city = dt.Columns.Contains("city") ? dr["city"].ToString() : null,
                    area = dt.Columns.Contains("area") ? dr["area"].ToString() : null,
                    road = dt.Columns.Contains("road") ? dr["road"].ToString() : null,
                    section = dt.Columns.Contains("section") ? dr["section"].ToString() : null,
                    address = dt.Columns.Contains("address") ? dr["address"].ToString() : null,
                    airport = dt.Columns.Contains("airport") ? dr["airport"].ToString() : null,
                    terminal = dt.Columns.Contains("terminal") ? dr["terminal"].ToString() : null,
                    flght_number = dt.Columns.Contains("flght_number") ? dr["flght_number"].ToString() : null,
                    date_travel = (dt.Columns.Contains("date_travel") && dr.Field<DateTime?>("date_travel") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("date_travel")) : null,
                    time_travel = (dt.Columns.Contains("time_travel") && dr.Field<DateTime?>("time_travel") != null) ? TimeOnly.FromDateTime(dr.Field<DateTime>("time_travel")) : null,
                    number_passenger = dt.Columns.Contains("number_passenger") ? dr.Field<int>("number_passenger") : null,
                    number_bags = dt.Columns.Contains("number_bags") ? dr.Field<int>("number_bags") : null,
                    cms_id = dt.Columns.Contains("cms_id") ? dr["cms_id"].ToString() : null,
                    signboard_title = dt.Columns.Contains("signboard_title") ? dr["signboard_title"].ToString() : null,
                    signboard_content = dt.Columns.Contains("signboard_content") ? dr["signboard_content"].ToString() : null,
                    name_purchaser = dt.Columns.Contains("name_purchaser") ? dr["name_purchaser"].ToString() : null,
                    phone_purchaser = dt.Columns.Contains("phone_purchaser") ? dr["phone_purchaser"].ToString() : null,
                    email_purchaser = dt.Columns.Contains("email_purchaser") ? dr["email_purchaser"].ToString() : null,
                    name_passenger = dt.Columns.Contains("name_passenger") ? dr["name_passenger"].ToString() : null,
                    phone_passenger = dt.Columns.Contains("phone_passenger") ? dr["phone_passenger"].ToString() : null,
                    email_passenger = dt.Columns.Contains("email_passenger") ? dr["email_passenger"].ToString() : null,
                    price = dt.Columns.Contains("price") ? dr.Field<decimal>("price") : null,
                    link = dt.Columns.Contains("link") ? dr["link"].ToString() : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateATS_OrderMaster
        /// </summary>
        /// <param name="param"></param>
        public void UpdateATS_OrderMaster(UpdateATS_OrderMasterParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            SQL.GenerateSQLColumnLogQuery(param, "ATS_OrderMaster", out string column_log_output_str, out string column_log_insert_str, out string tmp_table_create_str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    {tmp_table_create_str}
                    update ATS_OrderMaster
                    {str}
                    {column_log_output_str}
                    where o_id=@o_id
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
        /// DeleteATS_OrderMaster
        /// </summary>
        /// <param name="o_id"></param>
        public void DeleteATS_OrderMaster(string o_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_OrderMaster where o_id=@o_id;";
                    myCommand.Parameters.AddWithValue("@o_id", o_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}