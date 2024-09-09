using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 行政區域設定
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="aTS_CityAreaSettings"></param>
    /// <param name="aTS_AirportTerminalSettings"></param>
    /// <param name="aTS_CarModelSettings"></param>
    /// <param name="aTS_FareSettings"></param>
    public class ATS_CityAreaSettingsController(
        IBaseService baseService,
        IATS_CityAreaSettings aTS_CityAreaSettings,
        IATS_AirportTerminalSettings aTS_AirportTerminalSettings,
        IATS_CarModelSettings aTS_CarModelSettings,
        IATS_FareSettings aTS_FareSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_CityAreaSettings _ATS_CityAreaSettings = aTS_CityAreaSettings;
        private readonly IATS_AirportTerminalSettings _ATS_AirportTerminalSettings = aTS_AirportTerminalSettings;
        private readonly IATS_CarModelSettings _ATS_CarModelSettings = aTS_CarModelSettings;
        private readonly IATS_FareSettings _ATS_FareSettings = aTS_FareSettings;

        /// <summary>
        /// 行政區域設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_CityAreaSettingsCreate(ATS_CityAreaSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;
            if (data.road != null && !data.road.Equals(Appsettings.api_string_param_no_pass)) data.road = Tool.ConvertAddress(Tool.CheckRoadFormat(data.road!));
            if (data.section != null && !data.section.Equals(Appsettings.api_string_param_no_pass)) data.section = Tool.ConvertAddress(Tool.CheckSectionFormat(data.section!));

            List<SearchATS_CityAreaSettingsResult> resultCityAreaSettings = _ATS_CityAreaSettings.SearchATS_CityAreaSettings(
                new SearchATS_CityAreaSettingsParam(),
                ["city", "area", "road", "section"], [],
                out _);
            if (resultCityAreaSettings.Exists(x => x.city == data.city && x.area == data.area && x.road == data.road && x.section == data.section)) return new ResultObject<string> { success = false, message = "行政區域重複" };

            string id = _ATS_CityAreaSettings.CreateATS_CityAreaSettings(
                new CreateATS_CityAreaSettingsParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    visible: data.visible,
                    zip: data.zip,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section));

            if (!string.IsNullOrEmpty(id))
            {
                ATS_FareSettingsController aTS_FareSettingsController = new(_baseService, _ATS_FareSettings, _ATS_AirportTerminalSettings, _ATS_CarModelSettings, _ATS_CityAreaSettings) { ControllerContext = ControllerContext };
                aTS_FareSettingsController.ATS_FareSettingsSystemCreate(
                    new ATS_FareSettingsCreate { city = data.city, area = data.area, road = data.road, section = data.section });
            }

            return new ResultObject<string> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// 行政區域設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_CityAreaSettingsUpdate(ATS_CityAreaSettingsUpdate data)
        {
            DateTime upd_time = DateTime.Now;
            if (data.road != null && !data.road.Equals(Appsettings.api_string_param_no_pass)) data.road = Tool.ConvertAddress(Tool.CheckRoadFormat(data.road!));
            if (data.section != null && !data.section.Equals(Appsettings.api_string_param_no_pass)) data.section = Tool.ConvertAddress(Tool.CheckSectionFormat(data.section!));

            //查自己
            SearchATS_CityAreaSettingsResult? search_own_result = _ATS_CityAreaSettings.SearchATS_CityAreaSettings(
                new SearchATS_CityAreaSettingsParam(cas_id: data.cas_id),
                ["cas_id", "city", "area", "road", "section"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無行政區域設定" };
            //查要檢查重複的東西
            List<SearchATS_CityAreaSettingsResult> search_results = _ATS_CityAreaSettings.SearchATS_CityAreaSettings(
                new SearchATS_CityAreaSettingsParam(),
                ["cas_id", "city", "area", "road", "section"], [],
                out _);
            string? city = data.city == Appsettings.api_string_param_no_pass ? search_own_result.city : data.city;
            string? area = data.area == Appsettings.api_string_param_no_pass ? search_own_result.area : data.area;
            string? road = data.road == Appsettings.api_string_param_no_pass ? search_own_result.road : data.road;
            string? section = data.section == Appsettings.api_string_param_no_pass ? search_own_result.section : data.section;
            //檢查重複
            if (search_results.Exists(x => x.city == city && x.area == area && x.road == road && x.section == section && data.cas_id != x.cas_id))
                return new ResultObject<string> { success = false, message = "行政區域重複" };

            using (TransactionScope tx = new())
            {
                _ATS_CityAreaSettings.UpdateATS_CityAreaSettings(new UpdateATS_CityAreaSettingsParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    cas_id: data.cas_id,
                    visible: data.visible,
                    zip: data.zip,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section));

                ATS_FareSettingsController aTS_FareSettingsController = new(_baseService, _ATS_FareSettings, _ATS_AirportTerminalSettings, _ATS_CarModelSettings, _ATS_CityAreaSettings) { ControllerContext = ControllerContext };
                aTS_FareSettingsController.ATS_FareSettingsSystemUpdate(
                    [new ATS_FareSettingsCreate { city = search_own_result.city, area = search_own_result.area, road = search_own_result.road, section = search_results[0].section },
                     new ATS_FareSettingsCreate { visible = data.visible, city = data.city, area = data.area, road = data.road, section = data.section }]);

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 行政區域設定查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<ATS_CityAreaSettingsSearchResponse>> ATS_CityAreaSettingsSearch(ATS_CityAreaSettingsSearch data)
        {
            List<SearchATS_CityAreaSettingsResult> search_results = _ATS_CityAreaSettings.SearchATS_CityAreaSettings(
                new SearchATS_CityAreaSettingsParam(
                    cas_id: data.cas_id,
                    visible: data.visible,
                    zip: data.zip,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["cas_id", "visible", "zip", "city", "area", "road", "section"], [],
                out int page_count);

            if (data.distinct.Equals("Y"))
                search_results = search_results.Select(x => new SearchATS_CityAreaSettingsResult { city = x.city, area = x.area }).Distinct().ToList();

            List<ATS_CityAreaSettingsSearchResponse> response = [];
            foreach (SearchATS_CityAreaSettingsResult result in search_results)
            {
                response.Add(new ATS_CityAreaSettingsSearchResponse
                {
                    cas_id = result.cas_id,
                    visible = result.visible,
                    zip = result.zip,
                    city = result.city,
                    area = result.area,
                    road = result.road,
                    section = result.section
                });
            }

            return new ResultObject<List<ATS_CityAreaSettingsSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 行政區域設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_CityAreaSettingsDelete(ATS_CityAreaSettingsDelete data)
        {
            SearchATS_CityAreaSettingsResult? search_own_result = _ATS_CityAreaSettings.SearchATS_CityAreaSettings(
                new SearchATS_CityAreaSettingsParam(cas_id: data.cas_id),
                ["cas_id", "city", "area", "road", "section"], [],
                out _).FirstOrDefault();

            _ATS_CityAreaSettings.DeleteATS_CityAreaSettings(data.cas_id);

            ATS_FareSettingsController aTS_FareSettingsController = new(_baseService, _ATS_FareSettings, _ATS_AirportTerminalSettings, _ATS_CarModelSettings, _ATS_CityAreaSettings) { ControllerContext = ControllerContext };
            aTS_FareSettingsController.ATS_FareSettingsSystemDelete(
                               new ATS_FareSettingsCreate { city = search_own_result.city, area = search_own_result.area, road = search_own_result.road, section = search_own_result.section });

            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}
