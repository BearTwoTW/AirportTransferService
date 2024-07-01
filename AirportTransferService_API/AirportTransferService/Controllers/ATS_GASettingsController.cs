using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// GA設定
    /// </summary>
    /// <param name="ATS_GASettings"></param>
    /// <param name="baseService"></param>
    public class ATS_GASettingsController(IATS_GASettings ATS_GASettings, IBaseService baseService) : CustomControllerBase(baseService)
    {
        private readonly IATS_GASettings _ATS_GASettings = ATS_GASettings;

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
                ["gas_id"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無GA設定" };

            using (TransactionScope tx = new())
            {
                _ATS_GASettings.UpdateATS_GASettings(new UpdateATS_GASettingsParam(
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    gas_id: data.gas_id,
                    tracking_code: data.tracking_code,
                    keyword: data.keyword,
                    summary: data.summary,
                    descriptive_url: data.descriptive_url));

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
    }
}
