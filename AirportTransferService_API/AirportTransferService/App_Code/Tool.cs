using Jose;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace AirportTransferService.App_Code
{
    /// <summary>
    /// 工具類別
    /// </summary>
    public static class Tool
    {
        /// <summary>
        /// 正則運算式
        /// </summary>
        public struct RegularExp
        {
            public const string Chinese = @"^[\u4E00-\u9FA5\uF900-\uFA2D]+$";
            public const string Color = "^#[a-fA-F0-9]{6}";
            public const string Date = @"^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$";
            public const string Time = @"^(20|21|22|23|[0-1]?\d):[0-5]?\d$";
            public const string DateTime = @"^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$";
            public const string Email = @"^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$";
            public const string Float = @"^(-?\d+)(\.\d+)?$";
            public const string ImageFormat = @"\.(?i:jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$";
            public const string Integer = @"^-?\d+$";
            public const string IP = @"^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$";
            public const string Letter = "^[A-Za-z]+$";
            public const string LowerLetter = "^[a-z]+$";
            public const string MinusFloat = @"^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$";
            public const string MinusInteger = "^-[0-9]*[1-9][0-9]*$";
            public const string Mobile = @"^(\+\d{1,3}[- ]?)?\d{10}$";
            public const string NumbericOrLetterOrChinese = @"^[A-Za-z0-9\u4E00-\u9FA5\uF900-\uFA2D]+$";
            public const string Numeric = "^[0-9]+$";
            public const string NumericOrLetter = "^[A-Za-z0-9]+$";
            public const string NumericOrLetterOrUnderline = @"^\w+$";
            public const string PlusFloat = @"^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$";
            public const string PlusInteger = "^[0-9]*[1-9][0-9]*$";
            public const string Telephone = @"(\d+-)?(\d{4}-?\d{7}|\d{3}-?\d{8}|^\d{7,8})(-\d+)?";
            public const string UnMinusFloat = @"^\d+(\.\d+)?$";
            public const string UnMinusInteger = @"\d+$";
            public const string UnPlusFloat = @"^((-\d+(\.\d+)?)|(0+(\.0+)?))$";
            public const string UnPlusInteger = @"^((-\d+)|(0+))$";
            public const string UpperLetter = "^[A-Z]+$";
            public const string Url = @"^http(s)?://([\w-]+\.)+[\w-]+(:[\w-]+)?(/[\w- ./?%&=]*)?$";
            public const string allsc = @"[\W_]+";
            public const string Id = @"([A-Z]|[a-z])\d{9}";
            public const string creditcard = @"^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$";

            public const string Visitor = @"\d{3}\-\d{12}";
            public const string Employee = @"[a-zA-Z]{3}\d{3,}";

            //MOS
            public const string visitor_pattern = @"[0-9][0-9][0-9]%[-]%[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]";

        }

        /// <summary>
        /// JWT解碼
        /// </summary>
        /// <param name="Authorization">token</param>
        /// <returns></returns>
        public static AuthObject JWTDecode(string Authorization)
        {
            return JWT.Decode<AuthObject>(
                Authorization,
                Encoding.UTF8.GetBytes(Appsettings.ConfigurationManager._config["secret"]),
                JwsAlgorithm.HS256);
        }

        #region Regex 驗證
        /// <summary>
        /// 判斷字串是否與指定正則運算式匹配
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <param name="regularExp">正則運算式</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsMatch(string input, string regularExp)
        {
            return Regex.IsMatch(input, regularExp);
        }

        /// <summary>
        /// 驗證非負整數（正整數 + 0）
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsUnMinusInt(string input)
        {
            return Regex.IsMatch(input, RegularExp.UnMinusInteger);
        }

        /// <summary>
        /// 驗證正整數
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsPlusInt(string input)
        {
            return Regex.IsMatch(input, RegularExp.PlusInteger);
        }

        /// <summary>
        /// 驗證非正整數（負整數 + 0）
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsUnPlusInt(string input)
        {
            return Regex.IsMatch(input, RegularExp.UnPlusInteger);
        }

        /// <summary>
        /// 驗證負整數
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsMinusInt(string input)
        {
            return Regex.IsMatch(input, RegularExp.MinusInteger);
        }

        /// <summary>
        /// 驗證整數
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsInt(string input)
        {
            return Regex.IsMatch(input, RegularExp.Integer);
        }

        /// <summary>
        /// 驗證非負浮點數（正浮點數 + 0）
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsUnMinusFloat(string input)
        {
            return Regex.IsMatch(input, RegularExp.UnMinusFloat);
        }

        /// <summary>
        /// 驗證正浮點數
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsPlusFloat(string input)
        {
            return Regex.IsMatch(input, RegularExp.PlusFloat);
        }

        /// <summary>
        /// 驗證非正浮點數（負浮點數 + 0）
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsUnPlusFloat(string input)
        {
            return Regex.IsMatch(input, RegularExp.UnPlusFloat);
        }

        /// <summary>
        /// 驗證負浮點數
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsMinusFloat(string input)
        {
            return Regex.IsMatch(input, RegularExp.MinusFloat);
        }

        /// <summary>
        /// 驗證浮點數
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsFloat(string input)
        {
            return Regex.IsMatch(input, RegularExp.Float);
        }

        /// <summary>
        /// 驗證由26個英文字母組成的字串
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsLetter(string input)
        {
            return Regex.IsMatch(input, RegularExp.Letter);
        }

        /// <summary>
        /// 驗證由中文組成的字串
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsChinese(string input)
        {
            return Regex.IsMatch(input, RegularExp.Chinese);
        }

        /// <summary>
        /// 驗證由26個英文字母的大寫組成的字串
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsUpperLetter(string input)
        {
            return Regex.IsMatch(input, RegularExp.UpperLetter);
        }

        /// <summary>
        /// 驗證由26個英文字母的小寫組成的字串
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsLowerLetter(string input)
        {
            return Regex.IsMatch(input, RegularExp.LowerLetter);
        }

        /// <summary>
        /// 驗證由數位和26個英文字母組成的字串
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsNumericOrLetter(string input)
        {
            return Regex.IsMatch(input, RegularExp.NumericOrLetter);
        }

        /// <summary>
        /// 驗證由正數組成的字串
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsPlusInteger(string input)
        {
            return Regex.IsMatch(input, RegularExp.PlusInteger);
        }
        /// <summary>
        /// 驗證由數位組成的字串
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsNumeric(string input)
        {
            return Regex.IsMatch(input, RegularExp.Numeric);
        }

        /// <summary>
        /// 驗證由數位和26個英文字母或中文組成的字串
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsNumericOrLetterOrChinese(string input)
        {
            return Regex.IsMatch(input, RegularExp.NumbericOrLetterOrChinese);
        }

        /// <summary>
        /// 驗證由數位、26個英文字母或者下劃線組成的字串
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsNumericOrLetterOrUnderline(string input)
        {
            return Regex.IsMatch(input, RegularExp.NumericOrLetterOrUnderline);
        }

        /// <summary>
        /// 驗證email地址
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsEmail(string input)
        {
            return Regex.IsMatch(input, RegularExp.Email);
        }

        /// <summary>
        /// 驗證URL
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsUrl(string input)
        {
            return Regex.IsMatch(input, RegularExp.Url);
        }

        /// <summary>
        /// 驗證電話號碼
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsTelephone(string input)
        {
            return Regex.IsMatch(input, RegularExp.Telephone);
        }

        /// <summary>
        /// 驗證手機號碼
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsMobile(string input)
        {
            return Regex.IsMatch(input, RegularExp.Mobile);
        }

        /// <summary>
        /// 通過檔副檔名驗證圖像格式
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsImageFormat(string input)
        {
            return Regex.IsMatch(input, RegularExp.ImageFormat);
        }

        /// <summary>
        /// 驗證IP
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsIP(string input)
        {
            return Regex.IsMatch(input, RegularExp.IP);
        }

        /// <summary>
        /// 驗證日期（YYYY-MM-DD）
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsDate(string input)
        {
            return Regex.IsMatch(input, RegularExp.Date);
        }

        /// <summary>
        /// 驗證時間（HH:MM）
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsTime(string input)
        {
            return Regex.IsMatch(input, RegularExp.Time);
        }

        /// <summary>
        /// 驗證日期和時間（YYYY-MM-DD HH:MM:SS）
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsDateTime(string input)
        {
            return Regex.IsMatch(input, RegularExp.DateTime);
        }

        /// <summary>
        /// 驗證顏色（#ff0000）
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsColor(string input)
        {
            return Regex.IsMatch(input, RegularExp.Color);
        }

        /// <summary>
        /// 驗證是否訪客
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsVisitor(string input)
        {
            return Regex.IsMatch(input, RegularExp.Visitor);
        }

        /// <summary>
        /// 驗證是否員工(也就是使用者帳號)
        /// </summary>
        /// <param name="input">要驗證的字串</param>
        /// <returns>驗證通過返回true</returns>
        public static bool IsEmployee(string input)
        {
            return Regex.IsMatch(input, RegularExp.Employee);
        }
        #endregion

        /// <summary>
        /// SetValue
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="items"></param>
        /// <param name="updateMethod"></param>
        /// <returns></returns>
        public static IEnumerable<T> SetValue<T>(this IEnumerable<T> items, Action<T> updateMethod)
        {
            foreach (T item in items)
            {
                updateMethod(item);
            }
            return items;
        }

        /// <summary>
        /// SHA不可逆加密
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        public static byte[] SHA256(string? text)
        {
            if (string.IsNullOrEmpty(text)) return [];
            byte[] source = Encoding.UTF8.GetBytes(text);//將字串轉為Byte[]
            byte[] hash = System.Security.Cryptography.SHA256.HashData(source);//進行SHA256加密
            return hash;
        }

        /// <summary>
        /// hash to string
        /// </summary>
        /// <param name="hash">hash</param>
        /// <param name="binary">二進次</param>
        /// <returns>hash string</returns>
        public static string GetStringFromHash(byte[] hash, bool binary)
        {
            if (hash.Length == 0) return "";
            StringBuilder result = new();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            if (binary)
            {
                return String.Join(String.Empty,
                    result.ToString().Select(
                    c => Convert.ToString(Convert.ToInt32(c.ToString(), 16), 2).PadLeft(4, '0')
                    ));
            }
            else
            {
                return result.ToString();
            }
        }

        /// <summary>
        /// 可逆加密
        /// </summary>
        /// <param name="Text">加密資訊</param>
        /// <param name="CryptoKey">加密金鑰</param>
        /// <returns>密文</returns>
        public static string Sy_Encoder(string? Text, string? CryptoKey)
        {
            if (string.IsNullOrEmpty(CryptoKey) || string.IsNullOrEmpty(Text)) return Text ?? "";
            string encrypt = "";
            Aes aes = Aes.Create();
            byte[] key = System.Security.Cryptography.SHA256.HashData(Encoding.UTF8.GetBytes(CryptoKey));
            byte[] iv = SHA512.HashData(Encoding.UTF8.GetBytes(CryptoKey));
            aes.Key = key;
            aes.IV = iv.Take(16).ToArray();//取前128bits
            aes.Mode = CipherMode.CFB;
            byte[] dataByteArray = Encoding.UTF8.GetBytes(Text);
            using (MemoryStream ms = new())
            {
                using (CryptoStream cs = new(ms, aes.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(dataByteArray, 0, dataByteArray.Length);
                    cs.FlushFinalBlock();

                    encrypt = GetStringFromHash(ms.ToArray(), false);
                }
            }

            return encrypt;
        }


        /// <summary>
        /// 可逆解密
        /// </summary>
        /// <param name="Text">解密資訊</param>
        /// <param name="CryptoKey">解密金鑰</param>
        /// <returns>明文</returns>
        public static string Sy_Decoder(string? Text, string? CryptoKey)
        {
            try
            {
                if (string.IsNullOrEmpty(Text)) return "";
                if (string.IsNullOrEmpty(CryptoKey)) return Text;
                string decrypt = "";
                Aes aes = Aes.Create();
                byte[] key = System.Security.Cryptography.SHA256.HashData(Encoding.UTF8.GetBytes(CryptoKey));
                byte[] iv = SHA512.HashData(Encoding.UTF8.GetBytes(CryptoKey));
                aes.Key = key;
                aes.IV = iv.Take(16).ToArray();//取前128bits
                aes.Mode = CipherMode.CFB;
                byte[]? dataByteArray = null;

                dataByteArray = new byte[Text.Length / 2];
                for (int i = 0; i < Text.Length; i += 2)
                {
                    //每2位16進位數字轉換為一個10進位整數
                    dataByteArray[i / 2] = Convert.ToByte(Text.Substring(i, 2), 16);
                }

                using (MemoryStream ms = new())
                {
                    using (CryptoStream cs = new(ms, aes.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(dataByteArray, 0, dataByteArray.Length);
                        cs.FlushFinalBlock();
                        decrypt = Encoding.UTF8.GetString(ms.ToArray());
                    }
                }

                return decrypt;
            }
            catch
            {
                return "解密失敗請重新輸入";
            }
        }

        /// <summary>
        /// 產生組合亂碼[0-9 + A-Z]
        /// </summary>
        /// <param name="Number">亂碼長度</param>
        /// <returns>亂碼</returns>
        public static string CreateRandomCode(int Number, string allChar_input = "")
        {
            string allChar = string.IsNullOrEmpty(allChar_input) ? "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z" : allChar_input;
            string[] allCharArray = allChar.Split(',');
            string randomCode = "";
            int temp = -1;

            Random rand = new(Guid.NewGuid().GetHashCode());
            for (int i = 0; i < Number; i++)
            {
                if (temp != -1)
                {
                    rand = new Random(Guid.NewGuid().GetHashCode());
                }
                int t = rand.Next(allCharArray.Length);
                if (temp != -1 && temp == t)
                {
                    return CreateRandomCode(Number, allChar_input);
                }
                temp = t;
                randomCode += allCharArray[t];
            }
            return randomCode;
        }

        /// <summary>
        /// 取得某目錄的上幾層的目錄路徑
        /// </summary>
        /// <param name="folderPath">目錄路徑</param>
        /// <param name="levels">要往上幾層</param>
        /// <returns>路徑</returns>
        public static string GetParentDirectoryPath(this string folderPath, int levels)
        {
            string result = folderPath;
            for (int i = 0; i < levels; i++)
            {
                if (Directory.GetParent(result) != null)
                {
                    result = Directory.GetParent(result).FullName;
                }
                else
                {
                    return result;
                }
            }
            return result;
        }

        /// <summary>
        /// 建立檔案JSON
        /// </summary>
        /// <param name="filePath">路徑</param>
        /// <param name="fileName">檔名</param>
        /// <param name="content">內文</param>
        /// <returns></returns>
        public static void CreateJsonFile(string filePath, string fileName, object content)
        {
            if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);
            if (File.Exists(filePath + fileName)) File.Delete(filePath + fileName);
            using (FileStream fs = new(filePath + fileName, FileMode.Create))
            {
                fs.Close();
            }

            using (StreamWriter sw = new(filePath + fileName, true))
            {
                sw.Write(JsonConvert.SerializeObject(content));
            }
        }

        /// <summary>
        /// 重設JSON檔案
        /// </summary>
        /// <param name="path"></param>
        /// <param name="name"></param>
        /// <param name="content"></param>
        public static void ResetJsonFile(string path, string name, object content)
        {
            string filePath = GetParentDirectoryPath(AppDomain.CurrentDomain.SetupInformation.ApplicationBase, 2) + path;
            string fileName = $"{name}.json";
            CreateJsonFile(filePath, fileName, content);
        }

        /// <summary>
        /// md5加密
        /// </summary>
        /// <param name="Number">欲加密文字</param>
        /// <returns>密文</returns>
        public static string MD5(string strSource)
        {
            byte[] data = System.Security.Cryptography.MD5.HashData(Encoding.Default.GetBytes(strSource));
            StringBuilder sBuilder = new();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }

        /// <summary>
        /// 字串變成datetime
        /// </summary>
        /// <param name="date"></param>
        /// <param name="length"></param>
        /// <returns></returns>
        public static DateTime StringToDatetime(string date, int length)
        {
            string format = "yyyyMMddHHmmss";
            return DateTime.ParseExact(date[..length], format[..length], CultureInfo.InvariantCulture);
        }

        /// <summary>
        /// 從GTL寄送 - HTML格式的Email
        /// </summary>
        /// <param name="strMailFrom">Mail From</param>
        /// <param name="strMailTo">Mail To</param>
        /// <param name="strSubject">Mail Subject</param>
        /// <param name="strContent">Mail Content</param>
        /// <returns>bool</returns>
        public static bool SendHtmlMailFromGTL(string strMailTo, string strSubject, string strContent, bool boolBodyHtml = true)
        {
            try
            {
                string mail_token = Appsettings.ConfigurationManager._config["mail_token"] ?? "";
                string get_token_uri = Appsettings.ConfigurationManager._config["get_token_uri"] ?? "";
                string send_mail_uri = Appsettings.ConfigurationManager._config["send_mail_uri"] ?? "";

                object get_token_param = new
                {
                    token = mail_token
                };
                ResultObject<object> get_token_res = PostAPI(get_token_uri, get_token_param);
                MSGSTokenGet get_token_obj = JsonConvert.DeserializeObject<MSGSTokenGet>(get_token_res.data.ToString());
                if (!get_token_res.success || !get_token_obj.success) return false;
                object send_email_param = new
                {
                    email = strMailTo,
                    subject = strSubject,
                    body = strContent
                };
                ResultObject<object> send_email_res = PostAPI(send_mail_uri, send_email_param, get_token_obj.token);
                ResultObject<object> send_email_obj = JsonConvert.DeserializeObject<ResultObject<object>>(send_email_res.data.ToString());
                if (!send_email_res.success || !send_email_obj.success) return false;
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// 呼叫API - POST
        /// </summary>
        /// <param name="api_url">網址</param>
        /// <param name="param">參數</param>
        /// <param name="token">Token</param>
        /// <returns></returns>
        public static ResultObject<object> PostAPI(string api_url, object param, string token = "")
        {
            try
            {
                StringContent data = new(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");

                using HttpClient client = new();

                if (!string.IsNullOrEmpty(token)) client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                HttpResponseMessage response = client.PostAsync(api_url, data).Result;

                string result = response.Content.ReadAsStringAsync().Result;

                return new ResultObject<object> { success = true, message = "", data = result };
            }
            catch (Exception e)
            {
                return new ResultObject<object> { success = false, message = e.Message };
            }
        }

        /// <summary>
        /// datetime變成字串
        /// </summary>
        /// <param name="date"></param>
        /// <param name="length"></param>
        /// <returns></returns>
        public static string DatetimeToString(DateTime date, int length)
        {
            string format = "yyyyMMddHHmmss";
            return date.ToString(format.Substring(0, length));
        }

        /// <summary>
        /// 建立檔案 HttpPostedFile
        /// </summary>
        /// <param name="filePath">路徑</param>
        /// <param name="fileName">檔名</param>
        /// <param name="content">內文</param>
        /// <returns></returns>
        public static bool CreateFile(string filePath, string fileName, IFormFile content)
        {
            try
            {
                if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);
                if (File.Exists(filePath + fileName)) File.Delete(filePath + fileName);

                using (Stream fileStream = new FileStream(filePath + @"\" + fileName, FileMode.Create))
                {
                    content.CopyTo(fileStream);
                    fileStream.Dispose();
                }

                //DirectoryInfo di = new DirectoryInfo(filePath);
                //FileInfo[] fileArray = di.GetFiles("*.*");
                //SortAsFileName(ref fileArray);
                //for (int i = 0; i < fileArray.Length; i++) if (i >= 50) File.Delete(filePath + fileArray[i].Name);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// 用base64建立檔案
        /// </summary>
        /// <param name="base64string"></param>
        /// <param name="filePath"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static bool UploadAnyFileBase64(string base64string, string filePath, string fileName)
        {
            try
            {
                if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);
                if (!File.Exists(filePath + fileName)) File.Delete(filePath + fileName);

                byte[] imageBytes = Convert.FromBase64String(base64string);

                File.WriteAllBytes(filePath + @"\" + fileName, imageBytes);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
