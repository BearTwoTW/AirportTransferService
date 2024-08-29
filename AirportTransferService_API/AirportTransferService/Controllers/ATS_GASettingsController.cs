using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// GA設定
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="aTS_GASettings"></param>
    public class ATS_GASettingsController(
        IBaseService baseService,
        IATS_GASettings aTS_GASettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_GASettings _ATS_GASettings = aTS_GASettings;

        /// <summary>
        /// GA設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_GASettingsCreate(ATS_GASettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            string id = _ATS_GASettings.CreateATS_GASettings(
                new CreateATS_GASettingsParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    tracking_code: data.tracking_code,
                    keyword: data.keyword,
                    summary: data.summary,
                    descriptive_url: data.descriptive_url));

            return new ResultObject<string> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// GA設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_GASettingsUpdate(ATS_GASettingsUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查自己
            SearchATS_GASettingsResult? search_own_result = _ATS_GASettings.SearchATS_GASettings(
                new SearchATS_GASettingsParam(gas_id: data.gas_id),
                ["gas_id", "tracking_code", "keyword", "summary", "descriptive_url"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無GA設定" };

            using (TransactionScope tx = new())
            {
                _ATS_GASettings.UpdateATS_GASettings(new UpdateATS_GASettingsParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    gas_id: data.gas_id,
                    tracking_code: data.tracking_code,
                    keyword: data.keyword,
                    summary: data.summary,
                    descriptive_url: data.descriptive_url));

                ResultObject<string> resultSetUpGAInIndex = SetUpGAInIndex(
                    string.IsNullOrEmpty(data.tracking_code) || data.tracking_code == Appsettings.api_string_param_no_pass ? search_own_result.tracking_code! : data.tracking_code,
                    string.IsNullOrEmpty(data.keyword) || data.keyword == Appsettings.api_string_param_no_pass ? search_own_result.keyword! : data.keyword,
                    string.IsNullOrEmpty(data.summary) || data.summary == Appsettings.api_string_param_no_pass ? search_own_result.summary! : data.summary,
                    string.IsNullOrEmpty(data.descriptive_url) || data.descriptive_url == Appsettings.api_string_param_no_pass ? search_own_result.descriptive_url! : data.descriptive_url);
                if (!resultSetUpGAInIndex.success) return new ResultObject<string> { success = false, message = "修改失敗，GA設定失敗", data = resultSetUpGAInIndex.data };

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// GA設定查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<ATS_GASettingsSearchResponse>> ATS_GASettingsSearch(ATS_GASettingsSearch data)
        {
            List<SearchATS_GASettingsResult> search_results = _ATS_GASettings.SearchATS_GASettings(
                new SearchATS_GASettingsParam(
                    gas_id: data.gas_id,
                    tracking_code: data.tracking_code,
                    keyword: data.keyword,
                    summary: data.summary,
                    descriptive_url: data.descriptive_url,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["gas_id", "tracking_code", "keyword", "summary", "descriptive_url"], [],
                out int page_count);

            List<ATS_GASettingsSearchResponse> response = [];
            foreach (SearchATS_GASettingsResult result in search_results)
            {
                response.Add(new ATS_GASettingsSearchResponse
                {
                    gas_id = result.gas_id,
                    tracking_code = result.tracking_code,
                    keyword = result.keyword,
                    summary = result.summary,
                    descriptive_url = result.descriptive_url
                });
            }

            return new ResultObject<List<ATS_GASettingsSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// GA設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_GASettingsDelete(ATS_GASettingsDelete data)
        {
            _ATS_GASettings.DeleteATS_GASettings(data.gas_id);
            return new ResultObject<string> { success = true, message = "刪除成功" };
        }

        [NonAction]
        private ResultObject<string> SetUpGAInIndex(string tracking_code, string keyword, string summary, string descriptive_url)
        {
            try
            {
                // 取得 index.html
                string index_path = Path.Combine(Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2), "index.html");
                // 讀取 index.html
                string index_content = System.IO.File.ReadAllText(index_path);

                // 定義正則表達式來匹配和替換 <meta> 標籤的 content 屬性
                string patternDescription = @"<meta\s+name=""description""\s+content=""[^'""]*""\s*/?>";
                string patternKeyword = @"<meta\s+name=""keywords""\s+content=""[^'""]*""\s*/?>";
                string patternOgUrl = @"<meta\s+property=""og:url""\s+content=""[^'""]*""\s*/?>";
                string patternOgDescription = @"<meta\s+property=""og:description""\s+content=""[^'""]*""\s*/?>";
                // GA Script 的正則表達式，固定放在 <meta property="og:description"> 後面，<style> 前面
                string patternGAScript = @"(<meta\s+property=""og:description""\s+content=""[^""]*""\s*/?>)(.*?)(<style>)";

                // 替換 <meta> 標籤的 content 屬性
                index_content = Regex.Replace(index_content, patternDescription, $@"<meta name=""description"" content=""{summary}"" />");
                index_content = Regex.Replace(index_content, patternKeyword, $@"<meta name=""keywords"" content=""{keyword}"" />");
                index_content = Regex.Replace(index_content, patternOgUrl, $@"<meta property=""og:url"" content=""{descriptive_url}"" />");
                index_content = Regex.Replace(index_content, patternOgDescription, $@"<meta property=""og:description"" content=""{summary}"" />");
                index_content = Regex.Replace(index_content, patternGAScript, $"$1\n{tracking_code}\n$3", RegexOptions.Singleline);

                // 將修改後的內容寫回 index.html 檔案
                System.IO.File.WriteAllText(index_path, index_content);
            }
            catch (Exception e)
            { return new ResultObject<string> { success = false, message = "GA設定失敗", data = JsonConvert.SerializeObject(e) }; };

            return new ResultObject<string> { success = true, message = "GA設定成功" };
        }
    }
}
