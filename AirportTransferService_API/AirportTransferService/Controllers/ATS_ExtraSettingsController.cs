using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 加價設定
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="aTS_ExtraSettings"></param>
    public class ATS_ExtraSettingsController(
        IBaseService baseService,
        IATS_ExtraSettings aTS_ExtraSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_ExtraSettings _ATS_ExtraSettings = aTS_ExtraSettings;

        /// <summary>
        /// 加價設定建立
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_ExtraSettingsCreate(ATS_ExtraSettingsCreate data)
        {
            DateTime cre_time = DateTime.Now;

            List<SearchATS_ExtraSettingsResult> search_results = _ATS_ExtraSettings.SearchATS_ExtraSettings(
                new SearchATS_ExtraSettingsParam(),
                ["name"], [],
                out _);
            if (search_results.Exists(x => x.name == data.name)) return new ResultObject<string> { success = false, message = "名稱重複" };

            string id = _ATS_ExtraSettings.CreateATS_ExtraSettings(
                new CreateATS_ExtraSettingsParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    visible: data.visible,
                    type: data.type,
                    name: data.name,
                    price: data.price));

            return new ResultObject<string> { success = true, message = "新增成功", data = id };
        }

        /// <summary>
        /// 加價設定修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_ExtraSettingsUpdate(ATS_ExtraSettingsUpdate data)
        {
            DateTime upd_time = DateTime.Now;

            //查自己
            SearchATS_ExtraSettingsResult? search_own_result = _ATS_ExtraSettings.SearchATS_ExtraSettings(
                new SearchATS_ExtraSettingsParam(es_id: data.es_id),
                ["es_id"], [],
                out _).FirstOrDefault();
            if (search_own_result == null) return new ResultObject<string> { success = false, message = "修改失敗，查無加價設定" };
            //查要檢查重複的東西
            List<SearchATS_ExtraSettingsResult> search_results = _ATS_ExtraSettings.SearchATS_ExtraSettings(
                new SearchATS_ExtraSettingsParam(),
                ["es_id", "name"], [],
                out _);
            string? name = data.name == Appsettings.api_string_param_no_pass ? search_own_result.name : data.name;
            //檢查重複
            if (search_results.Exists(x => x.name == name && data.es_id != x.es_id)) return new ResultObject<string> { success = false, message = "名稱重複" };

            using (TransactionScope tx = new())
            {
                _ATS_ExtraSettings.UpdateATS_ExtraSettings(new UpdateATS_ExtraSettingsParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: upd_time,
                    es_id: data.es_id,
                    visible: data.visible,
                    type: data.type,
                    name: data.name,
                    price: data.price));

                tx.Complete();
            }

            return new ResultObject<string> { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 加價設定查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<ATS_ExtraSettingsSearchResponse>> ATS_ExtraSettingsSearch(ATS_ExtraSettingsSearch data)
        {
            List<SearchATS_ExtraSettingsResult> search_results = _ATS_ExtraSettings.SearchATS_ExtraSettings(
                new SearchATS_ExtraSettingsParam(
                    es_id: data.es_id,
                    visible: data.visible,
                    type: data.type,
                    name: data.name,
                    price: data.price,
                    page: data.page,
                    num_per_page: data.num_per_page),
                ["es_id", "visible", "type", "name", "price"], [],
                out int page_count);

            List<ATS_ExtraSettingsSearchResponse> response = [];
            foreach (SearchATS_ExtraSettingsResult result in search_results)
            {
                response.Add(new ATS_ExtraSettingsSearchResponse
                {
                    es_id = result.es_id,
                    visible = result.visible,
                    type = result.type,
                    name = result.name,
                    price = result.price
                });
            }

            return new ResultObject<List<ATS_ExtraSettingsSearchResponse>> { success = true, data = response, page = page_count };
        }

        /// <summary>
        /// 加價設定刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> ATS_ExtraSettingsDelete(ATS_ExtraSettingsDelete data)
        {
            _ATS_ExtraSettings.DeleteATS_ExtraSettings(data.es_id);
            return new ResultObject<string> { success = true, message = "刪除成功" };
        }
    }
}
