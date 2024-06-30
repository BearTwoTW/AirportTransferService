using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    #region SPP
    /// <summary>
    /// SPP
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="spp_id"></param>
    /// <param name="su"></param>
    /// <param name="name"></param>
    /// <param name="remark"></param>
    public class SPP(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? spp_id = null,
        string? su = null,
        string? name = null,
        string? remark = null)
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        public string? cre_userid { get; } = cre_userid;

        /// <summary>
        /// cre_time
        /// </summary>
        public DateTime? cre_time { get; } = cre_time;

        /// <summary>
        /// upd_userid
        /// </summary>
        public string? upd_userid { get; } = upd_userid;

        /// <summary>
        /// upd_time
        /// </summary>
        public DateTime? upd_time { get; } = upd_time;

        /// <summary>
        /// spp_id
        /// </summary>
        [Key]
        public string? spp_id { get; } = spp_id;

        /// <summary>
        /// su
        /// </summary>
        public string? su { get; } = su;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;

        /// <summary>
        /// remark
        /// </summary>
        public string? remark { get; } = remark;
    }

    /// <summary>
    /// CreateSPPParam
    /// </summary>
    public class CreateSPPParam : SPP
    {
        /// <summary>
        /// CreateSPPParam
        /// </summary>
        /// <param name="spp_id"></param>
        /// <param name="cre_userid"></param>
        /// <param name="cre_time"></param>
        /// <param name="su"></param>
        /// <param name="name"></param>
        /// <param name="remark"></param>
        /// <exception cref="NullReferenceException"></exception>
        public CreateSPPParam(
            string spp_id,
            string cre_userid,
            DateTime cre_time,
            string? su = null,
            string? name = null,
            string? remark = null)
            : base(
                  cre_userid: cre_userid,
                  cre_time: cre_time,
                  spp_id: spp_id,
                  su: su,
                  name: name,
                  remark: remark)
        {
            if (string.IsNullOrEmpty(spp_id)) throw new NullReferenceException(message: "Empty spp_id");
        }
    }

    /// <summary>
    /// SearchSPPParam
    /// </summary>
    public class SearchSPPParam
    {
        /// <summary>
        /// spp_ids
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.In, "SPP.spp_id")]
        public List<string>? spp_ids { get; }

        /// <summary>
        /// spp_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "SPP.spp_id")]
        public string? spp_id { get; }

        /// <summary>
        /// su
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "SPP.su")]
        public string? su { get; }

        /// <summary>
        /// SearchSPPParam
        /// </summary>
        /// <param name="spp_ids"></param>
        /// <param name="spp_id"></param>
        /// <param name="su"></param>
        /// <exception cref="NullReferenceException"></exception>
        public SearchSPPParam(
            List<string>? spp_ids = null,
            string? spp_id = null,
            string? su = null)
        {
            if (spp_ids != null && spp_ids.Exists(x => string.IsNullOrEmpty(x))) throw new NullReferenceException(message: "spp_ids Contains Empty Element");
            this.spp_ids = spp_ids;
            this.spp_id = spp_id;
            this.su = su;
        }
    }

    /// <summary>
    /// SearchSPPResult
    /// </summary>
    public class SearchSPPResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("SPP.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("SPP.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("SPP.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("SPP.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// spp_id
        /// </summary>
        [SQLSource("SPP.spp_id")]
        public string? spp_id { get; set; }

        /// <summary>
        /// su
        /// </summary>
        [SQLSource("SPP.su")]
        public string? su { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("SPP.name")]
        public string? name { get; set; }

        /// <summary>
        /// remark
        /// </summary>
        [SQLSource("SPP.remark")]
        public string? remark { get; set; }
    }

    /// <summary>
    /// UpdateSPPParam
    /// </summary>
    public class UpdateSPPParam : SPP
    {
        /// <summary>
        /// UpdateSPPParam
        /// </summary>
        /// <param name="cre_time"></param>
        /// <param name="spp_id"></param>
        /// <param name="upd_userid"></param>
        /// <param name="upd_time"></param>
        /// <param name="cre_userid"></param>
        /// <param name="su"></param>
        /// <param name="name"></param>
        /// <param name="remark"></param>
        /// <exception cref="NullReferenceException"></exception>
        public UpdateSPPParam(
            DateTime cre_time,
            string spp_id,
            string upd_userid,
            DateTime upd_time,
            string? cre_userid = api_string_param_no_pass,
            string? su = api_string_param_no_pass,
            string? name = api_string_param_no_pass,
            string? remark = api_string_param_no_pass)
            : base(
                  cre_userid: cre_userid,
                  cre_time: cre_time,
                  upd_userid: upd_userid,
                  upd_time: upd_time,
                  spp_id: spp_id,
                  su: su,
                  name: name,
                  remark: remark)
        {
            if (string.IsNullOrEmpty(spp_id)) throw new NullReferenceException(message: "Empty spp_id");
        }
    }
    #endregion

    #region SPS
    /// <summary>
    /// SPS
    /// </summary>
    public class SPS(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? sps_id = null,
        string? spp_id = null,
        string? name = null,
        string? code = null,
        string? remark = null,
        string? visible = null,
        int? seq = null)
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        public string? cre_userid { get; } = cre_userid;

        /// <summary>
        /// cre_time
        /// </summary>
        public DateTime? cre_time { get; } = cre_time;

        /// <summary>
        /// upd_userid
        /// </summary>
        public string? upd_userid { get; } = upd_userid;

        /// <summary>
        /// upd_time
        /// </summary>
        public DateTime? upd_time { get; } = upd_time;

        /// <summary>
        /// sps_id
        /// </summary>
        [Key]
        public string? sps_id { get; } = sps_id;

        /// <summary>
        /// spp_id
        /// </summary>
        [Key]
        public string? spp_id { get; } = spp_id;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;

        /// <summary>
        /// code
        /// </summary>
        public string? code { get; } = code;

        /// <summary>
        /// remark
        /// </summary>
        public string? remark { get; } = remark;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;

        /// <summary>
        /// seq
        /// </summary>
        public int? seq { get; } = seq;
    }

    /// <summary>
    /// CreateSPSParam
    /// </summary>
    public class CreateSPSParam : SPS
    {
        /// <summary>
        /// CreateSPSParam
        /// </summary>
        /// <param name="spp_id"></param>
        /// <param name="cre_userid"></param>
        /// <param name="cre_time"></param>
        /// <param name="name"></param>
        /// <param name="code"></param>
        /// <param name="remark"></param>
        /// <param name="visible"></param>
        /// <param name="seq"></param>
        /// <exception cref="NullReferenceException"></exception>
        public CreateSPSParam(
            string spp_id,
            string cre_userid,
            DateTime cre_time,
            string? name = null,
            string? code = null,
            string? remark = null,
            string? visible = null,
            int? seq = null)
            : base(
                  cre_userid: cre_userid,
                  cre_time: cre_time,
                  spp_id: spp_id,
                  name: name,
                  code: code,
                  remark: remark,
                  visible: visible,
                  seq: seq)
        {
            if (string.IsNullOrEmpty(spp_id)) throw new NullReferenceException(message: "Empty spp_id");
        }
    }

    /// <summary>
    /// SearchSPSParam
    /// </summary>
    public class SearchSPSParam
    {
        /// <summary>
        /// spp_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "SPS.spp_id")]
        public string spp_id { get; }

        /// <summary>
        /// sps_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "SPS.sps_id")]
        public string? sps_id { get; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "SPS.visible")]
        public string? visible { get; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "SPS.name")]
        public string? name { get; }

        /// <summary>
        /// SearchSPSParam
        /// </summary>
        /// <param name="spp_id"></param>
        /// <param name="sps_id"></param>
        /// <param name="visible"></param>
        /// <param name="name"></param>
        /// <exception cref="NullReferenceException"></exception>
        public SearchSPSParam(
            string spp_id,
            string? sps_id = null,
            string? visible = null,
            string? name = null)
        {
            if (string.IsNullOrEmpty(spp_id)) throw new NullReferenceException(message: "Empty spp_id");
            this.sps_id = sps_id;
            this.spp_id = spp_id;
            this.visible = visible;
            this.name = name;
        }
    }

    /// <summary>
    /// SearchSPSResult
    /// </summary>
    public class SearchSPSResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("SPS.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("SPS.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("SPS.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("SPS.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// sps_id
        /// </summary>
        [SQLSource("SPS.sps_id")]
        public string? sps_id { get; set; }

        /// <summary>
        /// spp_id
        /// </summary>
        [SQLSource("SPS.spp_id")]
        public string? spp_id { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("SPS.name")]
        public string? name { get; set; }

        /// <summary>
        /// code
        /// </summary>
        [SQLSource("SPS.code")]
        public string? code { get; set; }

        /// <summary>
        /// remark
        /// </summary>
        [SQLSource("SPS.remark")]
        public string? remark { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("SPS.visible")]
        public string? visible { get; set; }

        /// <summary>
        /// seq
        /// </summary>
        [SQLSource("SPS.seq")]
        public int? seq { get; set; }
    }

    /// <summary>
    /// UpdateSPSParam
    /// </summary>
    public class UpdateSPSParam : SPS
    {
        /// <summary>
        /// UpdateSPSParam
        /// </summary>
        /// <param name="cre_time"></param>
        /// <param name="sps_id"></param>
        /// <param name="spp_id"></param>
        /// <param name="upd_userid"></param>
        /// <param name="upd_time"></param>
        /// <param name="cre_userid"></param>
        /// <param name="name"></param>
        /// <param name="code"></param>
        /// <param name="remark"></param>
        /// <param name="visible"></param>
        /// <param name="seq"></param>
        /// <exception cref="NullReferenceException"></exception>
        public UpdateSPSParam(
            DateTime cre_time,
            string sps_id,
            string spp_id,
            string upd_userid,
            DateTime upd_time,
            string? cre_userid = api_string_param_no_pass,
            string? name = api_string_param_no_pass,
            string? code = api_string_param_no_pass,
            string? remark = api_string_param_no_pass,
            string? visible = api_string_param_no_pass,
            int? seq = api_numeric_param_no_pass)
            : base(
                  cre_userid: cre_userid,
                  cre_time: cre_time,
                  upd_userid: upd_userid,
                  upd_time: upd_time,
                  sps_id: sps_id,
                  spp_id: spp_id,
                  name: name,
                  code: code,
                  remark: remark,
                  visible: visible,
                  seq: seq)
        {
            if (string.IsNullOrEmpty(sps_id)) throw new NullReferenceException(message: "Empty sps_id");
            if (string.IsNullOrEmpty(spp_id)) throw new NullReferenceException(message: "Empty spp_id");
        }
    }
    #endregion

    /// <summary>
    /// PrimaryListResponse
    /// </summary>
    public class PrimaryListResponse
    {
        /// <summary>
        /// spp_id
        /// </summary>
        [Display(Name = "大分類代碼")]
        public string spp_id { get; set; } = "";

        /// <summary>
        /// su
        /// </summary>
        [Display(Name = "是否系統使用")]
        public string su { get; set; } = "";

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// remark
        /// </summary>
        [Display(Name = "備註")]
        public string remark { get; set; } = "";
    }

    /// <summary>
    /// AddPrimary
    /// </summary>
    public record AddPrimary
    {
        /// <summary>
        /// spp_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度固定為{1}")]
        [Display(Name = "大分類代碼")]
        public string spp_id { get; set; } = "";

        private string _su = "N";
        /// <summary>
        /// su
        /// </summary>
        [YN]
        [Display(Name = "是否系統使用")]
        public string su { get { return _su; } set { if (value.ToUpper().Equals("Y")) _su = value.ToUpper(); } }

        /// <summary>
        /// name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// remark
        /// </summary>
        [Display(Name = "備註")]
        public string remark { get; set; } = "";
    }

    /// <summary>
    /// UpdatePrimary
    /// </summary>
    public record UpdatePrimary
    {
        /// <summary>
        /// spp_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度固定為{1}")]
        [Display(Name = "大分類代碼")]
        public string spp_id { get; set; } = "";

        /// <summary>
        /// su
        /// </summary>
        [Display(Name = "是否系統使用")]
        public string? su { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// remark
        /// </summary>
        [Display(Name = "備註")]
        public string? remark { get; set; } = api_string_param_no_pass;
    }

    /// <summary>
    /// PrimaryDetail
    /// </summary>
    public class PrimaryDetail
    {
        /// <summary>
        /// spp_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度固定為{1}")]
        [Display(Name = "大分類代碼")]
        public string spp_id { get; set; } = "";

        /// <summary>
        /// visible
        /// </summary>
        [YN]
        [Display(Name = "是否可見")]
        public string visible { get; set; } = "";
    }

    /// <summary>
    /// SecondListResponse
    /// </summary>
    public class SecondListResponse
    {
        /// <summary>
        /// sps_id
        /// </summary>
        [Display(Name = "中分類代碼")]
        public string sps_id { get; set; } = "";

        /// <summary>
        /// spp_id
        /// </summary>
        [Display(Name = "大分類代碼")]
        public string spp_id { get; set; } = "";

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// code
        /// </summary>
        [Display(Name = "代號")]
        public string code { get; set; } = "";

        /// <summary>
        /// remark
        /// </summary>
        [Display(Name = "備註")]
        public string remark { get; set; } = "";

        /// <summary>
        /// visible
        /// </summary>
        [Display(Name = "是否可見")]
        public string visible { get; set; } = "";

        /// <summary>
        /// seq
        /// </summary>
        [Display(Name = "排序")]
        public int seq { get; set; } = 0;
    }

    /// <summary>
    /// AddSecond
    /// </summary>
    public class AddSecond
    {
        /// <summary>
        /// spp_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度固定為{1}")]
        [Display(Name = "大分類代碼")]
        public string spp_id { get; set; } = "";

        /// <summary>
        /// code
        /// </summary>
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "代號")]
        public string code { get; set; } = "";

        /// <summary>
        /// name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "名稱")]
        public string name { get; set; } = "";

        private string _remark = "";
        /// <summary>
        /// remark
        /// </summary>
        [Display(Name = "備註")]
        public string remark { get { return _remark; } set { _remark = value; } }

        /// <summary>
        /// seq
        /// </summary>
        [Display(Name = "排序")]
        public int seq { get; set; } = 0;
    }

    /// <summary>
    /// UpdateSecond
    /// </summary>
    public class UpdateSecond
    {
        /// <summary>
        /// spp_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度固定為{1}")]
        [Display(Name = "大分類代碼")]
        public string spp_id { get; set; } = "";

        /// <summary>
        /// sps_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsCode]
        [Display(Name = "中分類代碼")]
        public string sps_id { get; set; } = "";

        /// <summary>
        /// code
        /// </summary>
        [Display(Name = "代號")]
        public string? code { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// remark
        /// </summary>
        [Display(Name = "備註")]
        public string? remark { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// seq
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// visible
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = api_string_param_no_pass;
    }

    /// <summary>
    /// SecondDetail
    /// </summary>
    public class SecondDetail
    {
        /// <summary>
        /// spp_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度固定為{1}")]
        [Display(Name = "大分類代碼")]
        public string spp_id { get; set; } = "";

        /// <summary>
        /// sps_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsCode]
        [Display(Name = "中分類代碼")]
        public string sps_id { get; set; } = "";
    }

    /// <summary>
    /// CityAreaSearchResponse
    /// </summary>
    public class CityAreaSearchResponse
    {
        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "城市名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// children
        /// </summary>
        [Display(Name = "城市區域")]
        public List<AreaZip_obj> children { get; set; } = [];
    }

    /// <summary>
    /// AreaZip_obj
    /// </summary>
    public class AreaZip_obj
    {
        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "區域名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// code
        /// </summary>
        [Display(Name = "區域zip")]
        public string code { get; set; } = "";
    }
}
