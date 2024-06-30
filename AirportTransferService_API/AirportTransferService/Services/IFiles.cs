namespace AirportTransferService.Services
{
    public interface IFiles
    {
        int CreateFiles(CreateFilesParam param);
        List<SearchFilesResult> SearchFiles(SearchFilesParam param, List<string> columns, out int page_count);
        void UpdateFiles(UpdateFilesParam param);
        void DeleteFiles(int file_id);
    }

    public class IFiles_IMPL : IFiles
    {
        public readonly IConfiguration _config;
        public readonly IBaseService _baseService;
        public readonly UserDealerInfo _userDealerInfo;

        private readonly string db_name = "";
        private readonly string strConn = "";

        public IFiles_IMPL(IConfiguration config, IBaseService baseService)
        {
            _baseService = baseService;
            _userDealerInfo = _baseService.GetUserDealerInfo();
            _config = config;
            db_name = _config["Database"];
            strConn = _config["sql_conn"].Replace(db_name, _userDealerInfo.ds_dbname);
        }

        public int CreateFiles(CreateFilesParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int file_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into Files({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    file_id = Convert.ToInt32(myCommand.ExecuteScalar());
                }
            }
            return file_id;
        }

        public void DeleteFiles(int file_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete Files where file_id=@file_id";
                    myCommand.Parameters.AddWithValue("@file_id", file_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchFilesResult> SearchFiles(SearchFilesParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchFilesResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchFilesResult>(columns)}
                from Files
                where 1=1  
                {SQL.GenerateSQLWhereQuery(param)}
                order by seq asc,cre_time desc
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchFilesResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchFilesResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid ") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time ") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    file_id = dt.Columns.Contains("file_id") ? dr.Field<int?>("file_id") : null,
                    file_code = dt.Columns.Contains("file_code") ? dr["file_code"].ToString() : null,
                    belong = dt.Columns.Contains("belong") ? dr["belong"].ToString() : null,
                    id = dt.Columns.Contains("id") ? dr["id"].ToString() : null,
                    type = dt.Columns.Contains("type") ? dr["type"].ToString() : null,
                    path = dt.Columns.Contains("path") ? dr["path"].ToString() : null,
                    isvalid = dt.Columns.Contains("isvalid") ? dr["isvalid"].ToString() : null,
                    custom_key1 = dt.Columns.Contains("custom_key1") ? dr["custom_key1"].ToString() : null,
                    custom_key2 = dt.Columns.Contains("custom_key2") ? dr["custom_key2"].ToString() : null,
                    seq = dt.Columns.Contains("seq") ? dr.Field<int?>("seq") : null,
                    url = dt.Columns.Contains("url") ? dr["url"].ToString() : null
                });
            }
            return result;
        }

        public void UpdateFiles(UpdateFilesParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update Files
                    {str}
                    where file_id=@file_id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }
    }
}