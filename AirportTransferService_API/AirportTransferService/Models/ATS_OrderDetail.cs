using System.Security.Cryptography;
using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_OrderDetail
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="od_id"></param>
    /// <param name="visible"></param>
    /// <param name="o_id"></param>
    /// <param name="es_id"></param>
    /// <param name="es_type"></param>
    /// <param name="es_name"></param>
    /// <param name="es_price"></param>
    /// <param name="count"></param>
    /// <param name="total_price"></param>
    public class ATS_OrderDetail(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? od_id = null,
        string? visible = null,
        string? o_id = null,
        string? es_id = null,
        string? es_type = null,
        string? es_name = null,
        decimal? es_price = null,
        int? count = null,
        decimal? total_price = null)
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
        /// od_id
        /// </summary>
        [Key]
        public string? od_id { get; } = od_id;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;

        /// <summary>
        /// o_id
        /// </summary>
        public string? o_id { get; } = o_id;

        /// <summary>
        /// es_id
        /// </summary>
        public string? es_id { get; } = es_id;

        /// <summary>
        /// es_type
        /// </summary>
        public string? es_type { get; } = es_type;

        /// <summary>
        /// es_name
        /// </summary>
        public string? es_name { get; } = es_name;

        /// <summary>
        /// es_price
        /// </summary>
        public decimal? es_price { get; } = es_price;

        /// <summary>
        /// count
        /// </summary>
        public decimal? count { get; } = count;

        /// <summary>
        /// total_price
        /// </summary>
        public decimal? total_price { get; } = total_price;
    }

    /// <summary>
    /// CreateATS_OrderDetailParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="visible"></param>
    /// <param name="o_id"></param>
    /// <param name="es_id"></param>
    /// <param name="es_type"></param>
    /// <param name="es_name"></param>
    /// <param name="es_price"></param>
    /// <param name="count"></param>
    /// <param name="total_price"></param>
    public class CreateATS_OrderDetailParam(
        string? cre_userid,
        DateTime? cre_time,
        string? visible,
        string? o_id,
        string? es_id,
        string? es_type,
        string? es_name,
        decimal? es_price,
        int? count,
        decimal? total_price) : ATS_OrderDetail(
            cre_userid: cre_userid,
            cre_time: cre_time,
            visible: visible,
            o_id: o_id,
            es_id: es_id,
            es_type: es_type,
            es_name: es_name,
            es_price: es_price,
            count: count,
            total_price: total_price)
    {
    }

    /// <summary>
    /// SearchATS_OrderDetailParam
    /// </summary>
    /// <param name="od_id"></param>
    /// <param name="visible"></param>
    /// <param name="o_id"></param>
    /// <param name="es_id"></param>
    /// <param name="es_type"></param>
    /// <param name="es_name"></param>
    /// <param name="es_price"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_OrderDetailParam(
        string? od_id = null,
        string? visible = null,
        string? o_id = null,
        string? es_id = null,
        string? es_type = null,
        string? es_name = null,
        decimal? es_price = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// od_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderDetail.od_id")]
        public string? od_id { get; } = od_id;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_OrderDetail.visible")]
        public string? visible { get; } = visible;

        /// <summary>
        /// o_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderDetail.o_id")]
        public string? o_id { get; } = o_id;

        /// <summary>
        /// es_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_OrderDetail.es_id")]
        public string? es_id { get; } = es_id;

        /// <summary>
        /// es_type
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "ATS_OrderDetail.es_type")]
        public string? es_type { get; } = es_type;

        /// <summary>
        /// es_name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderDetail.es_name")]
        public string? es_name { get; } = es_name;

        /// <summary>
        /// es_price
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderDetail.es_price")]
        public decimal? es_price { get; } = es_price;

        /// <summary>
        /// page
        /// </summary>
        public int page { get; } = page;

        /// <summary>
        /// num_per_page
        /// </summary>
        public int num_per_page { get; } = num_per_page;
    }

    /// <summary>
    /// SearchATS_OrderDetailResult
    /// </summary>
    public class SearchATS_OrderDetailResult : IEquatable<SearchATS_OrderDetailResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_OrderDetail.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_OrderDetail.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_OrderDetail.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_OrderDetail.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// od_id
        /// </summary>
        [SQLSource("ATS_OrderDetail.od_id")]
        public string? od_id { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("ATS_OrderDetail.visible")]
        public string? visible { get; set; }

        /// <summary>
        /// o_id
        /// </summary>
        [SQLSource("ATS_OrderDetail.o_id")]
        public string? o_id { get; set; }

        /// <summary>
        /// es_id
        /// </summary>
        [SQLSource("ATS_OrderDetail.es_id")]
        public string? es_id { get; set; }

        /// <summary>
        /// es_type
        /// </summary>
        [SQLSource("ATS_OrderDetail.es_type")]
        public string? es_type { get; set; }

        /// <summary>
        /// es_name
        /// </summary>
        [SQLSource("ATS_OrderDetail.es_name")]
        public string? es_name { get; set; }

        /// <summary>
        /// es_price
        /// </summary>
        [SQLSource("ATS_OrderDetail.es_price")]
        public decimal? es_price { get; set; }

        /// <summary>
        /// count
        /// </summary>
        [SQLSource("ATS_OrderDetail.count")]
        public int? count { get; set; }

        /// <summary>
        /// total_price
        /// </summary>
        [SQLSource("ATS_OrderDetail.total_price")]
        public decimal? total_price { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_OrderDetailResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_OrderDetailResult? searchATS_OrderDetailResult)
        {
            if (searchATS_OrderDetailResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_OrderDetailResult)) return true;

            return
                cre_userid == searchATS_OrderDetailResult.cre_userid &&
                cre_time == searchATS_OrderDetailResult.cre_time &&
                upd_userid == searchATS_OrderDetailResult.upd_userid &&
                upd_time == searchATS_OrderDetailResult.upd_time &&
                od_id == searchATS_OrderDetailResult.od_id &&
                visible == searchATS_OrderDetailResult.visible &&
                o_id == searchATS_OrderDetailResult.o_id &&
                es_id == searchATS_OrderDetailResult.es_id &&
                es_type == searchATS_OrderDetailResult.es_type &&
                es_name == searchATS_OrderDetailResult.es_name &&
                es_price == searchATS_OrderDetailResult.es_price &&
                count == searchATS_OrderDetailResult.count &&
                total_price == searchATS_OrderDetailResult.total_price;
        }
    }

    #region API
    /// <summary>
    /// ATS_OrderDetailCreate
    /// </summary>
    public class ATS_OrderDetailCreate
    {
        /// <summary>
        /// 訂單編號
        /// </summary>
        [Display(Name = "訂單編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? o_id { get; set; } = "";

        /// <summary>
        /// 加購編號
        /// </summary>
        [Display(Name = "加購編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? es_id { get; set; } = "";

        /// <summary>
        /// 數量
        /// </summary>
        [Display(Name = "數量"), Required(ErrorMessage = "請輸入{0}")]
        public string? count { get; set; } = "";
    }

    /// <summary>
    /// ATS_OrderDetailSearch
    /// </summary>
    public class ATS_OrderDetailSearch
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? od_id { get; set; } = "";

        /// <summary>
        /// 頁碼
        /// </summary>
        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        /// <summary>
        /// 一頁幾筆
        /// </summary>
        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 10;

        /// <summary>
        /// 是否匯出
        /// </summary>
        [Display(Name = "是否匯出"), YN]
        public string excel { get; set; } = "N";

        /// <summary>
        /// 訂單編號
        /// </summary>
        [Display(Name = "訂單編號")]
        public string? o_id { get; set; } = "";

        /// <summary>
        /// 加購編號
        /// </summary>
        [Display(Name = "加購編號")]
        public string? es_id { get; set; } = "";

        /// <summary>
        /// 加購類別
        /// </summary>
        [Display(Name = "加購類別")]
        public string? es_type { get; set; } = "";

        /// <summary>
        /// 加購名稱
        /// </summary>
        [Display(Name = "加購名稱")]
        public string? es_name { get; set; } = "";
    }

    /// <summary>
    /// ATS_OrderDetailSearchResult
    /// </summary>
    public class ATS_OrderDetailSearchResponse
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? od_id { get; set; } = "";

        /// <summary>
        /// 訂單編號
        /// </summary>
        [Display(Name = "訂單編號")]
        public string? o_id { get; set; } = "";

        /// <summary>
        /// 加購編號
        /// </summary>
        [Display(Name = "加購編號")]
        public string? es_id { get; set; } = "";

        /// <summary>
        /// 加購類別
        /// </summary>
        [Display(Name = "加購類別")]
        public string? es_type { get; set; } = "";

        /// <summary>
        /// 加購名稱
        /// </summary>
        [Display(Name = "加購名稱")]
        public string? es_name { get; set; } = "";

        /// <summary>
        /// 加購價錢
        /// </summary>
        [Display(Name = "加購價錢")]
        public decimal? es_price { get; set; } = 0;

        /// <summary>
        /// 數量
        /// </summary>
        [Display(Name = "數量")]
        public decimal? count { get; set; } = 0;

        /// <summary>
        /// 加購價錢總計
        /// </summary>
        [Display(Name = "加購價錢總計")]
        public decimal? total_price { get; set; } = 0;
    }

    /// <summary>
    /// ATS_OrderDetailDelete
    /// </summary>
    public class ATS_OrderDetailDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? od_id { get; set; } = "";
    }
    #endregion
}
