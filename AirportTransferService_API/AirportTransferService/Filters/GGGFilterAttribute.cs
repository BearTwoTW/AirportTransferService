using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AirportTransferService.Filters
{
    /// <summary>
    /// GGGFilterAttribute
    /// </summary>
    public class GGGFilterAttribute : ExceptionFilterAttribute
    {
        /// <summary>
        /// _baseService
        /// </summary>
        public readonly IBaseService _baseService;

        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config;

        /// <summary>
        /// database
        /// </summary>
        public readonly string? database;

        /// <summary>
        /// currentControllerName
        /// </summary>
        public readonly string currentControllerName;

        /// <summary>
        /// currentActionName
        /// </summary>
        public readonly string currentActionName;

        /// <summary>
        /// currentUrl
        /// </summary>
        public readonly string currentUrl;

        /// <summary>
        /// currentIp
        /// </summary>
        public readonly string currentIp;

        /// <summary>
        /// RequestJson
        /// </summary>
        public readonly string RequestJson;

        /// <summary>
        /// token
        /// </summary>
        public string token { get; }

        /// <summary>
        /// jwtObject
        /// </summary>
        public AuthObject jwtObject { get; }

        /// <summary>
        /// userDealerInfo
        /// </summary>
        public UserDealerInfo userDealerInfo { get; }

        /// <summary>
        /// GGGFilterAttribute
        /// </summary>
        /// <param name="baseService"></param>
        /// <param name="config"></param>
        public GGGFilterAttribute(IBaseService baseService, IConfiguration config)
        {
            _baseService = baseService;
            _config = config;
            database = _config["Database"];
            token = _baseService.GetToken();
            jwtObject = _baseService.GetJwtObj();

            userDealerInfo = _baseService.GetUserDealerInfo();

            currentControllerName = _baseService.GetControllerName();
            currentActionName = _baseService.GetActionName();
            currentUrl = _baseService.GetUrl();
            currentIp = _baseService.GetIp();
            RequestJson = _baseService.GetRequestJson();
        }

        /// <summary>
        /// OnException
        /// </summary>
        /// <param name="context"></param>
        public override void OnException(ExceptionContext context)
        {
            LogController.Create(new LogCreateRequest()
            {
                sysName = database,
                database = database + "_Exception",
                controllerName = currentControllerName,
                actionName = currentActionName,
                userid = jwtObject.user_id,
                url = currentUrl,
                json = RequestJson,
                exception_content = JsonConvert.SerializeObject(context.Exception),
                ip = currentIp
            });

            context.Result = new ObjectResult(new ResultObject<Exception> { success = false, message = context.Exception.Message });
            context.ExceptionHandled = true;
        }
    }
}