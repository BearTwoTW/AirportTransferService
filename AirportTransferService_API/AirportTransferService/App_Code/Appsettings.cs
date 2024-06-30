namespace AirportTransferService.App_Code
{
    public static class Appsettings
    {
        /// <summary>
        /// 設定檔
        /// </summary>
        public static class ConfigurationManager
        {
            /// <summary>
            /// 設定檔取得
            /// </summary>
            public static IConfiguration _config { get; }
            static ConfigurationManager()
            {
                _config = new ConfigurationBuilder()
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json",
                           optional: true,
                           reloadOnChange: true)
                        .AddJsonFile($"appsettings.{PublishSettings.Config}.json",
                           optional: true,
                           reloadOnChange: true)
                        .Build();
            }
        }

        /// <summary>
        /// 沒給參數預設的值 - 字串
        /// </summary>
        public const string api_string_param_no_pass = "20230920沒給參數會變成這個寫死判斷";

        /// <summary>
        /// 沒給參數預設的值 - 數字
        /// </summary>
        public const int api_numeric_param_no_pass = -987654312;

        /// <summary>
        /// 沒給參數預設的值 - 日期時間
        /// </summary>
        public static DateTime api_datetime_param_no_pass = new(1900, 1, 1, 1, 1, 1);

        /// <summary>
        /// 沒給參數預設的值 - 日期
        /// </summary>
        public static DateOnly api_dateonly_param_no_pass = new(1900, 1, 1);

        /// <summary>
        /// 沒給參數預設的值 - 時間
        /// </summary>
        public static TimeOnly api_timeonly_param_no_pass = new(1, 1, 1);
    }
}
