using AirportTransferService.Models;
using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 機場航廈設定
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="aTS_AirportTerminalSettings"></param>
    /// <param name="aTS_CarModelSettings"></param>
    /// <param name="aTS_CityAreaSettings"></param>
    /// <param name="aTS_FareSettings"></param>
    public class ATS_AirportTerminalSettingsController(
        IBaseService baseService,
        IATS_AirportTerminalSettings aTS_AirportTerminalSettings,
        IATS_CarModelSettings aTS_CarModelSettings,
        IATS_CityAreaSettings aTS_CityAreaSettings,
        IATS_FareSettings aTS_FareSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_AirportTerminalSettings _ATS_AirportTerminalSettings = aTS_AirportTerminalSettings;
        private readonly IATS_CarModelSettings _ATS_CarModelSettings = aTS_CarModelSettings;
        private readonly IATS_CityAreaSettings _ATS_CityAreaSettings = aTS_CityAreaSettings;
        private readonly IATS_FareSettings _ATS_FareSettings = aTS_FareSettings;

        /// <summary>
        /// 機場航廈設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_AirportTerminalSettingsCreate(ATS_AirportTerminalSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            List<SearchATS_AirportTerminalSettingsResult> search_results = _ATS_AirportTerminalSettings.SearchATS_AirportTerminalSettings(
                new SearchATS_AirportTerminalSettingsParam(),
                ["airport", "terminal"], [],
                out _);
            if (search_results.Exists(x => x.airport == data.airport && x.terminal == data.terminal)) return new ResultObject<string> { success = false, message = "名稱重複" };

            string id = _ATS_AirportTerminalSettings.CreateATS_AirportTerminalSettings(
                new CreateATS_AirportTerminalSettingsParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    visible: data.visible,
                    airport: data.airport,
                    terminal: data.terminal));

            if (!string.IsNullOrEmpty(id))
            {
                ATS_FareSettingsController aTS_FareSettingsController = new(_baseService, _ATS_FareSettings, _ATS_AirportTerminalSettings, _ATS_CarModelSettings, _ATS_CityAreaSettings) { ControllerContext = ControllerContext };
                aTS_FareSettingsController.ATS_FareSettingsSystemCreate(
                    new ATS_FareSettingsCreate { airport = data.airport, terminal = data.terminal });
            }

            return new ResultObject<string> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// 機場航廈設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_AirportTerminalSettingsUpdate(ATS_AirportTerminalSettingsUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查自己
            SearchATS_AirportTerminalSettingsResult? search_own_result = _ATS_AirportTerminalSettings.SearchATS_AirportTerminalSettings(
                new SearchATS_AirportTerminalSettingsParam(ats_id: data.ats_id),
                ["ats_id", "airport", "terminal"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無機場航廈設定" };
            //查要檢查重複的東西
            List<SearchATS_AirportTerminalSettingsResult> search_results = _ATS_AirportTerminalSettings.SearchATS_AirportTerminalSettings(
                new SearchATS_AirportTerminalSettingsParam(),
                ["ats_id", "airport", "terminal"], [],
                out _);
            string? airport = data.airport == Appsettings.api_string_param_no_pass ? search_own_result.airport : data.airport;
            string? terminal = data.terminal == Appsettings.api_string_param_no_pass ? search_own_result.terminal : data.terminal;
            //檢查重複
            if (search_results.Exists(x => x.airport == airport && x.terminal == terminal && data.ats_id != x.ats_id)) return new ResultObject<string> { success = false, message = "機場航廈重複" };

            using (TransactionScope tx = new())
            {
                _ATS_AirportTerminalSettings.UpdateATS_AirportTerminalSettings(new UpdateATS_AirportTerminalSettingsParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    ats_id: data.ats_id,
                    visible: data.visible,
                    airport: data.airport,
                    terminal: data.terminal));

                ATS_FareSettingsController aTS_FareSettingsController = new(_baseService, _ATS_FareSettings, _ATS_AirportTerminalSettings, _ATS_CarModelSettings, _ATS_CityAreaSettings) { ControllerContext = ControllerContext };
                aTS_FareSettingsController.ATS_FareSettingsSystemUpdate(
                    [new ATS_FareSettingsCreate { airport = search_own_result.airport, terminal = search_own_result.terminal },
                     new ATS_FareSettingsCreate { airport = data.airport, terminal = data.terminal }]);

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 機場航廈設定查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<ATS_AirportTerminalSettingsSearchResponse>> ATS_AirportTerminalSettingsSearch(ATS_AirportTerminalSettingsSearch data)
        {
            List<SearchATS_AirportTerminalSettingsResult> search_results = _ATS_AirportTerminalSettings.SearchATS_AirportTerminalSettings(
                new SearchATS_AirportTerminalSettingsParam(
                    ats_id: data.ats_id,
                    visible: data.visible,
                    airport: data.airport,
                    terminal: data.terminal,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["ats_id", "visible", "airport", "terminal"], 
                [new SQL.SQLOrder_obj { sort_column = "airport", is_desc = false }, new SQL.SQLOrder_obj { sort_column = "terminal", is_desc = false }],
                out int page_count);

            List<ATS_AirportTerminalSettingsSearchResponse> response = [];
            foreach (SearchATS_AirportTerminalSettingsResult result in search_results)
            {
                response.Add(new ATS_AirportTerminalSettingsSearchResponse
                {
                    ats_id = result.ats_id,
                    visible = result.visible,
                    airport = result.airport,
                    terminal = result.terminal
                });
            }

            return new ResultObject<List<ATS_AirportTerminalSettingsSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 機場航廈設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_AirportTerminalSettingsDelete(ATS_AirportTerminalSettingsDelete data)
        {
            SearchATS_AirportTerminalSettingsResult? search_own_result = _ATS_AirportTerminalSettings.SearchATS_AirportTerminalSettings(
                new SearchATS_AirportTerminalSettingsParam(ats_id: data.ats_id),
                ["ats_id", "airport", "terminal"], [],
                out _).FirstOrDefault();

            _ATS_AirportTerminalSettings.DeleteATS_AirportTerminalSettings(data.ats_id);

            ATS_FareSettingsController aTS_FareSettingsController = new(_baseService, _ATS_FareSettings, _ATS_AirportTerminalSettings, _ATS_CarModelSettings, _ATS_CityAreaSettings) { ControllerContext = ControllerContext };
            aTS_FareSettingsController.ATS_FareSettingsSystemDelete(
                new ATS_FareSettingsCreate { airport = search_own_result.airport, terminal = search_own_result.terminal });

            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}
