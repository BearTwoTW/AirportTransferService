namespace AirportTransferService.Models
{
    /// <summary>
    /// Log
    /// </summary>
    /// <param name="id"></param>
    /// <param name="database"></param>
    /// <param name="sysName"></param>
    /// <param name="controllerName"></param>
    /// <param name="actionName"></param>
    /// <param name="userid"></param>
    /// <param name="createDT"></param>
    /// <param name="url"></param>
    /// <param name="json"></param>
    /// <param name="exception_content"></param>
    /// <param name="ip"></param>
    public class Log(long id, string database, string sysName, string controllerName, string actionName, string userid, DateTime createDT, string url, string json, string exception_content, string? ip)
    {
        /// <summary>
        /// id
        /// </summary>
        public long id { get; } = id;

        /// <summary>
        /// database
        /// </summary>
        public string database { get; } = database;

        /// <summary>
        /// sysName
        /// </summary>
        public string sysName { get; } = sysName;

        /// <summary>
        /// controllerName
        /// </summary>
        public string controllerName { get; } = controllerName;

        /// <summary>
        /// actionName
        /// </summary>
        public string actionName { get; } = actionName;

        /// <summary>
        /// userid
        /// </summary>
        public string userid { get; } = userid;

        /// <summary>
        /// createDT
        /// </summary>
        public DateTime createDT { get; } = createDT;

        /// <summary>
        /// url
        /// </summary>
        public string url { get; } = url;

        /// <summary>
        /// json
        /// </summary>
        public string json { get; } = json;

        /// <summary>
        /// exception_content
        /// </summary>
        public string exception_content { get; } = exception_content;

        /// <summary>
        /// ip
        /// </summary>
        public string? ip { get; } = ip;
    }

    /// <summary>
    /// LOG 請求
    /// </summary>
    public class LogCreateRequest
    {
        /// <summary>
        /// 系統名稱
        /// </summary>
        public string sysName { get; set; } = "";

        /// <summary>
        /// 資料庫名稱
        /// </summary>
        public string database { get; set; } = "";

        /// <summary>
        /// 控制項名稱
        /// </summary>
        public string controllerName { get; set; } = "";

        /// <summary>
        /// 動作名稱
        /// </summary>
        public string actionName { get; set; } = "";

        /// <summary>
        /// 使用者
        /// </summary>
        public string userid { get; set; } = "";

        /// <summary>
        /// 網址
        /// </summary>
        public string url { get; set; } = "";

        /// <summary>
        /// 請求 JSON
        /// </summary>
        public string json { get; set; } = "";

        /// <summary>
        /// 例外內容
        /// </summary>
        public string exception_content { get; set; } = "";

        /// <summary>
        /// ip
        /// </summary>
        public string ip { get; set; } = "";

        /// <summary>
        /// httpContext
        /// </summary>
        public HttpContext? httpContext { get; set; }
    }
}
