using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics.Contracts;
using System.Net.Http.Headers;
using System.Reflection;

namespace AirportTransferService.Filters
{
    public class AuthorizationAttribute : ActionFilterAttribute
    {
        private static string strConn = "";
        private static string secret = "";
        private string database = "";
        private string[]? front_controller;

        /// <summary>
        /// 例外 Controller_Action
        /// </summary>
        public static List<string> listException = [];

        private IConfiguration? _config;

        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            try
            {
                _config = actionContext.HttpContext.RequestServices.GetService(typeof(IConfiguration)) as IConfiguration;
                if (_config == null)
                {
                    SetErrorResponse(actionContext, "ConfigNotFound");
                    return;
                }

                strConn = _config["sql_conn"];
                secret = _config["secret"];
                database = _config["Database"];
                listException = new List<string>(_config["ESD_LOG_Exception"].Split(','));
                front_controller = _config["front_controller"].Split(';');

                // AllowAnonymous 跳過不需驗證
                if (SkipAuthorization(actionContext)) return;
                else if (string.IsNullOrEmpty(AuthenticationHeaderValue.Parse(actionContext.HttpContext.Request.Headers["Authorization"]).Parameter)
                    || !AuthenticationHeaderValue.Parse(actionContext.HttpContext.Request.Headers["Authorization"]).Scheme.Equals("Bearer"))
                {
                    SetErrorResponse(actionContext, "authorizationError");
                }
                else
                {
                    try
                    {
                        AuthObject jwtObject = Tool.JWTDecode(AuthenticationHeaderValue.Parse(actionContext.HttpContext.Request.Headers["Authorization"]).Parameter ?? "");

                        ControllerActionDescriptor CAD = (ControllerActionDescriptor)actionContext.ActionDescriptor;

                        if (jwtObject.is_front && !front_controller.Contains(CAD.ControllerName)) SetErrorResponse(actionContext, "illegalcallError");

                        string device_code = "";
                        string disable = "";

                        if (DateTime.Now > jwtObject.exp) SetErrorResponse(actionContext, "");
                        else
                        {
                            using (SqlConnection myConn = new(strConn))
                            {
                                myConn.Open();

                                using (SqlCommand myCommand = new("", myConn))
                                {
                                    if (jwtObject.is_front)
                                        myCommand.CommandText = $"select {jwtObject.device_column},disable from EC_Customer where customer_id=@user_id";
                                    else
                                        myCommand.CommandText = $"select {jwtObject.device_column},disable from Users where user_id=@user_id";
                                    myCommand.Parameters.AddWithValue("@user_id", jwtObject.user_id);
                                    using (SqlDataReader dr = myCommand.ExecuteReader())
                                    {
                                        if (!dr.HasRows)
                                        {
                                            SetErrorResponse(actionContext, "User Not Exist");
                                            return;
                                        }
                                        dr.Read();
                                        device_code = dr.GetValue(0).ToString() ?? "";
                                        disable = dr.GetValue(1).ToString() ?? "";
                                        myCommand.Cancel();
                                        dr.Close();
                                    }
                                }
                            }
                            if (disable != "N") SetErrorResponse(actionContext, "帳號已停用");

                            if (jwtObject.device_code != device_code || string.IsNullOrEmpty(device_code)) SetErrorResponse(actionContext, "deviceCodeError");
                            else
                            {
                                string json = "";
                                //取 POST JSON
                                string content = actionContext.HttpContext.Request.Headers["Content-Type"];
                                if (!content.Contains("application/json"))
                                {
                                    IFormCollection forms = actionContext.HttpContext.Request.ReadFormAsync().GetAwaiter().GetResult();
                                    foreach (string key in forms.Keys)
                                    {
                                        json += forms[key];
                                    }
                                }
                                else
                                {
                                    using (StreamReader stream = new(actionContext.HttpContext.Request.Body, System.Text.Encoding.UTF8))
                                    {
                                        stream.BaseStream.Seek(0, SeekOrigin.Begin);
                                        json = stream.ReadToEndAsync().GetAwaiter().GetResult();
                                    }
                                }

                                LogController.Create(new LogCreateRequest()
                                {
                                    sysName = database,
                                    controllerName = CAD.ControllerName,
                                    actionName = CAD.ActionName,
                                    userid = jwtObject.user_id,
                                    url = actionContext.HttpContext.Request.GetDisplayUrl(),
                                    json = json,
                                    ip = actionContext.HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? "",
                                    httpContext = actionContext.HttpContext
                                });
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        SetErrorResponse(actionContext, ex.Message);
                    }
                }

                base.OnActionExecuting(actionContext);
            }
            catch (Exception e)
            {
                SetErrorResponse(actionContext, e.Message);
            }
        }

        /// <summary>
        /// AllowAnonymous 跳過不需驗證
        /// </summary>
        /// <param name="actionContext"></param>
        /// <returns></returns>
        private static bool SkipAuthorization(ActionExecutingContext actionContext)
        {
            Contract.Assert(actionContext != null);
            ControllerActionDescriptor CAD = (ControllerActionDescriptor)actionContext.ActionDescriptor;
            return CAD.MethodInfo.GetCustomAttributes<AllowAnonymousAttribute>().Any()
                   || CAD.ControllerTypeInfo.GetCustomAttributes<AllowAnonymousAttribute>().Any();
        }

        private static void SetErrorResponse(ActionExecutingContext actionContext, string message)
        {
            actionContext.Result = new UnauthorizedObjectResult(
                new ResultObject<object> { success = false, message = message });
        }
    }
}
