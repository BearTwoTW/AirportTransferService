namespace AirportTransferService.Services
{
    /// <summary>
    /// IPage
    /// </summary>
    public interface IPage : IAllowAnonymousService
    {
        #region PageGroup
        /// <summary>
        /// CreatePageGroup
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        int CreatePageGroup(CreatePageGroupParam param);

        /// <summary>
        /// SearchPageGroup
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchPageGroupResult> SearchPageGroup(SearchPageGroupParam param, List<string> columns, out int page_count);

        /// <summary>
        /// UpdatePageGroup
        /// </summary>
        /// <param name="page_group"></param>
        void UpdatePageGroup(UpdatePageGroupParam page_group);

        /// <summary>
        /// DeletePageGroup
        /// </summary>
        /// <param name="pg_id"></param>
        void DeletePageGroup(int pg_id);
        #endregion

        #region Pages
        /// <summary>
        /// CreatePages
        /// </summary>
        /// <param name="pages"></param>
        /// <returns></returns>
        int CreatePages(CreatePagesParam pages);

        /// <summary>
        /// SearchPages
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchPagesResult> SearchPages(SearchPagesParam param, List<string> columns, out int page_count);

        /// <summary>
        /// UpdatePages
        /// </summary>
        /// <param name="param"></param>
        void UpdatePages(UpdatePagesParam param);

        /// <summary>
        /// DeletePages
        /// </summary>
        /// <param name="page_id"></param>
        void DeletePages(int page_id);
        #endregion

        #region PageControl
        /// <summary>
        /// CreatePageControl
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        int CreatePageControl(CreatePageControlParam param);

        /// <summary>
        /// SearchPageControl
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        List<SearchPageControlResult> SearchPageControl(SearchPageControlParam param, List<string> columns, out int page_count);

        /// <summary>
        /// UpdatePageControl
        /// </summary>
        /// <param name="param"></param>
        void UpdatePageControl(UpdatePageControlParam param);

        /// <summary>
        /// DeletePageControl
        /// </summary>
        /// <param name="pc_id"></param>
        void DeletePageControl(int pc_id);
        #endregion
    }

    /// <summary>
    /// IPage_IMPL
    /// </summary>
    public class IPage_IMPL : IAllowAnonymousService_IMPL, IPage
    {
        //public readonly IConfiguration _config;
        /// <summary>
        /// _baseService
        /// </summary>
        public readonly IBaseService _baseService;
        //public readonly UserDealerInfo _userDealerInfo;

        private string strConn = "";
        private readonly string db_name = "";
        private readonly string head_office_dbo = "";

        /// <summary>
        /// IPage_IMPL
        /// </summary>
        /// <param name="config"></param>
        /// <param name="baseService"></param>
        /// <param name="dealerSetting"></param>
        public IPage_IMPL(IConfiguration config, IBaseService baseService, IDealerSetting dealerSetting)
            : base(config, dealerSetting, baseService.GetUserDealerInfo())
        {
            //_config = config;
            _baseService = baseService;
            //_userDealerInfo = _baseService.GetUserDealerInfo();
            db_name = _config["Database"];
            strConn = _config["sql_conn"].Replace(db_name, _userDealerInfo.ds_dbname);
            head_office_dbo = $"[{db_name}].[dbo].";
        }

        #region PageGroup
        /// <summary>
        /// CreatePageGroup
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public int CreatePageGroup(CreatePageGroupParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            int pg_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                //取得流水號
                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "PageGroup", "", 9999999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                else if (int.TryParse(get_auto_res.data, out int result)) pg_id = result;
                else throw new Exception(message: "Empty Key");
                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into {head_office_dbo}PageGroup({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@pg_id", pg_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                }
            }
            return pg_id;
        }

        /// <summary>
        /// DeletePageGroup
        /// </summary>
        /// <param name="pg_id"></param>
        public void DeletePageGroup(int pg_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    delete from UserDutyPermissionJoin where pg_id=@pg_id
                    delete from {head_office_dbo}PageControl where page_id in (select page_id from {head_office_dbo}Pages where pg_id=@pg_id)
                    delete from {head_office_dbo}Pages where pg_id=@pg_id
                    delete from {head_office_dbo}PageGroup where pg_id=@pg_id";
                    myCommand.Parameters.AddWithValue("@pg_id", pg_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        /// <summary>
        /// SearchPageGroup
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchPageGroupResult> SearchPageGroup(SearchPageGroupParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchPageGroupResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select 
                {SQL.GenerateSQLSelectQuery<SearchPageGroupResult>(columns)}
                from {head_office_dbo}PageGroup
                left join (select sps_id,name from SPS where spp_id='SYS') as system on PageGroup.system=system.sps_id
                left join (select sps_id,name from SPS where spp_id='MNL') as menus on PageGroup.menus=menus.sps_id
                where 1=1  
                {SQL.GenerateSQLWhereQuery(param)}
                order by PageGroup.system,PageGroup.menus,PageGroup.seq 
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchPageGroupResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchPageGroupResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid ") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time ") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    pg_id = dt.Columns.Contains("pg_id") ? dr.Field<int?>("pg_id") : null,
                    su = dt.Columns.Contains("su") ? dr["su"].ToString() : null,
                    seq = dt.Columns.Contains("seq") ? dr.Field<int?>("seq") : null,
                    system = dt.Columns.Contains("system") ? dr["system"].ToString() : null,
                    menus = dt.Columns.Contains("menus") ? dr["menus"].ToString() : null,
                    code = dt.Columns.Contains("code") ? dr["code"].ToString() : null,
                    icon = dt.Columns.Contains("icon") ? dr["icon"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    system_name = dt.Columns.Contains("system_name") ? dr["system_name"].ToString() : null,
                    menus_name = dt.Columns.Contains("menus_name") ? dr["menus_name"].ToString() : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdatePageGroup
        /// </summary>
        /// <param name="param"></param>
        public void UpdatePageGroup(UpdatePageGroupParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update {head_office_dbo}PageGroup
                    {str}
                    where pg_id=@pg_id";
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

        #region Pages
        /// <summary>
        /// CreatePages
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public int CreatePages(CreatePagesParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            int page_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                //取得流水號
                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "Pages", "", 9999999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                else if (int.TryParse(get_auto_res.data, out int result)) page_id = result;
                else throw new Exception(message: "Empty Key");
                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into {head_office_dbo}Pages({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@page_id", page_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                }
            }
            return page_id;
        }

        /// <summary>
        /// DeletePages
        /// </summary>
        /// <param name="page_id"></param>
        public void DeletePages(int page_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    delete from UserDutyPermissionJoin where page_id=@page_id
                    delete from {head_office_dbo}PageControl where page_id=@page_id
                    delete from {head_office_dbo}Pages where page_id=@page_id";
                    myCommand.Parameters.AddWithValue("@page_id", page_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        /// <summary>
        /// SearchPages
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchPagesResult> SearchPages(SearchPagesParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchPagesResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchPagesResult>(columns)}
                from {head_office_dbo}Pages 
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by seq
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchPagesResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchPagesResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid ") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time ") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid ") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    page_id = dt.Columns.Contains("page_id") ? dr.Field<int?>("page_id") : null,
                    pg_id = dt.Columns.Contains("pg_id") ? dr.Field<int?>("pg_id") : null,
                    su = dt.Columns.Contains("su") ? dr["su"].ToString() : null,
                    seq = dt.Columns.Contains("seq") ? dr.Field<int?>("seq") : null,
                    code = dt.Columns.Contains("code") ? dr["code"].ToString() : null,
                    icon = dt.Columns.Contains("icon") ? dr["icon"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                });
            }
            return result;
        }

        /// <summary>
        /// UpdatePages
        /// </summary>
        /// <param name="param"></param>
        public void UpdatePages(UpdatePagesParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update {head_office_dbo}Pages
                    {str}
                    where page_id=@page_id";
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

        #region PageControl
        /// <summary>
        /// CreatePageControl
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public int CreatePageControl(CreatePageControlParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            int pc_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                //取得流水號
                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "PageControl", "", 9999999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                else if (int.TryParse(get_auto_res.data, out int result)) pc_id = result;
                else throw new Exception(message: "Empty Key");
                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into {head_office_dbo}PageControl({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@pc_id", pc_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                }
            }
            return pc_id;
        }

        /// <summary>
        /// DeletePageControl
        /// </summary>
        /// <param name="pc_id"></param>
        public void DeletePageControl(int pc_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    delete UserDutyPermissionJoin where pc_id=@pc_id
                    delete {head_office_dbo}PageControl where pc_id=@pc_id";
                    myCommand.Parameters.AddWithValue("@pc_id", pc_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        /// <summary>
        /// SearchPageControl
        /// </summary>
        /// <param name="param"></param>
        /// <param name="columns"></param>
        /// <param name="page_count"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<SearchPageControlResult> SearchPageControl(SearchPageControlParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchPageControlResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select     
                {SQL.GenerateSQLSelectQuery<SearchPageControlResult>(columns)}
                from {head_office_dbo}PageControl 
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}
                order by ctrl_code,code 
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchPageControlResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchPageControlResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    pc_id = dt.Columns.Contains("pc_id") ? dr.Field<int?>("pc_id") : null,
                    page_id = dt.Columns.Contains("page_id") ? dr.Field<int?>("page_id") : null,
                    su = dt.Columns.Contains("su") ? dr["su"].ToString() : null,
                    code = dt.Columns.Contains("code") ? dr["code"].ToString() : null,
                    ctrl_code = dt.Columns.Contains("ctrl_code") ? dr["ctrl_code"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null
                });
            }
            return result;
        }

        /// <summary>
        /// UpdatePageControl
        /// </summary>
        /// <param name="param"></param>
        public void UpdatePageControl(UpdatePageControlParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update {head_office_dbo}PageControl
                    {str}
                    where pc_id=@pc_id";
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

        /// <summary>
        /// RefreshstrConn
        /// </summary>
        /// <param name="ds_code"></param>
        public new void RefreshstrConn(string ds_code)
        {
            RefreshstrConn(ds_code, out strConn);
        }
    }
}