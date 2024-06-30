namespace AirportTransferService.Models
{
    /// <summary>
    /// UserControl
    /// </summary>
    public class UserControl { }

    /// <summary>
    /// Signin
    /// </summary>
    public class Signin
    {
        /// <summary>
        /// username
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [NotChinese]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "帳號")]
        public string username { get; set; } = "";

        /// <summary>
        /// password
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "密碼")]
        public string password { get; set; } = "";

        private string _device_type = "";
        /// <summary>
        /// device_type
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [DeviceType]
        [Display(Name = "裝置類型")]
        public string device_type { get { return _device_type; } set { _device_type = value.ToUpper(); } }

        /// <summary>
        /// device_code
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [MinLength(14, ErrorMessage = "{0}長度固定為{1}")]
        [MaxLength(14, ErrorMessage = "{0}長度固定為{1}")]
        [Display(Name = "裝置編號")]
        public string device_code { get; set; } = "";

        /// <summary>
        /// check_code
        /// </summary>
        [Display(Name = "驗證碼")]
        public string check_code { get; set; } = "";
    }

    /// <summary>
    /// ForgetPassword
    /// </summary>
    public class ForgetPassword
    {
        /// <summary>
        /// username
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [NotChinese]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "帳號")]
        public string username { get; set; } = "";

        /// <summary>
        /// email
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsEmail]
        [MaxLength(120, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "電子信箱")]
        public string email { get; set; } = "";
    }

    /// <summary>
    /// ChangeToken
    /// </summary>
    public class ChangeToken
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "帳號編號")]
        public string user_id { get; set; } = "";
    }

    /// <summary>
    /// UserSimulate
    /// </summary>
    public class UserSimulate
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "帳號編號")]
        public string user_id { get; set; } = "";
    }
}