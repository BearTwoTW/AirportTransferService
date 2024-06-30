using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// LogController
    /// </summary>
    /// <param name="baseService"></param>
    [Authorization]
    public class LogController(IBaseService baseService) : CustomControllerBase(baseService)
    {
        /// <summary>
        /// 例外 Controller_Action
        /// </summary>
        public static List<string> listException = new(Appsettings.ConfigurationManager._config["ESD_LOG_Exception"].Split(','));

        /// <summary>
        /// 系統 LOG 新增
        /// </summary>
        /// <param name="logCreateRequest"></param>
        [NonAction]
        public static void Create(LogCreateRequest logCreateRequest)
        {
            ILog_IMPL Log_IMPL = new(Appsettings.ConfigurationManager._config);
            //非排除清單
            if (!listException.Contains($"{logCreateRequest.controllerName}_{logCreateRequest.actionName}"))
            {
                Log_IMPL.CreateLog(new Log(
                    id: 0,
                    database: logCreateRequest.database,
                    sysName: logCreateRequest.sysName,
                    controllerName: logCreateRequest.controllerName,
                    actionName: logCreateRequest.actionName,
                    userid: logCreateRequest.userid,
                    createDT: DateTime.Now,
                    url: logCreateRequest.url,
                    json: logCreateRequest.json,
                    exception_content: logCreateRequest.exception_content,
                    //ip: logCreateRequest.httpContext?.Connection?.RemoteIpAddress?.ToString(),
                    ip: logCreateRequest.ip));
            }
        }
    }
}
