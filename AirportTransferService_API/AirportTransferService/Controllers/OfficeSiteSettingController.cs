using Microsoft.AspNetCore.Mvc;
using System.Transactions;

namespace AirportTransferService.Controllers
{
    [Authorization]
    public class OfficeSiteSettingController(/*ICommodity commodity, */IOfficeSiteSetting officeSiteSetting, IFiles files, IBaseService baseService) : CustomControllerBase(baseService)
    {
        //private readonly ICommodity _commodity = commodity;
        private readonly IOfficeSiteSetting _officeSiteSetting = officeSiteSetting;
        private readonly IFiles _files = files;

        /// <summary>
        /// 查詢所有網站設定
        /// </summary>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<OSS_AllSettingSearchResponse> OSS_AllSettingSearch()
        {
            //查網站基本設定
            SearchOSS_WebsiteSettingResult? searchOSS_WebsiteSettingResult = _officeSiteSetting.SearchOSS_WebsiteSetting(
                new SearchOSS_WebsiteSettingParam(),
                ["id", "website_name", "bussiness_hour", "phone", "address", "email", "can_website_cancel_order", "buy_limit", "bonus_expired_month", "order_bonus_limit_rate", "bonus_isopen", "shopping_voucher_isopen", "invoice_isopen", "days_after_pay_get_bonus", "days_after_ship_get_bonus", "google_login_isopen", "line_login_isopen"],
                out int _).FirstOrDefault();
            if (searchOSS_WebsiteSettingResult == null) return new ResultObject<OSS_AllSettingSearchResponse> { success = false, message = "查無資料" };

            OSS_WebsiteSettingSearchResponse website_setting = new()
            {
                website_name = searchOSS_WebsiteSettingResult.website_name,
                bussiness_hour = searchOSS_WebsiteSettingResult.bussiness_hour,
                phone = searchOSS_WebsiteSettingResult.phone,
                address = searchOSS_WebsiteSettingResult.address,
                email = searchOSS_WebsiteSettingResult.email,
                can_website_cancel_order = searchOSS_WebsiteSettingResult.can_website_cancel_order,
                buy_limit = searchOSS_WebsiteSettingResult.buy_limit,
                bonus_expired_month = searchOSS_WebsiteSettingResult.bonus_expired_month,
                order_bonus_limit_rate = searchOSS_WebsiteSettingResult.order_bonus_limit_rate,
                bonus_isopen = searchOSS_WebsiteSettingResult.bonus_isopen,
                shopping_voucher_isopen = searchOSS_WebsiteSettingResult.shopping_voucher_isopen,
                invoice_isopen = searchOSS_WebsiteSettingResult.invoice_isopen,
                days_after_pay_get_bonus = searchOSS_WebsiteSettingResult.days_after_pay_get_bonus,
                days_after_ship_get_bonus = searchOSS_WebsiteSettingResult.days_after_ship_get_bonus,
                google_login_isopen = searchOSS_WebsiteSettingResult.google_login_isopen,
                line_login_isopen = searchOSS_WebsiteSettingResult.line_login_isopen
            };

            //查社群連結設定
            SearchOSS_SocialLinkSettingParam searchOSS_SocialLinkSettingParam = new(visible: jwtObject.is_front ? "Y" : null);
            List<SearchOSS_SocialLinkSettingResult> searchOSS_SocialLinkSettingResults = _officeSiteSetting.SearchOSS_SocialLinkSetting(
                searchOSS_SocialLinkSettingParam,
                ["id", "name", "icon", "url", "seq", "visible"],
                out int _);
            List<OSS_SocialLinkSettingSearchResponse> social_link_settings = [];
            foreach (SearchOSS_SocialLinkSettingResult searchOSS_SocialLinkSettingResult in searchOSS_SocialLinkSettingResults)
            {
                social_link_settings.Add(new OSS_SocialLinkSettingSearchResponse
                {
                    id = searchOSS_SocialLinkSettingResult.id,
                    name = searchOSS_SocialLinkSettingResult.name,
                    icon = searchOSS_SocialLinkSettingResult.icon,
                    url = searchOSS_SocialLinkSettingResult.url,
                    visible = searchOSS_SocialLinkSettingResult.visible,
                    seq = searchOSS_SocialLinkSettingResult.seq
                });
            }

            //查問與答設定
            SearchOSS_QASettingParam searchOSS_QASettingParam = new(visible: jwtObject.is_front ? "Y" : null);
            List<SearchOSS_QASettingResult> searchOSS_QASettingResult = _officeSiteSetting.SearchOSS_QASetting(
                searchOSS_QASettingParam,
                ["id", "question", "answer", "seq", "visible"],
                out int _);
            List<OSS_QASettingSearchResponse> qa_settings = [];
            foreach (SearchOSS_QASettingResult searchOSS_QASetting in searchOSS_QASettingResult)
            {
                qa_settings.Add(new OSS_QASettingSearchResponse
                {
                    id = searchOSS_QASetting.id,
                    question = searchOSS_QASetting.question,
                    answer = searchOSS_QASetting.answer,
                    seq = searchOSS_QASetting.seq,
                    visible = searchOSS_QASetting.visible
                });
            }

            //查條款設定
            SearchOSS_TermSettingResult? searchOSS_TermSettingResult = _officeSiteSetting.SearchOSS_TermSetting(
                new SearchOSS_TermSettingParam(),
                ["id", "privacy_policy", "service_policy", "purchase_notice"],
                out int _).FirstOrDefault();
            if (searchOSS_TermSettingResult == null) return new ResultObject<OSS_AllSettingSearchResponse> { success = false, message = "查無資料" };

            OSS_TermSettingSearchResponse term_setting = new()
            {
                privacy_policy = searchOSS_TermSettingResult.privacy_policy,
                service_policy = searchOSS_TermSettingResult.service_policy,
                purchase_notice = searchOSS_TermSettingResult.purchase_notice
            };

            //查自訂頁面設定
            SearchOSS_CustomPageSettingParam searchOSS_CustomPageSettingParam = new(visible: jwtObject.is_front ? "Y" : null);
            List<SearchOSS_CustomPageSettingResult> searchOSS_CustomPageSettingResults = _officeSiteSetting.SearchOSS_CustomPageSetting(
                searchOSS_CustomPageSettingParam,
                ["id", "name", "content", "visible", "seq"],
                out int _);
            //查所有網站設定相關的圖片
            SearchFilesParam searchFilesParam = new(belongs: ["OfficeSiteSetting"]);
            List<SearchFilesResult> searchFilesResults = _files.SearchFiles(
                searchFilesParam,
                ["file_id", "type", "belong", "path", "id", "seq", "url", "custom_key1", "custom_key2"],
                out int _);

            List<OSS_CustomPageSettingSearchResponse> custom_page_settings = [];
            foreach (SearchOSS_CustomPageSettingResult searchOSS_CustomPageSettingResult in searchOSS_CustomPageSettingResults)
            {
                custom_page_settings.Add(new OSS_CustomPageSettingSearchResponse
                {
                    id = searchOSS_CustomPageSettingResult.id,
                    name = searchOSS_CustomPageSettingResult.name,
                    content = searchOSS_CustomPageSettingResult.content,
                    visible = searchOSS_CustomPageSettingResult.visible,
                    seq = searchOSS_CustomPageSettingResult.seq,
                    file_id = searchFilesResults.FirstOrDefault(x => x.id == searchOSS_CustomPageSettingResult.id.ToString())?.file_id,
                    file_path = searchFilesResults.FirstOrDefault(x => x.id == searchOSS_CustomPageSettingResult.id.ToString())?.path,
                    file_url = searchFilesResults.FirstOrDefault(x => x.id == searchOSS_CustomPageSettingResult.id.ToString())?.url
                });
            }

            //其他網站設定圖片們
            List<SearchFileResponse> searchFileResponses = [];
            //List<SearchCommodityLabelResult> searchCommodityLabelResults = [];
            //type是Label的裝上商品分類名稱
            //if (searchFilesResults.Any(x => x.type == "Label" && x.belong == "OfficeSiteSetting"))
            //{
            //    SearchCommodityLabelParam searchCommodityLabelParam = new(cl_ids: searchFilesResults.Where(x => x.type == "Label" && x.belong == "OfficeSiteSetting").Select(x => x.id ?? "").ToList());
            //    searchCommodityLabelResults = _commodity.SearchCommodityLabel(
            //        searchCommodityLabelParam,
            //        ["cl_id", "content"],
            //        out _);
            //}
            foreach (SearchFilesResult searchFilesResult in searchFilesResults)
            {
                searchFileResponses.Add(new SearchFileResponse
                {
                    file_id = searchFilesResult.file_id,
                    type = searchFilesResult.type,
                    path = searchFilesResult.path,
                    id = searchFilesResult.id,
                    seq = searchFilesResult.seq,
                    url = searchFilesResult.url,
                    custom_name1 = "",//searchCommodityLabelResults.FirstOrDefault(x => x.cl_id == searchFilesResult.id)?.content ?? "",
                    custom_key1 = searchFilesResult.custom_key1,
                    custom_key2 = searchFilesResult.custom_key2
                });
            }

            OSS_AllSettingSearchResponse response = new()
            {
                website_setting = website_setting,
                social_link_settings = social_link_settings,
                qa_settings = qa_settings,
                term_setting = term_setting,
                custom_page_settings = custom_page_settings,
                files = searchFileResponses
            };

            return new ResultObject<OSS_AllSettingSearchResponse> { success = true, data = response };
        }

