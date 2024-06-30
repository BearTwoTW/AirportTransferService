using Jose;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 使用者控制控制器
    /// </summary>
    /// <param name="user"></param>
    /// <param name="systemSettings"></param>
    /// <param name="systemParam"></param>
    /// <param name="config"></param>
    /// <param name="baseService"></param>
    [Authorization]
    public class UserControlController(IUser user, ISystemSettings systemSettings, ISystemParam systemParam, IConfiguration config, IBaseService baseService) : CustomControllerBase(baseService)
    {
        private readonly IConfiguration _config = config;

        private readonly IUser _user = user;
        private readonly ISystemSettings _systemSettings = systemSettings;
        private readonly ISystemParam _systemParam = systemParam;

        /// <summary>
        /// 使用者登入
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject Signin(Signin data)
        {
            DateTime signin_time = DateTime.Now;
            string check_code = signin_time.ToString("yyyyMMddHHmmss") + Tool.CreateRandomCode(5);
            string company_code_head = userDealerInfo.ds_code;
            //LOG 物件
            LogCreateRequest logCreateRequest = new()
            {
                sysName = _config["Database"],
                controllerName = currentControllerName,
                actionName = currentActionName,
                userid = data.username,
                url = currentUrl,
                json = "",
                ip = currentIp,
                httpContext = HttpContext
            };

            //查詢使用者
            List<SearchUserResult> searchUserResults = _user.SearchUser(
                new SearchUserParam(own_user_id: "", top_ul_id: 1, username: data.username), ["cre_time", "username", "disable", "company_code", "user_id", "name", "ul_id", "check_code", "password", "ds_code"], out int page_count);

            SearchUserResult? signinUser = searchUserResults.FirstOrDefault(x => (x.username ?? "").Equals(data.username) && (x.password ?? "").Equals(data.password));

            if (signinUser == null)
            {
                logCreateRequest.json = "登入失敗";
                LogController.Create(logCreateRequest);
                return new ResultObject { success = false, message = "登入失敗", data = searchUserResults };
            }
            else if (!(signinUser.disable ?? "").Equals("N"))
            {
                //停用error
                logCreateRequest.json = "此帳號已停用";
                LogController.Create(logCreateRequest);
                return new ResultObject { success = false, message = "此帳號已停用" };
            }

            //20210118檢查短期換帳號
            AuthObject check_obj = new();
            if (!string.IsNullOrEmpty(data.check_code))
            {
                check_obj = Tool.JWTDecode(data.check_code);
                //想登入不同帳號就要檢查時間
                if (!check_obj.user_id.Equals(signinUser.user_id))
                {
                    List<SearchSystemSettingResult> SearchSystemSetting_result = _systemSettings.SearchSystemSetting(new SearchSystemSettingParam(), ["value_json", "ssm_name"], out page_count);
                    SearchSystemSettingResult? SearchSystemSetting_target = SearchSystemSetting_result.Where(x => (x.ssm_name ?? "").Equals("切換帳號時效")).FirstOrDefault();
                    if (SearchSystemSetting_target == null || SearchSystemSetting_target.value_json == null)
                    {
                        logCreateRequest.json = "系統設定遺失";
                        LogController.Create(logCreateRequest);
                        return new ResultObject { success = false, message = "系統設定遺失" };
                    }

                    //查系統設定裡的切換帳號時效
                    List<DictionaryKeyValue> kvs = JsonConvert.DeserializeObject<List<DictionaryKeyValue>>(SearchSystemSetting_target.value_json) ?? [];
                    double change_limit = Convert.ToDouble(kvs.Where(x => x.key.Equals("時間內不能切換帳號(分鐘)")).FirstOrDefault()?.value);
                    if (signin_time.Subtract(Tool.StringToDatetime(check_obj.device_code[..14], 14)).TotalMinutes < change_limit)
                    {
                        logCreateRequest.json = "禁止短期切換帳號";
                        LogController.Create(logCreateRequest);
                        return new ResultObject { success = false, message = "禁止短期切換帳號" };
                    }
                }
            }

            //判斷裝置類型
            string device_type = data.device_type;
            string device_column = "";
            if (device_type.Equals("WEB") || device_type.Equals("APP"))
            {
                if (device_type.Equals("WEB"))
                    device_column = "web_code";
                else if (device_type.Equals("APP"))
                    device_column = "app_code";
            }

            //切換使用者經銷商
            _user.RefreshstrConn(signinUser.ds_code ?? "");
            //UserDealerInfo udi = _baseService.GetUserDealerInfoById(signinUser.user_id ?? "");
            //知道經銷商之後再查一次相關資訊
            searchUserResults = _user.SearchUser(
                new SearchUserParam(own_user_id: "", top_ul_id: 1, user_id: signinUser.user_id ?? ""),
                ["cre_time", "username", "disable", "company_code", "user_id", "name", "home_page", "home_page_name", "ul_id", "check_code", "password", "position_id", "position_name"],
                out page_count);
            signinUser = searchUserResults.First();

            //登入紀錄
            _user.CreateUserSigninLog(signin_time, check_code, device_column, data.device_code, signinUser.user_id ?? "");

            //取得使用者登入頁面中文
            //查代碼檔
            List<SearchSPSResult> SearchSPS_result = _systemParam.SearchSPS(new SearchSPSParam(spp_id: "SYS"));
            string home_page_name = SearchSPS_result.FirstOrDefault(x => (x.sps_id ?? "").Equals(signinUser.home_page))?.remark ?? "";

            AuthObject payload = new()
            {
                database_name = _config["Database"],
                company_code = signinUser.company_code ?? "",
                user_id = signinUser.user_id ?? "",
                ul_id = signinUser.ul_id ?? 0,
                device_column = device_column,
                device_code = data.device_code,
                iat = DateTime.Now,
                //期限
                exp = DateTime.Now.AddDays(1),
                Plant = signinUser.position_id ?? ""
            };
            check_obj = new AuthObject
            {
                user_id = signinUser.user_id ?? "",
                device_code = check_code
            };
            string secret = _config["secret"];

            logCreateRequest.json = "登入成功";
            LogController.Create(logCreateRequest);
            return new ResultObject
            {
                success = true,
                message = "登入成功",
                data = new
                {
                    token = JWT.Encode(payload, Encoding.UTF8.GetBytes(secret), JwsAlgorithm.HS256),
                    company_code = signinUser.company_code ?? "",
                    company_code_head,
                    user_id = signinUser.user_id ?? "",
                    name = Tool.Sy_Decoder(signinUser.name ?? "", signinUser.cre_time?.ToString("yyyyMMddHHmmss")),
                    home_page = signinUser.home_page_name ?? "",
                    home_page_name,
                    check_code = JWT.Encode(check_obj, Encoding.UTF8.GetBytes(secret), JwsAlgorithm.HS256),
                    Plant = signinUser.position_id ?? "",
                    position_name = signinUser.position_name ?? "",
                    company_name = _config["company_name"]
                }
            };
        }

        /// <summary>
        /// 忘記密碼
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<object> ForgetPassword(ForgetPassword data)
        {
            DateTime upd_time = DateTime.Now;

            //查詢使用者
            List<SearchUserResult> searchUserResults = _user.SearchUser(
                new SearchUserParam(own_user_id: "", top_ul_id: 1, username: data.username), ["cre_time", "disable", "company_code", "user_id", "name", "email"], out int page_count);

            SearchUserResult? signinUser = searchUserResults.FirstOrDefault(x => (x.username ?? "").Equals(data.username) && (x.email ?? "").Equals(data.email));
            if (signinUser == null)
                return new ResultObject<object> { success = false, message = "重設失敗，查無此帳號及Email", };
            else if (!(signinUser.disable ?? "").Equals("N"))
                return new ResultObject<object> { success = false, message = "此帳號已停用" };

            string name = Tool.Sy_Decoder(signinUser.name ?? "", signinUser.cre_time?.ToString("yyyyMMddHHmmss"));

            //重設使用者密碼
            string password = Tool.CreateRandomCode(10);
            _user.UpdateUser(new UpdateUserParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: "SYS",
                upd_time: upd_time,
                user_id: signinUser.user_id ?? "",
                password: Tool.MD5(password),
                signin_time: Appsettings.api_datetime_param_no_pass,
                birthday: Appsettings.api_dateonly_param_no_pass,
                resign_date: Appsettings.api_dateonly_param_no_pass,
                on_board_date: Appsettings.api_dateonly_param_no_pass,
                insurance_cancel_date: Appsettings.api_dateonly_param_no_pass));

            //send email
            string mailTo = $"{name} <{data.email}>";
            string subject = $"【Genesys-tech {_config["Database"]}】重設密碼";
            string content = "<table cellpadding=\"0\" border=\"0\" rules=\"none\" style=\"background-color:#F5F7F9;font-family:'微軟正黑體',Arial,Helvetica,sans-serifa;letter-spacing:1px;text-align:center;width:100%;max-width:400px;margin:auto;\">"
                           + $"<tr><td style=\"background-color:#f0f0f0;padding:30px;color:#00a5ad;\"><h1 style=\"margin:0;\">{_config["Database"]}</h1></td></tr>"
                           + "<tr><td style=\"color:rgb(110, 119, 133);padding:30px;\">已為您重設密碼為：</td></tr>"
                           + $"<tr><td style=\"font-size:30px;padding:40px 30px 80px 30px;color:#333;\">{password}</td></tr>"
                           + "<tr><td style=\"font-size:12px;\">如有任何疑問，請與我們聯繫：<a style=\"text-decoration:none;color:#00a5ad;\" href=\"http://www.genesys-tech.com\">聯繫我們</a></td></tr>"
                           + "<tr><td style=\"font-size:12px; padding:20px; color:rgb(110, 119, 133);\">Copyright © 2018 Genesys Technology Ltd.</td></tr>"
                           + "</table>";
            bool sendmail = Tool.SendHtmlMailFromGTL(mailTo, subject, content);

            if (sendmail)
                return new ResultObject<object> { success = true, message = "重設密碼成功", data = new { sendmail } };
            else
                return new ResultObject<object> { success = false, message = "發送Email失敗，請聯絡系統管理員", data = new { sendmail } };
        }

        /// <summary>
        /// 登出
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> Signout()
        {
            DateTime upd_time = DateTime.Now;
            //修改使用者資訊
            _user.UpdateUser(new UpdateUserParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                user_id: jwtObject.user_id,
                web_code: jwtObject.device_column.Equals("web_code") ? "" : null,
                app_code: jwtObject.device_column.Equals("app_code") ? "" : null,
                signin_time: Appsettings.api_datetime_param_no_pass,
                birthday: Appsettings.api_dateonly_param_no_pass,
                resign_date: Appsettings.api_dateonly_param_no_pass,
                on_board_date: Appsettings.api_dateonly_param_no_pass,
                insurance_cancel_date: Appsettings.api_dateonly_param_no_pass));

            return new ResultObject<object> { success = true, message = "登出成功" };
        }

        /// <summary>
        /// 檢查??
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> Check()
        {
            SearchUserResult? signinUser;
            string encode_user_id, device_code, position_id;
            //查詢使用者
            signinUser = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1, user_id: jwtObject.user_id),
                ["cre_time", "disable", "web_code", "app_code", "ul_id", "position_id", "position_name"],
                out int page_count).FirstOrDefault();

            if (signinUser == null || signinUser.cre_time == null) return new ResultObject<object> { success = false, message = "查無使用者" };

            DateTime cre_time = signinUser.cre_time.Value;
            try
            {
                encode_user_id = jwtObject.is_front ? "" : Tool.Sy_Encoder(jwtObject.user_id, cre_time.ToString("yyyyMMddHHmmss"));
            }
            catch (Exception e) { return new ResultObject<object> { success = false, message = "EncodeError", data = e }; }
            device_code = jwtObject.device_column.Equals("web_code") ? (signinUser.web_code ?? "") : (signinUser.app_code ?? "");
            position_id = signinUser.position_id ?? "";

            if (string.IsNullOrEmpty(device_code)) return new ResultObject<object> { success = false, message = "請重新登入" };
            else
            {
                jwtObject.exp = DateTime.Now.AddDays(1);
                jwtObject.Plant = position_id;
                string new_token = JWT.Encode(jwtObject, Encoding.UTF8.GetBytes(_config["secret"]), JwsAlgorithm.HS256);
                return new ResultObject<object> { success = true, data = new { jwtObject.company_code, path = encode_user_id, token = new_token, jwtObject.Plant, signinUser.position_name } };
            }
        }

        /// <summary>
        /// API健康檢查
        /// </summary>
        /// <returns></returns>
        [HttpGet, HttpPost]
        [AllowAnonymous]
        public HttpStatusCode HealthCheck()
        {
            return HttpStatusCode.OK;
        }

        /// <summary>
        /// SQL健康檢查
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public HttpStatusCode HealthCheckSQL()
        {
            try
            {
                List<SearchUserResult> searchUserResults = _user.SearchUser(
                    new SearchUserParam(own_user_id: "", top_ul_id: 1, page: 1, num_per_page: 1), [], out int page_count);

                return HttpStatusCode.OK;
            }
            catch (Exception)
            {
                return HttpStatusCode.InternalServerError;
            }
        }

        /// <summary>
        /// 換掉token裡的user_id跟ul_id
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> ChangeToken(ChangeToken data)
        {
            DateTime upd_time = DateTime.Now;
            //查詢使用者
            SearchUserResult? signinUser = _user.SearchUser(
                new SearchUserParam(ds_dbname: userDealerInfo.ds_dbname, own_user_id: "", top_ul_id: 1, user_id: data.user_id),
                ["cre_time", "disable", "web_code", "app_code", "ul_id"],
                out int page_count).FirstOrDefault();

            if (signinUser == null) return new ResultObject<object> { success = false, message = "查無使用者" };

            int ul_id = signinUser.ul_id ?? 0;
            string device_code = jwtObject.device_column.Equals("web_code") ? (signinUser.web_code ?? "") : (signinUser.app_code ?? "");
            string position_id = signinUser.position_id ?? "";
            string new_token;

            //沒有device_code就亂做一個
            if (string.IsNullOrEmpty(device_code))
            {
                device_code = "NOTFROMLOGIN";
                //修改使用者資訊
                _user.UpdateUser(new UpdateUserParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    user_id: jwtObject.user_id,
                    web_code: jwtObject.device_column.Equals("web_code") ? "" : null,
                    app_code: jwtObject.device_column.Equals("app_code") ? "" : null,
                    signin_time: Appsettings.api_datetime_param_no_pass,
                    birthday: Appsettings.api_dateonly_param_no_pass,
                    resign_date: Appsettings.api_dateonly_param_no_pass,
                    on_board_date: Appsettings.api_dateonly_param_no_pass,
                    insurance_cancel_date: Appsettings.api_dateonly_param_no_pass));
            }

            jwtObject.user_id = data.user_id;
            jwtObject.ul_id = ul_id;
            jwtObject.device_code = device_code;
            jwtObject.Plant = position_id;
            new_token = JWT.Encode(jwtObject, _config["secret"], JwsAlgorithm.HS256);

            return new ResultObject<object> { success = true, data = new_token };
        }

        /// <summary>
        /// 使用者模擬
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> UserSimulate(UserSimulate data)
        {
            if (!jwtObject.user_id.Replace(jwtObject.company_code, "").Equals("0001"))
                return new ResultObject<object> { success = false };

            return ChangeToken(new ChangeToken { user_id = data.user_id });
        }
    }
}
