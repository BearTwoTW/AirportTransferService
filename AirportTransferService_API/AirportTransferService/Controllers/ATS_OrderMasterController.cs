using AirportTransferService.Models;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 訂單管理
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="aTS_OrderMaster"></param>
    /// <param name="aTS_AirportTerminalSettings"></param>
    /// <param name="aTS_CarModelSettings"></param>
    /// <param name="aTS_ExtraSettings"></param>
    /// <param name="aTS_FareSettings"></param>
    /// <param name="aTS_OrderDetail"></param>
    /// <param name="aTS_PriceLinkSettings"></param>
    /// <param name="systemSettings"></param>
    public class ATS_OrderMasterController(
        IBaseService baseService,
        IATS_OrderMaster aTS_OrderMaster,
        IATS_AirportTerminalSettings aTS_AirportTerminalSettings,
        IATS_CarModelSettings aTS_CarModelSettings,
        IATS_ExtraSettings aTS_ExtraSettings,
        IATS_FareSettings aTS_FareSettings,
        IATS_OrderDetail aTS_OrderDetail,
        IATS_PriceLinkSettings aTS_PriceLinkSettings,
        ISystemSettings systemSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_OrderMaster _ATS_OrderMaster = aTS_OrderMaster;
        private readonly IATS_AirportTerminalSettings _ATS_AirportTerminalSettings = aTS_AirportTerminalSettings;
        private readonly IATS_CarModelSettings _ATS_CarModelSettings = aTS_CarModelSettings;
        private readonly IATS_ExtraSettings _ATS_ExtraSettings = aTS_ExtraSettings;
        private readonly IATS_FareSettings _ATS_FareSettings = aTS_FareSettings;
        private readonly IATS_OrderDetail _ATS_OrderDetail = aTS_OrderDetail;
        private readonly IATS_PriceLinkSettings _ATS_PriceLinkSettings = aTS_PriceLinkSettings;
        private readonly ISystemSettings _systemSettings = systemSettings;

        /// <summary>
        /// 訂單管理建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> ATS_OrderMasterCreate(ATS_OrderMasterCreate data)
        {
            // 驗證訂單資料
            ResultObject<ValidateOrderResult> validateResult = ValidateOrder(data);
            if (!validateResult.success) return new ResultObject<object> { success = validateResult.success, message = validateResult.message, data = validateResult.data };
            ValidateOrderResult validateResultData = validateResult.data!;
            List<(SearchATS_ExtraSettingsResult result, int? count)> exists_es_ids = validateResultData.exists_es_ids;
            decimal? price = validateResultData.price;

            if (data.calculation!.Equals("Y")) return new ResultObject<object> { success = true, message = "計算價錢成功", data = price.ToString() };

            DateTime cre_time = DateTime.Now;
            string id = "";
            using (TransactionScope tx = new())
            {
                // 建立訂單
                id = _ATS_OrderMaster.CreateATS_OrderMaster(
                    new CreateATS_OrderMasterParam(
                        cre_userid: jwtObject.user_id,
                        cre_time: cre_time,
                        visible: data.visible,
                        type: data.type,
                        city: data.city,
                        area: data.area,
                        road: data.road,
                        section: data.section,
                        address: data.address,
                        airport: data.airport,
                        terminal: data.terminal,
                        flght_number: data.flght_number,
                        date_travel: data.date_travel,
                        time_travel: data.time_travel,
                        number_passenger: data.number_passenger,
                        number_bags: data.number_bags,
                        cms_id: data.cms_id,
                        signboard_title: data.signboard_title,
                        signboard_content: data.signboard_content,
                        name_purchaser: data.name_purchaser,
                        phone_purchaser: data.phone_purchaser,
                        email_purchaser: data.email_purchaser,
                        name_passenger: data.name_passenger,
                        phone_passenger: data.phone_passenger,
                        email_passenger: data.email_passenger,
                        price: 0,
                        link: ""));
                if (string.IsNullOrEmpty(id)) return new ResultObject<object> { success = false, message = "新增失敗" };

                // 如果有加購項目
                if (exists_es_ids != null && exists_es_ids.Count > 0)
                {
                    foreach ((SearchATS_ExtraSettingsResult result, int? count) in exists_es_ids)
                    {
                        // 建立訂單明細
                        _ATS_OrderDetail.CreateATS_OrderDetail(new CreateATS_OrderDetailParam(
                                cre_userid: jwtObject.user_id,
                                cre_time: cre_time,
                                visible: "Y",
                                o_id: id,
                                es_id: result.es_id,
                                es_type: result.type,
                                es_name: result.name,
                                es_price: result.price,
                                count: count,
                                total_price: (count ?? 0) * (result.price ?? 0)));
                        price += (count ?? 0) * (result.price ?? 0);
                    }
                }

                // 拿價錢查連結
                List<SearchATS_PriceLinkSettingsResult> resultSearchATS_PriceLinkSettings = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                    new SearchATS_PriceLinkSettingsParam(price: price),
                    ["link"], [],
                    out int _);
                if (resultSearchATS_PriceLinkSettings.Count == 0) return new ResultObject<object> { success = false, message = "價錢連結不存在" };

                // 更新訂單價錢和連結
                _ATS_OrderMaster.UpdateATS_OrderMaster(new UpdateATS_OrderMasterParam(
                        cre_time: Appsettings.api_datetime_param_no_pass,
                        upd_userid: jwtObject.user_id,
                        upd_time: cre_time,
                        o_id: id,
                        date_travel: Appsettings.api_dateonly_param_no_pass,
                        time_travel: Appsettings.api_timeonly_param_no_pass,
                        price: price,
                        link: resultSearchATS_PriceLinkSettings[0].link));

                tx.Complete();
            }

            return new ResultObject<object> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// 驗證訂單
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [NonAction]
        private ResultObject<ValidateOrderResult> ValidateOrder(ATS_OrderMasterCreate data)
        {
            #region 檢查預約日期時間: date_travel+time_travel 轉為 DateTime 要大於 48 小時
            try
            {
                if (data.date_travel!.Value.ToDateTime((TimeOnly)data.time_travel!) < DateTime.Now.AddHours(48))
                    return new ResultObject<ValidateOrderResult> { success = false, message = "預約時間需大於 48 小時" };
            }
            catch (Exception e) { return new ResultObject<ValidateOrderResult> { success = false, message = $"預約日期時間格式錯誤:{JsonConvert.SerializeObject(e)}" }; }
            #endregion

            #region 檢查重複: 檢查內容尚未確認
            // TODO: 重複條件要問一下
            List<SearchATS_OrderMasterResult> search_results = _ATS_OrderMaster.SearchATS_OrderMaster(
                new SearchATS_OrderMasterParam(),
                ["o_id"], [],
                out int _);
            //if (resultSearchATS_OrderMaster.Exists(x => x.title == data.title)) return new ResultObject<ValidateOrderResult> { success = false, message = "名稱重複" };
            #endregion

            #region 檢查類別
            if (!Enum.TryParse(data.type, out OrderType _)) return new ResultObject<ValidateOrderResult> { success = false, message = "類別(接機/送機)錯誤" };
            #endregion

            #region 檢查車資
            List<SearchATS_FareSettingsResult> resultSearchATS_FareSettings = ExecuteSearchATS_FareSettings(
                new SearchATS_FareSettingsParam(
                    visible: "Y",
                    cms_id: data.cms_id,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section,
                    airport: data.airport,
                    terminal: data.terminal));
            if (resultSearchATS_FareSettings.Count == 0) return new ResultObject<ValidateOrderResult> { success = false, message = "車資不存在" };
            if ((resultSearchATS_FareSettings[0].price ?? 0) == 0) return new ResultObject<ValidateOrderResult> { success = false, message = "車資尚未設定" };
            decimal? price = resultSearchATS_FareSettings[0].price;
            #endregion

            #region 檢查機場
            List<SearchATS_AirportTerminalSettingsResult> resultSearchATS_AirportTerminalSettings = _ATS_AirportTerminalSettings.SearchATS_AirportTerminalSettings(
                new SearchATS_AirportTerminalSettingsParam(
                    visible: "Y",
                    airport: data.airport,
                    terminal: data.terminal),
                ["ats_id"], [],
                out int _);
            if (resultSearchATS_AirportTerminalSettings.Count == 0) return new ResultObject<ValidateOrderResult> { success = false, message = "機場不存在" };
            #endregion

            #region 檢查加購項目
            int? count_total_combine = 0;
            List<(SearchATS_ExtraSettingsResult result, int? count)> exists_es_ids = [];
            if (data.es_ids != null && data.es_ids.Count > 0)
            {
                foreach (ExtraItem item in data.es_ids)
                {
                    #region 檢查加購行為類別
                    if (!Enum.TryParse(item.type, out ExtraActionType _)) return new ResultObject<ValidateOrderResult> { success = false, message = "加購動作類別錯誤" };
                    #endregion
                    if (Enum.Parse<ExtraActionType>(item.type!) == ExtraActionType.Delete) continue;

                    List<SearchATS_ExtraSettingsResult> resultSearchATS_ExtraSettings = _ATS_ExtraSettings.SearchATS_ExtraSettings(
                        new SearchATS_ExtraSettingsParam(
                            es_id: item.es_id,
                            visible: "Y"),
                        ["es_id", "visible", "type", "name", "price"], [],
                        out int _);
                    if (resultSearchATS_ExtraSettings.Count == 0) return new ResultObject<ValidateOrderResult> { success = false, message = "加購項目不存在" };

                    // 如果類型是"合併"，就統計數量
                    count_total_combine += Enum.Parse<ExtraType>(resultSearchATS_ExtraSettings[0].type!) == ExtraType.合併 ? item.count : 0;
                    exists_es_ids.Add((resultSearchATS_ExtraSettings[0], item.count));
                }
            }
            #endregion

            #region 檢查夜間加成
            List<SearchSystemSettingResult> SearchSystemSetting_result = _systemSettings.SearchSystemSetting(new SearchSystemSettingParam(), ["value_json", "ssm_name"], out int _);
            SearchSystemSettingResult? SearchSystemSetting_target = SearchSystemSetting_result.Where(x => (x.ssm_name ?? "").Equals("夜間加成")).FirstOrDefault();
            if (SearchSystemSetting_target == null || SearchSystemSetting_target.value_json == null) return new ResultObject<ValidateOrderResult> { success = false, message = "系統設定遺失" };
            List<DictionaryKeyValue> keyValues = JsonConvert.DeserializeObject<List<DictionaryKeyValue>>(SearchSystemSetting_target.value_json) ?? [];
            if (keyValues.Count == 0) return new ResultObject<ValidateOrderResult> { success = false, message = "夜間加成設定遺失" };
            try
            {
                TimeOnly timeStart = new(
                    Convert.ToInt32(keyValues.Where(x => x.key.Equals("時間小時起")).FirstOrDefault()?.value ?? "23"),
                    Convert.ToInt32(keyValues.Where(x => x.key.Equals("時間分鐘起")).FirstOrDefault()?.value ?? "0"));
                TimeOnly timeEnd = new(
                    Convert.ToInt32(keyValues.Where(x => x.key.Equals("時間小時迄")).FirstOrDefault()?.value ?? "5"),
                    Convert.ToInt32(keyValues.Where(x => x.key.Equals("時間分鐘迄")).FirstOrDefault()?.value ?? "59"));

                if (IsTimeInRange(timeStart, timeEnd, data.time_travel))
                    price += Convert.ToDecimal(keyValues.Where(x => x.key.Equals("金額")).FirstOrDefault()?.value ?? "200");
            }
            catch (Exception e) { return new ResultObject<ValidateOrderResult> { success = false, message = $"夜間加成日期時間格式錯誤:{JsonConvert.SerializeObject(e)}" }; }
            #endregion

            #region 檢查車型
            List<SearchATS_CarModelSettingsResult> resultSearchATS_CarModelSettings = _ATS_CarModelSettings.SearchATS_CarModelSettings(
                new SearchATS_CarModelSettingsParam(
                    cms_id: data.cms_id,
                    visible: "Y"),
                ["cms_id", "max_passengers", "max_luggage", "max_child_seats", "max_service_extras"], [],
                out int _);
            if (resultSearchATS_CarModelSettings.Count == 0) return new ResultObject<ValidateOrderResult> { success = false, message = "車型不存在" };
            if (data.number_passenger > resultSearchATS_CarModelSettings[0].max_passengers) return new ResultObject<ValidateOrderResult> { success = false, message = "乘車人數超過車型限制" };
            if (data.number_bags > resultSearchATS_CarModelSettings[0].max_luggage) return new ResultObject<ValidateOrderResult> { success = false, message = "行李數超過車型限制" };
            if (count_total_combine > resultSearchATS_CarModelSettings[0].max_child_seats) return new ResultObject<ValidateOrderResult> { success = false, message = "安全座椅數量超過車型限制" };
            #endregion

            return new ResultObject<ValidateOrderResult> { success = true, data = new ValidateOrderResult { exists_es_ids = exists_es_ids, price = price } };
        }

        /// <summary>
        /// 車資查詢 遞迴
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [NonAction]
        private List<SearchATS_FareSettingsResult> ExecuteSearchATS_FareSettings(SearchATS_FareSettingsParam data)
        {
            List<SearchATS_FareSettingsResult> result = _ATS_FareSettings.SearchATS_FareSettings(
                new SearchATS_FareSettingsParam(
                    visible: "Y",
                    cms_id: data.cms_id,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section,
                    airport: data.airport,
                    terminal: data.terminal),
                ["price"], [],
                out int _);

            // 如果查詢有結果，返回結果
            if (result.Count != 0) return result;

            // 如果 section 不為空，嘗試將 section 設為空並再次查詢
            if (!string.IsNullOrEmpty(data.section))
            {
                return ExecuteSearchATS_FareSettings(new SearchATS_FareSettingsParam(
                    visible: "Y",
                    cms_id: data.cms_id,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    airport: data.airport,
                    terminal: data.terminal));
            }

            // 如果 road 不為空，嘗試將 road 設為空並再次查詢
            if (!string.IsNullOrEmpty(data.road))
            {
                return ExecuteSearchATS_FareSettings(new SearchATS_FareSettingsParam(
                    visible: "Y",
                    cms_id: data.cms_id,
                    city: data.city,
                    area: data.area,
                    airport: data.airport,
                    terminal: data.terminal));
            }

            return result;
        }

        /// <summary>
        /// 時間是否在範圍內
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <param name="target"></param>
        /// <returns></returns>
        [NonAction]
        private static bool IsTimeInRange(TimeOnly start, TimeOnly end, TimeOnly? target)
        {
            if (start <= end)
                return target >= start && target <= end; // 範圍在同一天
            else
                return target >= start || target <= end; // 範圍跨越午夜
        }

        /// <summary>
        /// 訂單管理修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> ATS_OrderMasterUpdate(ATS_OrderMasterUpdate data)
        {
            // 查自己
            SearchATS_OrderMasterResult? search_own_result = _ATS_OrderMaster.SearchATS_OrderMaster(
                new SearchATS_OrderMasterParam(o_id: data.o_id),
                ["o_id", "type", "city", "area", "road", "section", "airport", "terminal", "date_travel", "time_travel", "number_passenger", "number_bags", "cms_id"], [],
                out int _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<object> { success = false, message = "修改失敗，查無訂單" };

            // 驗證訂單資料
            ResultObject<ValidateOrderResult> validateResult = ValidateOrder(new ATS_OrderMasterCreate
            {
                type = data.type == Appsettings.api_string_param_no_pass ? search_own_result.type : data.type,
                city = data.city == Appsettings.api_string_param_no_pass ? search_own_result.city : data.city,
                area = data.area == Appsettings.api_string_param_no_pass ? search_own_result.area : data.area,
                road = data.road == Appsettings.api_string_param_no_pass ? search_own_result.road : data.road,
                section = data.section == Appsettings.api_string_param_no_pass ? search_own_result.section : data.section,
                airport = data.airport == Appsettings.api_string_param_no_pass ? search_own_result.airport : data.airport,
                terminal = data.terminal == Appsettings.api_string_param_no_pass ? search_own_result.terminal : data.terminal,
                date_travel = data.date_travel == Appsettings.api_dateonly_param_no_pass ? search_own_result.date_travel : data.date_travel,
                time_travel = data.time_travel == Appsettings.api_timeonly_param_no_pass ? search_own_result.time_travel : data.time_travel,
                number_passenger = data.number_passenger == Appsettings.api_numeric_param_no_pass ? search_own_result.number_passenger : data.number_passenger,
                number_bags = data.number_bags == Appsettings.api_numeric_param_no_pass ? search_own_result.number_bags : data.number_bags,
                cms_id = data.cms_id == Appsettings.api_string_param_no_pass ? search_own_result.cms_id : data.cms_id,
                es_ids = data.es_ids
            });
            if (!validateResult.success) return new ResultObject<object> { success = validateResult.success, message = validateResult.message, data = validateResult.data };
            ValidateOrderResult validateResultData = validateResult.data!;
            List<(SearchATS_ExtraSettingsResult result, int? count)> exists_es_ids = validateResultData.exists_es_ids;
            decimal? price = validateResultData.price;

            DateTime now_time = DateTime.Now;
            using (TransactionScope tx = new())
            {
                // 刪除原來的加購項目
                List<SearchATS_OrderDetailResult> resultSearchATS_OrderDetail = _ATS_OrderDetail.SearchATS_OrderDetail(
                    new SearchATS_OrderDetailParam(o_id: data.o_id),
                    ["od_id"], [],
                    out int _);
                foreach (SearchATS_OrderDetailResult item in resultSearchATS_OrderDetail)
                {
                    _ATS_OrderDetail.DeleteATS_OrderDetail(od_id: item.od_id!);
                }

                // 如果有新的加購項目
                if (exists_es_ids != null && exists_es_ids.Count > 0)
                {
                    foreach ((SearchATS_ExtraSettingsResult result, int? count) in exists_es_ids)
                    {
                        // 建立訂單明細
                        _ATS_OrderDetail.CreateATS_OrderDetail(new CreateATS_OrderDetailParam(
                                cre_userid: jwtObject.user_id,
                                cre_time: now_time,
                                visible: "Y",
                                o_id: data.o_id,
                                es_id: result.es_id,
                                es_type: result.type,
                                es_name: result.name,
                                es_price: result.price,
                                count: count,
                                total_price: (count ?? 0) * (result.price ?? 0)));
                        price += (count ?? 0) * (result.price ?? 0);
                    }
                }

                // 拿價錢查連結
                List<SearchATS_PriceLinkSettingsResult> resultSearchATS_PriceLinkSettings = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                    new SearchATS_PriceLinkSettingsParam(price: price),
                    ["link"], [],
                    out int _);
                if (resultSearchATS_PriceLinkSettings.Count == 0) return new ResultObject<object> { success = false, message = "價錢連結不存在" };

                _ATS_OrderMaster.UpdateATS_OrderMaster(new UpdateATS_OrderMasterParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: now_time,
                    o_id: data.o_id,
                    visible: data.visible,
                    type: data.type,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section,
                    address: data.address,
                    airport: data.airport,
                    terminal: data.terminal,
                    flght_number: data.flght_number,
                    date_travel: data.date_travel,
                    time_travel: data.time_travel,
                    number_passenger: data.number_passenger,
                    number_bags: data.number_bags,
                    cms_id: data.cms_id,
                    signboard_title: data.signboard_title,
                    signboard_content: data.signboard_content,
                    name_purchaser: data.name_purchaser,
                    phone_purchaser: data.phone_purchaser,
                    email_purchaser: data.email_purchaser,
                    name_passenger: data.name_passenger,
                    phone_passenger: data.phone_passenger,
                    email_passenger: data.email_passenger,
                    price: price,
                    link: resultSearchATS_PriceLinkSettings[0].link));

                tx.Complete();
            }

            return new ResultObject<object> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 訂單管理查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<object> ATS_OrderMasterSearch(ATS_OrderMasterSearch data)
        {
            List<SearchATS_OrderMasterResult> resultSearchATS_OrderMaster = _ATS_OrderMaster.SearchATS_OrderMaster(
                new SearchATS_OrderMasterParam(
                    cre_time_start: data.cre_date_start.HasValue ? data.cre_date_start.Value.ToDateTime(new TimeOnly(0, 0, 0)) : null,
                    cre_time_end: data.cre_date_end.HasValue ? data.cre_date_end.Value.ToDateTime(new TimeOnly(23, 59, 59)) : null,
                    o_id: data.o_id,
                    visible: data.visible,
                    type: data.type,
                    city: data.city,
                    area: data.area,
                    road: data.road,
                    section: data.section,
                    address: data.address,
                    airport: data.airport,
                    terminal: data.terminal,
                    flght_number: data.flght_number,
                    date_travel_start: data.date_travel_start,
                    date_travel_end: data.date_travel_end,
                    time_travel_start: data.time_travel_start,
                    time_travel_end: data.time_travel_end,
                    cms_id: data.cms_id,
                    name_purchaser: data.name_purchaser,
                    phone_purchaser: data.phone_purchaser,
                    email_purchaser: data.email_purchaser,
                    name_passenger: data.name_passenger,
                    phone_passenger: data.phone_passenger,
                    email_passenger: data.email_passenger,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["o_id", "visible", "type", "city", "area", "road", "section", "address", "airport", "terminal", "flght_number", "date_travel", "time_travel", "number_passenger", "number_bags", "cms_id", "signboard_title", "signboard_content", "name_purchaser", "phone_purchaser", "email_purchaser", "name_passenger", "phone_passenger", "email_passenger", "price", "link"], [],
                out int page_count);
            List<SearchATS_CarModelSettingsResult> resultSearchATS_CarModelSettings = _ATS_CarModelSettings.SearchATS_CarModelSettings(
                new SearchATS_CarModelSettingsParam(cms_id: data.cms_id),
                ["cms_id", "name"], [],
                out int _);

            

            List<ATS_OrderMasterSearchResponse> response = [];
            foreach (SearchATS_OrderMasterResult result in resultSearchATS_OrderMaster)
            {
                List<SearchATS_OrderDetailResult> resultSearchATS_OrderDetail = _ATS_OrderDetail.SearchATS_OrderDetail(
                new SearchATS_OrderDetailParam(o_id: result.o_id),
                ["es_id", "es_name", "count"], [new SQL.SQLOrder_obj { sort_column = "es_id", is_desc = false }],
                out int _);
                List<ExtraItem> es_ids = [];
                foreach (SearchATS_OrderDetailResult item in resultSearchATS_OrderDetail)
                {
                    es_ids.Add(new ExtraItem
                    {
                        es_id = item.es_id,
                        es_name = item.es_name,
                        count = item.count,
                        type = "Update"
                    });
                }

                response.Add(new ATS_OrderMasterSearchResponse
                {
                    o_id = result.o_id,
                    visible = result.visible,
                    type = result.type,
                    city = result.city,
                    area = result.area,
                    road = result.road,
                    section = result.section,
                    address = result.address,
                    airport = result.airport,
                    terminal = result.terminal,
                    flght_number = result.flght_number,
                    date_travel = result.date_travel,
                    time_travel = result.time_travel,
                    number_passenger = result.number_passenger,
                    number_bags = result.number_bags,
                    cms_id = result.cms_id,
                    cms_name = resultSearchATS_CarModelSettings.Find(x => x.cms_id == result.cms_id)?.name,
                    signboard_title = result.signboard_title,
                    signboard_content = result.signboard_content,
                    name_purchaser = result.name_purchaser,
                    phone_purchaser = result.phone_purchaser,
                    email_purchaser = result.email_purchaser,
                    name_passenger = result.name_passenger,
                    phone_passenger = result.phone_passenger,
                    email_passenger = result.email_passenger,
                    es_ids = es_ids,
                    price = result.price,
                    link = result.link
                });
            }

            if (data.excel.Equals("Y"))
            {
                DataTable dt_excel = new();
                dt_excel.Columns.Add("訂單編號", typeof(string));
                dt_excel.Columns.Add("類別(接機/送機)", typeof(string));
                dt_excel.Columns.Add("城市", typeof(string));
                dt_excel.Columns.Add("區域", typeof(string));
                dt_excel.Columns.Add("路", typeof(string));
                dt_excel.Columns.Add("段", typeof(string));
                dt_excel.Columns.Add("地址", typeof(string));
                dt_excel.Columns.Add("機場", typeof(string));
                dt_excel.Columns.Add("航廈", typeof(string));
                dt_excel.Columns.Add("航班號碼", typeof(string));
                dt_excel.Columns.Add("乘車日期", Nullable.GetUnderlyingType(typeof(DateOnly)) ?? typeof(DateOnly));
                dt_excel.Columns.Add("乘車時間", Nullable.GetUnderlyingType(typeof(TimeOnly)) ?? typeof(TimeOnly));
                dt_excel.Columns.Add("人數", typeof(int));
                dt_excel.Columns.Add("行李數", typeof(int));
                dt_excel.Columns.Add("車型", typeof(string));
                dt_excel.Columns.Add("舉牌標題", typeof(string));
                dt_excel.Columns.Add("舉牌內容", typeof(string));
                dt_excel.Columns.Add("訂購人姓名", typeof(string));
                dt_excel.Columns.Add("訂購人電話", typeof(string));
                dt_excel.Columns.Add("訂購人電子信箱", typeof(string));
                dt_excel.Columns.Add("乘客姓名", typeof(string));
                dt_excel.Columns.Add("乘客電話", typeof(string));
                dt_excel.Columns.Add("乘客電子信箱", typeof(string));
                dt_excel.Columns.Add("加購項目", typeof(string));
                dt_excel.Columns.Add("價錢", typeof(decimal));
                dt_excel.Columns.Add("連結", typeof(string));
                foreach (ATS_OrderMasterSearchResponse obj in response)
                {
                    DataRow dr_excel = dt_excel.NewRow();
                    dr_excel["訂單編號"] = obj.o_id;
                    dr_excel["類別(接機/送機)"] = obj.type;
                    dr_excel["城市"] = obj.city;
                    dr_excel["區域"] = obj.area;
                    dr_excel["路"] = obj.road;
                    dr_excel["段"] = obj.section;
                    dr_excel["地址"] = obj.address;
                    dr_excel["機場"] = obj.airport;
                    dr_excel["航廈"] = obj.terminal;
                    dr_excel["航班號碼"] = obj.flght_number;
                    dr_excel["乘車日期"] = obj.date_travel;
                    dr_excel["乘車時間"] = obj.time_travel;
                    dr_excel["人數"] = obj.number_passenger;
                    dr_excel["行李數"] = obj.number_bags;
                    dr_excel["車型"] = obj.cms_id;
                    dr_excel["舉牌標題"] = obj.signboard_title ?? "";
                    dr_excel["舉牌內容"] = obj.signboard_content ?? "";
                    dr_excel["訂購人姓名"] = obj.name_purchaser;
                    dr_excel["訂購人電話"] = obj.phone_purchaser;
                    dr_excel["訂購人電子信箱"] = obj.email_purchaser;
                    dr_excel["乘客姓名"] = obj.name_passenger;
                    dr_excel["乘客電話"] = obj.phone_passenger;
                    dr_excel["乘客電子信箱"] = obj.email_passenger;
                    dr_excel["加購項目"] = obj.es_ids!.Count > 0 ? string.Join("/", obj.es_ids!.Select(x => $"{x.es_name}(數量:{x.count})")) : "";
                    dr_excel["價錢"] = obj.price;
                    dr_excel["連結"] = obj.link;
                    dt_excel.Rows.Add(dr_excel);
                }
                string path = Tool.CreateExcelToServer(jwtObject.company_code, "OrderMaster", jwtObject.user_id, dt_excel);
                return new ResultObject<object> { success = true, data = path };
            }

            return new ResultObject<object> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 訂單管理刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        // 訂單暫時不提供刪除功能
        [NonAction]
        public ResultObject<string> ATS_OrderMasterDelete(ATS_OrderMasterDelete data)
        {
            // 查自己
            SearchATS_OrderMasterResult? search_own_result = _ATS_OrderMaster.SearchATS_OrderMaster(
                new SearchATS_OrderMasterParam(o_id: data.o_id),
                ["o_id"], [],
                out int _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "刪除失敗，查無訂單" };

            using (TransactionScope tx = new())
            {
                // 刪除加購項目
                List<SearchATS_OrderDetailResult> resultSearchATS_OrderDetail = _ATS_OrderDetail.SearchATS_OrderDetail(
                    new SearchATS_OrderDetailParam(o_id: data.o_id),
                    ["od_id"], [],
                    out int _);
                foreach (SearchATS_OrderDetailResult item in resultSearchATS_OrderDetail)
                {
                    _ATS_OrderDetail.DeleteATS_OrderDetail(od_id: item.od_id!);
                }

                _ATS_OrderMaster.DeleteATS_OrderMaster(data.o_id!);

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}