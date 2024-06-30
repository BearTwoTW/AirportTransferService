namespace AirportTransferService.Services
{
    public interface IPermissionFunction
    {
        #region PermissionFunction
        int CreatePermissionFunction(CreatePermissionFunctionParam param);
        List<SearchPermissionFunctionResult> SearchPermissionFunction(SearchPermissionFunctionParam param, List<string> columns, out int page_count);
        void UpdatePermissionFunction(UpdatePermissionFunctionParam param);
        void DeletePermissionFunction(int pfl_id);
        #endregion

        #region PermissionFunctionUserDutyJoin
        void CreatePermissionFunctionUserDutyJoin(CreatePermissionFunctionUserDutyJoinParam param);
        List<SearchPermissionFunctionUserDutyJoinResult> SearchPermissionFunctionUserDutyJoin(SearchPermissionFunctionUserDutyJoinParam param);
        void DeletePermissionFunctionUserDutyJoin(int? pfl_id, int? ud_id);
        #endregion

        /// <summary>
        /// 查詢有api_name權限的使用者們
        /// </summary>
        /// <param name="api_name"></param>
        /// <returns></returns>
        public List<string> CheckUserWithPermission(string api_name);
    }

    public class IPermissionFunction_IMPL : IPermissionFunction
    {
        public readonly IConfiguration _config;
        public readonly IBaseService _baseService;
        public readonly UserDealerInfo _userDealerInfo;

        private readonly string strConn = "";
        private readonly string db_name = "";
        private readonly string head_office_dbo = "";
        public IPermissionFunction_IMPL(IConfiguration config, IBaseService baseService)
        {
            _config = config;
            _baseService = baseService;
            _userDealerInfo = _baseService.GetUserDealerInfo();
            db_name = _config["Database"];
            strConn = _config["sql_conn"].Replace(db_name, _userDealerInfo.ds_dbname);
            head_office_dbo = $"[{db_name}].[dbo].";
        }

        #region PermissionFunction
        public int CreatePermissionFunction(CreatePermissionFunctionParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int pfl_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into {head_office_dbo}PermissionFunctionList({str_column})
                    values({str_value});
                    select @@IDENTITY";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    pfl_id = Convert.ToInt32(myCommand.ExecuteScalar());
                    myCommand.Cancel();
                }
            }
            return pfl_id;
        }

        public void DeletePermissionFunction(int pfl_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"delete from {head_office_dbo}PermissionFunctionList where pfl_id=@pfl_id";
                    myCommand.Parameters.AddWithValue("@pfl_id", pfl_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchPermissionFunctionResult> SearchPermissionFunction(SearchPermissionFunctionParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchPermissionFunctionResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select 
                {SQL.GenerateSQLSelectQuery<SearchPermissionFunctionResult>(columns)}
                from {head_office_dbo}PermissionFunctionList 
                where 1 = 1
                {SQL.GenerateSQLWhereQuery(param)}
                order by cre_time desc 
                {(param.page > 0 ? "offset((@page-1)) * @num_per_page ROWS fetch next @num_per_page ROWS only;" : "")}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchPermissionFunctionResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchPermissionFunctionResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    pfl_id = dt.Columns.Contains("pfl_id") ? dr.Field<int?>("pfl_id") : null,
                    type = dt.Columns.Contains("type") ? dr["type"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    api_name = dt.Columns.Contains("api_name") ? dr["api_name"].ToString() : null,
                    join_limit = dt.Columns.Contains("join_limit") ? dr.Field<int?>("join_limit") : null
                });
            }
            return result;
        }

        public void UpdatePermissionFunction(UpdatePermissionFunctionParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update {head_office_dbo}PermissionFunctionList
                    {str}
                    where pfl_id=@pfl_id";
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

        #region PermissionFunctionUserDutyJoin
        public void CreatePermissionFunctionUserDutyJoin(CreatePermissionFunctionUserDutyJoinParam param)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"
                    insert into PermissionFunctionUserDutyJoin(cre_userid,cre_time,pfl_id,ud_id)
                    values(@cre_userid,@cre_time,@pfl_id,@ud_id)";
                    myCommand.Parameters.AddWithValue("@cre_userid", param.cre_userid);
                    myCommand.Parameters.AddWithValue("@cre_time", param.cre_time);
                    myCommand.Parameters.AddWithValue("@pfl_id", param.pfl_id);
                    myCommand.Parameters.AddWithValue("@ud_id", param.ud_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public void DeletePermissionFunctionUserDutyJoin(int? pfl_id, int? ud_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    delete from PermissionFunctionUserDutyJoin where 1=1
                    {(pfl_id == null ? "" : " and pfl_id=@pfl_id ")}
                    {(ud_id == null ? "" : " and ud_id=@ud_id ")}";
                    if (pfl_id != null) myCommand.Parameters.AddWithValue("@pfl_id", pfl_id);
                    if (ud_id != null) myCommand.Parameters.AddWithValue("@ud_id", ud_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchPermissionFunctionUserDutyJoinResult> SearchPermissionFunctionUserDutyJoin(SearchPermissionFunctionUserDutyJoinParam param)
        {
            DataTable dt = new();

            string ud_ids_condition = "";
            if (param.ud_ids != null && param.ud_ids.Count > 0)
            {
                int count = 0;
                ud_ids_condition = " and PFUDJ.ud_id in ( ";
                foreach (int ud_id in param.ud_ids)
                {
                    ud_ids_condition += $"@ud_id{count},";
                    count++;
                }
                ud_ids_condition = ud_ids_condition.TrimEnd(',') + ")";
            }

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    select PFUDJ.cre_userid
                          ,PFUDJ.cre_time
                          ,PFUDJ.upd_userid
                          ,PFUDJ.upd_time
                          ,PFUDJ.pfl_id
                          ,PFUDJ.ud_id
                          ,ISNULL(UD.code,'') as ud_code
                          ,ISNULL(UD.name,'') as ud_name
                          ,ISNULL(PFL.api_name,'') as api_name
                          ,ISNULL(UD.ul_id,-1) as logic_ul_id
                    from {head_office_dbo}PermissionFunctionList as PFL
                    left join PermissionFunctionUserDutyJoin as PFUDJ on PFL.pfl_id=PFUDJ.pfl_id {ud_ids_condition}
                    left join UserDuty as UD on UD.ud_id=PFUDJ.ud_id
                    where 1=1
                    {(param.pfl_id == null ? "" : " and PFUDJ.pfl_id=@pfl_id ")}
                    {(string.IsNullOrEmpty(param.api_name) ? "" : " and PFL.api_name=@api_name ")}";
                    using (SqlDataAdapter myAdapter = new())
                    {
                        if (param.ud_ids != null && param.ud_ids.Count > 0)
                        {
                            int count = 0;
                            foreach (int ud_id in param.ud_ids)
                            {
                                myCommand.Parameters.AddWithValue($"@ud_id{count}", ud_id);
                                count++;
                            }
                        }
                        if (param.pfl_id != null) myCommand.Parameters.AddWithValue("@pfl_id", param.pfl_id);
                        if (!string.IsNullOrEmpty(param.api_name)) myCommand.Parameters.AddWithValue("@api_name", param.api_name);
                        myAdapter.SelectCommand = myCommand;
                        myAdapter.Fill(dt);
                        myCommand.Cancel();
                    }
                }
            }

            List<SearchPermissionFunctionUserDutyJoinResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchPermissionFunctionUserDutyJoinResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    pfl_id = dt.Columns.Contains("pfl_id") ? dr.Field<int?>("pfl_id") : null,
                    ud_id = dt.Columns.Contains("ud_id") ? dr.Field<int?>("ud_id") : null,
                    ud_code = dt.Columns.Contains("ud_code") ? dr["ud_code"].ToString() : null,
                    ud_name = dt.Columns.Contains("ud_name") ? dr["ud_name"].ToString() : null,
                    api_name = dt.Columns.Contains("api_name") ? dr["api_name"].ToString() : null,
                    logic_ul_id = dt.Columns.Contains("logic_ul_id") ? dr.Field<int?>("logic_ul_id") : null
                });
            }
            return result;
        }
        #endregion

        /// <summary>
        /// 查詢有api_name權限的使用者們
        /// </summary>
        /// <param name="api_name"></param>
        /// <returns></returns>
        public List<string> CheckUserWithPermission(string api_name)
        {
            List<string> user_ids = [];
            DataTable dt = new();

            //查權限功能對應的職責有沒有在kvs裡面
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    with h_使用者們的職務 as(
                      select user_id,ul_id
                      from {head_office_dbo}Users 
                      where disable='N'
                    )
                    ,h_使用者們有的職責 as(
                      select user_id,ud_id,'' as isneed 
                      from h_使用者們的職務 
                      left join UserLevelDutyJoin on UserLevelDutyJoin.ul_id=h_使用者們的職務.ul_id
                      union
                      select user_id,ud_id,isneed from UserDutyJoin where user_id in (select user_id from h_使用者們的職務)
                    )
                    ,h_使用者本身和代理得到的職責們 as (
                      select a.user_id,a.ud_id,a.isneed from h_使用者們有的職責 a
                      left join (select user_id,ud_id,user_id+convert(varchar,ud_id) as x from h_使用者們有的職責 where isneed = 'N') b on a.ud_id=b.ud_id and a.user_id=b.user_id
                      where a.ud_id is not null and b.ud_id IS NULL
                    )
                    select user_id 
                    from h_使用者本身和代理得到的職責們
                    left join PermissionFunctionUserDutyJoin on PermissionFunctionUserDutyJoin.ud_id=h_使用者本身和代理得到的職責們.ud_id
                    left join {head_office_dbo}PermissionFunctionList on PermissionFunctionList.pfl_id=PermissionFunctionUserDutyJoin.pfl_id
                    where api_name=@api_name";
                    using (SqlDataAdapter myAdapter = new())
                    {
                        dt.Reset();
                        myAdapter.SelectCommand = myCommand;
                        myCommand.Parameters.AddWithValue("@api_name", api_name);
                        myAdapter.Fill(dt);
                        myCommand.Cancel();
                    }
                }
                foreach (DataRow dr in dt.Rows)
                {
                    //dr有值再加入，不然會有null的情況
                    if (!string.IsNullOrEmpty(dr["user_id"].ToString()))
                    {
                        user_ids.Add(dr["user_id"].ToString() ?? "");
                    }
                }
                return user_ids;
            }
        }
    }
}