using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 訂單管理
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="aTS_OrderMaster"></param>
    /// <param name="aTS_CarModelSettings"></param>
    public class ATS_OrderMasterController(
        IBaseService baseService,
        IATS_OrderMaster aTS_OrderMaster,
        IATS_CarModelSettings aTS_CarModelSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_OrderMaster _ATS_OrderMaster = aTS_OrderMaster;
        private readonly IATS_CarModelSettings _ATS_CarModelSettings = aTS_CarModelSettings;

        /// <summary>
        /// 訂單管理建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_OrderMasterCreate(ATS_OrderMasterCreate data)
        {
            DateTime cre_time = DateTime.Now;

            // date_travel+time_travel 轉為 DateTime 要大於 48 小時
            if (data.date_travel!.Value.ToDateTime((TimeOnly)data.time_travel!) < DateTime.Now.AddHours(48)) return new ResultObject<string> { success = false, message = "預約時間需大於 48 小時" };

            List<SearchATS_OrderMasterResult> search_results = _ATS_OrderMaster.SearchATS_OrderMaster(
                new SearchATS_OrderMasterParam(),
                ["o_id"], [],
                out _);
            // TODO: 重複條件要問一下
            //if (resultSearchATS_OrderMaster.Exists(x => x.title == data.title)) return new ResultObject<string> { success = false, message = "名稱重複" };

            // TODO: 這裡要還要接收前台給的加購項目 List 新增到 ATS_OrderDetailCreate
            // TODO: 這裡要把車資加上加購項目的價格算出來，放到 price
            // TODO: 然後拿 price 查出 link，放到 link
            decimal price = 0;
            string link = "";

            string id = _ATS_OrderMaster.CreateATS_OrderMaster(
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
                    price: price,
                    link: link));

            return new ResultObject<string> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// 訂單管理修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_OrderMasterUpdate(ATS_OrderMasterUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查自己
            SearchATS_OrderMasterResult? search_own_result = _ATS_OrderMaster.SearchATS_OrderMaster(
                new SearchATS_OrderMasterParam(o_id: data.o_id),
                ["o_id"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無訂單" };

            // TODO: 重複條件要問一下
            ////查要檢查重複的東西
            //List<SearchATS_OrderMasterResult> resultSearchATS_OrderMaster = _ATS_OrderMaster.SearchATS_OrderMaster(
            //    new SearchATS_OrderMasterParam(),
            //    ["o_id", "title"], [],
            //    out _);
            //string? title = data.title == Appsettings.api_string_param_no_pass ? search_own_result.title : data.title;
            ////檢查重複
            //if (resultSearchATS_OrderMaster.Exists(x => x.title == title && data.o_id != x.o_id)) return new ResultObject<string> { success = false, message = "標題重複" };

            // TODO: 這裡要還要接收前台給的加購項目 List 更新 ATS_OrderDetailUpdate
            // TODO: 這裡要把車資加上加購項目的價格算出來，放到 price
            // TODO: 然後拿 price 查出 link，放到 link
            decimal price = 0;
            string link = "";

            using (TransactionScope tx = new())
            {
                _ATS_OrderMaster.UpdateATS_OrderMaster(new UpdateATS_OrderMasterParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
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
                    link: link));

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "修改成功" };
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

            // TODO: 這裡要查出訂單的加購項目 ATS_OrderDetailSearch，然後放到 response

            List<ATS_OrderMasterSearchResponse> response = [];
            foreach (SearchATS_OrderMasterResult result in resultSearchATS_OrderMaster)
            {
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
        [HttpPost]
        public ResultObject<string> ATS_OrderMasterDelete(ATS_OrderMasterDelete data)
        {
            // TODO: 這裡要查出訂單的加購項目 ATS_OrderDetailSearch，然後一起刪除 ATS_OrderDetailDelete
            _ATS_OrderMaster.DeleteATS_OrderMaster(data.o_id);
            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}