using Microsoft.AspNetCore.Mvc;
using ExcelDataReader;

namespace AirportTransferService.Controllers
{
    /// <summary>
    /// 資料匯入
    /// </summary>
    /// <param name="baseService"></param>
    /// <param name="aTS_AirportTerminalSettings"></param>
    /// <param name="aTS_CarModelSettings"></param>
    /// <param name="aTS_CityAreaSettings"></param>
    /// <param name="aTS_FareSettings"></param>
    /// <param name="aTS_PriceLinkSettings"></param>
    [ApiController]
    public class ImportDataController(
        IBaseService baseService,
        IATS_AirportTerminalSettings aTS_AirportTerminalSettings,
        IATS_CarModelSettings aTS_CarModelSettings,
        IATS_CityAreaSettings aTS_CityAreaSettings,
        IATS_FareSettings aTS_FareSettings,
        IATS_PriceLinkSettings aTS_PriceLinkSettings) : CustomControllerBase(baseService)
    {
        private readonly IATS_AirportTerminalSettings _ATS_AirportTerminalSettings = aTS_AirportTerminalSettings;
        private readonly IATS_CarModelSettings _ATS_CarModelSettings = aTS_CarModelSettings;
        private readonly IATS_CityAreaSettings _ATS_CityAreaSettings = aTS_CityAreaSettings;
        private readonly IATS_FareSettings _ATS_FareSettings = aTS_FareSettings;
        private readonly IATS_PriceLinkSettings _ATS_PriceLinkSettings = aTS_PriceLinkSettings;

        /// <summary>
        /// 匯入車資
        /// </summary>
        /// <returns></returns>
#if DEBUG
        [AllowAnonymous]
#endif
        [HttpPost]
        public ResultObject ImportFare()
        {
            IFormFileCollection? files = Request.Form.Files.Count > 0 ? Request.Form.Files : null;
            if (files == null || files.Count == 0) return new ResultObject() { success = false, message = "無法讀取檔案：The files is null or files count == 0." };
            else if (files != null && files.Count > 0)
            {
                IFormFile Inputfile = files[0];
                Stream FileStream = Inputfile.OpenReadStream();

                if (Inputfile == null || FileStream == null) return new ResultObject() { success = false, message = "無法讀取檔檔案：The Inputfile or FileStream is null." };
                else if (Inputfile != null && FileStream != null)
                {
                    IExcelDataReader reader;
                    if (Inputfile.FileName.EndsWith(".xls"))
                        reader = ExcelReaderFactory.CreateBinaryReader(FileStream);
                    else if (Inputfile.FileName.EndsWith(".xlsx"))
                        reader = ExcelReaderFactory.CreateOpenXmlReader(FileStream);
                    else
                        return new ResultObject { success = false, message = "無法讀取檔檔案：The file format is not supported." };

                    DataSet dsexcelRecords = reader.AsDataSet(new ExcelDataSetConfiguration()
                    {
                        ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                        {
                            UseHeaderRow = true
                        }
                    });
                    reader.Close();

                    if (dsexcelRecords == null || dsexcelRecords.Tables.Count == 0) return new ResultObject { success = false, message = "無法讀取檔檔案：工作表數量不足" };
                    else if (dsexcelRecords != null && dsexcelRecords.Tables.Count > 0)
                    {
                        DataTable dtFare = dsexcelRecords.Tables[0];
                        List<string> column = ["縣市", "行政區", "路", "段"];

                        // 欄位檢查
                        foreach (string item in column)
                        {
                            if (!dtFare.Columns.Contains(item)) return new ResultObject { success = false, message = String.Format("欄位必須包含{0}", item) };
                        }
                        List<SearchATS_CarModelSettingsResult> resultSearchATS_CarModelSettings = _ATS_CarModelSettings.SearchATS_CarModelSettings(
                            new SearchATS_CarModelSettingsParam(
                                visible: "Y",
                                page: 0,
                                num_per_page: 0),
                            ["cms_id", "name"], [],
                            out int page_count);
                        foreach (SearchATS_CarModelSettingsResult item in resultSearchATS_CarModelSettings)
                        {
                            if (!dtFare.Columns.Contains(item.name!)) return new ResultObject { success = false, message = String.Format("欄位必須包含{0}", item.name) };
                        }

                        // 檢查資料型態
                        if (dtFare.AsEnumerable().ToList().Exists(x => string.IsNullOrWhiteSpace(x["縣市"].ToString()))) return new ResultObject { success = false, message = String.Format("{0}不得為空白", "縣市") };
                        if (dtFare.AsEnumerable().ToList().Exists(x => string.IsNullOrWhiteSpace(x["行政區"].ToString()))) return new ResultObject { success = false, message = String.Format("{0}不得為空白", "行政區") };
                        foreach (SearchATS_CarModelSettingsResult item in resultSearchATS_CarModelSettings)
                        {
                            if (dtFare.AsEnumerable().ToList().Exists(x => !decimal.TryParse(x[item.name!].ToString(), out _))) return new ResultObject { success = false, message = String.Format("{0}必須為數字", item.name) };
                        }

                        // 塞資料
                        ATS_CityAreaSettingsController aTS_CityAreaSettingsController = new(_baseService, _ATS_CityAreaSettings, _ATS_AirportTerminalSettings, _ATS_CarModelSettings, _ATS_FareSettings) { ControllerContext = ControllerContext };
                        foreach (DataRow row in dtFare.Rows)
                        {
                            using (TransactionScope tx = new())
                            {
                                string city = (dtFare.Columns.Contains("縣市") && !DBNull.Value.Equals(dtFare.Columns.Contains("縣市"))) ? row["縣市"].ToString() ?? "" : "";
                                string area = (dtFare.Columns.Contains("行政區") && !DBNull.Value.Equals(dtFare.Columns.Contains("行政區"))) ? row["行政區"].ToString() ?? "" : "";
                                string road = (dtFare.Columns.Contains("路") && !DBNull.Value.Equals(dtFare.Columns.Contains("路"))) ? row["路"].ToString() ?? "" : "";
                                string section = (dtFare.Columns.Contains("段") && !DBNull.Value.Equals(dtFare.Columns.Contains("段"))) ? row["段"].ToString() ?? "" : "";
                                // 新增行政區域
                                // 這裡會呼叫 Controller 的方法，是因為 Controller 會建立車資設定
                                ResultObject<string> resultATS_CityAreaSettingsCreate = aTS_CityAreaSettingsController.ATS_CityAreaSettingsCreate(
                                    new ATS_CityAreaSettingsCreate
                                    {
                                        visible = "Y",
                                        zip = "",
                                        city = city,
                                        area = area,
                                        road = road,
                                        section = section,
                                    });

                                // 匯入的欄位取得 cms_id 與價錢
                                List<(string cmd_id, decimal price)> listCarModelFare = [];
                                foreach (SearchATS_CarModelSettingsResult item in resultSearchATS_CarModelSettings)
                                {
                                    if (dtFare.Columns.Contains(item.name!) && !DBNull.Value.Equals(dtFare.Columns.Contains(item.name!)))
                                        listCarModelFare.Add((item.cms_id!, Convert.ToDecimal(row[item.name!])));
                                }
                                // 先查出符合的車資設定
                                List<SearchATS_FareSettingsResult> resultSearchATS_FareSettings = _ATS_FareSettings.SearchATS_FareSettings(
                                    new SearchATS_FareSettingsParam(
                                        city: city,
                                        area: area,
                                        road: road,
                                        section: section,
                                        page: 0,
                                        num_per_page: 0),
                                    ["fs_id", "cms_id", "city", "area", "road", "section"], [],
                                    out int _);
                                // 如果有符合的車資設定，則更新價錢
                                resultSearchATS_FareSettings.ForEach(x =>
                                {
                                    // 車資設定的 cms_id 如果在 listCarModelFare 中，則更新價錢
                                    if (listCarModelFare.Exists(y => y.cmd_id == x.cms_id))
                                    {
                                        _ATS_FareSettings.UpdateATS_FareSettings(
                                            new UpdateATS_FareSettingsParam(
                                                cre_time: Appsettings.api_datetime_param_no_pass,
                                                upd_userid: jwtObject.user_id,
                                                upd_time: DateTime.Now,
                                                fs_id: x.fs_id,
                                                price: listCarModelFare.Find(y => y.cmd_id == x.cms_id).price));
                                    }
                                });

                                tx.Complete();
                            }
                        }
                    }
                }
            }
            return new ResultObject() { success = true, message = "匯入成功" };
        }

        /// <summary>
        /// 匯入價錢連結
        /// </summary>
        /// <returns></returns>
#if DEBUG
        [AllowAnonymous]
#endif
        [HttpPost]
        public ResultObject ImportPriceLink()
        {
            IFormFileCollection? files = Request.Form.Files.Count > 0 ? Request.Form.Files : null;
            if (files == null || files.Count == 0) return new ResultObject() { success = false, message = "無法讀取檔案：The files is null or files count == 0." };
            else if (files != null && files.Count > 0)
            {
                IFormFile Inputfile = files[0];
                Stream FileStream = Inputfile.OpenReadStream();

                if (Inputfile == null || FileStream == null) return new ResultObject() { success = false, message = "無法讀取檔檔案：The Inputfile or FileStream is null." };
                else if (Inputfile != null && FileStream != null)
                {
                    IExcelDataReader reader;
                    if (Inputfile.FileName.EndsWith(".xls"))
                        reader = ExcelReaderFactory.CreateBinaryReader(FileStream);
                    else if (Inputfile.FileName.EndsWith(".xlsx"))
                        reader = ExcelReaderFactory.CreateOpenXmlReader(FileStream);
                    else
                        return new ResultObject { success = false, message = "無法讀取檔檔案：The file format is not supported." };

                    DataSet dsexcelRecords = reader.AsDataSet(new ExcelDataSetConfiguration()
                    {
                        ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                        {
                            UseHeaderRow = true
                        }
                    });
                    reader.Close();

                    if (dsexcelRecords == null || dsexcelRecords.Tables.Count == 0) return new ResultObject { success = false, message = "無法讀取檔檔案：工作表數量不足" };
                    else if (dsexcelRecords != null && dsexcelRecords.Tables.Count > 0)
                    {
                        DataTable dtPriceLink = dsexcelRecords.Tables[0];
                        List<string> column = ["價錢", "接/送機", "城市", "區域", "連結"];

                        // 欄位檢查
                        foreach (string item in column)
                        {
                            if (!dtPriceLink.Columns.Contains(item)) return new ResultObject { success = false, message = String.Format("欄位必須包含{0}", item) };
                        }

                        // 檢查資料型態
                        if (dtPriceLink.AsEnumerable().ToList().Exists(x => !decimal.TryParse(x["價錢"].ToString(), out _))) return new ResultObject { success = false, message = String.Format("{0}必須為數字", "價錢") };
                        if (dtPriceLink.AsEnumerable().ToList().Exists(x => !Enum.TryParse(x["接/送機"].ToString(), out OrderType _))) return new ResultObject { success = false, message = String.Format("{0}資料錯誤", "類別(接機/送機)") };
                        if (dtPriceLink.AsEnumerable().ToList().Exists(x => string.IsNullOrWhiteSpace(x["連結"].ToString()))) return new ResultObject { success = false, message = String.Format("{0}不得為空白", "連結") };

                        // 塞資料
                        ATS_PriceLinkSettingsController aTS_CityAreaSettingsController = new(_baseService, _ATS_PriceLinkSettings, _ATS_CityAreaSettings) { ControllerContext = ControllerContext };
                        foreach (DataRow row in dtPriceLink.Rows)
                        {
                            using (TransactionScope tx = new())
                            {
                                decimal price = (dtPriceLink.Columns.Contains("價錢") && !DBNull.Value.Equals(dtPriceLink.Columns.Contains("價錢"))) ? Convert.ToDecimal(row["價錢"]) : 0;
                                string type = (dtPriceLink.Columns.Contains("接/送機") && !DBNull.Value.Equals(dtPriceLink.Columns.Contains("接/送機"))) ? row["接/送機"].ToString() ?? "" : "";
                                string city = (dtPriceLink.Columns.Contains("城市") && !DBNull.Value.Equals(dtPriceLink.Columns.Contains("城市"))) ? row["城市"].ToString() ?? "" : "";
                                string area = (dtPriceLink.Columns.Contains("區域") && !DBNull.Value.Equals(dtPriceLink.Columns.Contains("區域"))) ? row["區域"].ToString() ?? "" : "";
                                string link = (dtPriceLink.Columns.Contains("連結") && !DBNull.Value.Equals(dtPriceLink.Columns.Contains("連結"))) ? row["連結"].ToString() ?? "" : "";
                                // 先查出價錢連結設定
                                List<SearchATS_PriceLinkSettingsResult> resultSearchATS_PriceLinkSettings = _ATS_PriceLinkSettings.SearchATS_PriceLinkSettings(
                                    new SearchATS_PriceLinkSettingsParam(
                                        type: type,
                                        city: city,
                                        area: area,
                                        price: price,
                                        page: 0,
                                        num_per_page: 0),
                                    ["pls_id"], [],
                                    out int _);
                                // 如果有符合的價錢，就更新連結
                                if (resultSearchATS_PriceLinkSettings.Count > 0)
                                {
                                    _ATS_PriceLinkSettings.UpdateATS_PriceLinkSettings(
                                        new UpdateATS_PriceLinkSettingsParam(
                                            cre_time: Appsettings.api_datetime_param_no_pass,
                                            upd_userid: jwtObject.user_id,
                                            upd_time: DateTime.Now,
                                            pls_id: resultSearchATS_PriceLinkSettings[0].pls_id,
                                            visible: Appsettings.api_string_param_no_pass,
                                            type: Appsettings.api_string_param_no_pass,
                                            city: Appsettings.api_string_param_no_pass,
                                            area: Appsettings.api_string_param_no_pass,
                                            price: Appsettings.api_numeric_param_no_pass,
                                            link: link));
                                }
                                else
                                {
                                    ResultObject<string> resultATS_CityAreaSettingsController = aTS_CityAreaSettingsController.ATS_PriceLinkSettingsCreate(
                                        new ATS_PriceLinkSettingsCreate
                                        {
                                            visible = "Y",
                                            type = type,
                                            city = city,
                                            area = area,
                                            price = price,
                                            link = link
                                        });
                                    if (!resultATS_CityAreaSettingsController.success) return new ResultObject() { success = false, message = resultATS_CityAreaSettingsController.message };
                                }

                                tx.Complete();
                            }
                        }
                    }
                }
            }
            return new ResultObject() { success = true, message = "匯入成功" };
        }
    }
}