        #region OSS_WebsiteSetting
        /// <summary>
        /// 網站基本設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject OSS_WebsiteSettingUpdate(OSS_WebsiteSettingUpdate data)
        {
            if (jwtObject.is_front) return new ResultObject { success = false, message = "illegalcallError" };

            DateTime upd_time = DateTime.Now;

            //查流水號
            SearchOSS_WebsiteSettingResult? searchOSS_WebsiteSettingResult = _officeSiteSetting.SearchOSS_WebsiteSetting(
                new SearchOSS_WebsiteSettingParam(),
                ["id"],
                out int _).FirstOrDefault();
            if (searchOSS_WebsiteSettingResult == null || !searchOSS_WebsiteSettingResult.id.HasValue) return new ResultObject { success = false, message = "查無資料" };

            //網站基本設定修改
            UpdateOSS_WebsiteSettingParam updateOSS_WebsiteSettingParam = new(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_time: upd_time,
                upd_userid: jwtObject.user_id,
                id: searchOSS_WebsiteSettingResult.id.Value,
                website_name: data.website_name,
                bussiness_hour: data.bussiness_hour,
                phone: data.phone,
                address: data.address,
                email: data.email,
                can_website_cancel_order: data.can_website_cancel_order,
                buy_limit: data.buy_limit,
                bonus_expired_month: data.bonus_expired_month,
                order_bonus_limit_rate: data.order_bonus_limit_rate,
                bonus_isopen: data.bonus_isopen,
                shopping_voucher_isopen: data.shopping_voucher_isopen,
                invoice_isopen: data.invoice_isopen,
                days_after_pay_get_bonus: data.days_after_pay_get_bonus,
                days_after_ship_get_bonus: data.days_after_ship_get_bonus,
                google_login_isopen: data.google_login_isopen,
                line_login_isopen: data.line_login_isopen
                );
            _officeSiteSetting.UpdateOSS_WebsiteSetting(updateOSS_WebsiteSettingParam);

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 網站基本設定查詢
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<OSS_WebsiteSettingSearchResponse> OSS_WebsiteSettingSearch()
        {
            SearchOSS_WebsiteSettingResult? searchOSS_WebsiteSettingResult = _officeSiteSetting.SearchOSS_WebsiteSetting(
                new SearchOSS_WebsiteSettingParam(),
                ["id", "website_name", "bussiness_hour", "phone", "address", "email", "can_website_cancel_order", "buy_limit", "bonus_expired_month", "order_bonus_limit_rate", "bonus_isopen", "shopping_voucher_isopen", "invoice_isopen", "days_after_pay_get_bonus", "days_after_ship_get_bonus", "google_login_isopen", "line_login_isopen"],
                out int _).FirstOrDefault();
            if (searchOSS_WebsiteSettingResult == null) return new ResultObject<OSS_WebsiteSettingSearchResponse> { success = false, message = "查無資料" };

            OSS_WebsiteSettingSearchResponse response = new()
            {
                website_name = searchOSS_WebsiteSettingResult.website_name,
                bussiness_hour = searchOSS_WebsiteSettingResult.bussiness_hour,
                phone = searchOSS_WebsiteSettingResult.phone,
                address = searchOSS_WebsiteSettingResult.address,
                email = searchOSS_WebsiteSettingResult.email,
                can_website_cancel_order = searchOSS_WebsiteSettingResult.can_website_cancel_order,
                buy_limit = searchOSS_WebsiteSettingResult.buy_limit,
                bonus_expired_month = searchOSS_WebsiteSettingResult.bonus_expired_month,
                order_bonus_limit_rate = searchOSS_WebsiteSettingResult.order_bonus_limit_rate,
                bonus_isopen = searchOSS_WebsiteSettingResult.bonus_isopen,
                shopping_voucher_isopen = searchOSS_WebsiteSettingResult.shopping_voucher_isopen,
                invoice_isopen = searchOSS_WebsiteSettingResult.invoice_isopen,
                days_after_pay_get_bonus = searchOSS_WebsiteSettingResult.days_after_pay_get_bonus,
                days_after_ship_get_bonus = searchOSS_WebsiteSettingResult.days_after_ship_get_bonus,
                google_login_isopen = searchOSS_WebsiteSettingResult.google_login_isopen,
                line_login_isopen = searchOSS_WebsiteSettingResult.line_login_isopen
            };

            return new ResultObject<OSS_WebsiteSettingSearchResponse> { success = true, data = response };
        }
        #endregion

        #region OSS_SocialLinkSetting
        /// <summary>
        /// 社群連結設定新建
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<int> OSS_SocialLinkSettingCreate(OSS_SocialLinkSettingCreate data)
        {
            if (jwtObject.is_front) return new ResultObject<int> { success = false, message = "illegalcallError" };

            DateTime cre_time = DateTime.Now;

            //社群連結設定新建
            int id = _officeSiteSetting.CreateOSS_SocialLinkSetting(new CreateOSS_SocialLinkSettingParam(
                cre_time: cre_time,
                cre_userid: jwtObject.user_id,
                name: data.name,
                icon: data.icon,
                url: data.url,
                seq: data.seq,
                visible: "Y"));

            return new ResultObject<int> { success = true, message = "新建成功", data = id };
        }

        /// <summary>
        /// 社群連結設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject OSS_SocialLinkSettingUpdate(OSS_SocialLinkSettingUpdate data)
        {
            if (jwtObject.is_front) return new ResultObject { success = false, message = "illegalcallError" };

            DateTime upd_time = DateTime.Now;

            //社群連結設定新建
            _officeSiteSetting.UpdateOSS_SocialLinkSetting(new UpdateOSS_SocialLinkSettingParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_time: upd_time,
                upd_userid: jwtObject.user_id,
                id: data.id,
                name: data.name,
                icon: data.icon,
                url: data.url,
                seq: data.seq,
                visible: data.visible));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 社群連結設定查詢
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<List<OSS_SocialLinkSettingSearchResponse>> OSS_SocialLinkSettingSearch()
        {
            List<SearchOSS_SocialLinkSettingResult> searchOSS_SocialLinkSettingResult = _officeSiteSetting.SearchOSS_SocialLinkSetting(
                new SearchOSS_SocialLinkSettingParam(),
                ["id", "name", "icon", "url", "seq", "visible"],
                out int _);
            List<OSS_SocialLinkSettingSearchResponse> response = searchOSS_SocialLinkSettingResult.Select(x => new OSS_SocialLinkSettingSearchResponse
            {
                id = x.id,
                name = x.name,
                icon = x.icon,
                url = x.url,
                seq = x.seq,
                visible = x.visible
            }).ToList();

            return new ResultObject<List<OSS_SocialLinkSettingSearchResponse>> { success = true, data = response };
        }

        /// <summary>
        /// 社群連結設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject OSS_SocialLinkSettingDelete(OSS_SocialLinkSettingDelete data)
        {
            if (jwtObject.is_front) return new ResultObject { success = false, message = "illegalcallError" };

            _officeSiteSetting.DeleteOSS_SocialLinkSetting(data.id);

            return new ResultObject { success = true, message = "刪除成功" };
        }
        #endregion

        #region OSS_QASetting
        /// <summary>
        /// 問與答設定新建
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<int> OSS_QASettingCreate(OSS_QASettingCreate data)
        {
            if (jwtObject.is_front) return new ResultObject<int> { success = false, message = "illegalcallError" };

            DateTime cre_time = DateTime.Now;

            int id = _officeSiteSetting.CreateOSS_QASetting(new CreateOSS_QASettingParam(
               cre_time: cre_time,
               cre_userid: jwtObject.user_id,
               question: data.question,
               answer: data.answer,
               seq: data.seq,
               visible: "Y"));

            return new ResultObject<int> { success = true, message = "新建成功", data = id };
        }

        /// <summary>
        /// 問與答設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject OSS_QASettingUpdate(OSS_QASettingUpdate data)
        {
            if (jwtObject.is_front) return new ResultObject { success = false, message = "illegalcallError" };

            DateTime upd_time = DateTime.Now;

            _officeSiteSetting.UpdateOSS_QASetting(new UpdateOSS_QASettingParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_time: upd_time,
                upd_userid: jwtObject.user_id,
                id: data.id,
                question: data.question,
                answer: data.answer,
                seq: data.seq,
                visible: data.visible));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 問與答設定查詢
        /// </summary>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<List<OSS_QASettingSearchResponse>> OSS_QASettingSearch()
        {
            List<SearchOSS_QASettingResult> searchOSS_QASettingResult = _officeSiteSetting.SearchOSS_QASetting(
                new SearchOSS_QASettingParam(),
                ["id", "question", "answer", "seq", "visible"],
                out int _);
            List<OSS_QASettingSearchResponse> response = searchOSS_QASettingResult.Select(x => new OSS_QASettingSearchResponse
            {
                id = x.id,
                question = x.question,
                answer = x.answer,
                seq = x.seq,
                visible = x.visible
            }).ToList();

            return new ResultObject<List<OSS_QASettingSearchResponse>> { success = true, data = response };
        }

        /// <summary>
        /// 問與答設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject OSS_QASettingDelete(OSS_QASettingDelete data)
        {
            if (jwtObject.is_front) return new ResultObject { success = false, message = "illegalcallError" };

            _officeSiteSetting.DeleteOSS_QASetting(data.id);

            return new ResultObject { success = true, message = "刪除成功" };
        }
        #endregion

        #region OSS_TermSetting
        /// <summary>
        /// 條款設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject OSS_TermSettingUpdate(OSS_TermSettingUpdate data)
        {
            if (jwtObject.is_front) return new ResultObject { success = false, message = "illegalcallError" };

            DateTime upd_time = DateTime.Now;

            //查條款設定
            SearchOSS_TermSettingResult? searchOSS_TermSettingResult = _officeSiteSetting.SearchOSS_TermSetting(
                new SearchOSS_TermSettingParam(),
                ["id"],
                out int _).FirstOrDefault();
            if (searchOSS_TermSettingResult == null || !searchOSS_TermSettingResult.id.HasValue) return new ResultObject { success = false, message = "查無資料" };

            _officeSiteSetting.UpdateOSS_TermSetting(new UpdateOSS_TermSettingParam(
               cre_time: Appsettings.api_datetime_param_no_pass,
               upd_time: upd_time,
               upd_userid: jwtObject.user_id,
               id: searchOSS_TermSettingResult.id.Value,
               privacy_policy: data.privacy_policy,
               service_policy: data.service_policy,
               purchase_notice: data.purchase_notice));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 條款設定查詢
        /// </summary>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<OSS_TermSettingSearchResponse> OSS_TermSettingSearch()
        {
            SearchOSS_TermSettingResult? searchOSS_TermSettingResult = _officeSiteSetting.SearchOSS_TermSetting(
                new SearchOSS_TermSettingParam(),
                ["id", "privacy_policy", "service_policy", "purchase_notice"],
                out int _).FirstOrDefault();
            if (searchOSS_TermSettingResult == null) return new ResultObject<OSS_TermSettingSearchResponse> { success = false, message = "查無資料" };

            OSS_TermSettingSearchResponse response = new()
            {
                privacy_policy = searchOSS_TermSettingResult.privacy_policy,
                service_policy = searchOSS_TermSettingResult.service_policy,
                purchase_notice = searchOSS_TermSettingResult.purchase_notice
            };

            return new ResultObject<OSS_TermSettingSearchResponse> { success = true, data = response };
        }
        #endregion

        #region OSS_CustomPageSetting
        /// <summary>
        /// 自訂頁面設定新建
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<int> OSS_CustomPageSettingCreate(OSS_CustomPageSettingCreate data)
        {
            if (jwtObject.is_front) return new ResultObject<int> { success = false, message = "illegalcallError" };

            DateTime cre_time = DateTime.Now;

            int id = _officeSiteSetting.CreateOSS_CustomPageSetting(new CreateOSS_CustomPageSettingParam(
               cre_time: cre_time,
               cre_userid: jwtObject.user_id,
               name: data.name,
               content: data.content,
               visible: "N",
               seq: data.seq));

            return new ResultObject<int> { success = true, message = "新建成功", data = id };
        }

        /// <summary>
        /// 自訂頁面設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject OSS_CustomPageSettingUpdate(OSS_CustomPageSettingUpdate data)
        {
            if (jwtObject.is_front) return new ResultObject { success = false, message = "illegalcallError" };

            DateTime upd_time = DateTime.Now;

            //TODO : 目前?最多只能開放兩個自訂頁面
            if (data.visible == "Y")
            {
                List<SearchOSS_CustomPageSettingResult> searchOSS_CustomPageSettingResult = _officeSiteSetting.SearchOSS_CustomPageSetting(
                    new SearchOSS_CustomPageSettingParam(),
                    ["id", "visible"],
                    out int _);
                if (searchOSS_CustomPageSettingResult.Count(x => x.id != data.id && x.visible == "Y") >= 2) return new ResultObject { success = false, message = "最多只能開放兩個自訂頁面" };
            }

            _officeSiteSetting.UpdateOSS_CustomPageSetting(new UpdateOSS_CustomPageSettingParam(
                 cre_time: Appsettings.api_datetime_param_no_pass,
                 upd_time: upd_time,
                 upd_userid: jwtObject.user_id,
                 id: data.id,
                 name: data.name,
                 content: data.content,
                 visible: data.visible,
                 seq: data.seq));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 自訂頁面設定查詢
        /// </summary>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<List<OSS_CustomPageSettingSearchResponse>> OSS_CustomPageSettingSearch()
        {
            //前台只能查到開放的自訂頁面
            List<SearchOSS_CustomPageSettingResult> searchOSS_CustomPageSettingResult = _officeSiteSetting.SearchOSS_CustomPageSetting(
                new SearchOSS_CustomPageSettingParam(visible: jwtObject.is_front ? "Y" : null),
                ["id", "name", "content", "visible", "seq"],
                out int _);

            //查自訂頁面的圖片
            List<SearchFilesResult> searchFilesResults = _files.SearchFiles(
                new SearchFilesParam(
                    ids: searchOSS_CustomPageSettingResult.Count == 0 ? ["NO RESULT"] : searchOSS_CustomPageSettingResult.Select(x => x.id.ToString() ?? "").ToList(),
                    belongs: ["OfficeSiteSetting"],
                    types: ["CustomPage"]),
                ["file_id", "path", "id"],
                out int _);

            List<OSS_CustomPageSettingSearchResponse> response = searchOSS_CustomPageSettingResult.Select(x => new OSS_CustomPageSettingSearchResponse
            {
                id = x.id,
                name = x.name,
                content = x.content,
                visible = x.visible,
                seq = x.seq,
                file_id = searchFilesResults.FirstOrDefault(y => y.id == x.id.ToString())?.file_id,
                file_path = searchFilesResults.FirstOrDefault(y => y.id == x.id.ToString())?.path,
                file_url = searchFilesResults.FirstOrDefault(y => y.id == x.id.ToString())?.url
            }).ToList();

            return new ResultObject<List<OSS_CustomPageSettingSearchResponse>> { success = true, data = response };
        }

        /// <summary>
        /// 自訂頁面設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject OSS_CustomPageSettingDelete(OSS_CustomPageSettingDelete data)
        {
            if (jwtObject.is_front) return new ResultObject { success = false, message = "illegalcallError" };

            using (TransactionScope tx = new())
            {
                //刪除自訂頁面設定
                _officeSiteSetting.DeleteOSS_CustomPageSetting(data.id);

                //刪除自訂頁面設定的圖片
                List<SearchFilesResult> searchFilesResults = _files.SearchFiles(
                    new SearchFilesParam(
                        ids: [data.id.ToString()],
                        belongs: ["OfficeSiteSetting"],
                        types: ["CustomPage"]),
                    ["file_id", "path"],
                    out int _);

                foreach (SearchFilesResult searchFilesResult in searchFilesResults)
                {
                    //刪資料庫
                    _files.DeleteFiles(searchFilesResult.file_id ?? 0);
                    //刪檔案
                    string file_path = Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2) + searchFilesResult.path;
                    if (System.IO.File.Exists(file_path))
                    {
                        System.IO.File.Delete(file_path);
                    }
                }

                tx.Complete();
            }
            return new ResultObject { success = true, message = "刪除成功" };
        }
        #endregion
    }
}