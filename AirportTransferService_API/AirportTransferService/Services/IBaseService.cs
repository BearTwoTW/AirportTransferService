using System.Net.Http.Headers;

namespace AirportTransferService.Services
{
    /// <summary>
    /// IBaseService
    /// </summary>
    public interface IBaseService
    {
        /// <summary>
        /// GetAuthorizationHeader
        /// </summary>
        /// <returns></returns>
        string GetAuthorizationHeader();

        /// <summary>
        /// 取得使用者經銷商資訊
        /// </summary>
        UserDealerInfo GetUserDealerInfoById(string user_id);

        /// <summary>
        /// GetControllerName
        /// </summary>
        /// <returns></returns>
        string GetControllerName();

        /// <summary>
        /// GetActionName
        /// </summary>
        /// <returns></returns>
        string GetActionName();

        /// <summary>
        /// GetUrl
        /// </summary>
        /// <returns></returns>
        string GetUrl();

        /// <summary>
        /// GetIp
        /// </summary>
        /// <returns></returns>
        string GetIp();

        /// <summary>
        /// GetToken
        /// </summary>
        /// <returns></returns>
        string GetToken();

        /// <summary>
        /// GetJwtObj
        /// </summary>
        /// <returns></returns>
        AuthObject GetJwtObj();

        /// <summary>
        /// GetRequestJson
        /// </summary>
        /// <returns></returns>
        string GetRequestJson();

        /// <summary>
        /// GetUserDealerInfo
        /// </summary>
        /// <returns></returns>
        UserDealerInfo GetUserDealerInfo();
    }

    /// <summary>
    /// BaseService
    /// </summary>
    public class BaseService : IBaseService
    {
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IDealerSetting _dealerSetting;

        private readonly string strConn = "";
        private readonly string company_name = "";
        private readonly string company_code = "";
        private readonly string database = "";

        /// <summary>
        /// token
        /// </summary>
        public string token { get; }

        /// <summary>
        /// jwtObject
        /// </summary>
        public AuthObject jwtObject { get; }

        /// <summary>
        /// RequestJson
        /// </summary>
        public string RequestJson { get; }

        /// <summary>
        /// userDealerInfo
        /// </summary>
        public UserDealerInfo userDealerInfo { get; }

        /// <summary>
        /// BaseService
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        /// <param name="config"></param>
        /// <param name="dealerSetting"></param>
        public BaseService(IHttpContextAccessor httpContextAccessor, IConfiguration config, IDealerSetting dealerSetting)
        {
            _httpContextAccessor = httpContextAccessor;
            _config = config;
            _dealerSetting = dealerSetting;
            strConn = _config["sql_conn"];
            company_name = _config["company_name"];
            company_code = _config["company_code"];
            database = _config["Database"];

            token = GetAuthorizationHeader();
            try
            {
                jwtObject = string.IsNullOrEmpty(token) ? new AuthObject() : Tool.JWTDecode(token);
            }
            catch
            {
                jwtObject = new AuthObject();
            }

            RequestJson = GetRequestJson();

            userDealerInfo = GetUserDealerInfoById(jwtObject.user_id);
        }

        public string GetAuthorizationHeader()
        {
            return _httpContextAccessor.HttpContext?.Request.Headers.ContainsKey("Authorization") ?? false
                   ? AuthenticationHeaderValue.Parse(_httpContextAccessor.HttpContext?.Request.Headers["Authorization"].FirstOrDefault()).Parameter ?? ""
                   : "";
        }

        /// <summary>
        /// GetControllerName
        /// </summary>
        /// <returns></returns>
        public string GetControllerName() => _httpContextAccessor.HttpContext?.GetRouteValue("controller")?.ToString() ?? "";

        /// <summary>
        /// GetActionName
        /// </summary>
        /// <returns></returns>
        public string GetActionName() => _httpContextAccessor.HttpContext?.GetRouteValue("action")?.ToString() ?? "";

        /// <summary>
        /// GetUrl
        /// </summary>
        /// <returns></returns>
        public string GetUrl() => $"{_httpContextAccessor.HttpContext?.Request.Scheme}://{_httpContextAccessor.HttpContext?.Request.Host}{_httpContextAccessor.HttpContext?.Request.Path}{_httpContextAccessor.HttpContext?.Request.QueryString}";

        /// <summary>
        /// GetIp
        /// </summary>
        /// <returns></returns>
        public string GetIp() => _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? "";

