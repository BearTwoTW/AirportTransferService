namespace AirportTransferService.Services
{
    /// <summary>
    /// IATS_OrderDetail
    /// </summary>
    public interface IATS_OrderDetail
    {
        /// <summary>
        /// CreateATS_OrderDetail
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateATS_OrderDetail(CreateATS_OrderDetailParam param);

        /// <summary>
        /// SearchATS_OrderDetail
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchATS_OrderDetailResult> SearchATS_OrderDetail(SearchATS_OrderDetailParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count);

        /// <summary>
        /// DeleteATS_OrderDetail
        /// </summary>
        /// <param name="od_id"></param>
        void DeleteATS_OrderDetail(string od_id);
    }

    /// <summary>
    /// IATS_OrderDetail_IMPL
    /// </summary>
    public class IATS_OrderDetail_IMPL : IATS_OrderDetail
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;
        private readonly string strConn = "";

        /// <summary>
        /// IATS_OrderDetail_IMPL
        /// </summary>
        /// <param name="config"></param>
        public IATS_OrderDetail_IMPL(IConfiguration config)
        {
            _config = config;
            strConn = _config["sql_conn"];
        }

        /// <summary>
        /// CreateATS_OrderDetail
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateATS_OrderDetail(CreateATS_OrderDetailParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "ATS_OrderDetail", "", 99999, true);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string od_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(od_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into ATS_OrderDetail({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@od_id", od_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                return od_id;
            }
        }

        /// <summary>
        /// SearchATS_OrderDetail
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="sort_columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchATS_OrderDetailResult> SearchATS_OrderDetail(SearchATS_OrderDetailParam param, List<string> columns, List<SQL.SQLOrder_obj> sort_columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchATS_OrderDetailResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select {SQL.GenerateSQLSelectQuery<SearchATS_OrderDetailResult>(columns)}
                from ATS_OrderDetail
                where 1=1
                {SQL.GenerateSQLWhereQuery(param)}
                {SQL.GenerateSQLOrderQuery<SearchATS_OrderDetailResult>(sort_columns, "order by ATS_OrderDetail.od_id")}
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchATS_OrderDetailResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchATS_OrderDetailResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    od_id = dt.Columns.Contains("od_id") ? dr["od_id"].ToString() : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null,
                    o_id = dt.Columns.Contains("o_id") ? dr["o_id"].ToString() : null,
                    es_id = dt.Columns.Contains("es_id") ? dr["es_id"].ToString() : null,
                    es_type = dt.Columns.Contains("es_type") ? dr["es_type"].ToString() : null,
                    es_name = dt.Columns.Contains("es_name") ? dr["es_name"].ToString() : null,
                    es_price = dt.Columns.Contains("es_price") ? dr.Field<decimal>("es_price") : null
                });
            }
            return result;
        }

        /// <summary>
        /// DeleteATS_OrderDetail
        /// </summary>
        /// <param name="od_id"></param>
        public void DeleteATS_OrderDetail(string od_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from ATS_OrderDetail where od_id=@od_id;";
                    myCommand.Parameters.AddWithValue("@od_id", od_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}