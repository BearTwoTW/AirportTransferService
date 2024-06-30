using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// CustomControllerBase
    /// </summary>
    [Route("[controller]/[action]")]
    [ApiController]
    public class CustomControllerBase : ControllerBase
    {
        /// <summary>
        /// IBaseService
        /// </summary>
        public readonly IBaseService _baseService;

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
        /// CustomControllerBase
        /// </summary>
        /// <param name="baseService"></param>
        public CustomControllerBase(IBaseService baseService)
        {
            _baseService = baseService;
            token = _baseService.GetToken();
            jwtObject = _baseService.GetJwtObj();

            currentControllerName = _baseService.GetControllerName();
            currentActionName = _baseService.GetActionName();
            currentUrl = _baseService.GetUrl();
            currentIp = _baseService.GetIp();

            userDealerInfo = _baseService.GetUserDealerInfo();
        }
    }
}
