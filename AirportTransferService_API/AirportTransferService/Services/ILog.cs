namespace AirportTransferService.Services
{
    /// <summary>
    /// ILog
    /// </summary>
    public interface ILog
    {
        /// <summary>
        /// CreateLog
        /// </summary>
        /// <param name="param"></param>
        void CreateLog(Log param);
    }

    /// <summary>
    /// ILog_IMPL
    /// </summary>
    /// <param name="config"></param>
    public class ILog_IMPL(IConfiguration config) : ILog
    {
        /// <summary>
        /// _config
        /// </summary>
        public readonly IConfiguration _config = config;

        /// <summary>
        /// strConn
        /// </summary>
        private readonly string strConn = config["ESD_LOG"];

        /// <summary>
        /// database
        /// </summary>
        private readonly string database = config["Database"];

        /// <summary>
        /// CreateLog
        /// </summary>
        /// <param name="param"></param>
        public void CreateLog(Log param)
        {
            //紀錄資料庫
            using (SqlConnection ConnLog = new(strConn))
            {
                ConnLog.Open();

                string tableName = $"{(string.IsNullOrEmpty(param.database) ? database : param.database)}_LOG_{DateTime.Today:yyyyMM}";

                using (SqlCommand myCommand = new("", ConnLog))
                {
                    myCommand.CommandText = $@"
                    IF NOT EXISTS (SELECT * 
                    FROM INFORMATION_SCHEMA.TABLES 
                    WHERE TABLE_NAME = '{tableName}')
                    BEGIN
                        CREATE TABLE [dbo].[{tableName}](
	                    [id] [bigint] IDENTITY(1,1) NOT NULL,
	                    [sysName] [varchar](50) NULL,
	                    [controllerName] [varchar](50) NULL,
	                    [actionName] [varchar](50) NULL,
	                    [userid] [varchar](50) NULL,
	                    [createDT] [datetime] NULL,
	                    [url] [varchar](200) NULL,
                        [json] [varchar](MAX) NULL,
                        [exception_content] [varchar](MAX) NULL,
                        [ip] [varchar](50) NULL,
                        CONSTRAINT [PK_{tableName}] PRIMARY KEY CLUSTERED 
                    (
	                    [id] ASC
                    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
                    ) ON [PRIMARY]
                    END";
                    try { myCommand.ExecuteNonQuery(); }
                    catch (Exception)
                    {
                        // TODO: 這裡如果發生錯誤，不會報錯，會導致無限占用硬碟直到硬碟滿為止
                    }

                    myCommand.CommandText = $@"
                    INSERT INTO [dbo].[{tableName}] ([sysName],[controllerName],[actionName],[userid],[createDT],[url],[json],[exception_content],[ip])
                    VALUES (@sysName,@controllerName,@actionName,@userid,@createDT,@url,@json,@exception_content,@ip)";
                    myCommand.Parameters.AddWithValue("@sysName", param.sysName);
                    myCommand.Parameters.AddWithValue("@controllerName", param.controllerName);
                    myCommand.Parameters.AddWithValue("@actionName", param.actionName);
                    myCommand.Parameters.AddWithValue("@userid", param.userid);
                    myCommand.Parameters.AddWithValue("@createDT", param.createDT);
                    myCommand.Parameters.AddWithValue("@url", param.url);
                    myCommand.Parameters.AddWithValue("@json", param.json);
                    myCommand.Parameters.AddWithValue("@exception_content", param.exception_content);
                    myCommand.Parameters.AddWithValue("@ip", param.ip);
                    try { myCommand.ExecuteNonQuery(); }
                    catch (Exception)
                    {
                        // TODO: 這裡如果發生錯誤，不會報錯，會導致無限占用硬碟直到硬碟滿為止
                    }
                    myCommand.Cancel();
                }
            }
        }
    }
}