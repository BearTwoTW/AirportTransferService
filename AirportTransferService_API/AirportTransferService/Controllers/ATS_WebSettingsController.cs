using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 網頁設定
    /// </summary>
    /// <param name="ats_websettings"></param>
    /// <param name="baseService"></param>
    public class ATS_WebSettingsController(IATS_WebSettings ats_websettings, IBaseService baseService) : CustomControllerBase(baseService)
    {
        private readonly IATS_WebSettings _ats_websettings = ats_websettings;

        /// <summary>
        /// 網頁設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_WebSettingsCreate(ATS_WebSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            List<SearchATS_WebSettingsResult> search_results = _ats_websettings.SearchATS_WebSettings(
                new SearchATS_WebSettingsParam(),
                ["title"], [],
                out _);
            if (search_results.Exists(x => x.title == data.title)) return new ResultObject<string> { success = false, message = "名稱重複" };

            string id = _ats_websettings.CreateATS_WebSettings(
                new CreateATS_WebSettingsParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    title: data.title,
                    image: data.image,
                    text1: data.text1,
                    text2: data.text2,
                    text3: data.text3,
                    html1: data.html1,
                    html2: data.html2,
                    html3: data.html3));

            return new ResultObject<string> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// 網頁設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_WebSettingsUpdate(ATS_WebSettingsUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查自己
            SearchATS_WebSettingsResult? search_own_result = _ats_websettings.SearchATS_WebSettings(
                new SearchATS_WebSettingsParam(ws_id: data.ws_id),
                ["ws_id"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無網頁設定" };
            //查要檢查重複的東西
            List<SearchATS_WebSettingsResult> search_results = _ats_websettings.SearchATS_WebSettings(
                new SearchATS_WebSettingsParam(),
                ["ws_id", "title"], [],
                out _);
            string? title = data.title == Appsettings.api_string_param_no_pass ? search_own_result.title : data.title;
            //檢查重複
            if (search_results.Exists(x => x.title == title && data.ws_id != x.ws_id)) return new ResultObject<string> { success = false, message = "標題重複" };

            using (TransactionScope tx = new())
            {
                _ats_websettings.UpdateATS_WebSettings(new UpdateATS_WebSettingsParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    ws_id: data.ws_id,
                    title: data.title,
                    image: data.image,
                    text1: data.text1,
                    text2: data.text2,
                    text3: data.text3,
                    html1: data.html1,
                    html2: data.html2,
                    html3: data.html3));

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 網頁設定查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<ATS_WebSettingsSearchResponse>> ATS_WebSettingsSearch(ATS_WebSettingsSearch data)
        {
            List<SearchATS_WebSettingsResult> search_results = _ats_websettings.SearchATS_WebSettings(
                new SearchATS_WebSettingsParam(
                    ws_id: data.ws_id,
                    title: data.title,
                    image: data.image,
                    text1: data.text1,
                    text2: data.text2,
                    text3: data.text3,
                    html1: data.html1,
                    html2: data.html2,
                    html3: data.html3,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["ws_id", "title", "image", "text1", "text2", "text3", "html1", "html2", "html3"], [],
                out int page_count);

            List<ATS_WebSettingsSearchResponse> response = [];
            foreach (SearchATS_WebSettingsResult result in search_results)
            {
                response.Add(new ATS_WebSettingsSearchResponse
                {
                    ws_id = result.ws_id,
                    title = result.title,
                    image = result.image,
                    text1 = result.text1,
                    text2 = result.text2,
                    text3 = result.text3,
                    html1 = result.html1,
                    html2 = result.html2,
                    html3 = result.html3
                });
            }

            return new ResultObject<List<ATS_WebSettingsSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 網頁設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_WebSettingsDelete(ATS_WebSettingsDelete data)
        {
            _ats_websettings.DeleteATS_WebSettings(data.ws_id);
            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}
