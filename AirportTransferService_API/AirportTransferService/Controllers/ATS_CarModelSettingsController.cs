using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 車型設定
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="aTS_CarModelSettings"></param>
    /// <param name="aTS_AirportTerminalSettings"></param>
    /// <param name="aTS_CityAreaSettings"></param>
    /// <param name="aTS_FareSettings"></param>
    public class ATS_CarModelSettingsController(
        IBaseService baseService,
        IATS_CarModelSettings aTS_CarModelSettings,
        IATS_AirportTerminalSettings aTS_AirportTerminalSettings,
        IATS_CityAreaSettings aTS_CityAreaSettings,
        IATS_FareSettings aTS_FareSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_CarModelSettings _ATS_CarModelSettings = aTS_CarModelSettings;
        private readonly IATS_AirportTerminalSettings _ATS_AirportTerminalSettings = aTS_AirportTerminalSettings;
        private readonly IATS_CityAreaSettings _ATS_CityAreaSettings = aTS_CityAreaSettings;
        private readonly IATS_FareSettings _ATS_FareSettings = aTS_FareSettings;

        /// <summary>
        /// 車型設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_CarModelSettingsCreate(ATS_CarModelSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            List<SearchATS_CarModelSettingsResult> search_results = _ATS_CarModelSettings.SearchATS_CarModelSettings(
                new SearchATS_CarModelSettingsParam(),
                ["name"], [],
                out _);
            if (search_results.Exists(x => x.name == data.name)) return new ResultObject<string> { success = false, message = "名稱重複" };

            string id = _ATS_CarModelSettings.CreateATS_CarModelSettings(
                new CreateATS_CarModelSettingsParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    visible: data.visible,
                    name: data.name,
                    max_passengers: data.max_passengers,
                    max_luggage: data.max_luggage,
                    max_child_seats: data.max_child_seats,
                    max_service_extras: data.max_service_extras));

            if (!string.IsNullOrEmpty(id))
            {
                ATS_FareSettingsController aTS_FareSettingsController = new(_baseService, _ATS_FareSettings, _ATS_AirportTerminalSettings, _ATS_CarModelSettings, _ATS_CityAreaSettings) { ControllerContext = ControllerContext };
                aTS_FareSettingsController.ATS_FareSettingsSystemCreate(
                    new ATS_FareSettingsCreate { cms_id = id });
            }

            return new ResultObject<string> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// 車型設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_CarModelSettingsUpdate(ATS_CarModelSettingsUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查自己
            SearchATS_CarModelSettingsResult? search_own_result = _ATS_CarModelSettings.SearchATS_CarModelSettings(
                new SearchATS_CarModelSettingsParam(cms_id: data.cms_id),
                ["cms_id"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無車型設定" };
            //查要檢查重複的東西
            List<SearchATS_CarModelSettingsResult> search_results = _ATS_CarModelSettings.SearchATS_CarModelSettings(
                new SearchATS_CarModelSettingsParam(),
                ["cms_id", "name"], [],
                out _);
            string? name = data.name == Appsettings.api_string_param_no_pass ? search_own_result.name : data.name;
            //檢查重複
            if (search_results.Exists(x => x.name == name && data.cms_id != x.cms_id)) return new ResultObject<string> { success = false, message = "名稱重複" };

            using (TransactionScope tx = new())
            {
                _ATS_CarModelSettings.UpdateATS_CarModelSettings(new UpdateATS_CarModelSettingsParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    cms_id: data.cms_id,
                    visible: data.visible,
                    name: data.name,
                    max_passengers: data.max_passengers,
                    max_luggage: data.max_luggage,
                    max_child_seats: data.max_child_seats,
                    max_service_extras: data.max_service_extras));

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 車型設定查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<ATS_CarModelSettingsSearchResponse>> ATS_CarModelSettingsSearch(ATS_CarModelSettingsSearch data)
        {
            List<SearchATS_CarModelSettingsResult> search_results = _ATS_CarModelSettings.SearchATS_CarModelSettings(
                new SearchATS_CarModelSettingsParam(
                    cms_id: data.cms_id,
                    visible: data.visible,
                    name: data.name,
                    max_passengers: data.max_passengers,
                    max_luggage: data.max_luggage,
                    max_child_seats: data.max_child_seats,
                    max_service_extras: data.max_service_extras,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["cms_id", "visible", "name", "max_passengers", "max_luggage", "max_child_seats", "max_service_extras"], [],
                out int page_count);

            List<ATS_CarModelSettingsSearchResponse> response = [];
            foreach (SearchATS_CarModelSettingsResult result in search_results)
            {
                response.Add(new ATS_CarModelSettingsSearchResponse
                {
                    cms_id = result.cms_id,
                    visible = result.visible,
                    name = result.name,
                    max_passengers = result.max_passengers,
                    max_luggage = result.max_luggage,
                    max_child_seats = result.max_child_seats,
                    max_service_extras = result.max_service_extras
                });
            }

            return new ResultObject<List<ATS_CarModelSettingsSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 車型設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_CarModelSettingsDelete(ATS_CarModelSettingsDelete data)
        {
            _ATS_CarModelSettings.DeleteATS_CarModelSettings(data.cms_id);

            ATS_FareSettingsController aTS_FareSettingsController = new(_baseService, _ATS_FareSettings, _ATS_AirportTerminalSettings, _ATS_CarModelSettings, _ATS_CityAreaSettings) { ControllerContext = ControllerContext };
            aTS_FareSettingsController.ATS_FareSettingsSystemDelete(
                new ATS_FareSettingsCreate { cms_id = data.cms_id });

            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}
