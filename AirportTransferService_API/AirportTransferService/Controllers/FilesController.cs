using Microsoft.AspNetCore.Mvc;
using SelectPdf;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;
using System.Net;
using System.Net.Http.Headers;

namespace ESD.Controllers
{
    [Authorization]
    public class FilesController(IFiles files, IConfiguration config, IBaseService baseService) : CustomControllerBase(baseService)
    {
        private readonly IConfiguration _config = config;
        private readonly IFiles _files = files;

        /// <summary>
        /// 檔案副檔名列舉
        /// 對應的圖片格式jpg,gif,bmp,png,pdf,svg,ico,webp
        /// { "255216", "7173", "6677", "13780", "3780", "6063", "00", "8273" };
        /// </summary>
        public enum FileTypeEnum
        {
            /// <summary>
            /// jpg
            /// </summary>
            jpg = 255216,

            /// <summary>
            /// gif
            /// </summary>
            gif = 7173,

            /// <summary>
            /// bmp
            /// </summary>
            bmp = 6677,

            /// <summary>
            /// png
            /// </summary>
            png = 13780,

            /// <summary>
            /// pdf
            /// </summary>
            pdf = 3780,

            /// <summary>
            /// svg
            /// </summary>
            svg = 6063,

            /// <summary>
            /// ico
            /// </summary>
            ico = 00,

            /// <summary>
            /// webp
            /// </summary>
            webp = 8273
        }

        /// <summary>
        /// 檔案上傳
        /// </summary>
        /// <returns></returns>
        [HttpPost, AllowAnonymous]
        public ResultObject<List<UploadFileResponse>> UploadFile()
        {
            return UploadFile_local();
        }

        /// <summary>
        /// 刪檔案
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> DeleteFile(DeleteFile data)
        {
            return DeleteFile_local(data);
        }

        /// <summary>
        /// 檔案查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchFileResponse>> SearchFile(SearchFile data)
        {
            ResultObject<List<SearchFileResponse>> res = SearchFile_local(data);
            if (!res.success || res.data == null) return res;

            //按照belong接上對應的custom_key
            List<string> belongs = res.data.Select(x => x.belong ?? "").Distinct().ToList();

            foreach (string belong in belongs)
            {
                switch (belong)
                {
                    case "CommodityWebSetting":
                        //List<string> ccad_ids = res.data.Select(x => x.custom_key1 ?? "").Concat(res.data.Select(x => x.custom_key2 ?? "")).Where(x => !string.IsNullOrEmpty(x)).ToList();
                        //List<SearchCommodityCustomAttriDetailResult> searchCommodityCustomAttriDetailResults = _commodity.SearchCommodityCustomAttriDetail(
                        //    new SearchCommodityCustomAttriDetailParam(ccad_id: ccad_ids),
                        //    ["ccad_id", "ccad_name", "color_code"],
                        //    out int page_count);
                        //res.data.Where(x => x.belong == "CommodityWebSetting")
                        //    .SetValue(x => x.custom_name1 = (searchCommodityCustomAttriDetailResults.FirstOrDefault(y => y.ccad_id == x.custom_key1)?.ccad_name ?? ""))
                        //    .SetValue(x => x.custom_name2 = (searchCommodityCustomAttriDetailResults.FirstOrDefault(y => y.ccad_id == x.custom_key2)?.ccad_name ?? ""))
                        //    .SetValue(x => x.custom_value1 = (searchCommodityCustomAttriDetailResults.FirstOrDefault(y => y.ccad_id == x.custom_key1)?.color_code ?? ""))
                        //    .SetValue(x => x.custom_value2 = (searchCommodityCustomAttriDetailResults.FirstOrDefault(y => y.ccad_id == x.custom_key2)?.color_code ?? ""));
                        break;
                    case "OfficeSiteSetting":
                        ////type是Label的裝上商品分類名稱
                        //if (res.data.Any(x => x.type == "Label" && x.belong == "OfficeSiteSetting"))
                        //{
                        //    List<SearchCommodityLabelResult> searchCommodityLabelResults = _commodity.SearchCommodityLabel(
                        //        new SearchCommodityLabelParam(
                        //        cl_ids: res.data.Where(x => x.type == "Label" && x.belong == "OfficeSiteSetting").Select(x => x.id ?? "").ToList()),
                        //        ["cl_id", "content"],
                        //        out _);
                        //    res.data.Where(x => x.type == "Label" && x.belong == "OfficeSiteSetting")
                        //        .SetValue(x => x.custom_name1 = (searchCommodityLabelResults.FirstOrDefault(y => y.cl_id == x.id)?.content ?? ""));
                        //}
                        break;
                    default:
                        break;
                }
            }
            return res;
        }

