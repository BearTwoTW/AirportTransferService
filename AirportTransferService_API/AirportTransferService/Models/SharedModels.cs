namespace AirportTransferService.Models
{
    /// <summary>
    /// ShareModels
    /// </summary>
    public class ShareModels { }

    /// <summary>
    /// DictionaryKeyValue
    /// </summary>
    public class DictionaryKeyValue
    {
        /// <summary>
        /// key
        /// </summary>
        public string key { get; set; } = "";

        /// <summary>
        /// value
        /// </summary>
        public string value { get; set; } = "";
    }

    /// <summary>
    /// DictionarySystemSetting
    /// </summary>
    public class DictionarySystemSetting : DictionaryKeyValue
    {
        /// <summary>
        /// type
        /// </summary>
        public string type { get; set; } = "";
    }

    /// <summary>
    /// AuthObject
    /// </summary>
    public class AuthObject
    {
        /// <summary>
        /// database_name
        /// </summary>
        public string database_name { get; set; } = "";

        /// <summary>
        /// company_code
        /// </summary>
        public string company_code { get; set; } = "";

        /// <summary>
        /// user_id
        /// </summary>
        public string user_id { get; set; } = "";

        /// <summary>
        /// ul_id
        /// </summary>
        public int ul_id { get; set; } = 0;

        /// <summary>
        /// device_column
        /// </summary>
        public string device_column { get; set; } = "";

        /// <summary>
        /// device_code
        /// </summary>
        public string device_code { get; set; } = "";

        /// <summary>
        /// iat
        /// </summary>
        public DateTime iat { get; set; }

        /// <summary>
        /// exp
        /// </summary>
        public DateTime exp { get; set; }

        /// <summary>
        /// Plant
        /// </summary>
        public string Plant { get; set; } = "";

        /// <summary>
        /// is_front
        /// </summary>
        public bool is_front { get; set; } = false;
    }

    /// <summary>
    /// ResultObject
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ResultObject<T>
    {
        /// <summary>
        /// success
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// message
        /// </summary>
        public string message { get; set; } = "";

        /// <summary>
        /// data
        /// </summary>
        public T? data { get; set; }

        /// <summary>
        /// page
        /// </summary>
        public int page { get; set; }

        /// <summary>
        /// count
        /// </summary>
        public int count { get; set; }
    }

    /// <summary>
    /// ResultObject
    /// </summary>
    public class ResultObject
    {
        /// <summary>
        /// success
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// message
        /// </summary>
        public string message { get; set; } = "";

        /// <summary>
        /// data
        /// </summary>
        public object data { get; set; }

        /// <summary>
        /// page
        /// </summary>
        public int page { get; set; }

        /// <summary>
        /// count
        /// </summary>
        public int count { get; set; }
    }

    /// <summary>
    /// MSGSTokenGet
    /// </summary>
    public class MSGSTokenGet
    {
        /// <summary>
        /// success
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// message
        /// </summary>
        public string message { get; set; }

        /// <summary>
        /// token
        /// </summary>
        public string token { get; set; }
    }

    /// <summary>
    /// DatatableOne
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class DatatableOne<T> : ResultObject<T>
    {
        /// <summary>
        /// data
        /// </summary>
        public new required DataTable data { get; set; }

        /// <summary>
        /// success
        /// </summary>
        public new bool success { get; set; }

        /// <summary>
        /// message
        /// </summary>
        public new required string message { get; set; }

        /// <summary>
        /// data_T
        /// </summary>
        public T? data_T { get; set; }

        /// <summary>
        /// page
        /// </summary>
        public new int page { get; set; }

        /// <summary>
        /// count
        /// </summary>
        public new int count { get; set; }
    }

    /// <summary>
    /// DatatableOne
    /// </summary>
    public class DatatableOne : ResultObject
    {
        /// <summary>
        /// data
        /// </summary>
        public new required DataTable data { get; set; }
    }

    /// <summary>
    /// DatatableList
    /// </summary>
    public class DatatableList : ResultObject
    {
        /// <summary>
        /// data
        /// </summary>
        public new List<DataTable> data = [];
    }

    /// <summary>
    /// PagingObject
    /// </summary>
    public class PagingObject
    {
        /// <summary>
        /// intPageCount
        /// </summary>
        public int intPageCount { get; set; }

        /// <summary>
        /// dt
        /// </summary>
        public required DataTable dt { get; set; }
    }

    /// <summary>
    /// CalendarObject
    /// </summary>
    public class CalendarObject
    {
        /// <summary>
        /// success
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// message
        /// </summary>
        public required string message { get; set; }
        //public Event retEvent { get; set; }
    }

    /// <summary>
    /// 只能英文
    /// </summary>
    public class IsLetterAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsLetter(value.ToString())) return new ValidationResult(string.Format("{0}包含非英文的內容", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 只能數字
    /// </summary>
    public class IsPlusIntegerAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsPlusInteger(value.ToString())) return new ValidationResult(string.Format("{0}包含非正整數的內容", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 只能數字
    /// </summary>
    public class IsNumericAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsNumeric(value.ToString())) return new ValidationResult(string.Format("{0}包含非數字的內容", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 只能正浮點數
    /// </summary>
    public class IsPlusFloatAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsPlusFloat(value.ToString())) return new ValidationResult(string.Format("{0}包含非正浮點數的內容", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 手機格式
    /// </summary>
    public class IsMobileAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsMobile(value.ToString())) return new ValidationResult(string.Format("{0}非手機格式", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 浮點數
    /// </summary>
    public class IsFloatAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsFloat(value.ToString())) return new ValidationResult(string.Format("{0}包含非正浮點數的內容", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 只能英文或數字
    /// </summary>
    public class IsNumericOrLetterAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsNumericOrLetter(value.ToString())) return new ValidationResult(string.Format("{0}包含非英文或數字的內容", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 不能有中文
    /// </summary>
    public class NotChineseAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (App_Code.Tool.IsChinese(value.ToString())) return new ValidationResult(string.Format("{0}包含中文的內容", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 年月
    /// </summary>
    public class IsMonthAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsNumeric(value.ToString())) return new ValidationResult(string.Format("{0}包含非數字的內容", validationContext.DisplayName));
                if (value.ToString().Length != 6) return new ValidationResult(string.Format("{0}長度固定為6", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 日期
    /// </summary>
    public class IsDateAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsNumeric(value.ToString())) return new ValidationResult(string.Format("{0}包含非數字的內容", validationContext.DisplayName));
                if (value.ToString().Length != 8) return new ValidationResult(string.Format("{0}長度固定為8", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 時間
    /// </summary>
    public class IsTimeAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsTime(value.ToString())) return new ValidationResult(string.Format(value + "不是可辨識的{0}格式", validationContext.DisplayName));
                if (value.ToString().Length != 5) return new ValidationResult(string.Format("{0}長度固定為5", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// Email
    /// </summary>
    public class IsEmailAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsEmail(value.ToString())) return new ValidationResult(string.Format(value + "不是可辨識的{0}格式", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 代碼
    /// </summary>
    public class IsCodeAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!App_Code.Tool.IsNumeric(value.ToString())) return new ValidationResult(string.Format("{0}包含非數字的內容", validationContext.DisplayName));
                if (value.ToString().Length != 3) return new ValidationResult(string.Format("{0}長度固定為3", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// YN
    /// </summary>
    public class YNAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                value = value.ToString();
                if (!value.Equals("Y") && !value.Equals("N")) return new ValidationResult(string.Format(value + "不是可辨識的{0}格式", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// device_type
    /// </summary>
    public class DeviceTypeAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                value = value.ToString();
                if (!value.Equals("WEB") && !value.Equals("APP")) return new ValidationResult(string.Format(value + "不是可辨識的{0}格式", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// PageControl code
    /// </summary>
    public class PageControlCodeAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (value.ToString().Length < 3) return new ValidationResult(string.Format("{0}長度最小為3字元", validationContext.DisplayName));
                if (!App_Code.Tool.IsLetter(value.ToString())) return new ValidationResult(string.Format("{0}包含非英文的內容", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// gender
    /// </summary>
    public class GenderAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                value = value.ToString();
                if (!value.Equals("M") && !value.Equals("F")) return new ValidationResult(string.Format(value + "不是可辨識的{0}格式", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// home_page
    /// </summary>
    public class HomePageAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                value = value.ToString();
                if (!value.Equals("DASHBOARD") && !value.Equals("F")) return new ValidationResult(string.Format(value + "不是可辨識的{0}格式", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// list int
    /// </summary>
    public class ListIntAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var list = value as List<string>;
            if (list.Count == 0) return new ValidationResult(string.Format("請輸入{0}", validationContext.DisplayName));
            else
            {
                foreach (string i in list)
                {
                    if (!App_Code.Tool.IsNumeric(i)) return new ValidationResult(string.Format("{0}包含非數字的內容", validationContext.DisplayName));
                }
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// list code
    /// </summary>
    public class ListCodeAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null)
            {
                var list = value as List<string>;
                if (list.Count > 0)
                {
                    foreach (string i in list)
                    {
                        if (i.Length > 10) return new ValidationResult(string.Format("{0}長度最大為10字元", validationContext.DisplayName));
                    }
                }
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// list user_id
    /// </summary>
    public class ListUseridAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null)
            {
                var list = value as List<string>;
                if (list.Count > 0)
                {
                    foreach (string i in list)
                    {
                        if (!App_Code.Tool.IsNumericOrLetter(i)) return new ValidationResult(string.Format("{0}包含非英文或數字的內容", validationContext.DisplayName));
                        if (i.Length != 6) return new ValidationResult(string.Format("{0}長度固定為6", validationContext.DisplayName));
                    }
                }
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// CarStock status
    /// </summary>
    public class CarStockStatusAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                value = value.ToString();
                if (!value.Equals("開放") && !value.Equals("未開放")) return new ValidationResult(string.Format(value + "不是可辨識的{0}格式", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// execute type
    /// </summary>
    public class IsExecuteTypeAttribute : ValidationAttribute
    {
        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null && value.ToString() != "")
            {
                if (!value.Equals("INS") && !value.Equals("UPD") && !value.Equals("DEL")) return new ValidationResult(string.Format(value + "不是可辨識的{0}格式", validationContext.DisplayName));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 固定長度檢查 要馬不打要馬要固定長度
    /// </summary>
    /// <remarks>
    /// FixLengthAttribute
    /// </remarks>
    /// <param name="length"></param>
    public class FixLengthAttribute(int length) : ValidationAttribute(() => "")
    {
        /// <summary>
        /// Length
        /// </summary>
        public int Length { get; private set; } = length;

        /// <summary>
        /// IsValid
        /// </summary>
        /// <param name="value"></param>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null)
            {
                if (!string.IsNullOrEmpty(value.ToString()) && value.ToString().Length != Length) return new ValidationResult(string.Format("{0}長度固定為{1}", validationContext.DisplayName, Length));
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 類別(接機/送機)
    /// </summary>
    public enum
        OrderType
    {
        /// <summary>
        /// 接機
        /// </summary>
        接機,

        /// <summary>
        /// 送機
        /// </summary>
        送機
    }

    /// <summary>
    /// 加購類型
    /// </summary>
    public enum ExtraType
    {
        /// <summary>
        /// 額外服務
        /// </summary>
        舉牌,
                  
        /// <summary>
        /// 額外費用
        /// </summary>
        合併,

        /// <summary>
        /// 其它
        /// </summary>
        其它
    }
}
