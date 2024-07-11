using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 車資設定
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="aTS_FareSettings"></param>
    /// <param name="aTS_AirportTerminalSettings"></param>
    /// <param name="aTS_CarModelSettings"></param>
    /// <param name="aTS_CityAreaSettings"></param>
    public class ATS_FareSettingsController(
        IBaseService baseService,
        IATS_FareSettings aTS_FareSettings,
        IATS_AirportTerminalSettings aTS_AirportTerminalSettings,
        IATS_CarModelSettings aTS_CarModelSettings,
        IATS_CityAreaSettings aTS_CityAreaSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_FareSettings _ATS_FareSettings = aTS_FareSettings;
        private readonly IATS_AirportTerminalSettings _ATS_AirportTerminalSettings = aTS_AirportTerminalSettings;
        private readonly IATS_CarModelSettings _ATS_CarModelSettings = aTS_CarModelSettings;
        private readonly IATS_CityAreaSettings _ATS_CityAreaSettings = aTS_CityAreaSettings;

        /// <summary>
        /// 車資設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        //[HttpPost] TODO: 車資設定由系統產生
        [NonAction]
        public ResultObject<string> ATS_FareSettingsCreate(ATS_FareSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            List<SearchATS_FareSettingsResult> search_results = _ATS_FareSettings.SearchATS_FareSettings(
                new SearchATS_FareSettingsParam(),
                ["cms_id", "city", "area", "road", "section"], [],
                out _);
            if (search_results.Exists(x => x.cms_id == data.cms_id && x.city == data.city && x.area == data.area && x.road == data.road && x.section == data.section))
                return new ResultObject<string> { success = false, message = "車資重複" };

            string id = _ATS_FareSettings.CreateATS_FareSettings(
                new CreateATS_FareSettingsParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    visible: data.visible,
                    cms_id: data.cms_id,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section,
                    airport: data.airport,
                    terminal: data.terminal,
                    price: data.price));

            return new ResultObject<string> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// 車資設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_FareSettingsUpdate(ATS_FareSettingsUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查自己
            SearchATS_FareSettingsResult? search_own_result = _ATS_FareSettings.SearchATS_FareSettings(
                new SearchATS_FareSettingsParam(fs_id: data.fs_id),
                ["fs_id"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無車資設定" };
            ////查要檢查重複的東西
            //List<SearchATS_FareSettingsResult> search_results = _ATS_FareSettings.SearchATS_FareSettings(
            //    new SearchATS_FareSettingsParam(),
            //    ["cms_id", "city", "area", "road", "section"], [],
            //    out _);
            //string? cms_id = data.cms_id == Appsettings.api_string_param_no_pass ? search_own_result.cms_id : data.cms_id;
            //string? city = data.city == Appsettings.api_string_param_no_pass ? search_own_result.city : data.city;
            //string? area = data.area == Appsettings.api_string_param_no_pass ? search_own_result.area : data.area;
            //string? road = data.road == Appsettings.api_string_param_no_pass ? search_own_result.road : data.road;
            //string? section = data.section == Appsettings.api_string_param_no_pass ? search_own_result.section : data.section;
            ////檢查重複
            //if (search_results.Exists(x => x.cms_id == cms_id && x.city == city && x.area == area && x.road == road && x.section == section && data.fs_id != x.fs_id))
            //    return new ResultObject<string> { success = false, message = "車資重複" };

            using (TransactionScope tx = new())
            {
                _ATS_FareSettings.UpdateATS_FareSettings(new UpdateATS_FareSettingsParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    fs_id: data.fs_id,
                    visible: data.visible,
                    price: data.price));

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 車資設定查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> ATS_FareSettingsSearch(ATS_FareSettingsSearch data)
        {
            List<SearchATS_FareSettingsResult> search_results = _ATS_FareSettings.SearchATS_FareSettings(
                new SearchATS_FareSettingsParam(
                    fs_id: data.fs_id,
                    visible: data.visible,
                    cms_id: data.cms_id,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section,
                    airport: data.airport,
                    terminal: data.terminal,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["fs_id", "visible", "cms_id", "city", "area", "road", "section", "airport", "terminal", "price"], [],
                out int page_count);

            if (data.distinct.Equals("Y"))
            {
                search_results = search_results
                    .Where(x => string.IsNullOrEmpty(x.road) && string.IsNullOrEmpty(x.section))
                    .GroupBy(x => new { x.city, x.area })
                    .Select(group =>
                    {
                        SearchATS_FareSettingsResult cheapest = group.OrderBy(x => x.price).First();
                        return new SearchATS_FareSettingsResult
                        {
                            city = cheapest.city,
                            area = cheapest.area,
                            price = cheapest.price
                        };
                    })
                    .ToList();
            }

            if (data.excel.Equals("Y") && !data.distinct.Equals("Y"))
            {
                // 取得所有車型名稱
                List<SearchATS_CarModelSettingsResult> resultSearchATS_CarModelSettings = _ATS_CarModelSettings.SearchATS_CarModelSettings(
                    new SearchATS_CarModelSettingsParam(),
                    ["cms_id", "name"], [],
                    out _);

                // 建立DataTable欄位
                DataTable dt_excel = new();
                dt_excel.Columns.Add("城市", typeof(string));
                dt_excel.Columns.Add("區域", typeof(string));
                dt_excel.Columns.Add("路", typeof(string));
                dt_excel.Columns.Add("段", typeof(string));
                foreach(SearchATS_CarModelSettingsResult item in resultSearchATS_CarModelSettings.OrderBy(x => x.cms_id))
                {
                    dt_excel.Columns.Add(item.name, typeof(decimal));
                }

                // 處理資料
                IEnumerable<DataRow> groupedResults = search_results
                    .GroupBy(x => new { x.city, x.area, x.road, x.section }).OrderBy(x => x.Key.city).ThenBy(x => x.Key.area).ThenBy(x => x.Key.road).ThenBy(x => x.Key.section)
                    .Select(g => 
                    {
                        DataRow row = dt_excel.NewRow();
                        row["城市"] = g.Key.city;
                        row["區域"] = g.Key.area;
                        row["路"] = g.Key.road;
                        row["段"] = g.Key.section;
                        foreach (SearchATS_CarModelSettingsResult item in resultSearchATS_CarModelSettings)
                        {
                            var price = g.Where(x => x.cms_id == item.cms_id).Select(x => x.price).FirstOrDefault();
                            row[item.name!] = price;
                        }
                        return row;
                    });

                foreach (DataRow row in groupedResults)
                {
                    dt_excel.Rows.Add(row);
                }

                string path = Tool.CreateExcelToServer(jwtObject.company_code, "FareSettings", jwtObject.user_id, dt_excel);
                return new ResultObject<object> { success = true, data = path };
            }

            List<ATS_FareSettingsSearchResponse> response = [];
            foreach (SearchATS_FareSettingsResult result in search_results)
            {
                response.Add(new ATS_FareSettingsSearchResponse
                {
                    fs_id = result.fs_id,
                    visible = result.visible,
                    cms_id = result.cms_id,
                    city = result.city,
                    area = result.area,
                    road = result.road,
                    section = result.section,
                    airport = result.airport,
                    terminal = result.terminal,
                    price = result.price ?? 0
                });
            }

            return new ResultObject<object> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 車資設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        //[HttpPost] TODO: 車資設定由系統產生
        [NonAction]
        public ResultObject<string> ATS_FareSettingsDelete(ATS_FareSettingsDelete data)
        {
            _ATS_FareSettings.DeleteATS_FareSettings(data.fs_id);
            return new ResultObject<string> { success = true, message = "刪除成功" };
        }

        /// <summary>
        /// 車資設定系統建立
        /// </summary>
        /// <param name="data"></param>
        [NonAction]
        public void ATS_FareSettingsSystemCreate(ATS_FareSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            //取得所有機場航廈
            List<SearchATS_AirportTerminalSettingsResult> airport_terminal_settings =
                string.IsNullOrEmpty(data.airport) && string.IsNullOrEmpty(data.terminal)
                ? _ATS_AirportTerminalSettings.SearchATS_AirportTerminalSettings(
                  new SearchATS_AirportTerminalSettingsParam(),
                  ["airport", "terminal"], [],
                  out _)
                : [new SearchATS_AirportTerminalSettingsResult() { airport = data.airport, terminal = data.terminal }];
            //取得所有車型
            List<SearchATS_CarModelSettingsResult> car_model_settings =
                string.IsNullOrEmpty(data.cms_id)
                ? _ATS_CarModelSettings.SearchATS_CarModelSettings(
                  new SearchATS_CarModelSettingsParam(),
                  ["cms_id"], [],
                  out _)
                : [new SearchATS_CarModelSettingsResult() { cms_id = data.cms_id }];
            //取得所有城市區域
            List<SearchATS_CityAreaSettingsResult> city_area_settings =
                string.IsNullOrEmpty(data.city) && string.IsNullOrEmpty(data.area) && string.IsNullOrEmpty(data.road) && string.IsNullOrEmpty(data.section)
                ? _ATS_CityAreaSettings.SearchATS_CityAreaSettings(
                  new SearchATS_CityAreaSettingsParam(),
                  ["city", "area", "road", "section"], [],
                  out _)
                : [new SearchATS_CityAreaSettingsResult() { city = data.city, area = data.area, road = data.road, section = data.section }];

            //將所有機場航廈、車型、城市區域組合成車資設定
            List<CreateATS_FareSettingsParam> createATS_FareSettingsParams =
                airport_terminal_settings.Count > 0 && car_model_settings.Count > 0 && city_area_settings.Count > 0
                ? airport_terminal_settings.SelectMany(x =>
                  car_model_settings.SelectMany(y =>
                  city_area_settings.Select(z => new CreateATS_FareSettingsParam(
                      cre_userid: jwtObject.user_id,
                      cre_time: cre_time,
                      visible: "Y",
                      cms_id: y.cms_id,
                      city: z.city,
                      area: z.area,
                      road: z.road,
                      section: z.section,
                      airport: x.airport,
                      terminal: x.terminal,
                      price: null)))).ToList()
                : [];

            //取得所有車資設定
            List<SearchATS_FareSettingsResult> search_results = _ATS_FareSettings.SearchATS_FareSettings(
                new SearchATS_FareSettingsParam(),
                ["cms_id", "city", "area", "road", "section", "airport", "terminal"], [],
                out _);
            //將不存在的車資設定新增
            createATS_FareSettingsParams.ForEach(x =>
            {
                if (!search_results.Exists(y =>
                y.cms_id == x.cms_id &&
                y.city == x.city &&
                y.area == x.area &&
                y.road == x.road &&
                y.section == x.section &&
                y.airport == x.airport &&
                y.terminal == x.terminal))
                    _ATS_FareSettings.CreateATS_FareSettings(x);
            });
        }

        /// <summary>
        /// 車資設定系統修改
        /// </summary>
        /// <param name="data">[0]舊資料，[1]新資料</param>
        [NonAction]
        public void ATS_FareSettingsSystemUpdate(List<ATS_FareSettingsCreate> data)
        {
            DateTime upd_time = DateTime.Now;

            // 取得修改前的車資設定
            List<SearchATS_FareSettingsResult> search_results = _ATS_FareSettings.SearchATS_FareSettings(
                new SearchATS_FareSettingsParam(
                    cms_id: data[0].cms_id,
                    city: data[0].city,
                    area: data[0].area,
                    road: data[0].road,
                    section: data[0].section,
                    airport: data[0].airport,
                    terminal: data[0].terminal),
                ["fs_id", "cms_id", "city", "area", "road", "section", "airport", "terminal"], [],
                out int _);
            search_results.ForEach(x =>
            {
                using (TransactionScope tx = new())
                {
                    _ATS_FareSettings.UpdateATS_FareSettings(new UpdateATS_FareSettingsParam(
                        cre_time: Appsettings.api_datetime_param_no_pass,
                        upd_userid: jwtObject.user_id,
                        upd_time: upd_time,
                        fs_id: x.fs_id,
                        cms_id: string.IsNullOrEmpty(data[1].cms_id) ? Appsettings.api_string_param_no_pass : data[1].cms_id,
                        city: string.IsNullOrEmpty(data[1].city) ? Appsettings.api_string_param_no_pass : data[1].city,
                        area: string.IsNullOrEmpty(data[1].area) ? Appsettings.api_string_param_no_pass : data[1].area,
                        road: string.IsNullOrEmpty(data[1].road) ? Appsettings.api_string_param_no_pass : data[1].road,
                        section: string.IsNullOrEmpty(data[1].section) ? Appsettings.api_string_param_no_pass : data[1].section,
                        airport: string.IsNullOrEmpty(data[1].airport) ? Appsettings.api_string_param_no_pass : data[1].airport,
                        terminal: string.IsNullOrEmpty(data[1].terminal) ? Appsettings.api_string_param_no_pass : data[1].terminal));

                    tx.Complete();
                }
            });
        }

        /// <summary>
        /// 車資設定系統刪除
        /// </summary>
        /// <param name="data"></param>
        [NonAction]
        public void ATS_FareSettingsSystemDelete(ATS_FareSettingsCreate data)
        {
            // 取得修改前的車資設定
            List<SearchATS_FareSettingsResult> search_results = _ATS_FareSettings.SearchATS_FareSettings(
                new SearchATS_FareSettingsParam(
                    cms_id: data.cms_id,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section,
                    airport: data.airport,
                    terminal: data.terminal),
                ["fs_id"], [],
                out int _);

            search_results.ForEach(x => _ATS_FareSettings.DeleteATS_FareSettings(x.fs_id));
        }
    }
}