        /// <summary>
        /// 檔案移動
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject MoveFile(MoveFile data)
        {
            return MoveFile_local(data);
        }

        #region 非AWS
        /// <summary>
        /// 檔案上傳
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<UploadFileResponse>> UploadFile_local()
        {
            IFormFileCollection? files = Request.Form.Files.Count > 0 ? Request.Form.Files : null;

            //Json data
            UploadFile jsonData = JsonConvert.DeserializeObject<UploadFile>(Request.Form["UploadFile"]) ?? new UploadFile();
            return UploadFile_local(files, jwtObject, jsonData);
        }

        /// <summary>
        /// 檔案上傳
        /// </summary>
        /// <returns></returns>
        [NonAction]
        public ResultObject<List<UploadFileResponse>> UploadFile_local(IFormFileCollection? files, AuthObject jwtObject, UploadFile jsonData)
        {
            DateTime dateTime = DateTime.Now;
            string filePath = Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2)
                            + $@"\_{jwtObject.company_code}\Images\{jsonData.belong}\{jsonData.id}\{jsonData.type}";

            //傳IFormFileCollection
            if (files != null)
            {
                List<UploadFileResponse> ufr_list = [];
                foreach (IFormFile file in files)
                {
                    string fileName = Tool.CreateRandomCode(5) + dateTime.ToString("yyyyMMddHHmmssfff") + Path.GetExtension(file.FileName);
                    if (file != null && file.Length > 0)
                    {
                        // 2.檢查格式
                        // 轉換成byte,讀取圖片MIME類型
                        Stream stream;
                        // 文件長度
                        // int contentLength = file.ContentLength;
                        // contentLength，這裡我們只讀取文件長度的前兩位用於判斷就好，這樣速度比較快，剩下的也用不到
                        byte[] fileByte = new byte[2];
                        stream = file.OpenReadStream();
                        // contentLength，還是取前兩位
                        stream.Read(fileByte, 0, 2);
                        stream.Close();
                        string fileFlag = fileByte[0].ToString() + fileByte[1].ToString();
                        // 對應的圖片格式jpg,gif,bmp,png,pdf,svg,ico,webp
                        string[] fileTypeStr = ["255216", "7173", "6677", "13780", "3780", "6063", "00", "8273"];

                        string file_fullPath;
                        //20221018檔案所屬是簽核"SignOff"的話不檢查副檔
                        if (!fileTypeStr.Contains(fileFlag) && !jsonData.belong.Equals("SignOff"))
                        {
                            // 3.刪除格式不正確的檔案
                            System.IO.File.Delete(filePath + @"\" + fileName);
                            return new ResultObject<List<UploadFileResponse>> { success = false, message = $"圖片格式不正確{fileFlag}" };
                        }
                        else
                        {
                            //壓縮看看
                            if (!int.TryParse(fileFlag, out int fileFlagNumber)) return new ResultObject<List<UploadFileResponse>> { success = false, message = $"圖片格式不正確{fileFlag}" };
                            FileTypeEnum file_type_enum = (FileTypeEnum)fileFlagNumber;
                            //IFormFile file_reduced = ReduceImageSize(file, file_type_enum, filePath, fileName);

                            //各種檢查
                            //type是LOGO的話副檔名必須是PNG
                            if (jsonData.type == "LOGO" && file_type_enum != FileTypeEnum.png)
                                return new ResultObject<List<UploadFileResponse>> { success = false, message = string.Format("目前選擇的檔案類型({0})，請上傳png檔", file_type_enum.ToString()) };

                            // 1.存檔 LOGO不壓縮 不轉檔 會黑掉、副檔名是ico的不轉檔
                            if (jsonData.type == "LOGO" || file_type_enum == FileTypeEnum.ico)
                            {
                                file_fullPath = $@"{filePath}\{fileName}";
                                if (!Tool.CreateFile(filePath, fileName, file)) return new ResultObject<List<UploadFileResponse>> { success = false, message = "圖片儲存失敗" };
                            }
                            else if (!ReduceImageSize(file, file_type_enum, filePath, fileName, out file_fullPath))
                            {
                                if (!Tool.CreateFile(filePath, fileName, file)) return new ResultObject<List<UploadFileResponse>> { success = false, message = "圖片儲存失敗" };
                            }
                        }
                        string path = file_fullPath.Replace(Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2), "");
                        //存資料庫
                        int file_id = _files.CreateFiles(
                            new CreateFilesParam(
                                cre_userid: jwtObject.user_id,
                                cre_time: dateTime,
                                belong: jsonData.belong,
                                id: jsonData.id,
                                type: jsonData.type,
                                path: path,
                                isvalid: "Y",
                                custom_key1: jsonData.custom_key1,
                                custom_key2: jsonData.custom_key2,
                                seq: jsonData.seq ?? 0,
                                url: jsonData.url));
                        ufr_list.Add(new UploadFileResponse { file_id = file_id, path = path, upload_key = file.Name });
                    }
                }
                return new ResultObject<List<UploadFileResponse>> { success = true, message = "上傳成功", data = ufr_list };
            }
            // 傳base64
            else if (!string.IsNullOrEmpty(jsonData.base64string))
            {
                string fileName = $"{Tool.CreateRandomCode(5)}{dateTime}.{jsonData.base64string.Split(';')[0].Split('/')[1]}";
                if (!Tool.UploadAnyFileBase64(jsonData.base64string.Split([','], 2)[1], filePath, fileName)) return new ResultObject<List<UploadFileResponse>> { success = false, message = "圖片儲存失敗" };

                string file_fullPath = $@"{filePath}\{fileName}";
                string path = file_fullPath.Replace(Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2), "");
                //存資料庫
                int file_id = _files.CreateFiles(new CreateFilesParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: dateTime,
                    belong: jsonData.belong,
                    id: jsonData.id,
                    type: jsonData.type,
                    path: path,
                    isvalid: "Y",
                    custom_key1: jsonData.custom_key1,
                    custom_key2: jsonData.custom_key2,
                    seq: jsonData.seq,
                    url: jsonData.url));

