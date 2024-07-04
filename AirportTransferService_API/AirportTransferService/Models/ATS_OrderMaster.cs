using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    /// <summary>
    /// ATS_OrderMaster
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="o_id"></param>
    /// <param name="visible"></param>
    /// <param name="type"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    /// <param name="address"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    /// <param name="flght_number"></param>
    /// <param name="date_travel"></param>
    /// <param name="time_travel"></param>
    /// <param name="number_passenger"></param>
    /// <param name="number_bags"></param>
    /// <param name="cms_id"></param>
    /// <param name="signboard_title"></param>
    /// <param name="signboard_content"></param>
    /// <param name="name_purchaser"></param>
    /// <param name="phone_purchaser"></param>
    /// <param name="email_purchaser"></param>
    /// <param name="name_passenger"></param>
    /// <param name="phone_passenger"></param>
    /// <param name="email_passenger"></param>
    /// <param name="price"></param>
    /// <param name="link"></param>
    public class ATS_OrderMaster(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? o_id = null,
        string? visible = null,
        string? type = null,
        string? city = null,
        string? area = null,
        string? road = null,
        string? section = null,
        string? address = null,
        string? airport = null,
        string? terminal = null,
        string? flght_number = null,
        DateOnly? date_travel = null,
        TimeOnly? time_travel = null,
        int? number_passenger = null,
        int? number_bags = null,
        string? cms_id = null,
        string? signboard_title = null,
        string? signboard_content = null,
        string? name_purchaser = null,
        string? phone_purchaser = null,
        string? email_purchaser = null,
        string? name_passenger = null,
        string? phone_passenger = null,
        string? email_passenger = null,
        decimal? price = null,
        string? link = null)
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
        /// o_id
        /// </summary>
        [Key]
        public string? o_id { get; } = o_id;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;

        /// <summary>
        /// type
        /// </summary>
        public string? type { get; } = type;

        /// <summary>
        /// city
        /// </summary>
        public string? city { get; } = city;

        /// <summary>
        /// area
        /// </summary>
        public string? area { get; } = area;

        /// <summary>
        /// road
        /// </summary>
        public string? road { get; } = road;

        /// <summary>
        /// section
        /// </summary>
        public string? section { get; } = section;

        /// <summary>
        /// address
        /// </summary>
        public string? address { get; } = address;

        /// <summary>
        /// airport
        /// </summary>
        public string? airport { get; } = airport;

        /// <summary>
        /// terminal
        /// </summary>
        public string? terminal { get; } = terminal;

        /// <summary>
        /// flght_number
        /// </summary>
        public string? flght_number { get; } = flght_number;

        /// <summary>
        /// date_travel
        /// </summary>
        public DateOnly? date_travel { get; } = date_travel;

        /// <summary>
        /// time_travel
        /// </summary>
        public TimeOnly? time_travel { get; } = time_travel;

        /// <summary>
        /// number_passenger
        /// </summary>
        public int? number_passenger { get; } = number_passenger;

        /// <summary>
        /// number_bags
        /// </summary>
        public int? number_bags { get; } = number_bags;

        /// <summary>
        /// cms_id
        /// </summary>
        public string? cms_id { get; } = cms_id;

        /// <summary>
        /// signboard_title
        /// </summary>
        public string? signboard_title { get; } = signboard_title;

        /// <summary>
        /// signboard_content
        /// </summary>
        public string? signboard_content { get; } = signboard_content;

        /// <summary>
        /// name_purchaser
        /// </summary>
        public string? name_purchaser { get; } = name_purchaser;

        /// <summary>
        /// phone_purchaser
        /// </summary>
        public string? phone_purchaser { get; } = phone_purchaser;

        /// <summary>
        /// email_purchaser
        /// </summary>
        public string? email_purchaser { get; } = email_purchaser;

        /// <summary>
        /// name_passenger
        /// </summary>
        public string? name_passenger { get; } = name_passenger;

        /// <summary>
        /// phone_passenger
        /// </summary>
        public string? phone_passenger { get; } = phone_passenger;

        /// <summary>
        /// email_passenger
        /// </summary>
        public string? email_passenger { get; } = email_passenger;

        /// <summary>
        /// price
        /// </summary>
        public decimal? price { get; } = price;

        /// <summary>
        /// link
        /// </summary>
        public string? link { get; } = link;
    }

    /// <summary>
    /// CreateATS_OrderMasterParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="visible"></param>
    /// <param name="type"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    /// <param name="address"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    /// <param name="flght_number"></param>
    /// <param name="date_travel"></param>
    /// <param name="time_travel"></param>
    /// <param name="number_passenger"></param>
    /// <param name="number_bags"></param>
    /// <param name="cms_id"></param>
    /// <param name="signboard_title"></param>
    /// <param name="signboard_content"></param>
    /// <param name="name_purchaser"></param>
    /// <param name="phone_purchaser"></param>
    /// <param name="email_purchaser"></param>
    /// <param name="name_passenger"></param>
    /// <param name="phone_passenger"></param>
    /// <param name="email_passenger"></param>
    /// <param name="price"></param>
    /// <param name="link"></param>
    public class CreateATS_OrderMasterParam(
        string? cre_userid,
        DateTime? cre_time,
        string? visible,
        string? type,
        string? city,
        string? area,
        string? road,
        string? section,
        string? address,
        string? airport,
        string? terminal,
        string? flght_number,
        DateOnly? date_travel,
        TimeOnly? time_travel,
        int? number_passenger,
        int? number_bags,
        string? cms_id,
        string? signboard_title,
        string? signboard_content,
        string? name_purchaser,
        string? phone_purchaser,
        string? email_purchaser,
        string? name_passenger,
        string? phone_passenger,
        string? email_passenger,
        decimal? price,
        string? link) : ATS_OrderMaster(
            cre_userid: cre_userid,
            cre_time: cre_time,
            visible: visible,
            type: type,
            city: city,
            area: area,
            road: road,
            section: section,
            address: address,
            airport: airport,
            terminal: terminal,
            flght_number: flght_number,
            date_travel: date_travel,
            time_travel: time_travel,
            number_passenger: number_passenger,
            number_bags: number_bags,
            cms_id: cms_id,
            signboard_title: signboard_title,
            signboard_content: signboard_content,
            name_purchaser: name_purchaser,
            phone_purchaser: phone_purchaser,
            email_purchaser: email_purchaser,
            name_passenger: name_passenger,
            phone_passenger: phone_passenger,
            email_passenger: email_passenger,
            price: price,
            link: link)
    {
    }

    /// <summary>
    /// UpdateATS_OrderMasterParam
    /// </summary>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="o_id"></param>
    /// <param name="date_travel"></param>
    /// <param name="time_travel"></param>
    /// <param name="visible"></param>
    /// <param name="type"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    /// <param name="address"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    /// <param name="flght_number"></param>
    /// <param name="number_passenger"></param>
    /// <param name="number_bags"></param>
    /// <param name="cms_id"></param>
    /// <param name="signboard_title"></param>
    /// <param name="signboard_content"></param>
    /// <param name="name_purchaser"></param>
    /// <param name="phone_purchaser"></param>
    /// <param name="email_purchaser"></param>
    /// <param name="name_passenger"></param>
    /// <param name="phone_passenger"></param>
    /// <param name="email_passenger"></param>
    /// <param name="price"></param>
    /// <param name="link"></param>
    public class UpdateATS_OrderMasterParam(
        string? upd_userid,
        DateTime? upd_time,
        string? o_id,
        DateOnly? date_travel,
        TimeOnly? time_travel,
        string? visible = api_string_param_no_pass,
        string? type = api_string_param_no_pass,
        string? city = api_string_param_no_pass,
        string? area = api_string_param_no_pass,
        string? road = api_string_param_no_pass,
        string? section = api_string_param_no_pass,
        string? address = api_string_param_no_pass,
        string? airport = api_string_param_no_pass,
        string? terminal = api_string_param_no_pass,
        string? flght_number = api_string_param_no_pass,
        int? number_passenger = api_numeric_param_no_pass,
        int? number_bags = api_numeric_param_no_pass,
        string? cms_id = api_string_param_no_pass,
        string? signboard_title = api_string_param_no_pass,
        string? signboard_content = api_string_param_no_pass,
        string? name_purchaser = api_string_param_no_pass,
        string? phone_purchaser = api_string_param_no_pass,
        string? email_purchaser = api_string_param_no_pass,
        string? name_passenger = api_string_param_no_pass,
        string? phone_passenger = api_string_param_no_pass,
        string? email_passenger = api_string_param_no_pass,
        decimal? price = api_numeric_param_no_pass,
        string? link = api_string_param_no_pass) : ATS_OrderMaster(
            upd_userid: upd_userid,
            upd_time: upd_time,
            o_id: o_id,
            date_travel: date_travel,
            time_travel: time_travel,
            visible: visible,
            type: type,
            city: city,
            area: area,
            road: road,
            section: section,
            address: address,
            airport: airport,
            terminal: terminal,
            flght_number: flght_number,
            number_passenger: number_passenger,
            number_bags: number_bags,
            cms_id: cms_id,
            signboard_title: signboard_title,
            signboard_content: signboard_content,
            name_purchaser: name_purchaser,
            phone_purchaser: phone_purchaser,
            email_purchaser: email_purchaser,
            name_passenger: name_passenger,
            phone_passenger: phone_passenger,
            email_passenger: email_passenger,
            price: price,
            link: link)
    {
    }

    /// <summary>
    /// SearchATS_OrderMasterParam
    /// </summary>
    /// <param name="o_id"></param>
    /// <param name="visible"></param>
    /// <param name="type"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="road"></param>
    /// <param name="section"></param>
    /// <param name="address"></param>
    /// <param name="airport"></param>
    /// <param name="terminal"></param>
    /// <param name="flght_number"></param>
    /// <param name="date_travel"></param>
    /// <param name="time_travel"></param>
    /// <param name="number_passenger"></param>
    /// <param name="number_bags"></param>
    /// <param name="cms_id"></param>
    /// <param name="signboard_title"></param>
    /// <param name="signboard_content"></param>
    /// <param name="name_purchaser"></param>
    /// <param name="phone_purchaser"></param>
    /// <param name="email_purchaser"></param>
    /// <param name="name_passenger"></param>
    /// <param name="phone_passenger"></param>
    /// <param name="email_passenger"></param>
    /// <param name="price"></param>
    /// <param name="link"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchATS_OrderMasterParam(
        string? o_id = null,
        string? visible = null,
        string? type = null,
        string? city = null,
        string? area = null,
        string? road = null,
        string? section = null,
        string? address = null,
        string? airport = null,
        string? terminal = null,
        string? flght_number = null,
        DateOnly? date_travel = null,
        TimeOnly? time_travel = null,
        int? number_passenger = null,
        int? number_bags = null,
        string? cms_id = null,
        string? signboard_title = null,
        string? signboard_content = null,
        string? name_purchaser = null,
        string? phone_purchaser = null,
        string? email_purchaser = null,
        string? name_passenger = null,
        string? phone_passenger = null,
        string? email_passenger = null,
        decimal? price = null,
        string? link = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// o_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.o_id")]
        public string? o_id { get; } = o_id;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.visible")]
        public string? visible { get; } = visible;

        /// <summary>
        /// type
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.type")]
        public string? type { get; } = type;

        /// <summary>
        /// city
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.city")]
        public string? city { get; } = city;

        /// <summary>
        /// area
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.area")]
        public string? area { get; } = area;

        /// <summary>
        /// road
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.road")]
        public string? road { get; } = road;

        /// <summary>
        /// section
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.section")]
        public string? section { get; } = section;

        /// <summary>
        /// address
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.address")]
        public string? address { get; } = address;

        /// <summary>
        /// airport
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.airport")]
        public string? airport { get; } = airport;

        /// <summary>
        /// terminal
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.terminal")]
        public string? terminal { get; } = terminal;

        /// <summary>
        /// flght_number
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.flght_number")]
        public string? flght_number { get; } = flght_number;

        /// <summary>
        /// date_travel
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.date_travel")]
        public DateOnly? date_travel { get; } = date_travel;

        /// <summary>
        /// time_travel
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.time_travel")]
        public TimeOnly? time_travel { get; } = time_travel;

        /// <summary>
        /// number_passenger
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.number_passenger")]
        public int? number_passenger { get; } = number_passenger;

        /// <summary>
        /// number_bags
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.number_bags")]
        public int? number_bags { get; } = number_bags;

        /// <summary>
        /// cms_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.cms_id")]
        public string? cms_id { get; } = cms_id;

        /// <summary>
        /// signboard_title
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.signboard_title")]
        public string? signboard_title { get; } = signboard_title;

        /// <summary>
        /// signboard_content
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.signboard_content")]
        public string? signboard_content { get; } = signboard_content;

        /// <summary>
        /// name_purchaser
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.name_purchaser")]
        public string? name_purchaser { get; } = name_purchaser;

        /// <summary>
        /// phone_purchaser
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.phone_purchaser")]
        public string? phone_purchaser { get; } = phone_purchaser;

        /// <summary>
        /// email_purchaser
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.email_purchaser")]
        public string? email_purchaser { get; } = email_purchaser;

        /// <summary>
        /// name_passenger
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.name_passenger")]
        public string? name_passenger { get; } = name_passenger;

        /// <summary>
        /// phone_passenger
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.phone_passenger")]
        public string? phone_passenger { get; } = phone_passenger;

        /// <summary>
        /// email_passenger
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.email_passenger")]
        public string? email_passenger { get; } = email_passenger;

        /// <summary>
        /// price
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.price")]
        public decimal? price { get; } = price;

        /// <summary>
        /// link
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "ATS_OrderMaster.link")]
        public string? link { get; } = link;

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
    /// SearchATS_OrderMasterResult
    /// </summary>
    public class SearchATS_OrderMasterResult : IEquatable<SearchATS_OrderMasterResult>
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("ATS_OrderMaster.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("ATS_OrderMaster.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("ATS_OrderMaster.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("ATS_OrderMaster.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// o_id
        /// </summary>
        [SQLSource("ATS_OrderMaster.o_id")]
        public string? o_id { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("ATS_OrderMaster.visible")]
        public string? visible { get; set; }

        /// <summary>
        /// type
        /// </summary>
        [SQLSource("ATS_OrderMaster.type")]
        public string? type { get; set; }

        /// <summary>
        /// city
        /// </summary>
        [SQLSource("ATS_OrderMaster.city")]
        public string? city { get; set; }

        /// <summary>
        /// area
        /// </summary>
        [SQLSource("ATS_OrderMaster.area")]
        public string? area { get; set; }

        /// <summary>
        /// road
        /// </summary>
        [SQLSource("ATS_OrderMaster.road")]
        public string? road { get; set; }

        /// <summary>
        /// section
        /// </summary>
        [SQLSource("ATS_OrderMaster.section")]
        public string? section { get; set; }

        /// <summary>
        /// address
        /// </summary>
        [SQLSource("ATS_OrderMaster.address")]
        public string? address { get; set; }

        /// <summary>
        /// airport
        /// </summary>
        [SQLSource("ATS_OrderMaster.airport")]
        public string? airport { get; set; }

        /// <summary>
        /// terminal
        /// </summary>
        [SQLSource("ATS_OrderMaster.terminal")]
        public string? terminal { get; set; }

        /// <summary>
        /// flght_number
        /// </summary>
        [SQLSource("ATS_OrderMaster.flght_number")]
        public string? flght_number { get; set; }

        /// <summary>
        /// date_travel
        /// </summary>
        [SQLSource("ATS_OrderMaster.date_travel")]
        public DateOnly? date_travel { get; set; }

        /// <summary>
        /// time_travel
        /// </summary>
        [SQLSource("ATS_OrderMaster.time_travel")]
        public TimeOnly? time_travel { get; set; }

        /// <summary>
        /// number_passenger
        /// </summary>
        [SQLSource("ATS_OrderMaster.number_passenger")]
        public int? number_passenger { get; set; }

        /// <summary>
        /// number_bags
        /// </summary>
        [SQLSource("ATS_OrderMaster.number_bags")]
        public int? number_bags { get; set; }

        /// <summary>
        /// cms_id
        /// </summary>
        [SQLSource("ATS_OrderMaster.cms_id")]
        public string? cms_id { get; set; }

        /// <summary>
        /// signboard_title
        /// </summary>
        [SQLSource("ATS_OrderMaster.signboard_title")]
        public string? signboard_title { get; set; }

        /// <summary>
        /// signboard_content
        /// </summary>
        [SQLSource("ATS_OrderMaster.signboard_content")]
        public string? signboard_content { get; set; }

        /// <summary>
        /// name_purchaser
        /// </summary>
        [SQLSource("ATS_OrderMaster.name_purchaser")]
        public string? name_purchaser { get; set; }

        /// <summary>
        /// phone_purchaser
        /// </summary>
        [SQLSource("ATS_OrderMaster.phone_purchaser")]
        public string? phone_purchaser { get; set; }

        /// <summary>
        /// email_purchaser
        /// </summary>
        [SQLSource("ATS_OrderMaster.email_purchaser")]
        public string? email_purchaser { get; set; }

        /// <summary>
        /// name_passenger
        /// </summary>
        [SQLSource("ATS_OrderMaster.name_passenger")]
        public string? name_passenger { get; set; }

        /// <summary>
        /// phone_passenger
        /// </summary>
        [SQLSource("ATS_OrderMaster.phone_passenger")]
        public string? phone_passenger { get; set; }

        /// <summary>
        /// email_passenger
        /// </summary>
        [SQLSource("ATS_OrderMaster.email_passenger")]
        public string? email_passenger { get; set; }

        /// <summary>
        /// price
        /// </summary>
        [SQLSource("ATS_OrderMaster.price")]
        public decimal? price { get; set; }

        /// <summary>
        /// link
        /// </summary>
        [SQLSource("ATS_OrderMaster.link")]
        public string? link { get; set; }

        /// <summary>
        /// Equals
        /// </summary>
        /// <param name="searchATS_OrderMasterResult"></param>
        /// <returns></returns>
        public bool Equals(SearchATS_OrderMasterResult? searchATS_OrderMasterResult)
        {
            if (searchATS_OrderMasterResult is null) return false;

            if (Object.ReferenceEquals(this, searchATS_OrderMasterResult)) return true;

            return
                cre_userid == searchATS_OrderMasterResult.cre_userid &&
                cre_time == searchATS_OrderMasterResult.cre_time &&
                upd_userid == searchATS_OrderMasterResult.upd_userid &&
                upd_time == searchATS_OrderMasterResult.upd_time &&
                o_id == searchATS_OrderMasterResult.o_id &&
                visible == searchATS_OrderMasterResult.visible &&
                type == searchATS_OrderMasterResult.type &&
                city == searchATS_OrderMasterResult.city &&
                area == searchATS_OrderMasterResult.area &&
                road == searchATS_OrderMasterResult.road &&
                section == searchATS_OrderMasterResult.section &&
                address == searchATS_OrderMasterResult.address &&
                airport == searchATS_OrderMasterResult.airport &&
                terminal == searchATS_OrderMasterResult.terminal &&
                flght_number == searchATS_OrderMasterResult.flght_number &&
                date_travel == searchATS_OrderMasterResult.date_travel &&
                time_travel == searchATS_OrderMasterResult.time_travel &&
                number_passenger == searchATS_OrderMasterResult.number_passenger &&
                number_bags == searchATS_OrderMasterResult.number_bags &&
                cms_id == searchATS_OrderMasterResult.cms_id &&
                signboard_title == searchATS_OrderMasterResult.signboard_title &&
                signboard_content == searchATS_OrderMasterResult.signboard_content &&
                name_purchaser == searchATS_OrderMasterResult.name_purchaser &&
                phone_purchaser == searchATS_OrderMasterResult.phone_purchaser &&
                email_purchaser == searchATS_OrderMasterResult.email_purchaser &&
                name_passenger == searchATS_OrderMasterResult.name_passenger &&
                phone_passenger == searchATS_OrderMasterResult.phone_passenger &&
                email_passenger == searchATS_OrderMasterResult.email_passenger &&
                price == searchATS_OrderMasterResult.price &&
                link == searchATS_OrderMasterResult.link;
        }
    }

    #region API
    /// <summary>
    /// ATS_OrderMasterCreate
    /// </summary>
    public class ATS_OrderMasterCreate
    {
        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見"), Required(ErrorMessage = "請輸入{0}")]
        public string? visible { get; set; } = "N";

        /// <summary>
        /// 類別(接機/送機)
        /// </summary>
        [Display(Name = "類別(接機/送機)"), Required(ErrorMessage = "請輸入{0}")]
        public string? type { get; set; } = "";

        /// <summary>
        /// 城市
        /// </summary>
        [Display(Name = "城市"), Required(ErrorMessage = "請輸入{0}")]
        public string? city { get; set; } = "";

        /// <summary>
        /// 區域
        /// </summary>
        [Display(Name = "區域"), Required(ErrorMessage = "請輸入{0}")]
        public string? area { get; set; } = "";

        /// <summary>
        /// 路
        /// </summary>
        [Display(Name = "路"), Required(ErrorMessage = "請輸入{0}")]
        public string? road { get; set; } = "";

        /// <summary>
        /// 段
        /// </summary>
        [Display(Name = "段"), Required(ErrorMessage = "請輸入{0}")]
        public string? section { get; set; } = "";

        /// <summary>
        /// 巷弄與門牌號碼
        /// </summary>
        [Display(Name = "巷弄與門牌號碼"), Required(ErrorMessage = "請輸入{0}")]
        public string? address { get; set; } = "";

        /// <summary>
        /// 機場
        /// </summary>
        [Display(Name = "機場"), Required(ErrorMessage = "請輸入{0}")]
        public string? airport { get; set; } = "";

        /// <summary>
        /// 航廈
        /// </summary>
        [Display(Name = "航廈"), Required(ErrorMessage = "請輸入{0}")]
        public string? terminal { get; set; } = "";

        /// <summary>
        /// 航班號碼
        /// </summary>
        [Display(Name = "航班號碼"), Required(ErrorMessage = "請輸入{0}")]
        public string? flght_number { get; set; } = "";

        /// <summary>
        /// 乘車日期
        /// </summary>
        [Display(Name = "乘車日期"), Required(ErrorMessage = "請輸入{0}")]
        public DateOnly? date_travel { get; set; }

        /// <summary>
        /// 乘車時間
        /// </summary>
        [Display(Name = "乘車時間"), Required(ErrorMessage = "請輸入{0}")]
        public TimeOnly? time_travel { get; set; }

        /// <summary>
        /// 人數
        /// </summary>
        [Display(Name = "人數"), Required(ErrorMessage = "請輸入{0}")]
        public int? number_passenger { get; set; } = 0;

        /// <summary>
        /// 行李數
        /// </summary>
        [Display(Name = "行李數"), Required(ErrorMessage = "請輸入{0}")]
        public int? number_bags { get; set; } = 0;

        /// <summary>
        /// 車型編號
        /// </summary>
        [Display(Name = "車型編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? cms_id { get; set; } = "";

        /// <summary>
        /// 舉牌標題
        /// </summary>
        [Display(Name = "舉牌標題")]
        public string? signboard_title { get; set; } = "";

        /// <summary>
        /// 舉牌內容
        /// </summary>
        [Display(Name = "舉牌內容")]
        public string? signboard_content { get; set; } = "";

        /// <summary>
        /// 訂購人姓名
        /// </summary>
        [Display(Name = "訂購人姓名"), Required(ErrorMessage = "請輸入{0}")]
        public string? name_purchaser { get; set; } = "";

        /// <summary>
        /// 訂購人電話
        /// </summary>
        [Display(Name = "訂購人電話"), Required(ErrorMessage = "請輸入{0}")]
        public string? phone_purchaser { get; set; } = "";

        /// <summary>
        /// 訂購人電子信箱
        /// </summary>
        [Display(Name = "訂購人電子信箱"), Required(ErrorMessage = "請輸入{0}")]
        public string? email_purchaser { get; set; } = "";

        /// <summary>
        /// 乘客姓名
        /// </summary>
        [Display(Name = "乘客姓名"), Required(ErrorMessage = "請輸入{0}")]
        public string? name_passenger { get; set; } = "";

        /// <summary>
        /// 乘客電話
        /// </summary>
        [Display(Name = "乘客電話"), Required(ErrorMessage = "請輸入{0}")]
        public string? phone_passenger { get; set; } = "";

        /// <summary>
        /// 乘客電子信箱
        /// </summary>
        [Display(Name = "乘客電子信箱"), Required(ErrorMessage = "請輸入{0}")]
        public string? email_passenger { get; set; } = "";

        /// <summary>
        /// 價錢
        /// </summary>
        [Display(Name = "價錢"), Required(ErrorMessage = "請輸入{0}")]
        public decimal? price { get; set; } = 0;

        /// <summary>
        /// 連結
        /// </summary>
        [Display(Name = "連結"), Required(ErrorMessage = "請輸入{0}")]
        public string? link { get; set; } = "";
    }

    /// <summary>
    /// ATS_OrderMasterUpdate
    /// </summary>
    public class ATS_OrderMasterUpdate : ATS_OrderMasterCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? o_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_OrderMasterSearch
    /// </summary>
    public class ATS_OrderMasterSearch : ATS_OrderMasterCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? o_id { get; set; } = "";

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
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public new string? visible { get; set; } = "N";

        /// <summary>
        /// 類別(接機/送機)
        /// </summary>
        [Display(Name = "類別(接機/送機)")]
        public new string? type { get; set; } = "";

        /// <summary>
        /// 城市
        /// </summary>
        [Display(Name = "城市")]
        public new string? city { get; set; } = "";

        /// <summary>
        /// 區域
        /// </summary>
        [Display(Name = "區域")]
        public new string? area { get; set; } = "";

        /// <summary>
        /// 路
        /// </summary>
        [Display(Name = "路")]
        public new string? road { get; set; } = "";

        /// <summary>
        /// 段
        /// </summary>
        [Display(Name = "段")]
        public new string? section { get; set; } = "";

        /// <summary>
        /// 巷弄與門牌號碼
        /// </summary>
        [Display(Name = "巷弄與門牌號碼")]
        public new string? address { get; set; } = "";

        /// <summary>
        /// 機場
        /// </summary>
        [Display(Name = "機場")]
        public new string? airport { get; set; } = "";

        /// <summary>
        /// 航廈
        /// </summary>
        [Display(Name = "航廈")]
        public new string? terminal { get; set; } = "";

        /// <summary>
        /// 航班號碼
        /// </summary>
        [Display(Name = "航班號碼")]
        public new string? flght_number { get; set; } = "";

        /// <summary>
        /// 乘車日期
        /// </summary>
        [Display(Name = "乘車日期")]
        public new DateOnly? date_travel { get; set; }

        /// <summary>
        /// 乘車時間
        /// </summary>
        [Display(Name = "乘車時間")]
        public new TimeOnly? time_travel { get; set; }

        /// <summary>
        /// 人數
        /// </summary>
        [Display(Name = "人數")]
        public new int? number_passenger { get; set; } = 0;

        /// <summary>
        /// 行李數
        /// </summary>
        [Display(Name = "行李數")]
        public new int? number_bags { get; set; } = 0;

        /// <summary>
        /// 車型編號
        /// </summary>
        [Display(Name = "車型編號")]
        public new string? cms_id { get; set; } = "";

        /// <summary>
        /// 訂購人姓名
        /// </summary>
        [Display(Name = "訂購人姓名")]
        public new string? name_purchaser { get; set; } = "";

        /// <summary>
        /// 訂購人電話
        /// </summary>
        [Display(Name = "訂購人電話")]
        public new string? phone_purchaser { get; set; } = "";

        /// <summary>
        /// 訂購人電子信箱
        /// </summary>
        [Display(Name = "訂購人電子信箱")]
        public new string? email_purchaser { get; set; } = "";

        /// <summary>
        /// 乘客姓名
        /// </summary>
        [Display(Name = "乘客姓名")]
        public new string? name_passenger { get; set; } = "";

        /// <summary>
        /// 乘客電話
        /// </summary>
        [Display(Name = "乘客電話")]
        public new string? phone_passenger { get; set; } = "";

        /// <summary>
        /// 乘客電子信箱
        /// </summary>
        [Display(Name = "乘客電子信箱")]
        public new string? email_passenger { get; set; } = "";

        /// <summary>
        /// 價錢
        /// </summary>
        [Display(Name = "價錢")]
        public new decimal? price { get; set; } = 0;

        /// <summary>
        /// 連結
        /// </summary>
        [Display(Name = "連結")]
        public new string? link { get; set; } = "";
    }

    /// <summary>
    /// ATS_OrderMasterSearchResult
    /// </summary>
    public class ATS_OrderMasterSearchResponse : ATS_OrderMasterCreate
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號")]
        public string? o_id { get; set; } = "";
    }

    /// <summary>
    /// ATS_OrderMasterDelete
    /// </summary>
    public class ATS_OrderMasterDelete
    {
        /// <summary>
        /// 編號
        /// </summary>
        [Display(Name = "編號"), Required(ErrorMessage = "請輸入{0}")]
        public string? o_id { get; set; } = "";
    }
    #endregion
}
