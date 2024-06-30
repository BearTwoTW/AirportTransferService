using System.Diagnostics;
using System.Reflection;

namespace AirportTransferService.App_Code
{
    /// <summary>
    /// 發布組態設定
    /// </summary>
    public class PublishSettings
    {
        /// <summary>
        /// 組態屬性
        /// </summary>
        private static string? _ConfigAttribute;
        /// <summary>
        /// 取得目前發布組態
        /// </summary>
        public static string Config
        {
            get
            {
                if (_ConfigAttribute == null)
                {
                    // 取得當前執行的組件
                    // 由於調用 GetFrames 的 StackTrace 實例沒有跳過任何幀，所以 GetFrames() 一定不為 null。
                    Assembly assembly = Assembly.GetEntryAssembly() ?? (new StackTrace().GetFrames().Last().GetMethod().Module.Assembly);
                    // 取得組件的 AssemblyConfigurationAttribute 屬性
                    AssemblyConfigurationAttribute assemblyConfigurationAttribute = assembly.GetCustomAttribute<AssemblyConfigurationAttribute>();
                    // 取得組件的 AssemblyConfigurationAttribute 屬性的 Configuration 屬性
                    // 例如：Debug、Release
                    _ConfigAttribute = assemblyConfigurationAttribute?.Configuration;
                }
                return _ConfigAttribute;
            }
        }
    }
}
