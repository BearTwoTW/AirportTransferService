using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 訂單管理
    /// </summary>
    /// <param name="ats_ordermaster"></param>
    /// <param name="baseService"></param>
    public class ATS_OrderMasterController(IATS_OrderMaster ats_ordermaster, IBaseService baseService) : CustomControllerBase(baseService)
    {
        private readonly IATS_OrderMaster _ATS_OrderMaster = ats_ordermaster;

        /// <summary>
        /// 訂單管理建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_OrderMasterCreate(ATS_OrderMasterCreate data)
        {
            DateTime cre_time = DateTime.Now;

            List<SearchATS_OrderMasterResult> search_results = _ATS_OrderMaster.SearchATS_OrderMaster(
                new SearchATS_OrderMasterParam(),
                ["title"], [],
                out _);
            // TODO: 重複條件要問一下
            //if (search_results.Exists(x => x.title == data.title)) return new ResultObject<string> { success = false, message = "名稱重複" };

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
                    price: data.price,
                    link: data.link));

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
            //List<SearchATS_OrderMasterResult> search_results = _ATS_OrderMaster.SearchATS_OrderMaster(
            //    new SearchATS_OrderMasterParam(),
            //    ["o_id", "title"], [],
            //    out _);
            //string? title = data.title == Appsettings.api_string_param_no_pass ? search_own_result.title : data.title;
            ////檢查重複
            //if (search_results.Exists(x => x.title == title && data.o_id != x.o_id)) return new ResultObject<string> { success = false, message = "標題重複" };

            using (TransactionScope tx = new())
            {
                _ATS_OrderMaster.UpdateATS_OrderMaster(new UpdateATS_OrderMasterParam(
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
                    price: data.price,
                    link: data.link));

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
        public ResultObject<List<ATS_OrderMasterSearchResponse>> ATS_OrderMasterSearch(ATS_OrderMasterSearch data)
        {
            List<SearchATS_OrderMasterResult> search_results = _ATS_OrderMaster.SearchATS_OrderMaster(
                new SearchATS_OrderMasterParam(
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
                    price: data.price,
                    link: data.link,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["o_id", "visible", "type", "city", "area", "road", "section", "address", "airport", "terminal", "flght_number", "date_travel", "time_travel", "number_passenger", "number_bags", "cms_id", "signboard_title", "signboard_content", "name_purchaser", "phone_purchaser", "email_purchaser", "name_passenger", "phone_passenger", "email_passenger", "price", "link"], [],
                out int page_count);

            List<ATS_OrderMasterSearchResponse> response = [];
            foreach (SearchATS_OrderMasterResult result in search_results)
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

            return new ResultObject<List<ATS_OrderMasterSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 訂單管理刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_OrderMasterDelete(ATS_OrderMasterDelete data)
        {
            _ATS_OrderMaster.DeleteATS_OrderMaster(data.o_id);
            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}
