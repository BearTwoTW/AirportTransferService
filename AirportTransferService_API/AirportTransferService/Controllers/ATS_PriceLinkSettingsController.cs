using AirportTransferService.Models;
using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 價錢連結設定
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="ATS_PriceLinkSettings"></param>
    /// <param name="aTS_CityAreaSettings"></param>
    public class ATS_PriceLinkSettingsController(
        IBaseService baseService,
        IATS_PriceLinkSettings ATS_PriceLinkSettings,
        IATS_CityAreaSettings ATS_CityAreaSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_PriceLinkSettings _ATS_PriceLinkSettings = ATS_PriceLinkSettings;
        private readonly IATS_CityAreaSettings _ATS_CityAreaSettings = ATS_CityAreaSettings;

        /// <summary>
        /// 價錢連結設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_PriceLinkSettingsCreate(ATS_PriceLinkSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            #region 檢查類別
            if (!data.type!.Equals(Appsettings.api_string_param_no_pass))
            {
                if (!Enum.TryParse(data.type, out OrderType _)) return new ResultObject<string> { success = false, message = "類別(接機/送機)錯誤" };
            }
            #endregion

            //檢查城市區域是否已建立
            if (!string.IsNullOrEmpty(data.city) || !string.IsNullOrEmpty(data.area))
            {
                if (string.IsNullOrEmpty(data.city)) return new ResultObject<string> { success = false, message = "城市不得為空" };

                List<SearchATS_CityAreaSettingsResult> search_cityarea_results = _ATS_CityAreaSettings.SearchATS_CityAreaSettings(
                    new SearchATS_CityAreaSettingsParam(
                        city: data.city,
                        area: data.area),
                    ["cas_id"], [],
                    out int page_count);
                if (search_cityarea_results.Count == 0) return new ResultObject<string> { success = false, message = "城市區域未建立" };
            }

            List<SearchATS_PriceLinkSettingsResult> search_results = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                new SearchATS_PriceLinkSettingsParam(),
                ["type", "city", "area", "price"], [],
                out _);
            if (search_results.Exists(x =>
            x.type == data.type
            && ((string.IsNullOrEmpty(x.city) ? "" : x.city) == (string.IsNullOrEmpty(data.city) ? "" : data.city))
            && ((string.IsNullOrEmpty(x.area) ? "" : x.area) == (string.IsNullOrEmpty(data.area) ? "" : data.area))
            && x.price == data.price))
                return new ResultObject<string> { success = false, message = "價錢重複" };
            // 同一個城市、區域會有不同的車型、路段、夜間加成..等，所以價錢可以重複
            //// 同一個城市跟區域價錢只會有一種設定
            //if (!string.IsNullOrEmpty(data.city) && !string.IsNullOrEmpty(data.area))
            //{
            //    if (search_results.Exists(x =>
            //    x.type == data.type
            //    && ((string.IsNullOrEmpty(x.city) ? "" : x.city) == (string.IsNullOrEmpty(data.city) ? "" : data.city))
            //    && ((string.IsNullOrEmpty(x.area) ? "" : x.area) == (string.IsNullOrEmpty(data.area) ? "" : data.area))))
            //        return new ResultObject<string> { success = false, message = "城市、區域重複" };
            //}
            //else if (!string.IsNullOrEmpty(data.city))
            //{
            //    if (search_results.Exists(x =>
            //    x.type == data.type
            //    && ((string.IsNullOrEmpty(x.city) ? "" : x.city) == (string.IsNullOrEmpty(data.city) ? "" : data.city))
            //    && ((string.IsNullOrEmpty(x.area) ? "" : x.area) == "")))
            //        return new ResultObject<string> { success = false, message = "城市重複" };
            //}

            string id = _ATS_PriceLinkSettings.CreateATS_PriceLinkSettings(
                new CreateATS_PriceLinkSettingsParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    visible: data.visible,
                    type: data.type,
                    city: data.city,
                    area: data.area,
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

            #region 檢查類別
            if (data.type != null && !data.type.Equals(Appsettings.api_string_param_no_pass))
            {
                if (!Enum.TryParse(data.type, out OrderType _)) return new ResultObject<string> { success = false, message = "類別(接機/送機)錯誤" };
            }
            #endregion

            //查自己
            SearchATS_PriceLinkSettingsResult? search_own_result = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                new SearchATS_PriceLinkSettingsParam(pls_id: data.pls_id),
                ["pls_id", "type", "city", "area", "price"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無價錢連結設定" };
            //查要檢查重複的東西
            List<SearchATS_PriceLinkSettingsResult> search_results = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                new SearchATS_PriceLinkSettingsParam(),
                ["pls_id", "type", "city", "area", "price"], [],
                out _);
            string? type = data.type == Appsettings.api_string_param_no_pass ? search_own_result.type : data.type;
            string? city = data.city == Appsettings.api_string_param_no_pass ? search_own_result.city : data.city;
            string? area = data.area == Appsettings.api_string_param_no_pass ? search_own_result.area : data.area;
            decimal? price = data.price == Appsettings.api_numeric_param_no_pass ? search_own_result.price : data.price;
            //檢查重複
            if (search_results.Exists(x =>
            x.type == type
            && ((string.IsNullOrEmpty(x.city) ? "" : x.city) == (string.IsNullOrEmpty(city) ? "" : city))
            && ((string.IsNullOrEmpty(x.area) ? "" : x.area) == (string.IsNullOrEmpty(area) ? "" : area))
            && x.price == price && x.pls_id != data.pls_id))
                return new ResultObject<string> { success = false, message = "價錢重複" };
            // 同一個城市、區域會有不同的車型、路段、夜間加成..等，所以價錢可以重複
            //// 同一個城市跟區域價錢只會有一種設定
            //if (!string.IsNullOrEmpty(city) && !string.IsNullOrEmpty(area))
            //{
            //    if (search_results.Exists(x =>
            //    x.type == type
            //    && ((string.IsNullOrEmpty(x.city) ? "" : x.city) == (string.IsNullOrEmpty(city) ? "" : city))
            //    && ((string.IsNullOrEmpty(x.area) ? "" : x.area) == (string.IsNullOrEmpty(area) ? "" : area))
            //    && x.pls_id != data.pls_id))
            //        return new ResultObject<string> { success = false, message = "城市、區域重複" };
            //}
            //else if (!string.IsNullOrEmpty(city))
            //{
            //    if (search_results.Exists(x =>
            //    x.type == type
            //    && ((string.IsNullOrEmpty(x.city) ? "" : x.city) == (string.IsNullOrEmpty(city) ? "" : city))
            //    && ((string.IsNullOrEmpty(x.area) ? "" : x.area) == "")
            //    && x.pls_id != data.pls_id))
            //        return new ResultObject<string> { success = false, message = "城市重複" };
            //}

            //檢查城市區域是否已建立
            if (!string.IsNullOrEmpty(city) || !string.IsNullOrEmpty(area))
            {
                if (string.IsNullOrEmpty(city)) return new ResultObject<string> { success = false, message = "城市不得為空" };

                List<SearchATS_CityAreaSettingsResult> search_cityarea_results = _ATS_CityAreaSettings.SearchATS_CityAreaSettings(
                    new SearchATS_CityAreaSettingsParam(
                        city: city,
                        area: area),
                    ["cas_id"], [],
                    out int page_count);
                if (search_cityarea_results.Count == 0) return new ResultObject<string> { success = false, message = "城市區域未建立" };
            }

            using (TransactionScope tx = new())
            {
                _ATS_PriceLinkSettings.UpdateATS_PriceLinkSettings(new UpdateATS_PriceLinkSettingsParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    pls_id: data.pls_id,
                    visible: data.visible,
                    type: data.type,
                    city: data.city,
                    area: data.area,
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
                    type: data.type,
                    city: data.city,
                    area: data.area,
                    price: data.price,
                    link: data.link,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["pls_id", "visible", "type", "city", "area", "price", "link"], [],
                out int page_count);

            List<ATS_PriceLinkSettingsSearchResponse> response = [];
            foreach (SearchATS_PriceLinkSettingsResult result in search_results)
            {
                response.Add(new ATS_PriceLinkSettingsSearchResponse
                {
                    pls_id = result.pls_id,
                    visible = result.visible,
                    type = result.type,
                    city = result.city,
                    area = result.area,
                    price = result.price,
                    link = result.link
                });
            }

            if (data.excel.Equals("Y"))
            {
                // 建立DataTable欄位
                DataTable dt_excel = new();
                dt_excel.Columns.Add("價錢", typeof(decimal));
                dt_excel.Columns.Add("接/送機", typeof(string));
                dt_excel.Columns.Add("城市", typeof(string));
                dt_excel.Columns.Add("區域", typeof(string));
                dt_excel.Columns.Add("連結", typeof(string));
                foreach (ATS_PriceLinkSettingsSearchResponse obj in response)
                {
                    DataRow dr_excel = dt_excel.NewRow();
                    dr_excel["價錢"] = obj.price;
                    dr_excel["接/送機"] = obj.type;
                    dr_excel["城市"] = obj.city;
                    dr_excel["區域"] = obj.area;
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
