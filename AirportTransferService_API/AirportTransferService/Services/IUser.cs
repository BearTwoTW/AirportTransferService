namespace AirportTransferService.Services
{
    public interface IUser : IAllowAnonymousService
    {
        #region User
        string CreateUser(CreateUserParam param);
        List<SearchUserResult> SearchUser(SearchUserParam param, List<string> columns, out int page_count);
        void UpdateUser(UpdateUserParam param);
        void DeleteUser(string user_id);

        /// <summary>
        /// 使用者暫存資料
        /// </summary>
        void UserCache();
        #endregion

        #region RelatedCompanyRecord
        int CreateRelatedCompanyRecord(CreateRelatedCompanyRecordParam param);
        List<SearchRelatedCompanyRecordResult> SearchRelatedCompanyRecord(SearchRelatedCompanyRecordParam param, List<string> columns, out int page_count);
        void UpdateRelatedCompanyRecord(UpdateRelatedCompanyRecordParam param);
        void DeleteRelatedCompanyRecord(int rcr_id);
        #endregion

        #region UserSigninLog

        void CreateUserSigninLog(DateTime signin_time, string check_code, string device_column, string device_code, string user_id);

        #endregion
    }

    /// <summary>
    /// 使用者暫存記憶體 只放加密資料試試
    /// </summary>
    public class UserCache
    {
        public readonly List<SearchUserResult> uc = [];
    }

    public class IUser_IMPL : IAllowAnonymousService_IMPL, IUser
    {
        //public readonly IConfiguration _config;
        public readonly IBaseService _baseService;
        //public readonly UserDealerInfo _userDealerInfo;

        public readonly UserCache _userCache;

        private string strConn = "";
        private readonly string db_name = "";
        private readonly string head_office_dbo = "";
        public IUser_IMPL(IConfiguration config, IBaseService baseService, IDealerSetting dealerSetting, UserCache userCache)
            : base(config, dealerSetting, baseService.GetUserDealerInfo())
        {
            //_config = config;
            _baseService = baseService;
            //_userDealerInfo = _baseService.GetUserDealerInfo();
            db_name = _config["Database"];
            strConn = _config["sql_conn"].Replace(db_name, _userDealerInfo.ds_dbname);
            head_office_dbo = $"[{db_name}].[dbo].";
            _userCache = userCache;
        }

        public string CreateUser(CreateUserParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                //取得流水號
                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, "Users" + param.company_code, param.company_code ?? "", 9999, false, head_office_dbo);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                string user_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(user_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into {head_office_dbo}Users({str_column})
                    values({str_value})";
                    myCommand.Parameters.AddWithValue("@user_id", user_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }

                //按到職日比例給假
                //if (param.on_board_date != null)
                //{
                //    //TODO : 要改
                //    myCommand = new("RDE_UserCreate_GiveVacation", myConn)
                //    {
                //        CommandType = CommandType.StoredProcedure
                //    };
                //    myCommand.Parameters.Add("@on_board_date", SqlDbType.DateTime).Value = param.on_board_date.Value.ToDateTime(new TimeOnly(0, 0, 0));
                //    myCommand.Parameters.Add("@user_id", SqlDbType.VarChar).Value = user_id;
                //    myCommand.ExecuteNonQuery();
                //}
                //加密資料放暫存
                _userCache.uc.Add(new SearchUserResult
                {
                    user_id = user_id,
                    cre_time = param.cre_time,
                    name = Tool.Sy_Decoder(param.name, param.cre_time?.ToString("yyyyMMddHHmmss"))
                });
                return user_id;
            }
        }

        public void DeleteUser(string user_id)
        {

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"delete from {head_office_dbo}Users where user_id=@user_id;";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    myCommand.Parameters.AddWithValue("@user_id", user_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
            //刪除暫存資料
            _userCache.uc.RemoveAll(x => x.user_id == user_id);
        }

        public List<SearchUserResult> SearchUser(SearchUserParam param, List<string> columns, out int page_count)
        {
            //比對暫存用 查詢結果固定加入user_id
            if (!columns.Contains("user_id")) columns.Add("user_id");

            if (!SQL.CheckSearchColumn<SearchUserResult>(columns)) throw new Exception(message: "Search Column Not Exists");

            //檢查暫存資料是否存在
            if (_userCache.uc.Count == 0) UserCache();

            List<SearchUserResult> user_caches = [];
            List<SearchUserResult> user_caches_tmp = [];
            if (!string.IsNullOrEmpty(param.name))
            {
                user_caches_tmp = _userCache.uc.Where(x => (x.name ?? "").Contains(param.name)).ToList();
                //有給條件卻沒結果==>讓查詢找不到東西
                if (user_caches_tmp.Count == 0)
                {
                    user_caches.Add(new SearchUserResult { user_id = "NO RESULT" });
                }
                else
                {
                    user_caches = [.. user_caches, .. user_caches_tmp];
                }
            }
            List<string> user_ids = user_caches.Where(x => !string.IsNullOrEmpty(x.user_id)).Select(x => x.user_id ?? "").Distinct().ToList();
            //加入使用者流水號查詢條件
            if (user_ids.Exists(x => x.Equals("NO RESULT")))
            {
                param.user_ids = ["NO RESULT"];
            }
            else if (user_ids.Count > 0)
            {
                param.user_ids = param.user_ids == null ? user_ids : param.user_ids.Concat(user_ids).Distinct().ToList();
            }

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();
                //TODO : 有點難用 own_user_id top_ul_id
                string strSql = $@"with ULT as (select * from UserLevelTreeESC(@top_ul_id,0,100))
                                  select    
                                      {SQL.GenerateSQLSelectQuery<SearchUserResult>(columns)}
                                  from {head_office_dbo}Users
                                  left join (select ul_id,name from ULT) as UL on Users.ul_id=UL.ul_id
                                  left join UserLevel on UserLevel.ul_id=Users.ul_id
                                  left join SPS on SPS.spp_id='SYS' and SPS.sps_id=Users.home_page
                                  left join SPS as SPS_SEX on SPS_SEX.spp_id='SEX' and SPS_SEX.sps_id=Users.gender
                                  left join SPS as SPS_POS on SPS_POS.spp_id='POS' and SPS_POS.sps_id=UserLevel.position_id
                                  left join SPS as SPS_CLA on SPS_CLA.spp_id='CLA' and SPS_CLA.sps_id=UserLevel.class_id
                                  left join {head_office_dbo}DealerSetting on DealerSetting.ds_id=Users.ds_id
                                   where (
                                          @own_user_id='' 
                                            or
                                          (Users.ul_id in (select ul_id from ULT where level<>0) or Users.user_id=@own_user_id)
                                         )
                                    {SQL.GenerateSQLWhereQuery(param)}
                                    order by Users.cre_time desc ";

                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count, ["own_user_id", "top_ul_id"]);

            }
            List<SearchUserResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchUserResult
                {
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    disable = dt.Columns.Contains("disable") ? dr["disable"].ToString() : null,
                    company_code = dt.Columns.Contains("company_code") ? dr["company_code"].ToString() : null,
                    user_id = dt.Columns.Contains("user_id") ? dr["user_id"].ToString() : null,
                    username = dt.Columns.Contains("username") ? dr["username"].ToString() : null,
                    password = dt.Columns.Contains("password") ? dr["password"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    name_en = dt.Columns.Contains("name_en") ? dr["name_en"].ToString() : null,
                    gender = dt.Columns.Contains("gender") ? dr["gender"].ToString() : null,
                    gender_name = dt.Columns.Contains("gender_name") ? dr["gender_name"].ToString() : null,
                    birthday = (dt.Columns.Contains("birthday") && dr.Field<DateTime?>("birthday") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("birthday")) : null,
                    telephone = dt.Columns.Contains("telephone") ? dr["telephone"].ToString() : null,
                    mobile_phone = dt.Columns.Contains("mobile_phone") ? dr["mobile_phone"].ToString() : null,
                    email = dt.Columns.Contains("email") ? dr["email"].ToString() : null,
                    city = dt.Columns.Contains("city") ? dr["city"].ToString() : null,
                    area = dt.Columns.Contains("area") ? dr["area"].ToString() : null,
                    address = dt.Columns.Contains("address") ? dr["address"].ToString() : null,
                    city_census = dt.Columns.Contains("city_census") ? dr["city_census"].ToString() : null,
                    area_census = dt.Columns.Contains("area_census") ? dr["area_census"].ToString() : null,
                    address_census = dt.Columns.Contains("address_census") ? dr["address_census"].ToString() : null,
                    on_board_date = (dt.Columns.Contains("on_board_date") && dr.Field<DateTime?>("on_board_date") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("on_board_date")) : null,
                    note = dt.Columns.Contains("note") ? dr["note"].ToString() : null,
                    signin_time = dt.Columns.Contains("signin_time") ? dr.Field<DateTime?>("signin_time") : null,
                    home_page = dt.Columns.Contains("home_page") ? dr["home_page"].ToString() : null,
                    home_page_name = dt.Columns.Contains("home_page_name") ? dr["home_page_name"].ToString() : null,
                    app_code = dt.Columns.Contains("app_code") ? dr["app_code"].ToString() : null,
                    web_code = dt.Columns.Contains("web_code") ? dr["web_code"].ToString() : null,
                    ul_id = dt.Columns.Contains("ul_id") ? dr.Field<int?>("ul_id") : null,
                    ul_name = dt.Columns.Contains("ul_name") ? dr["ul_name"].ToString() : null,
                    company_id = dt.Columns.Contains("company_id") ? dr["company_id"].ToString() : null,
                    general_manager_id = dt.Columns.Contains("general_manager_id") ? dr["general_manager_id"].ToString() : null,
                    department_id = dt.Columns.Contains("department_id") ? dr["department_id"].ToString() : null,
                    position_id = dt.Columns.Contains("position_id") ? dr["position_id"].ToString() : null,
                    position_name = dt.Columns.Contains("position_name") ? dr["position_name"].ToString() : null,
                    class_id = dt.Columns.Contains("class_id") ? dr["class_id"].ToString() : null,
                    class_name = dt.Columns.Contains("class_name") ? dr["class_name"].ToString() : null,
                    group_id = dt.Columns.Contains("group_id") ? dr["group_id"].ToString() : null,
                    office_id = dt.Columns.Contains("office_id") ? dr["office_id"].ToString() : null,
                    check_code = dt.Columns.Contains("check_code") ? dr["check_code"].ToString() : null,
                    blood_type = dt.Columns.Contains("blood_type") ? dr["blood_type"].ToString() : null,
                    identity_card = dt.Columns.Contains("identity_card") ? dr["identity_card"].ToString() : null,
                    ucr_id = dt.Columns.Contains("ucr_id") ? dr.Field<int?>("ucr_id") : null,
                    career_level = dt.Columns.Contains("career_level") ? dr.Field<int?>("career_level") : null,
                    isresign = dt.Columns.Contains("isresign") ? dr["isresign"].ToString() : null,
                    resign_date = (dt.Columns.Contains("resign_date") && dr.Field<DateTime?>("resign_date") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("resign_date")) : null,
                    resign_reason = dt.Columns.Contains("resign_reason") ? dr["resign_reason"].ToString() : null,
                    SMT_username = dt.Columns.Contains("SMT_username") ? dr["SMT_username"].ToString() : null,
                    ds_id = dt.Columns.Contains("ds_id") ? dr.Field<int?>("ds_id") : null,
                    ds_code = dt.Columns.Contains("ds_code") ? dr["ds_code"].ToString() : null,
                    ds_name = dt.Columns.Contains("ds_name") ? dr["ds_name"].ToString() : null,
                    ds_dbname = dt.Columns.Contains("ds_dbname") ? dr["ds_dbname"].ToString() : null
                });
            }

            return result;
        }

        public void UpdateUser(UpdateUserParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"update {head_office_dbo}Users {str}
                                    where user_id=@user_id";

                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }

            //修改暫存資料
            _userCache.uc.Where(x => x.user_id == param.user_id)
                        .SetValue(x => x.name = (param.name == Appsettings.api_string_param_no_pass ? x.name : Tool.Sy_Decoder(param.name, x.cre_time?.ToString("yyyyMMddHHmmss"))));
        }

        /// <summary>
        /// 使用者暫存資料
        /// </summary>
        public void UserCache()
        {
            _userCache.uc.Clear();

            DataTable dt = new();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();
                string strSql = $@"select   
                                      cre_time,
                                      user_id,
                                      name
                                  from {head_office_dbo}Users";

                using (SqlCommand myCommand = new(strSql, myConn))
                {
                    using (SqlDataAdapter myAdapter = new())
                    {
                        myAdapter.SelectCommand = myCommand;
                        myAdapter.Fill(dt);
                        myCommand.Cancel();
                    }
                }
            }

            foreach (DataRow dr in dt.Rows)
            {
                _userCache.uc.Add(new SearchUserResult
                {
                    cre_time = dr.Field<DateTime?>("cre_time"),
                    user_id = dr["user_id"].ToString(),
                    name = Tool.Sy_Decoder(dr["name"].ToString(), dr.Field<DateTime?>("cre_time")?.ToString("yyyyMMddHHmmss"))
                });
            }
        }


        public int CreateRelatedCompanyRecord(CreateRelatedCompanyRecordParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, true);

            int rcr_id = 0;
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"insert into RelatedCompanyRecord(
                                    {str_column}
                                    )
                           values(
                                {str_value}
                            );
                            select @@IDENTITY";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    using (SqlDataReader dr = myCommand.ExecuteReader())
                    {
                        dr.Read();
                        rcr_id = Convert.ToInt32(dr.GetValue(0));
                        myCommand.Cancel();
                        dr.Close();
                    }
                }
            }
            return rcr_id;
        }

        public void DeleteRelatedCompanyRecord(int rcr_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = @"delete from RelatedCompanyRecord where rcr_id=@rcr_id";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    myCommand.Parameters.AddWithValue("@rcr_id", rcr_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public List<SearchRelatedCompanyRecordResult> SearchRelatedCompanyRecord(SearchRelatedCompanyRecordParam param, List<string> columns, out int page_count)
        {
            if (!SQL.CheckSearchColumn<SearchRelatedCompanyRecordResult>(columns)) throw new Exception(message: "Search Column Not Exists");
            DataTable dt = new DataTable();

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"select    
                                      {SQL.GenerateSQLSelectQuery<SearchRelatedCompanyRecordResult>(columns)}
                                  from RelatedCompanyRecord
                                   where 1=1 
                                        {SQL.GenerateSQLWhereQuery(param)}
                                    order by cre_time desc ";
                if (param.page > 0) strSql += @" offset((@page-1)) * @num_per_page ROWS
                                                 fetch next @num_per_page ROWS only;";
                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out page_count);
            }

            List<SearchRelatedCompanyRecordResult> result = new List<SearchRelatedCompanyRecordResult>();
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchRelatedCompanyRecordResult
                {
                    cre_time = dt.Columns.Contains("cre_time") ? dr.Field<DateTime?>("cre_time") : null,
                    cre_userid = dt.Columns.Contains("cre_userid") ? dr["cre_userid"].ToString() : null,
                    upd_time = dt.Columns.Contains("upd_time") ? dr.Field<DateTime?>("upd_time") : null,
                    upd_userid = dt.Columns.Contains("upd_userid") ? dr["upd_userid"].ToString() : null,
                    rcr_id = dt.Columns.Contains("rcr_id") ? dr.Field<int?>("rcr_id") : null,
                    user_id = dt.Columns.Contains("user_id") ? dr["user_id"].ToString() : null,
                    name = dt.Columns.Contains("name") ? dr["name"].ToString() : null,
                    date_start = (dt.Columns.Contains("date_start") && dr.Field<DateTime?>("date_start") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("date_start")) : null,
                    date_end = (dt.Columns.Contains("date_end") && dr.Field<DateTime?>("date_end") != null) ? DateOnly.FromDateTime(dr.Field<DateTime>("date_end")) : null,
                    visible = dt.Columns.Contains("visible") ? dr["visible"].ToString() : null
                });
            }

            return result;
        }

        public void UpdateRelatedCompanyRecord(UpdateRelatedCompanyRecordParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);
            using (SqlConnection myConn = new SqlConnection(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;

                string strSql = $@"update RelatedCompanyRecord
                                        {str}
                                        where rcr_id=@rcr_id";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }

        public void CreateUserSigninLog(DateTime signin_time, string check_code, string device_column, string device_code, string user_id)
        {


            using (SqlConnection myConn = new SqlConnection(strConn))
            {
                myConn.Open();

                SqlCommand myCommand;
                //登入紀錄
                string strSql = $@"insert into UserSigninLog(user_id,signin_time,{device_column}) values(@user_id,@signin_time,@device_code)
                               update {head_office_dbo}Users set check_code=@check_code,signin_time=@signin_time,{device_column}= @device_code where user_id=@user_id";
                using (myCommand = new SqlCommand(strSql, myConn))
                {
                    myCommand.Parameters.AddWithValue("@signin_time", signin_time);
                    myCommand.Parameters.AddWithValue("@check_code", check_code);
                    myCommand.Parameters.AddWithValue("@device_code", device_code);
                    myCommand.Parameters.AddWithValue("@user_id", user_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
        }


        public new void RefreshstrConn(string ds_code)
        {
            RefreshstrConn(ds_code, out strConn);
        }
    }
}
