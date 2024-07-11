using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 價錢連結設定
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="ATS_PriceLinkSettings"></param>
    public class ATS_PriceLinkSettingsController(
        IBaseService baseService,
        IATS_PriceLinkSettings ATS_PriceLinkSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_PriceLinkSettings _ATS_PriceLinkSettings = ATS_PriceLinkSettings;

        /// <summary>
        /// 價錢連結設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_PriceLinkSettingsCreate(ATS_PriceLinkSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            List<SearchATS_PriceLinkSettingsResult> search_results = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                new SearchATS_PriceLinkSettingsParam(),
                ["price"], [],
                out _);
            if (search_results.Exists(x => x.price == data.price)) return new ResultObject<string> { success = false, message = "價錢重複" };

            string id = _ATS_PriceLinkSettings.CreateATS_PriceLinkSettings(
                new CreateATS_PriceLinkSettingsParam(
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
        public ResultObject<string> ATS_PriceLinkSettingsUpdate(ATS_PriceLinkSettingsUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查自己
            SearchATS_PriceLinkSettingsResult? search_own_result = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                new SearchATS_PriceLinkSettingsParam(pls_id: data.pls_id),
                ["pls_id"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無價錢連結設定" };
            //查要檢查重複的東西
            List<SearchATS_PriceLinkSettingsResult> search_results = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                new SearchATS_PriceLinkSettingsParam(),
                ["pls_id", "price"], [],
                out _);
            decimal? price = data.price == Appsettings.api_numeric_param_no_pass ? search_own_result.price : data.price;
            //檢查重複
            if (search_results.Exists(x => x.price == price && data.pls_id != x.pls_id)) return new ResultObject<string> { success = false, message = "價錢重複" };

            using (TransactionScope tx = new())
            {
                _ATS_PriceLinkSettings.UpdateATS_PriceLinkSettings(new UpdateATS_PriceLinkSettingsParam(
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
        public ResultObject<object> ATS_PriceLinkSettingsSearch(ATS_PriceLinkSettingsSearch data)
        {
            List<SearchATS_PriceLinkSettingsResult> search_results = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                new SearchATS_PriceLinkSettingsParam(
                    pls_id: data.pls_id,
                    visible: data.visible,
                    price: data.price,
                    link: data.link,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["pls_id", "visible", "price", "link"], [],
                out int page_count);

            List<ATS_PriceLinkSettingsSearchResponse> response = [];
            foreach (SearchATS_PriceLinkSettingsResult result in search_results)
            {
                response.Add(new ATS_PriceLinkSettingsSearchResponse
                {
                    pls_id = result.pls_id,
                    visible = result.visible,
                    price = result.price,
                    link = result.link
                });
            }

            if (data.excel.Equals("Y"))
            {
                // 建立DataTable欄位
                DataTable dt_excel = new();
                dt_excel.Columns.Add("價錢", typeof(decimal));
                dt_excel.Columns.Add("連結", typeof(string));
                foreach (ATS_PriceLinkSettingsSearchResponse obj in response)
                {
                    DataRow dr_excel = dt_excel.NewRow();
                    dr_excel["價錢"] = obj.price;
                    dr_excel["連結"] = obj.link;
                    dt_excel.Rows.Add(dr_excel);
                }
                string path = Tool.CreateExcelToServer(jwtObject.company_code, "PriceLinkSettings", jwtObject.user_id, dt_excel);
                return new ResultObject<object> { success = true, data = path };
            }

            return new ResultObject<object> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 價錢連結設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_PriceLinkSettingsDelete(ATS_PriceLinkSettingsDelete data)
        {
            _ATS_PriceLinkSettings.DeleteATS_PriceLinkSettings(data.pls_id);
            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}
