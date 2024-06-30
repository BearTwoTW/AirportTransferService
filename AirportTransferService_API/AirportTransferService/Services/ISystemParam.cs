namespace AirportTransferService.Services
{
    /// <summary>
    /// SPSDictionary
    /// </summary>
    public class SPSDictionary
    {
        //TODO : 處理的程式或許try catch包起來萬一爆炸也不影響呼叫?
        public readonly Dictionary<string, Dictionary<string, List<SearchSPSResult>>> sps_dic = [];
    }

    /// <summary>
    /// ISystemParam
    /// </summary>
    public interface ISystemParam : IAllowAnonymousService
    {
        /// <summary>
        /// CreateSPSDictionary
        /// </summary>
        /// <param name="spp_id"></param>
        void CreateSPSDictionary(string spp_id = "");

        #region SPP
        /// <summary>
        /// CreateSPP
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateSPP(CreateSPPParam param);

        /// <summary>
        /// SearchSPP
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        List<SearchSPPResult> SearchSPP(SearchSPPParam param);

        /// <summary>
        /// UpdateSPP
        /// </summary>
        /// <param name="param"></param>
        void UpdateSPP(UpdateSPPParam param);

        /// <summary>
        /// DeleteSPP
        /// </summary>
        /// <param name="spp_id"></param>
        void DeleteSPP(string spp_id);
        #endregion

        #region SPS
        /// <summary>
        /// CreateSPS
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        string CreateSPS(CreateSPSParam param);

        /// <summary>
        /// SearchSPS
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        List<SearchSPSResult> SearchSPS(SearchSPSParam param);

        /// <summary>
        /// UpdateSPS
        /// </summary>
        /// <param name="param"></param>
        void UpdateSPS(UpdateSPSParam param);

        /// <summary>
        /// DeleteSPS
        /// </summary>
        /// <param name="spp_id"></param>
        /// <param name="sps_id"></param>
        void DeleteSPS(string spp_id, string sps_id);
        #endregion
    }

    /// <summary>
    /// ISystemParam_IMPL
    /// </summary>
    public class ISystemParam_IMPL : IAllowAnonymousService_IMPL, ISystemParam
    {
        //public readonly IConfiguration _config;

        /// <summary>
        /// _baseService
        /// </summary>
        public readonly IBaseService _baseService;

        /// <summary>
        /// _dealerSetting
        /// </summary>
        private readonly IDealerSetting _dealerSetting;
        //public readonly UserDealerInfo _userDealerInfo;

        /// <summary>
        /// db_name
        /// </summary>
        private readonly string db_name = "";

        /// <summary>
        /// _SPSDictionary
        /// </summary>
        public readonly SPSDictionary _SPSDictionary;

        private string strConn = "";

        /// <summary>
        /// ISystemParam_IMPL
        /// </summary>
        /// <param name="config"></param>
        /// <param name="baseService"></param>
        /// <param name="sps_dic"></param>
        /// <param name="dealerSetting"></param>
        public ISystemParam_IMPL(IConfiguration config, IBaseService baseService, SPSDictionary sps_dic, IDealerSetting dealerSetting)
            : base(config, dealerSetting, baseService.GetUserDealerInfo())
        {
            //_config = config;
            _baseService = baseService;
            //_userDealerInfo = _baseService.GetUserDealerInfo();
            db_name = _config["Database"];
            strConn = _config["sql_conn"].Replace(db_name, _userDealerInfo.ds_dbname);
            _SPSDictionary = sps_dic;
            _dealerSetting = dealerSetting;
        }

        /// <summary>
        /// CreateSPSDictionary
        /// </summary>
        /// <param name="spp_id"></param>
        public void CreateSPSDictionary(string spp_id = "")
        {
            //更新所有經銷商的代碼檔
            List<SearchDealerSettingResult> searchDealerSettingResults = _dealerSetting.SearchDealerSetting(
                new SearchDealerSettingParam(), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out int page_count);
            foreach (SearchDealerSettingResult obj in searchDealerSettingResults)
            {
                RefreshstrConn(obj.ds_code);
                if (!_SPSDictionary.sps_dic.ContainsKey(obj.ds_dbname)) _SPSDictionary.sps_dic.Add(obj.ds_dbname, []);
                if (string.IsNullOrEmpty(spp_id))
                    _SPSDictionary.sps_dic[obj.ds_dbname].Clear();
                else
                    _SPSDictionary.sps_dic[obj.ds_dbname].Remove(spp_id);

                List<SearchSPPResult> searchSPPResults = SearchSPP(new SearchSPPParam(spp_id: spp_id, spp_ids: []));

                foreach (SearchSPPResult searchSPPResult in searchSPPResults)
                {
                    if (string.IsNullOrEmpty(searchSPPResult.spp_id)) continue;
                    SearchSPS(new SearchSPSParam(spp_id: searchSPPResult.spp_id));
                }
            }
        }

        #region SPP
        /// <summary>
        /// CreateSPP
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public string CreateSPP(CreateSPPParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into SPP({str_column})
                    values({str_value});";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
                return param.spp_id ?? "";
            }
        }

        /// <summary>
        /// UpdateSPP
        /// </summary>
        /// <param name="param"></param>
        public void UpdateSPP(UpdateSPPParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update SPP
                    {str}
                    where spp_id=@spp_id";
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
        /// SearchSPP
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public List<SearchSPPResult> SearchSPP(SearchSPPParam param)
        {
            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                string strSql = $@"
                select cre_userid
                      ,cre_time
                      ,upd_userid
                      ,upd_time
                      ,spp_id
                      ,su
                      ,name
                      ,remark
                from SPP
                where 1=1 
                {SQL.GenerateSQLWhereQuery(param)}";

                dt = SQL.GenerateSQLSelectResult(param, strSql, myConn, out int page_count);
            }

            List<SearchSPPResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchSPPResult
                {
                    cre_userid = dr["cre_userid"].ToString() ?? "",
                    cre_time = dr.Field<DateTime?>("cre_time"),
                    upd_userid = dr["upd_userid"].ToString() ?? "",
                    upd_time = dr.Field<DateTime?>("upd_time"),
                    spp_id = dr["spp_id"].ToString() ?? "",
                    su = dr["su"].ToString() ?? "",
                    name = dr["name"].ToString() ?? "",
                    remark = dr["remark"].ToString() ?? ""
                });
            }
            return result;
        }

        /// <summary>
        /// DeleteSPP
        /// </summary>
        /// <param name="spp_id"></param>
        public void DeleteSPP(string spp_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"
                    delete from SPS where spp_id=@spp_id;
                    delete from SPP where spp_id=@spp_id;";
                    myCommand.Parameters.AddWithValue("@spp_id", spp_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }
            _SPSDictionary.sps_dic[_userDealerInfo.ds_dbname].Remove(spp_id);
        }
        #endregion

        #region SPS
        /// <summary>
        /// CreateSPS
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string CreateSPS(CreateSPSParam param)
        {
            SQL.GenerateSQLCreateQuery(param, out string str_column, out string str_value, false);

            string sps_id = "";
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                //取得流水號
                ResultObject<string> get_auto_res = SQL.GetAutoNumber(myConn, param.spp_id, "", 999, false);
                if (!get_auto_res.success) throw new Exception(message: "取得流水號失敗");
                sps_id = get_auto_res.data ?? "";
                if (string.IsNullOrEmpty(sps_id)) throw new Exception(message: "Empty Key");

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    insert into SPS({str_column})
                    values({str_value});";
                    myCommand.Parameters.AddWithValue("@sps_id", sps_id);
                    foreach (var property in param.GetType().GetProperties())
                    {
                        if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }

            _SPSDictionary.sps_dic[_userDealerInfo.ds_dbname].Remove(param.spp_id);
            SearchSPS(new SearchSPSParam(spp_id: param.spp_id));

            return sps_id;
        }

        /// <summary>
        /// UpdateSPS
        /// </summary>
        /// <param name="param"></param>
        public void UpdateSPS(UpdateSPSParam param)
        {
            SQL.GenerateSQLUpdateQuery(param, out string str);

            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    update SPS
                    {str}
                    where sps_id=@sps_id and spp_id=@spp_id";
                    foreach (var property in param.GetType().GetProperties())
                    {
                        myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param) ?? DBNull.Value);
                    }
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }

            _SPSDictionary.sps_dic[_userDealerInfo.ds_dbname].Remove(param.spp_id);
            SearchSPS(new SearchSPSParam(spp_id: param.spp_id));
        }

        /// <summary>
        /// SearchSPS
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public List<SearchSPSResult> SearchSPS(SearchSPSParam param)
        {
            if (!_SPSDictionary.sps_dic.ContainsKey(_userDealerInfo.ds_dbname)) _SPSDictionary.sps_dic.Add(_userDealerInfo.ds_dbname, []);
            if (_SPSDictionary.sps_dic[_userDealerInfo.ds_dbname].TryGetValue(param.spp_id, out List<SearchSPSResult>? value))
                return value.Where(x => string.IsNullOrEmpty(param.visible) || param.visible.Equals(x.visible))
                    .Where(x => string.IsNullOrEmpty(param.sps_id) || param.sps_id.Equals(x.sps_id))
                    .ToList();

            DataTable dt = new();
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = $@"
                    select cre_userid
                          ,cre_time
                          ,upd_userid
                          ,upd_time
                          ,sps_id
                          ,spp_id
                          ,name
                          ,code
                          ,remark
                          ,visible
                          ,seq 
                    from SPS 
                    where 1=1
                    {SQL.GenerateSQLWhereQuery(param)}";
                    using (SqlDataAdapter myAdapter = new())
                    {
                        myAdapter.SelectCommand = myCommand;
                        foreach (var property in param.GetType().GetProperties())
                        {
                            if (property.GetValue(param) != null) myCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(param));
                        }
                        myAdapter.Fill(dt);
                        myCommand.Cancel();
                    }
                }
            }

            List<SearchSPSResult> result = [];
            foreach (DataRow dr in dt.Rows)
            {
                result.Add(new SearchSPSResult
                {
                    cre_userid = dr["cre_userid"].ToString() ?? "",
                    cre_time = dr.Field<DateTime?>("cre_time"),
                    upd_userid = dr["upd_userid"].ToString() ?? "",
                    upd_time = dr.Field<DateTime?>("upd_time"),
                    sps_id = dr["sps_id"].ToString() ?? "",
                    spp_id = dr["spp_id"].ToString() ?? "",
                    name = dr["name"].ToString() ?? "",
                    code = dr["code"].ToString() ?? "",
                    remark = dr["remark"].ToString() ?? "",
                    visible = dr["visible"].ToString() ?? "",
                    seq = dr.Field<int?>("seq")
                });
            }

            //sps_dic.Remove(param.spp_id);
            _SPSDictionary.sps_dic[_userDealerInfo.ds_dbname].Add(param.spp_id, result);

            return result;
        }

        /// <summary>
        /// DeleteSPS
        /// </summary>
        /// <param name="spp_id"></param>
        /// <param name="sps_id"></param>
        public void DeleteSPS(string spp_id, string sps_id)
        {
            using (SqlConnection myConn = new(strConn))
            {
                myConn.Open();

                using (SqlCommand myCommand = new("", myConn))
                {
                    myCommand.CommandText = @"delete from SPS where spp_id=@spp_id and sps_id=@sps_id";
                    myCommand.Parameters.AddWithValue("@spp_id", spp_id);
                    myCommand.Parameters.AddWithValue("@sps_id", sps_id);
                    myCommand.ExecuteNonQuery();
                    myCommand.Cancel();
                }
            }

            _SPSDictionary.sps_dic[_userDealerInfo.ds_dbname][spp_id].RemoveAll(x =>
            !string.IsNullOrWhiteSpace(x.sps_id) && x.sps_id.Equals(sps_id));
        }

        public new void RefreshstrConn(string ds_code)
        {
            RefreshstrConn(ds_code, out strConn);
        }
        #endregion
    }
}
