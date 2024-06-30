using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    #region PageGroup
    /// <summary>
    /// PageGroup
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="pg_id"></param>
    /// <param name="su"></param>
    /// <param name="seq"></param>
    /// <param name="system"></param>
    /// <param name="menus"></param>
    /// <param name="code"></param>
    /// <param name="icon"></param>
    /// <param name="name"></param>
    public class PageGroup(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? pg_id = null,
        string? su = null,
        int? seq = null,
        string? system = null,
        string? menus = null,
        string? code = null,
        string? icon = null,
        string? name = null)
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
        /// pg_id
        /// </summary>
        [Key]
        public int? pg_id { get; } = pg_id;

        /// <summary>
        /// su
        /// </summary>
        public string? su { get; } = su;

        /// <summary>
        /// seq
        /// </summary>
        public int? seq { get; } = seq;

        /// <summary>
        /// system
        /// </summary>
        public string? system { get; } = system;

        /// <summary>
        /// menus
        /// </summary>
        public string? menus { get; } = menus;

        /// <summary>
        /// code
        /// </summary>
        public string? code { get; } = code;

        /// <summary>
        /// icon
        /// </summary>
        public string? icon { get; } = icon;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;
    }

    /// <summary>
    /// CreatePageGroupParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="su"></param>
    /// <param name="system"></param>
    /// <param name="menus"></param>
    /// <param name="code"></param>
    /// <param name="name"></param>
    /// <param name="icon"></param>
    /// <param name="seq"></param>
    public class CreatePageGroupParam(
        string cre_userid,
        DateTime cre_time,
        string? su,
        string? system,
        string? menus,
        string? code,
        string? name,
        string? icon = null,
        int? seq = null) : PageGroup(
              cre_userid: cre_userid,
              cre_time: cre_time,
              su: su,
              seq: seq,
              system: system,
              menus: menus,
              code: code,
              icon: icon,
              name: name)
    {
    }

    /// <summary>
    /// UpdatePageGroupParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="pg_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="su"></param>
    /// <param name="seq"></param>
    /// <param name="system"></param>
    /// <param name="menus"></param>
    /// <param name="code"></param>
    /// <param name="icon"></param>
    /// <param name="name"></param>
    public class UpdatePageGroupParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int pg_id,
        string? cre_userid = api_string_param_no_pass,
        string? su = api_string_param_no_pass,
        int? seq = api_numeric_param_no_pass,
        string? system = api_string_param_no_pass,
        string? menus = api_string_param_no_pass,
        string? code = api_string_param_no_pass,
        string? icon = api_string_param_no_pass,
        string? name = api_string_param_no_pass) : PageGroup(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              pg_id: pg_id,
              su: su,
              seq: seq,
              system: system,
              menus: menus,
              code: code,
              icon: icon,
              name: name)
    {
    }

    /// <summary>
    /// SearchPageGroupParam
    /// </summary>
    /// <param name="pg_id"></param>
    /// <param name="su"></param>
    /// <param name="system"></param>
    /// <param name="menus"></param>
    /// <param name="code"></param>
    /// <param name="name"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchPageGroupParam(
        int? pg_id = null,
        string? su = null,
        string? system = null,
        string? menus = null,
        string? code = null,
        string? name = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// pg_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "PageGroup.pg_id")]
        public int? pg_id { get; } = pg_id;

        /// <summary>
        /// su
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "PageGroup.su")]
        public string? su { get; } = su;

        /// <summary>
        /// system
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "PageGroup.system")]
        public string? system { get; } = system;

        /// <summary>
        /// menus
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "PageGroup.menus")]
        public string? menus { get; } = menus;

        /// <summary>
        /// code
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "PageGroup.code")]
        public string? code { get; } = code;

        /// <summary>
        /// name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "PageGroup.name")]
        public string? name { get; } = name;

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
    /// SearchPageGroupResult
    /// </summary>
    public class SearchPageGroupResult : IEquatable<SearchPageGroupResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("PageGroup.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("PageGroup.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("PageGroup.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("PageGroup.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// pg_id
        /// </summary>
        [SQLSource("PageGroup.pg_id")]
        public int? pg_id { get; set; }

        /// <summary>
        /// su
        /// </summary>
        [SQLSource("PageGroup.su")]
        public string? su { get; set; }

        /// <summary>
        /// seq
        /// </summary>
        [SQLSource("PageGroup.seq")]
        public int? seq { get; set; }

        /// <summary>
        /// system
        /// </summary>
        [SQLSource("PageGroup.system")]
        public string? system { get; set; }

        /// <summary>
        /// menus
        /// </summary>
        [SQLSource("PageGroup.menus")]
        public string? menus { get; set; }

        /// <summary>
        /// code
        /// </summary>
        [SQLSource("PageGroup.code")]
        public string? code { get; set; }

        /// <summary>
        /// icon
        /// </summary>
        [SQLSource("PageGroup.icon")]
        public string? icon { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("PageGroup.name")]
        public string? name { get; set; }

        /// <summary>
        /// system_name
        /// </summary>
        [SQLSource("ISNULL(system.name,'')")]
        public string? system_name { get; set; }

        /// <summary>
        /// menus_name
        /// </summary>
        [SQLSource("ISNULL(menus.name,'')")]
        public string? menus_name { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchPageGroupResult"></param>
        /// <returns></returns>
        public bool Equals(SearchPageGroupResult? searchPageGroupResult)
        {
            //Check whether the compared object is null.  
            if (searchPageGroupResult is null) return false;

            //Check whether the compared object references the same data.  
            if (Object.ReferenceEquals(this, searchPageGroupResult)) return true;
            return
            cre_userid == searchPageGroupResult.cre_userid &&
            cre_time == searchPageGroupResult.cre_time &&
            upd_userid == searchPageGroupResult.upd_userid &&
            upd_time == searchPageGroupResult.upd_time &&
            pg_id == searchPageGroupResult.pg_id &&
            su == searchPageGroupResult.su &&
            seq == searchPageGroupResult.seq &&
            system == searchPageGroupResult.system &&
            menus == searchPageGroupResult.menus &&
            code == searchPageGroupResult.code &&
            icon == searchPageGroupResult.icon &&
            name == searchPageGroupResult.name &&
            system_name == searchPageGroupResult.system_name &&
            menus_name == searchPageGroupResult.menus_name;
        }

        // If Equals() returns true for a pair of objects   
        // then GetHashCode() must return the same value for these objects.  

        /// <summary>
        /// GetHashCode
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            int hash_cre_userid = cre_userid == null ? 0 : cre_userid.GetHashCode();
            int hash_cre_time = cre_time == null ? 0 : cre_time.GetHashCode();
            int hash_upd_userid = upd_userid == null ? 0 : upd_userid.GetHashCode();
            int hash_upd_time = upd_time == null ? 0 : upd_time.GetHashCode();
            int hash_pg_id = pg_id == null ? 0 : pg_id.GetHashCode();
            int hash_su = su == null ? 0 : su.GetHashCode();
            int hash_seq = seq == null ? 0 : seq.GetHashCode();
            int hash_system = system == null ? 0 : system.GetHashCode();
            int hash_menus = menus == null ? 0 : menus.GetHashCode();
            int hash_code = code == null ? 0 : code.GetHashCode();
            int hash_icon = icon == null ? 0 : icon.GetHashCode();
            int hash_name = name == null ? 0 : name.GetHashCode();
            int hash_system_name = system_name == null ? 0 : system_name.GetHashCode();
            int hash_menus_name = menus_name == null ? 0 : menus_name.GetHashCode();
            return
            hash_cre_userid ^
            hash_cre_time ^
            hash_upd_userid ^
            hash_upd_time ^
            hash_pg_id ^
            hash_su ^
            hash_seq ^
            hash_system ^
            hash_menus ^
            hash_code ^
            hash_icon ^
            hash_name ^
            hash_system_name ^
            hash_menus_name;
        }
    }
    #endregion

    #region Pages
    /// <summary>
    /// Pages
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="page_id"></param>
    /// <param name="pg_id"></param>
    /// <param name="su"></param>
    /// <param name="seq"></param>
    /// <param name="code"></param>
    /// <param name="icon"></param>
    /// <param name="name"></param>
    public class Pages(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? page_id = null,
        int? pg_id = null,
        string? su = null,
        int? seq = null,
        string? code = null,
        string? icon = null,
        string? name = null)
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
        /// page_id
        /// </summary>
        [Key]
        public int? page_id { get; } = page_id;

        /// <summary>
        /// pg_id
        /// </summary>
        public int? pg_id { get; } = pg_id;

        /// <summary>
        /// su
        /// </summary>
        public string? su { get; } = su;

        /// <summary>
        /// seq
        /// </summary>
        public int? seq { get; } = seq;

        /// <summary>
        /// code
        /// </summary>
        public string? code { get; } = code;

        /// <summary>
        /// icon
        /// </summary>
        public string? icon { get; } = icon;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;
    }

    /// <summary>
    /// CreatePagesParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="pg_id"></param>
    /// <param name="su"></param>
    /// <param name="code"></param>
    /// <param name="name"></param>
    /// <param name="seq"></param>
    /// <param name="icon"></param>
    public class CreatePagesParam(
        string cre_userid,
        DateTime cre_time,
        int pg_id,
        string? su,
        string? code,
        string? name,
        int? seq = null,
        string? icon = null) : Pages(
              cre_userid: cre_userid,
              cre_time: cre_time,
              pg_id: pg_id,
              su: su,
              seq: seq,
              code: code,
              icon: icon,
              name: name)
    {
    }

    /// <summary>
    /// UpdatePagesParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="page_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="pg_id"></param>
    /// <param name="su"></param>
    /// <param name="seq"></param>
    /// <param name="code"></param>
    /// <param name="icon"></param>
    /// <param name="name"></param>
    public class UpdatePagesParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int page_id,
        string? cre_userid = api_string_param_no_pass,
        int? pg_id = api_numeric_param_no_pass,
        string? su = api_string_param_no_pass,
        int? seq = api_numeric_param_no_pass,
        string? code = api_string_param_no_pass,
        string? icon = api_string_param_no_pass,
        string? name = api_string_param_no_pass) : Pages(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              page_id: page_id,
              pg_id: pg_id,
              su: su,
              seq: seq,
              code: code,
              icon: icon,
              name: name)
    {
    }

    /// <summary>
    /// SearchPagesParam
    /// </summary>
    /// <param name="page_id"></param>
    /// <param name="pg_id"></param>
    /// <param name="su"></param>
    /// <param name="code"></param>
    /// <param name="name"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchPagesParam(
        int? page_id = null,
        int? pg_id = null,
        string? su = null,
        string? code = null,
        string? name = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// page_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Pages.page_id")]
        public int? page_id { get; } = page_id;

        /// <summary>
        /// pg_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Pages.pg_id")]
        public int? pg_id { get; } = pg_id;

        /// <summary>
        /// su
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Pages.su")]
        public string? su { get; } = su;

        /// <summary>
        /// code
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "Pages.code")]
        public string? code { get; } = code;

        /// <summary>
        /// name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "Pages.name")]
        public string? name { get; } = name;

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
    /// SearchPagesResult
    /// </summary>
    public class SearchPagesResult : IEquatable<SearchPagesResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("Pages.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("Pages.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("Pages.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("Pages.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// page_id
        /// </summary>
        [SQLSource("Pages.page_id")]
        public int? page_id { get; set; }

        /// <summary>
        /// pg_id
        /// </summary>
        [SQLSource("Pages.pg_id")]
        public int? pg_id { get; set; }

        /// <summary>
        /// su
        /// </summary>
        [SQLSource("Pages.su")]
        public string? su { get; set; }

        /// <summary>
        /// seq
        /// </summary>
        [SQLSource("Pages.seq")]
        public int? seq { get; set; }

        /// <summary>
        /// code
        /// </summary>
        [SQLSource("Pages.code")]
        public string? code { get; set; }

        /// <summary>
        /// icon
        /// </summary>
        [SQLSource("Pages.icon")]
        public string? icon { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("Pages.name")]
        public string? name { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchPagesResult"></param>
        /// <returns></returns>
        public bool Equals(SearchPagesResult? searchPagesResult)
        {
            //Check whether the compared object is null.  
            if (searchPagesResult is null) return false;

            //Check whether the compared object references the same data.  
            if (Object.ReferenceEquals(this, searchPagesResult)) return true;
            return
                cre_userid == searchPagesResult.cre_userid &&
                cre_time == searchPagesResult.cre_time &&
                upd_userid == searchPagesResult.upd_userid &&
                upd_time == searchPagesResult.upd_time &&
                page_id == searchPagesResult.page_id &&
                pg_id == searchPagesResult.pg_id &&
                su == searchPagesResult.su &&
                seq == searchPagesResult.seq &&
                code == searchPagesResult.code &&
                icon == searchPagesResult.icon &&
                name == searchPagesResult.name;
        }

        // If Equals() returns true for a pair of objects   
        // then GetHashCode() must return the same value for these objects.  

        /// <summary>
        /// GetHashCode
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            int hash_cre_userid = cre_userid == null ? 0 : cre_userid.GetHashCode();
            int hash_cre_time = cre_time == null ? 0 : cre_time.GetHashCode();
            int hash_upd_userid = upd_userid == null ? 0 : upd_userid.GetHashCode();
            int hash_upd_time = upd_time == null ? 0 : upd_time.GetHashCode();
            int hash_page_id = page_id == null ? 0 : page_id.GetHashCode();
            int hash_pg_id = pg_id == null ? 0 : pg_id.GetHashCode();
            int hash_su = su == null ? 0 : su.GetHashCode();
            int hash_seq = seq == null ? 0 : seq.GetHashCode();
            int hash_code = code == null ? 0 : code.GetHashCode();
            int hash_icon = icon == null ? 0 : icon.GetHashCode();
            int hash_name = name == null ? 0 : name.GetHashCode();
            return
            hash_cre_userid ^
            hash_cre_time ^
            hash_upd_userid ^
            hash_upd_time ^
            hash_page_id ^
            hash_pg_id ^
            hash_su ^
            hash_seq ^
            hash_code ^
            hash_icon ^
            hash_name;
        }
    }
    #endregion

    #region PageControl
    /// <summary>
    /// PageControl
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="pc_id"></param>
    /// <param name="page_id"></param>
    /// <param name="su"></param>
    /// <param name="code"></param>
    /// <param name="ctrl_code"></param>
    /// <param name="name"></param>
    public class PageControl(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? pc_id = null,
        int? page_id = null,
        string? su = null,
        string? code = null,
        string? ctrl_code = null,
        string? name = null)
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
        /// pc_id
        /// </summary>
        [Key]
        public int? pc_id { get; } = pc_id;

        /// <summary>
        /// page_id
        /// </summary>
        public int? page_id { get; } = page_id;

        /// <summary>
        /// su
        /// </summary>
        public string? su { get; } = su;

        /// <summary>
        /// code
        /// </summary>
        public string? code { get; } = code;

        /// <summary>
        /// ctrl_code
        /// </summary>
        public string? ctrl_code { get; } = ctrl_code;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;
    }

    /// <summary>
    /// CreatePageControlParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="page_id"></param>
    /// <param name="su"></param>
    /// <param name="code"></param>
    /// <param name="ctrl_code"></param>
    /// <param name="name"></param>
    public class CreatePageControlParam(
        string cre_userid,
        DateTime cre_time,
        int page_id,
        string? su,
        string? code,
        string? ctrl_code,
        string? name) : PageControl(
              cre_userid: cre_userid,
              cre_time: cre_time,
              page_id: page_id,
              su: su,
              code: code,
              ctrl_code: ctrl_code,
              name: name)
    {
    }

    /// <summary>
    /// UpdatePageControlParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="pc_id"></param>
    /// <param name="cre_userid"></param>
    /// <param name="page_id"></param>
    /// <param name="su"></param>
    /// <param name="code"></param>
    /// <param name="ctrl_code"></param>
    /// <param name="name"></param>
    public class UpdatePageControlParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int pc_id,
        string? cre_userid = api_string_param_no_pass,
        int? page_id = api_numeric_param_no_pass,
        string? su = api_string_param_no_pass,
        string? code = api_string_param_no_pass,
        string? ctrl_code = api_string_param_no_pass,
        string? name = api_string_param_no_pass) : PageControl(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              pc_id: pc_id,
              page_id: page_id,
              su: su,
              code: code,
              ctrl_code: ctrl_code,
              name: name)
    {
    }

    /// <summary>
    /// SearchPageControlParam
    /// </summary>
    /// <param name="pc_id"></param>
    /// <param name="page_id"></param>
    /// <param name="su"></param>
    /// <param name="code"></param>
    /// <param name="ctrl_code"></param>
    /// <param name="name"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchPageControlParam(
        int? pc_id = null,
        int? page_id = null,
        string? su = null,
        string? code = null,
        string? ctrl_code = null,
        string? name = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// pc_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "PageControl.pc_id")]
        public int? pc_id { get; } = pc_id;

        /// <summary>
        /// page_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "PageControl.page_id")]
        public int? page_id { get; } = page_id;

        /// <summary>
        /// su
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "PageControl.su")]
        public string? su { get; } = su;

        /// <summary>
        /// code
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "PageControl.code")]
        public string? code { get; } = code;

        /// <summary>
        /// ctrl_code
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "PageControl.ctrl_code")]
        public string? ctrl_code { get; } = ctrl_code;

        /// <summary>
        /// name
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "PageControl.name")]
        public string? name { get; } = name;

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
    /// SearchPageControlResult
    /// </summary>
    public class SearchPageControlResult : IEquatable<SearchPageControlResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("PageControl.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("PageControl.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("PageControl.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("PageControl.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// pc_id
        /// </summary>
        [SQLSource("PageControl.pc_id")]
        public int? pc_id { get; set; }

        /// <summary>
        /// page_id
        /// </summary>
        [SQLSource("PageControl.page_id")]
        public int? page_id { get; set; }

        /// <summary>
        /// su
        /// </summary>
        [SQLSource("PageControl.su")]
        public string? su { get; set; }

        /// <summary>
        /// code
        /// </summary>
        [SQLSource("PageControl.code")]
        public string? code { get; set; }

        /// <summary>
        /// ctrl_code
        /// </summary>
        [SQLSource("PageControl.ctrl_code")]
        public string? ctrl_code { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("PageControl.name")]
        public string? name { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchPageControlResult"></param>
        /// <returns></returns>
        public bool Equals(SearchPageControlResult? searchPageControlResult)
        {
            //Check whether the compared object is null.  
            if (searchPageControlResult is null) return false;

            //Check whether the compared object references the same data.  
            if (Object.ReferenceEquals(this, searchPageControlResult)) return true;
            return
                cre_userid == searchPageControlResult.cre_userid &&
                cre_time == searchPageControlResult.cre_time &&
                upd_userid == searchPageControlResult.upd_userid &&
                upd_time == searchPageControlResult.upd_time &&
                pc_id == searchPageControlResult.pc_id &&
                page_id == searchPageControlResult.page_id &&
                su == searchPageControlResult.su &&
                code == searchPageControlResult.code &&
                ctrl_code == searchPageControlResult.ctrl_code &&
                name == searchPageControlResult.name;
        }

        // If Equals() returns true for a pair of objects   
        // then GetHashCode() must return the same value for these objects.  

        /// <summary>
        /// GetHashCode
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            int hash_cre_userid = cre_userid == null ? 0 : cre_userid.GetHashCode();
            int hash_cre_time = cre_time == null ? 0 : cre_time.GetHashCode();
            int hash_upd_userid = upd_userid == null ? 0 : upd_userid.GetHashCode();
            int hash_upd_time = upd_time == null ? 0 : upd_time.GetHashCode();
            int hash_pc_id = pc_id == null ? 0 : pc_id.GetHashCode();
            int hash_page_id = page_id == null ? 0 : page_id.GetHashCode();
            int hash_su = su == null ? 0 : su.GetHashCode();
            int hash_code = code == null ? 0 : code.GetHashCode();
            int hash_ctrl_code = ctrl_code == null ? 0 : ctrl_code.GetHashCode();
            int hash_name = name == null ? 0 : name.GetHashCode();
            return
                hash_cre_userid ^
                hash_cre_time ^
                hash_upd_userid ^
                hash_upd_time ^
                hash_pc_id ^
                hash_page_id ^
                hash_su ^
                hash_code ^
                hash_ctrl_code ^
                hash_name;
        }
    }
    #endregion

    #region API
    #region PageGroup
    /// <summary>
    /// AddPageGroup
    /// </summary>
    public class AddPageGroup
    {
        private string _su = "Y";
        /// <summary>
        /// su
        /// </summary>
        [YN]
        [Display(Name = "是否系統使用")]
        public string su { get { return _su; } set { if (value.ToUpper().Equals("N")) _su = value.ToUpper(); } }

        /// <summary>
        /// seq
        /// </summary>
        [IsNumeric]
        [Display(Name = "序號")]
        public int seq { get; set; } = 0;

        /// <summary>
        /// system
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsCode]
        [Display(Name = "系統代號")]
        public string system { get; set; } = "";

        /// <summary>
        /// menus
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsCode]
        [Display(Name = "選單代號")]
        public string menus { get; set; } = "";

        /// <summary>
        /// code
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsLetter]
        [MinLength(3, ErrorMessage = "{0}長度最小為{1}字元")]
        [MaxLength(20, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "代碼")]
        public string code { get; set; } = "";

        private string _icon = "";
        /// <summary>
        /// icon
        /// </summary>
        [NotChinese]
        [MaxLength(20, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "icon")]
        public string icon { get { return _icon; } set { _icon = value; } }

        /// <summary>
        /// name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "名稱")]
        public string name { get; set; } = "";
    }

    /// <summary>
    /// PageGroupEdit
    /// </summary>
    public class PageGroupEdit
    {
        /// <summary>
        /// pg_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面群組編號")]
        public int pg_id { get; set; } = 0;
    }

    /// <summary>
    /// UpdatePageGroup
    /// </summary>
    public class UpdatePageGroup
    {
        /// <summary>
        /// pg_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面群組編號")]
        public int pg_id { get; set; } = 0;

        /// <summary>
        /// su
        /// </summary>
        [Display(Name = "是否系統使用")]
        public string? su { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// seq
        /// </summary>
        [Display(Name = "序號")]
        public int? seq { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// system
        /// </summary>
        [Display(Name = "系統代號")]
        public string? system { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// menus
        /// </summary>
        [Display(Name = "選單代號")]
        public string? menus { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// code
        /// </summary>
        [Display(Name = "代碼")]
        public string? code { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// icon
        /// </summary>
        [Display(Name = "icon")]
        public string? icon { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; } = api_string_param_no_pass;
    }
    #endregion

    #region Pages
    /// <summary>
    /// AddPages
    /// </summary>
    public class AddPages
    {
        /// <summary>
        /// pg_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面群組編號")]
        public int pg_id { get; set; } = 0;

        private string _su = "Y";
        /// <summary>
        /// su
        /// </summary>
        [YN]
        [Display(Name = "是否系統使用")]
        public string su { get { return _su; } set { if (value.ToUpper().Equals("N")) _su = value.ToUpper(); } }

        /// <summary>
        /// seq
        /// </summary>
        [IsNumeric]
        [Display(Name = "序號")]
        public int seq { get; set; } = 0;

        /// <summary>
        /// code
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsLetter]
        [MinLength(3, ErrorMessage = "{0}長度最小為{1}字元")]
        [MaxLength(20, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "代碼")]
        public string code { get; set; } = "";

        private string _icon = "";
        /// <summary>
        /// icon
        /// </summary>
        [NotChinese]
        [MaxLength(20, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "icon")]
        public string icon { get { return _icon; } set { _icon = value; } }

        /// <summary>
        /// name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "名稱")]
        public string name { get; set; } = "";
    }

    /// <summary>
    /// PagesEdit
    /// </summary>
    public class PagesEdit
    {
        /// <summary>
        /// page_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面編號")]
        public int page_id { get; set; } = 0;
    }

    /// <summary>
    /// UpdatePages
    /// </summary>
    public class UpdatePages
    {
        /// <summary>
        /// page_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面編號")]
        public int page_id { get; set; } = 0;

        /// <summary>
        /// pg_id
        /// </summary>
        [Display(Name = "頁面群組編號")]
        public int? pg_id { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// su
        /// </summary>
        [Display(Name = "是否系統使用")]
        public string? su { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// seq
        /// </summary>
        [Display(Name = "序號")]
        public int? seq { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// code
        /// </summary>
        [Display(Name = "代碼")]
        public string? code { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// icon
        /// </summary>
        [Display(Name = "icon")]
        public string? icon { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; } = api_string_param_no_pass;
    }
    #endregion

    #region PageControl
    /// <summary>
    /// AddPageControl
    /// </summary>
    public class AddPageControl
    {
        /// <summary>
        /// page_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面編號")]
        public int page_id { get; set; } = 0;

        private string _su = "Y";
        /// <summary>
        /// su
        /// </summary>
        [YN]
        [Display(Name = "是否系統使用")]
        public string su { get { return _su; } set { if (value.ToUpper().Equals("N")) _su = value.ToUpper(); } }

        private string _code = "";
        /// <summary>
        /// code
        /// </summary>
        [PageControlCode]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "頁面代碼")]
        public string code { get { return _code; } set { _code = value; } }

        /// <summary>
        /// ctrl_code
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsLetter]
        [MinLength(3, ErrorMessage = "{0}長度最小為{1}字元")]
        [MaxLength(20, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "控制項代碼")]
        public string ctrl_code { get; set; } = "";

        /// <summary>
        /// name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "名稱")]
        public string name { get; set; } = "";
    }

    /// <summary>
    /// PageControlEdit
    /// </summary>
    public class PageControlEdit
    {
        /// <summary>
        /// pc_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面控制項編號")]
        public int pc_id { get; set; } = 0;
    }

    /// <summary>
    /// UpdatePageControl
    /// </summary>
    public class UpdatePageControl
    {
        /// <summary>
        /// pc_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面控制項編號")]
        public int pc_id { get; set; } = 0;

        /// <summary>
        /// page_id
        /// </summary>
        [Display(Name = "頁面編號")]
        public int? page_id { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// su
        /// </summary>
        [Display(Name = "是否系統使用")]
        public string? su { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// code
        /// </summary>
        [Display(Name = "頁面代碼")]
        public string? code { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// ctrl_code
        /// </summary>
        [Display(Name = "控制項代碼")]
        public string? ctrl_code { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; } = api_string_param_no_pass;
    }
    #endregion

    /// <summary>
    /// PermissionObject
    /// </summary>
    public class PermissionObject
    {
        /// <summary>
        /// pg_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面群組編號")]
        public int pg_id { get; set; } = 0;

        /// <summary>
        /// page_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "頁面編號")]
        public int page_id { get; set; } = 0;

        /// <summary>
        /// pc_id
        /// </summary>
        [Display(Name = "頁面控制項編號")]
        public int? pc_id { get; set; }
    }
    #endregion
}