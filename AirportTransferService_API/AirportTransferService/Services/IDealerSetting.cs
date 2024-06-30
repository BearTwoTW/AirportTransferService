namespace AirportTransferService.Services
{
    /// <summary>
    /// IDealerSetting
    /// </summary>
    public interface IDealerSetting
    {
        #region DealerSetting
        /// <summary>
        /// CreateDealerSetting
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        int CreateDealerSetting(CreateDealerSettingParam param);

        /// <summary>
        /// SearchDealerSetting
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchDealerSettingResult> SearchDealerSetting(SearchDealerSettingParam param, List<string> columns, out int page_count);

        /// <summary>
        /// UpdateDealerSetting
        /// </summary>
        /// <param name="param"></param>
        void UpdateDealerSetting(UpdateDealerSettingParam param);

        /// <summary>
        /// DeleteDealerSetting
        /// </summary>
        /// <param name="ds_id"></param>
        void DeleteDealerSetting(int ds_id);
        #endregion
    }

    /// <summary>
    /// IDealerSetting_IMPL
    /// </summary>
    /// <param name="config"></param>
    public class IDealerSetting_IMPL(IConfiguration config) : IDealerSetting
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config = config;

        /// <summary>
        /// strConn
        /// </summary>
        private readonly string strConn = config["sql_conn"];

        #region DealerSetting
        /// <summary>
        /// CreateDealerSetting
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public int CreateDealerSetting(CreateDealerSettingParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int ds_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into DealerSetting({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    ds_id = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }
            return ds_id;
        }

        /// <summary>
        /// DeleteDealerSetting
        /// </summary>
        /// <param name="ds_id"></param>
        public void DeleteDealerSetting(int ds_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = "delete DealerSetting where ds_id=@ds_id";
                    myCommand.Parameters.AddWithValue("@ds_id", ds_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        /// <summary>
        /// SearchDealerSetting
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchDealerSettingResult> SearchDealerSetting(SearchDealerSettingParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchDealerSettingResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select 
                {SQL.GenerateSQLSelectQuery<SearchDealerSettingResult>(columns)}
                from DealerSetting
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by cre_time asc 
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchDealerSettingResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchDealerSettingResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    ds_id = dt.Columns.Contains("ds_id") ? dr.Field<int?>("ds_id") : null,
                    ds_code = dt.Columns.Contains("ds_code") ? dr["ds_code"].ToString() : null,
                    ds_name = dt.Columns.Contains("ds_name") ? dr["ds_name"].ToString() : null,
                    ds_dbname = dt.Columns.Contains("ds_dbname") ? dr["ds_dbname"].ToString() : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdateDealerSetting
        /// </summary>
        /// <param name="param"></param>
        public void UpdateDealerSetting(UpdateDealerSettingParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update DealerSetting
                    {str}
                    where ds_id=@ds_id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
        #endregion
    }
}