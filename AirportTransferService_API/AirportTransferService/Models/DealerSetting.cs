namespace AirportTransferService.Models
{
    /// <summary>
    /// DealerSetting
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ds_id"></param>
    /// <param name="ds_code"></param>
    /// <param name="ds_name"></param>
    /// <param name="ds_dbname"></param>
    public class DealerSetting(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? ds_id = null,
        string? ds_code = null,
        string? ds_name = null,
        string? ds_dbname = null)
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
        /// ds_id
        /// </summary>
        [Key]
        public int? ds_id { get; } = ds_id;

        /// <summary>
        /// ds_code
        /// </summary>
        public string? ds_code { get; } = ds_code;

        /// <summary>
        /// ds_name
        /// </summary>
        public string? ds_name { get; } = ds_name;

        /// <summary>
        /// ds_dbname
        /// </summary>
        public string? ds_dbname { get; } = ds_dbname;
    }

    /// <summary>
    /// CreateDealerSettingParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="ds_code"></param>
    /// <param name="ds_name"></param>
    /// <param name="ds_dbname"></param>
    public class CreateDealerSettingParam(
        string cre_userid,
        DateTime cre_time,
        string? ds_code = null,
        string? ds_name = null,
        string? ds_dbname = null) : DealerSetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              ds_code: ds_code,
              ds_name: ds_name,
              ds_dbname: ds_dbname)
    {
    }

    /// <summary>
    /// UpdateDealerSettingParam
    /// </summary>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="ds_id"></param>
    /// <param name="ds_code"></param>
    /// <param name="ds_name"></param>
    /// <param name="ds_dbname"></param>
    public class UpdateDealerSettingParam(
        string upd_userid,
        DateTime upd_time,
        int ds_id,
        string? ds_code = null,
        string? ds_name = null,
        string? ds_dbname = null) : DealerSetting(
              upd_userid: upd_userid,
              upd_time: upd_time,
              ds_id: ds_id,
              ds_code: ds_code,
              ds_name: ds_name,
              ds_dbname: ds_dbname)
    {
    }

    /// <summary>
    /// SearchDealerSettingParam
    /// </summary>
    /// <param name="ds_id"></param>
    /// <param name="ds_code"></param>
    /// <param name="ds_name"></param>
    /// <param name="ds_dbname"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchDealerSettingParam(
        int? ds_id = null,
        string? ds_code = null,
        string? ds_name = null,
        string? ds_dbname = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// ds_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "DealerSetting.ds_id")]
        public int? ds_id { get; } = ds_id;

        /// <summary>
        /// ds_code
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "DealerSetting.ds_code")]
        public string? ds_code { get; } = ds_code;

        /// <summary>
        /// ds_name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "DealerSetting.ds_name")]
        public string? ds_name { get; } = ds_name;

        /// <summary>
        /// ds_dbname
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "DealerSetting.ds_dbname")]
        public string? ds_dbname { get; } = ds_dbname;

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
    /// SearchDealerSettingResult
    /// </summary>
    public class SearchDealerSettingResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("DealerSetting.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("DealerSetting.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("DealerSetting.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("DealerSetting.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// ds_id
        /// </summary>
        [SQLSource("DealerSetting.ds_id")]
        public int? ds_id { get; set; }

        /// <summary>
        /// ds_code
        /// </summary>
        [SQLSource("DealerSetting.ds_code")]
        public string? ds_code { get; set; }

        /// <summary>
        /// ds_name
        /// </summary>
        [SQLSource("DealerSetting.ds_name")]
        public string? ds_name { get; set; }

        /// <summary>
        /// ds_dbname
        /// </summary>
        [SQLSource("DealerSetting.ds_dbname")]
        public string? ds_dbname { get; set; }
    }
}