                return new ResultObject<List<UploadFileResponse>> { success = true, message = "上傳成功", data = [new UploadFileResponse { path = path, file_id = file_id }] };
            }
            else
            {
                return new ResultObject<List<UploadFileResponse>> { success = false, message = "上傳資料為空" };
            }
        }

        /// <summary>
        /// 刪檔案
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<string> DeleteFile_local(DeleteFile data)
        {
            //查要刪的路徑
            List<SearchFilesResult> SearchFiles_result = _files.SearchFiles(
                new SearchFilesParam(file_id: data.file_id),
                ["path"],
                out int _);
            if (SearchFiles_result.Count == 0 || string.IsNullOrEmpty(SearchFiles_result[0].path))
            {
                return new ResultObject<string> { success = false, message = "圖片不存在" };
            }
            else
            {
                //刪資料庫
                _files.DeleteFiles(data.file_id);

                string file_path = Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2) + SearchFiles_result[0].path;
                if (System.IO.File.Exists(file_path))
                {
                    System.IO.File.Delete(file_path);

                    return new ResultObject<string> { success = true, message = "刪除成功" };
                }
                else
                {
                    return new ResultObject<string> { success = true, message = "圖片不存在", data = file_path };
                }
            }
        }

        /// <summary>
        /// 檔案查詢
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultObject<List<SearchFileResponse>> SearchFile_local(SearchFile data)
        {
            List<SearchFilesResult> SearchFiles_result = _files.SearchFiles(
                new SearchFilesParam(
                file_id: data.file_id,
                belongs: string.IsNullOrEmpty(data.belong) ? null : new List<string> { data.belong },
                ids: string.IsNullOrEmpty(data.id) ? null : new List<string> { data.id },
                types: string.IsNullOrEmpty(data.type) ? null : new List<string> { data.type },
                isvalid: data.isvalid,
                cre_time_start: data.cre_time_start,
                cre_time_end: data.cre_time_end),
                ["file_id", "belong", "type", "id", "path", "isvalid", "cre_time", "custom_key1", "custom_key2", "seq", "url"],
                out int _);

            List<SearchFileResponse> SearchFile_response = [];
            foreach (SearchFilesResult result in SearchFiles_result)
            {
                SearchFile_response.Add(new SearchFileResponse
                {
                    file_id = result.file_id,
                    belong = result.belong,
                    type = result.type,
                    id = result.id,
                    path = result.path,
                    isvalid = result.isvalid,
                    cre_time = result.cre_time,
                    filename = Path.GetFileName(result.path) ?? "",
                    custom_key1 = result.custom_key1,
                    custom_key2 = result.custom_key2,
                    seq = result.seq,
                    url = result.url
                });
            }

            if (data.blob && SearchFile_response.Count > 0)
            {
                SearchFile_response[0].blob_result = GetFile(new GetFile { file_id = SearchFile_response[0].file_id ?? 0 });
            }

            return new ResultObject<List<SearchFileResponse>> { success = true, data = SearchFile_response };
        }

        /// <summary>
        /// 檔案移動
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject MoveFile_local(MoveFile data)
        {
            DateTime dateTime = DateTime.Now;
            string new_filePath = Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2)
                                + $@"\_{jwtObject.company_code}\Images\{data.belong}\{data.id}\{data.type}";

            //查檔案原路徑
            List<SearchFilesResult> SearchFiles_result = _files.SearchFiles(
                new SearchFilesParam(file_id: data.file_id),
                ["path"],
                out int _);
            if (SearchFiles_result.Count == 0) return new ResultObject { success = false, message = "查無檔案" };

            string origin_file_path = SearchFiles_result[0].path ?? "";
            string new_file_fullPath = $@"{new_filePath}\{Path.GetFileName(origin_file_path)}";
            string origin_file_fullPath = (AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "").GetParentDirectoryPath(2) + origin_file_path;
            using (TransactionScope tx = new())
            {
                //修改資料
                _files.UpdateFiles(new UpdateFilesParam(
                    cre_time: Appsettings.api_datetime_param_no_pass,
                    upd_userid: jwtObject.user_id,
                    upd_time: dateTime,
                    belong: data.belong,
                    id: data.id,
                    type: data.type,
                    path: new_file_fullPath.Replace(Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2), ""),
                    file_id: data.file_id,
                    isvalid: "Y"));

                //改資料庫沒爆炸再移動檔案
                if (!Directory.Exists(new_filePath)) Directory.CreateDirectory(new_filePath);
                //移動檔案
                System.IO.File.Move(origin_file_fullPath, new_file_fullPath);

                tx.Complete();

                return new ResultObject { success = true };
            }
        }

        /// <summary>
        /// 從html轉pdf儲存
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage UploadHtmlPDF(UploadHtmlPDF data)
        {
            jwtObject.company_code = string.IsNullOrEmpty(jwtObject.company_code) ? _config["company_code"] : jwtObject.company_code;

            try
            {
                DateTime cre_time = DateTime.Now;
                string PDFName = "";
                //PDFName = @"D:\\_" + jwtObject.company_code + $@"\Images\{data.belong}\" + data.id + $@"\{data.type}\" + cre_time + data.id + ".pdf";
                PDFName = Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2)
                        + $@"\_{jwtObject.company_code}\Images\{data.belong}\{data.id}\{data.type}\{cre_time:yyyyMMddHHmmss}{data.id}.pdf";
                HtmlToPdf htmlToPdf = new();
                //htmlToPdf.Options.MarginTop = 10;
                //htmlToPdf.Options.MarginBottom = 0;
                htmlToPdf.Options.MarginLeft = -20;
                htmlToPdf.Options.MarginRight = -20;
                //htmlToPdf.Options.WebPageHeight = 5;
                //htmlToPdf.Options.WebPageWidth = 1;
                htmlToPdf.Options.PdfPageSize = PdfPageSize.A4;
                //htmlToPdf.Options.DrawBackground = false;

                if (!string.IsNullOrEmpty(data.header_html))
                {
                    PdfHtmlSection headerHtml = new(data.header_html, "");
                    //headerHtml.AutoFitHeight = HtmlToPdfPageFitMode.ShrinkOnly;
                    //headerHtml.AutoFitWidth = HtmlToPdfPageFitMode.ShrinkOnly;
                    //headerHtml.WebPageWidth = 850;
                    htmlToPdf.Header.Height = data.header_height;
                    htmlToPdf.Header.Add(headerHtml);
                    htmlToPdf.Options.DisplayHeader = true;
                    htmlToPdf.Header.DisplayOnEvenPages = true;
                    htmlToPdf.Header.DisplayOnOddPages = true;
                }
                if (!string.IsNullOrEmpty(data.footer_html))
                {
                    PdfHtmlSection footerHtml = new(data.footer_html, "")
                    {
                        AutoFitHeight = HtmlToPdfPageFitMode.ShrinkOnly,
                        AutoFitWidth = HtmlToPdfPageFitMode.ShrinkOnly
                    };
                    //footerHtml.WebPageWidth = 850;
                    //htmlToPdf.Footer.Height = data.header_height;
                    htmlToPdf.Footer.Add(footerHtml);
                    htmlToPdf.Options.DisplayFooter = true;
                    htmlToPdf.Footer.DisplayOnEvenPages = true;
                    htmlToPdf.Footer.DisplayOnOddPages = true;
                }
                PdfDocument Doc = htmlToPdf.ConvertHtmlString(data.pdf_html);

                Doc.Save(PDFName);
                Doc.Close();

                //存資料庫
                int file_id = _files.CreateFiles(new CreateFilesParam(
                    cre_userid: jwtObject.user_id,
                    cre_time: cre_time,
                    belong: data.belong,
                    id: data.id,
                    type: data.type,
                    path: PDFName.Replace(Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2), ""),
                    isvalid: "Y"));

                return GetFile(new GetFile { file_id = file_id });
            }
            catch (Exception e)
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.InternalServerError, Content = new StringContent(e.Message) };
            }
        }

        /// <summary>
        /// 從html轉pdf儲存
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task UploadHtmlPDFNoWait(UploadHtmlPDF data)
        {
            await Task.Run(() =>
            {
                UploadHtmlPDF(data);
            });
        }

        /// <summary>
        /// GetFile
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage GetFile(GetFile data)
        {
            List<SearchFilesResult> SearchFiles_result = _files.SearchFiles(
                new SearchFilesParam(file_id: data.file_id),
                ["path"],
                out int _);

            if (SearchFiles_result.Count == 0) return new HttpResponseMessage { StatusCode = HttpStatusCode.InternalServerError, Content = new StringContent("查無檔案") };

            byte[] pdfBtyeArr = System.IO.File.ReadAllBytes(
                Tool.GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase ?? "", 2) + SearchFiles_result[0].path ?? "".Replace("/", "\\"));

            MemoryStream stream = new(pdfBtyeArr);
            HttpResponseMessage result = new(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };

            string file_extension = Path.GetExtension(SearchFiles_result[0].path ?? "").Replace(".", "");

            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = $"檔案_{Path.GetFileName(SearchFiles_result[0].path)}"
            };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue(file_extension.Equals("pdf") ? "application/pdf" : $"image/{file_extension}");
            result.Content.Headers.Add("success", "true");

            return result;
        }

        /// <summary>
        /// 修改檔案資訊
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ResultObject UpdateFile()
        {
            DateTime upd_time = DateTime.Now;

            //Json data
            UpdateFile jsonData = JsonConvert.DeserializeObject<UpdateFile>(Request.Form["UpdateFile"]) ?? new UpdateFile();

            //查檔案資訊
            SearchFilesResult? searchFilesResult = _files.SearchFiles(
                new SearchFilesParam(file_id: jsonData.file_id),
                ["file_id", "belong", "id", "type"],
                out int _).FirstOrDefault();
            if (searchFilesResult == null) return new ResultObject { success = false, message = "查無檔案" };

            string id = jsonData.id == Appsettings.api_string_param_no_pass ? (searchFilesResult.id ?? "") : (jsonData.id ?? "");

            //如果有動id的話呼叫檔案移動
            if (jsonData.id != Appsettings.api_string_param_no_pass && jsonData.id != searchFilesResult.id)
            {
                ResultObject mf_res = MoveFile_local(new MoveFile
                {
                    file_id = jsonData.file_id,
                    belong = searchFilesResult.belong ?? "",
                    id = id,
                    type = searchFilesResult.type ?? ""
                });
                if (!mf_res.success) return mf_res;
            }

            _files.UpdateFiles(new UpdateFilesParam(
                cre_time: Appsettings.api_datetime_param_no_pass,
                upd_userid: jwtObject.user_id,
                upd_time: upd_time,
                file_id: jsonData.file_id,
                id: id,
                seq: jsonData.seq ?? 0,
                url: jsonData.url,
                custom_key1: jsonData.custom_key1,
                custom_key2: jsonData.custom_key2));

            return new ResultObject { success = true, message = "修改成功" };
        }

        /// <summary>
        /// 取得不能把連結傳給其他人的檔案
        /// </summary>
        /// <returns></returns>
        [HttpGet, AllowAnonymous]
        public HttpResponseMessage GetFile()
        {
            string file_path = @"D:\_GG\Images\BELONG\ID\TYPE\20220804174022ID.pdf";
            if (System.IO.File.Exists(file_path))
            {
                byte[] pdfBtyeArr = System.IO.File.ReadAllBytes(file_path.Replace("/", "\\"));

                MemoryStream stream = new(pdfBtyeArr);
                HttpResponseMessage result = new(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };

                string file_extension = Path.GetExtension(file_path).Replace(".", "");
                switch (file_extension)
                {
                    case "pdf":
                        result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                        break;
                    case "png":
                    case "jpg":
                    case "jpeg":
                        result.Content.Headers.ContentType = new MediaTypeHeaderValue($"image/{file_extension}");
                        break;
                    case "xlsx":
                        result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
                        break;
                    default:
                        return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest };
                }

                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = $"檔案_{Path.GetFileName(file_path)}"
                };
                result.Content.Headers.ContentType = new MediaTypeHeaderValue(file_extension.Equals("pdf") ? "application/pdf" : $"image/{file_extension}");

                return result;
            }
            else
            {
                return new HttpResponseMessage { StatusCode = HttpStatusCode.NotFound };
            }
        }

        [NonAction]
        private static bool ReduceImageSize(IFormFile file, FileTypeEnum file_type_enum, string filePath, string fileName, out string file_fullPath, int desiredWidth = 1920)
        {
            file_fullPath = $@"{filePath}\{fileName}";
            try
            {
                int quality = 75;  // Set quality to 75%

                ImageEncoder? encoder = null;

                switch (file_type_enum)
                {
                    case FileTypeEnum.jpg:
                        encoder = new JpegEncoder { Quality = quality };
                        break;
                    case FileTypeEnum.webp:
                        encoder = new WebpEncoder { Quality = quality };
                        break;
                    case FileTypeEnum.png:
                        encoder = new PngEncoder { CompressionLevel = PngCompressionLevel.BestCompression };
                        break;
                    default:
                        break;
                }
                if (encoder == null) return false;

                using (Image image = Image.Load(file.OpenReadStream()))
                {
                    using (MemoryStream outputStream = new MemoryStream())
                    {
                        // Create the directory if it doesn't exist
                        string outputDirectory = Path.GetDirectoryName(filePath + @"\" + fileName);
                        if (!Directory.Exists(outputDirectory))
                        {
                            Directory.CreateDirectory(outputDirectory);
                        }
                        if (image.Width > desiredWidth)
                        {
                            // Calculate the new height while maintaining the aspect ratio
                            int newWidth = desiredWidth;
                            int newHeight = (int)Math.Round((double)image.Height / image.Width * desiredWidth);

                            // Resize the image
                            image.Mutate(x => x.Resize(new ResizeOptions { Size = new Size(newWidth, newHeight), Mode = ResizeMode.Max }));

                            // Save the resized image as WebP
                            //using (var output = System.IO.File.Create(filePath + @"\" + fileName))
                            //{
                            //    image.SaveAsWebp(output, new WebpEncoder());
                            //}
                        }
                        else
                        {
                            //// If no resizing needed, directly convert to WebP
                            //image.SaveAsWebp(output, new WebpEncoder());
                        }
                        //image.Save(outputStream, encoder);
                        //API啟動後第一次存檔不知道為啥副檔名會沒變，所以先刪掉再存一次
                        string origin_file_extension = Path.GetExtension(file_fullPath);
                        string origin_file_fullPath = file_fullPath;
                        file_fullPath = file_fullPath.Replace(origin_file_extension, ".webp");
                        image.SaveAsWebp(file_fullPath);
                        if (origin_file_fullPath == file_fullPath && System.IO.File.Exists(origin_file_fullPath))
                        {
                            System.IO.File.Delete(origin_file_fullPath);
                            image.SaveAsWebp(file_fullPath);
                        }
                        //outputStream.Seek(0, SeekOrigin.Begin);
                        //var reducedFile = new FormFile(outputStream, 0, outputStream.Length, file.Name, file.FileName);
                        return true;
                    }
                }
            }
            catch
            {
                return false;
            }
        }
        #endregion

        /// <summary>
        /// 調整尺寸
        /// </summary>
        /// <param name="inputImagePath">來源檔案</param>
        /// <param name="outputImagePath">目標檔案</param>
        /// <param name="desiredWidth">縮小至寬度(小於不調)</param>
        [NonAction]
        private static void ConvertAndResizeToWebP(string inputImagePath, string outputImagePath, int desiredWidth)
        {
            using (Image image = Image.Load(inputImagePath))
            {
                // Check if resizing is necessary
                if (image.Width > desiredWidth)
                {
                    // Calculate the new height while maintaining the aspect ratio
                    int newWidth = desiredWidth;
                    int newHeight = (int)Math.Round((double)image.Height / image.Width * desiredWidth);

                    // Resize the image
                    image.Mutate(x => x.Resize(new ResizeOptions { Size = new Size(newWidth, newHeight), Mode = ResizeMode.Max }));

                    // Create the directory if it doesn't exist
                    string outputDirectory = Path.GetDirectoryName(outputImagePath);
                    if (!Directory.Exists(outputDirectory))
                    {
                        Directory.CreateDirectory(outputDirectory);
                    }

                    // Save the resized image as WebP
                    using (var output = System.IO.File.Create(outputImagePath))
                    {
                        image.SaveAsWebp(output, new WebpEncoder());
                    }
                    Console.WriteLine($"Conversion and resizing of {inputImagePath} complete.");
                }
                else
                {
                    // If no resizing needed, directly convert to WebP
                    ConvertToWebP(inputImagePath, outputImagePath);
                }
            }
        }

        /// <summary>
        /// 轉換至 Webp 格式 (只接收 png, jpg, jpeg, jfif 格式)
        /// </summary>
        /// <param name="inputImagePath">來源檔案</param>
        /// <param name="outputImagePath">目標檔案</param>
        /// <exception cref="NotSupportedException"></exception>
        [NonAction]
        private static void ConvertToWebP(string inputImagePath, string outputImagePath)
        {
            // Create the directory if it doesn't exist
            string outputDirectory = Path.GetDirectoryName(outputImagePath);
            if (!Directory.Exists(outputDirectory)) Directory.CreateDirectory(outputDirectory);

            using (Image image = Image.Load(inputImagePath))
            {
                // Save the image as WebP
                using (var output = System.IO.File.Create(outputImagePath))
                {
                    IImageEncoder encoder;
                    string extension = Path.GetExtension(inputImagePath).ToLower();
                    if (extension == ".png")
                    {
                        encoder = new PngEncoder();
                    }
                    else if (extension == ".jpg" || extension == ".jpeg" || extension == ".jfif")
                    {
                        encoder = new JpegEncoder() { Quality = 80 };
                    }
                    else
                    {
                        throw new NotSupportedException("Unsupported image format.");
                    }

                    // Save the image in WebP format
                    image.Save(output, new WebpEncoder());
                }
                Console.WriteLine($"Conversion of {inputImagePath} complete.");
            }
        }

        /// <summary>
        /// 轉換目錄內所有檔案
        /// </summary>
        /// <param name="inputFolder">來源目錄</param>
        /// <param name="outputFolder">目標目錄</param>
        /// <param name="desiredWidth"></param>
        [NonAction]
        private static void ConvertAllImagesInFolder(string inputFolder, string outputFolder, int desiredWidth)
        {
            // Create output folder if it doesn't exist
            if (!Directory.Exists(outputFolder))
            {
                Directory.CreateDirectory(outputFolder);
            }

            // Get all image files in the input folder and its subfolders
            string[] imageFiles = Directory.GetFiles(inputFolder, "*.*", SearchOption.AllDirectories);

            // Loop through each file
            foreach (string inputFile in imageFiles)
            {
                // Check if the file is an image
                string extension = Path.GetExtension(inputFile).ToLower();
                if (extension != ".jpg" && extension != ".jpeg" && extension != ".png" && extension != ".jfif")
                {
                    // Skip non-image files
                    Console.WriteLine($"Skipping non-image file: {inputFile}");
                    continue;
                }

                // Determine the output file path
                string relativePath = Path.GetRelativePath(inputFolder, inputFile);
                string outputFile = Path.Combine(outputFolder, Path.ChangeExtension(relativePath, ".webp"));

                // Convert and resize the image
                ConvertAndResizeToWebP(inputFile, outputFile, desiredWidth);
            }

            Console.WriteLine("All images converted.");
        }
    }
}
