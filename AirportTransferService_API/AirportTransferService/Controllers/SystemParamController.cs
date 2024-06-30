using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// SystemParamController
    /// </summary>
    /// <param name="systemParam"></param>
    /// <param name="systemSettings"></param>
    /// <param name="config"></param>
    /// <param name="baseService"></param>
    [Authorization]
    public class SystemParamController(ISystemParam systemParam, ISystemSettings systemSettings, IConfiguration config, IBaseService baseService) : CustomControllerBase(baseService)
    {
        /// <summary>
        /// _config
        /// </summary>
        private readonly IConfiguration _config = config;

        /// <summary>
        /// _systemParam
        /// </summary>
        private readonly ISystemParam _systemParam = systemParam;

        /// <summary>
        /// _systemSettings
        /// </summary>
        private readonly ISystemSettings _systemSettings = systemSettings;

        #region primary
        /// <summary>
        /// 大分類查詢
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<PrimaryListResponse>> PrimaryList([FromBody] SearchSPPParam data)
        {
            List<SearchSPPResult> searchSPPResults = _systemParam.SearchSPP(data);

            List<PrimaryListResponse> response = [];
            foreach (SearchSPPResult obj in searchSPPResults)
            {
                response.Add(new PrimaryListResponse
                {
                    spp_id = obj.spp_id ?? "",
                    su = obj.su ?? "",
                    name = obj.name ?? "",
                    remark = obj.remark ?? ""
                });
            }

            return new ResultObject<List<PrimaryListResponse>> { success = true, data = response };
        }

        /// <summary>
        /// 大分類新增
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject AddPrimary([FromBody] AddPrimary data)
        {
            DateTime cre_time = DateTime.Now;

            //代碼是否重複
            List<SearchSPPResult> SearchSPP_result = _systemParam.SearchSPP(new SearchSPPParam());
            if (SearchSPP_result.Exists(x => (x.spp_id ?? "").Equals(data.spp_id)))
                return new ResultObject { success = false, message = "新增失敗，代碼已建檔" };

            //新增代碼大分類
            _systemParam.CreateSPP(new CreateSPPParam(
                cre_userid: jwtObject.user_id,
                cre_time: cre_time,
                spp_id: data.spp_id,
                su: data.su,
                name: data.name,
                remark: data.remark));

            return new ResultObject { success = true, message = "新增成功" };
        }

        /// <summary>
        /// 大分類細項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<PrimaryListResponse> PrimaryDetail([FromBody] PrimaryDetail data)
        {
            SearchSPPResult? searchSPPResult = _systemParam.SearchSPP(new SearchSPPParam(spp_id: data.spp_id)).FirstOrDefault();

            PrimaryListResponse? response = searchSPPResult == null ? null : new PrimaryListResponse
            {
                spp_id = searchSPPResult.spp_id ?? "",
                su = searchSPPResult.su ?? "",
                name = searchSPPResult.name ?? "",
                remark = searchSPPResult.remark ?? ""
            };

            return new ResultObject<PrimaryListResponse> { success = true, data = response };
        }

        /// <summary>
        /// 大分類修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UpdatePrimary([FromBody] UpdatePrimary data)
        {
            //修改代碼大分類
            _systemParam.UpdateSPP(new UpdateSPPParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: DateTime.Now,
                spp_id: data.spp_id,
                su: data.su,
                name: data.name,
                remark: data.remark));

            return new ResultObject { success = true, message = "修改成功" };
        }
        #endregion

        #region second
        /// <summary>
        /// 中分類查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultObject<List<SecondListResponse>> SecondList([FromBody] PrimaryDetail data)
        {
            List<SearchSPSResult> searchSPSResults = _systemParam.SearchSPS(new SearchSPSParam(spp_id: data.spp_id, visible: data.visible));

            List<SecondListResponse> response = [];
            foreach (SearchSPSResult obj in searchSPSResults)
            {
                response.Add(new SecondListResponse
                {
                    sps_id = obj.sps_id ?? "",
                    spp_id = obj.spp_id ?? "",
                    name = obj.name ?? "",
                    code = obj.code ?? "",
                    remark = obj.remark ?? "",
                    visible = obj.visible ?? "",
                    seq = obj.seq ?? 0
                });
            }

            return new ResultObject<List<SecondListResponse>> { success = true, data = response };
        }

        /// <summary>
        /// 中分類新增
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> AddSecond([FromBody] AddSecond data)
        {
            //代碼是否重複
            List<SearchSPSResult> SearchSPS_result = _systemParam.SearchSPS(new SearchSPSParam(spp_id: data.spp_id));
            if (SearchSPS_result.Exists(x => (x.name ?? "").Equals(data.name)))
                return new ResultObject<string> { success = false, message = "新增失敗，代碼已建檔" };

            //新增代碼中分類
            string sps_id = _systemParam.CreateSPS(new CreateSPSParam(
                cre_userid: jwtObject.user_id,
                cre_time: DateTime.Now,
                spp_id: data.spp_id,
                name: data.name,
                code: data.code,
                remark: data.remark,
                visible: "Y",
                seq: data.seq));

            return new ResultObject<string> { success = true, message = "新增成功", data = sps_id };
        }

        /// <summary>
        /// 中分類細項
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<SecondListResponse> SecondDetail([FromBody] SecondDetail data)
        {
            SearchSPSResult? searchSPSResult = _systemParam.SearchSPS(new SearchSPSParam(spp_id: data.spp_id, sps_id: data.sps_id)).FirstOrDefault();

            SecondListResponse? response = searchSPSResult == null ? null : new SecondListResponse
            {
                sps_id = searchSPSResult.sps_id ?? "",
                spp_id = searchSPSResult.spp_id ?? "",
                name = searchSPSResult.name ?? "",
                code = searchSPSResult.code ?? "",
                remark = searchSPSResult.remark ?? "",
                visible = searchSPSResult.visible ?? "",
                seq = searchSPSResult.seq ?? 0
            };

            return new ResultObject<SecondListResponse> { success = true, data = response };
        }

        /// <summary>
        /// 中分類修改
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UpdateSecond([FromBody] UpdateSecond data)
        {
            //代碼是否重複
            List<SearchSPSResult> SearchSPS_result = _systemParam.SearchSPS(new SearchSPSParam(spp_id: data.spp_id));
            SearchSPSResult SearchSPS_result_origin = SearchSPS_result.Where(x => (x.sps_id ?? "").Equals(data.sps_id)).First();

            if (SearchSPS_result.Exists(x => !data.sps_id.Equals(x.sps_id)
                                        && (data.name ?? SearchSPS_result_origin.name ?? "").Equals(x.name)))
                return new ResultObject { success = false, message = "修改失敗，代碼已建檔" };

            //修改代碼中分類
            _systemParam.UpdateSPS(new UpdateSPSParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: DateTime.Now,
                sps_id: data.sps_id,
                spp_id: data.spp_id,
                name: data.name,
                code: data.code,
                remark: data.remark,
                visible: data.visible,
                seq: data.seq));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 中分類刪除
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject DeleteSecond([FromBody] SecondDetail data)
        {
            //刪除代碼中分類
            _systemParam.DeleteSPS(data.spp_id, data.sps_id);

            return new ResultObject { success = true, message = "刪除成功" };
        }

        /// <summary>
        /// 城市區域選單查詢
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<CityAreaSearchResponse>> CityAreaSearch([FromBody] object data)
        {
            List<CITYAREAZIP> SearchCITYAREAZIP = _systemSettings.SearchCITYAREAZIP();

            List<CityAreaSearchResponse> listCity = [];
            CityAreaSearchResponse city = new();
            List<AreaZip_obj> listArea = [];
            foreach (string SearchCITYAREAZIP_city in SearchCITYAREAZIP.OrderBy(x => x.ZIP).Select(x => x.city).Distinct())
            {
                city = new CityAreaSearchResponse { name = SearchCITYAREAZIP_city };

                foreach (CITYAREAZIP SearchCITYAREAZIP_area in SearchCITYAREAZIP.Where(x => x.city == SearchCITYAREAZIP_city))
                {
                    listArea.Add(new AreaZip_obj
                    {
                        name = SearchCITYAREAZIP_area.area,
                        code = SearchCITYAREAZIP_area.ZIP
                    });
                }
                city.children = new List<AreaZip_obj>(listArea);
                listCity.Add(city);
                listArea.Clear();
            }

            return new ResultObject<List<CityAreaSearchResponse>> { success = true, data = listCity };
        }
        #endregion
    }
}