        /// <summary>
        /// GetToken
        /// </summary>
        /// <returns></returns>
        public string GetToken() => token;

        /// <summary>
        /// GetJwtObj
        /// </summary>
        /// <returns></returns>
        public AuthObject GetJwtObj() => jwtObject;

        /// <summary>
        /// GetRequestJson
        /// </summary>
        /// <returns></returns>
        public string GetRequestJson()
        {
            if (_httpContextAccessor?.HttpContext?.Request.Body == null) return "";
            string json = "";
            using (StreamReader stream = new(_httpContextAccessor.HttpContext.Request.Body, System.Text.Encoding.UTF8, leaveOpen: true))
            {
                stream.BaseStream.Seek(0, SeekOrigin.Begin);
                json = stream.ReadToEndAsync().GetAwaiter().GetResult();
                stream.BaseStream.Seek(0, SeekOrigin.Begin);
                _httpContextAccessor.HttpContext.Request.Body.Position = 0;
            }
            return json;
        }

        /// <summary>
        /// GetUserDealerInfo
        /// </summary>
        /// <returns></returns>
        public UserDealerInfo GetUserDealerInfo() => userDealerInfo;

        /// <summary>
        /// GetUserDealerInfoById
        /// </summary>
        /// <param name="user_id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public UserDealerInfo GetUserDealerInfoById(string user_id)
        {
            if (string.IsNullOrEmpty(user_id)) return new UserDealerInfo
            {
                ds_id = 0,
                ds_name = company_name,
                ds_code = company_code,
                ds_dbname = database
            };

            //TODO : 前台登入token先直接去總公司
            if (jwtObject.is_front)
            {
                SearchDealerSettingResult? searchDealerSettingResult = _dealerSetting.SearchDealerSetting(
                    new SearchDealerSettingParam(ds_code: company_code), ["ds_id", "ds_code", "ds_name", "ds_dbname"], out int page_count).FirstOrDefault();

                return searchDealerSettingResult == null
                       ? throw new Exception(message: "查無經銷商設定")
                       : new UserDealerInfo
                       {
                           ds_id = searchDealerSettingResult.ds_id ?? 0,
                           ds_code = searchDealerSettingResult.ds_code ?? "",
                           ds_name = searchDealerSettingResult.ds_name ?? "",
                           ds_dbname = searchDealerSettingResult.ds_dbname ?? "",
                           is_head_office = true
                       };
            }
            else
            {
                DataTable dt = new();

                using (SqlConnection myConn = new(strConn))
                {
                    myConn.Open();

                    using (SqlCommand myCommand = new("", myConn))
                    {
                        myCommand.CommandText = $@"
                        select Users.ds_id,ds_code,ds_name,ds_dbname
                        from Users
                        left join DealerSetting as DS on DS.ds_id=Users.ds_id
                        where user_id=@user_id";
                        using (SqlDataAdapter myAdapter = new())
                        {
                            dt.Reset();
                            myAdapter.SelectCommand = myCommand;
                            myCommand.Parameters.AddWithValue("@user_id", user_id);
                            myAdapter.Fill(dt);
                            myCommand.Cancel();
                        }
                    }
                }
                return dt.Rows.Count == 0
                       ? throw new Exception("查無此帳號")
                       : new UserDealerInfo
                       {
                           ds_id = Convert.ToInt32(dt.Rows[0]["ds_id"]),
                           ds_code = dt.Rows[0]["ds_code"].ToString() ?? "",
                           ds_name = dt.Rows[0]["ds_name"].ToString() ?? "",
                           ds_dbname = dt.Rows[0]["ds_dbname"].ToString() ?? "",
                           is_head_office = dt.Rows[0]["ds_code"].ToString() == company_code
                       }; ;
            }
        }
    }

    /// <summary>
    /// UserDealerInfo
    /// </summary>
    public class UserDealerInfo
    {
        /// <summary>
        /// ds_id
        /// </summary>
        public int ds_id { get; set; } = 0;

        /// <summary>
        /// ds_code
        /// </summary>
        public string ds_code { get; set; } = "";

        /// <summary>
        /// ds_name
        /// </summary>
        public string ds_name { get; set; } = "";

        /// <summary>
        /// ds_dbname
        /// </summary>
        public string ds_dbname { get; set; } = "";

        /// <summary>
        /// is_head_office
        /// </summary>
        public bool is_head_office { get; set; } = false;
    }
}