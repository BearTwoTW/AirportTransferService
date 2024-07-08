using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 價錢連結設定
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="ATS_PriceLineSettings"></param>
    public class ATS_PriceLineSettingsController(
        IBaseService baseService,
        IATS_PriceLineSettings ATS_PriceLineSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_PriceLineSettings _ATS_PriceLineSettings = ATS_PriceLineSettings;

        /// <summary>
        /// 價錢連結設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_PriceLineSettingsCreate(ATS_PriceLineSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            List<SearchATS_PriceLineSettingsResult> search_results = _ATS_PriceLineSettings.SearchATS_PriceLineSettings(
                new SearchATS_PriceLineSettingsParam(),
                ["price"], [],
                out _);
            if (search_results.Exists(x => x.price == data.price)) return new ResultObject<string> { success = false, message = "價錢重複" };

            string id = _ATS_PriceLineSettings.CreateATS_PriceLineSettings(
                new CreateATS_PriceLineSettingsParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    visible: data.visible,
                    price: data.price,
                    link: data.link));

            return new ResultObject<string> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// 價錢連結設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_PriceLineSettingsUpdate(ATS_PriceLineSettingsUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查自己
            SearchATS_PriceLineSettingsResult? search_own_result = _ATS_PriceLineSettings.SearchATS_PriceLineSettings(
                new SearchATS_PriceLineSettingsParam(pls_id: data.pls_id),
                ["pls_id"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無價錢連結設定" };
            //查要檢查重複的東西
            List<SearchATS_PriceLineSettingsResult> search_results = _ATS_PriceLineSettings.SearchATS_PriceLineSettings(
                new SearchATS_PriceLineSettingsParam(),
                ["pls_id", "price"], [],
                out _);
            decimal? price = data.price == Appsettings.api_numeric_param_no_pass ? search_own_result.price : data.price;
            //檢查重複
            if (search_results.Exists(x => x.price == price && data.pls_id != x.pls_id)) return new ResultObject<string> { success = false, message = "價錢重複" };

            using (TransactionScope tx = new())
            {
                _ATS_PriceLineSettings.UpdateATS_PriceLineSettings(new UpdateATS_PriceLineSettingsParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    pls_id: data.pls_id,
                    visible: data.visible,
                    price: data.price,
                    link: data.link));

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 價錢連結設定查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<ATS_PriceLineSettingsSearchResponse>> ATS_PriceLineSettingsSearch(ATS_PriceLineSettingsSearch data)
        {
            List<SearchATS_PriceLineSettingsResult> search_results = _ATS_PriceLineSettings.SearchATS_PriceLineSettings(
                new SearchATS_PriceLineSettingsParam(
                    pls_id: data.pls_id,
                    visible: data.visible,
                    price: data.price,
                    link: data.link,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["pls_id", "visible", "price", "link"], [],
                out int page_count);

            List<ATS_PriceLineSettingsSearchResponse> response = [];
            foreach (SearchATS_PriceLineSettingsResult result in search_results)
            {
                response.Add(new ATS_PriceLineSettingsSearchResponse
                {
                    pls_id = result.pls_id,
                    visible = result.visible,
                    price = result.price,
                    link = result.link
                });
            }

            return new ResultObject<List<ATS_PriceLineSettingsSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 價錢連結設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_PriceLineSettingsDelete(ATS_PriceLineSettingsDelete data)
        {
            _ATS_PriceLineSettings.DeleteATS_PriceLineSettings(data.pls_id);
            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}
