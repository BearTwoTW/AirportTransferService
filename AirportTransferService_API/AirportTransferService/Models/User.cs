using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    #region Users
    /// <summary>
    /// User
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="disable"></param>
    /// <param name="company_code"></param>
    /// <param name="user_id"></param>
    /// <param name="username"></param>
    /// <param name="password"></param>
    /// <param name="name"></param>
    /// <param name="gender"></param>
    /// <param name="birthday"></param>
    /// <param name="telephone"></param>
    /// <param name="mobile_phone"></param>
    /// <param name="email"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="address"></param>
    /// <param name="city_census"></param>
    /// <param name="area_census"></param>
    /// <param name="address_census"></param>
    /// <param name="on_board_date"></param>
    /// <param name="note"></param>
    /// <param name="home_page"></param>
    /// <param name="signin_time"></param>
    /// <param name="check_code"></param>
    /// <param name="web_code"></param>
    /// <param name="app_code"></param>
    /// <param name="google_access_token"></param>
    /// <param name="google_refresh_token"></param>
    /// <param name="device_type"></param>
    /// <param name="device_token"></param>
    /// <param name="ul_id"></param>
    /// <param name="blood_type"></param>
    /// <param name="identity_card"></param>
    /// <param name="ucr_id"></param>
    /// <param name="career_level"></param>
    /// <param name="isresign"></param>
    /// <param name="resign_date"></param>
    /// <param name="resign_reason"></param>
    /// <param name="SMT_username"></param>
    /// <param name="identity_card_en"></param>
    /// <param name="name_en"></param>
    /// <param name="telephone_en"></param>
    /// <param name="mobile_phone_en"></param>
    /// <param name="address_en"></param>
    /// <param name="address_census_en"></param>
    /// <param name="insurance_cancel_date"></param>
    /// <param name="ds_id"></param>
    public class User(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        string? disable = null,
        string? company_code = null,
        string? user_id = null,
        string? username = null,
        string? password = null,
        string? name = null,
        string? gender = null,
        DateOnly? birthday = null,
        string? telephone = null,
        string? mobile_phone = null,
        string? email = null,
        string? city = null,
        string? area = null,
        string? address = null,
        string? city_census = null,
        string? area_census = null,
        string? address_census = null,
        DateOnly? on_board_date = null,
        string? note = null,
        string? home_page = null,
        DateTime? signin_time = null,
        string? check_code = null,
        string? web_code = null,
        string? app_code = null,
        string? google_access_token = null,
        string? google_refresh_token = null,
        string? device_type = null,
        string? device_token = null,
        int? ul_id = null,
        string? blood_type = null,
        string? identity_card = null,
        int? ucr_id = null,
        int? career_level = null,
        string? isresign = null,
        DateOnly? resign_date = null,
        string? resign_reason = null,
        string? SMT_username = null,
        string? identity_card_en = null,
        string? name_en = null,
        string? telephone_en = null,
        string? mobile_phone_en = null,
        string? address_en = null,
        string? address_census_en = null,
        DateOnly? insurance_cancel_date = null,
        int? ds_id = null)
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
        /// disable
        /// </summary>
        public string? disable { get; } = disable;

        /// <summary>
        /// company_code
        /// </summary>
        public string? company_code { get; } = company_code;

        /// <summary>
        /// user_id
        /// </summary>
        [Key]
        public string? user_id { get; } = user_id;

        /// <summary>
        /// username
        /// </summary>
        public string? username { get; } = username;

        /// <summary>
        /// password
        /// </summary>
        public string? password { get; } = password;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;

        /// <summary>
        /// gender
        /// </summary>
        public string? gender { get; } = gender;

        /// <summary>
        /// birthday
        /// </summary>
        public DateOnly? birthday { get; } = birthday;

        /// <summary>
        /// telephone
        /// </summary>
        public string? telephone { get; } = telephone;

        /// <summary>
        /// mobile_phone
        /// </summary>
        public string? mobile_phone { get; } = mobile_phone;

        /// <summary>
        /// email
        /// </summary>
        public string? email { get; } = email;

        /// <summary>
        /// city
        /// </summary>
        public string? city { get; } = city;

        /// <summary>
        /// area
        /// </summary>
        public string? area { get; } = area;

        /// <summary>
        /// address
        /// </summary>
        public string? address { get; } = address;

        /// <summary>
        /// city_census
        /// </summary>
        public string? city_census { get; } = city_census;

        /// <summary>
        /// area_census
        /// </summary>
        public string? area_census { get; } = area_census;

        /// <summary>
        /// address_census
        /// </summary>
        public string? address_census { get; } = address_census;

        /// <summary>
        /// on_board_date
        /// </summary>
        public DateOnly? on_board_date { get; } = on_board_date;

        /// <summary>
        /// note
        /// </summary>
        public string? note { get; } = note;

        /// <summary>
        /// home_page
        /// </summary>
        public string? home_page { get; } = home_page;

        /// <summary>
        /// signin_time
        /// </summary>
        public DateTime? signin_time { get; } = signin_time;

        /// <summary>
        /// check_code
        /// </summary>
        public string? check_code { get; } = check_code;

        /// <summary>
        /// web_code
        /// </summary>
        public string? web_code { get; } = web_code;

        /// <summary>
        /// app_code
        /// </summary>
        public string? app_code { get; } = app_code;

        /// <summary>
        /// google_access_token
        /// </summary>
        public string? google_access_token { get; } = google_access_token;

        /// <summary>
        /// google_refresh_token
        /// </summary>
        public string? google_refresh_token { get; } = google_refresh_token;

        /// <summary>
        /// device_type
        /// </summary>
        public string? device_type { get; } = device_type;

        /// <summary>
        /// device_token
        /// </summary>
        public string? device_token { get; } = device_token;

        /// <summary>
        /// ul_id
        /// </summary>
        public int? ul_id { get; } = ul_id;

        /// <summary>
        /// blood_type
        /// </summary>
        public string? blood_type { get; } = blood_type;

        /// <summary>
        /// identity_card
        /// </summary>
        public string? identity_card { get; } = identity_card;

        /// <summary>
        /// uc_id
        /// </summary>
        public int? ucr_id { get; } = ucr_id;

        /// <summary>
        /// career_level
        /// </summary>
        public int? career_level { get; } = career_level;

        /// <summary>
        /// isresign
        /// </summary>
        public string? isresign { get; } = isresign;

        /// <summary>
        /// resign_date
        /// </summary>
        public DateOnly? resign_date { get; } = resign_date;

        /// <summary>
        /// resign_reason
        /// </summary>
        public string? resign_reason { get; } = resign_reason;

        /// <summary>
        /// SMT_username
        /// </summary>
        public string? SMT_username { get; } = SMT_username;

        /// <summary>
        /// identity_card_en
        /// </summary>
        public string? identity_card_en { get; } = identity_card_en;

        /// <summary>
        /// name_en
        /// </summary>
        public string? name_en { get; } = name_en;

        /// <summary>
        /// telephone_en
        /// </summary>
        public string? telephone_en { get; } = telephone_en;

        /// <summary>
        /// mobile_phone_en
        /// </summary>
        public string? mobile_phone_en { get; } = mobile_phone_en;

        /// <summary>
        /// address_en
        /// </summary>
        public string? address_en { get; } = address_en;

        /// <summary>
        /// address_census_en
        /// </summary>
        public string? address_census_en { get; } = address_census_en;

        /// <summary>
        /// insurance_cancel_date
        /// </summary>
        public DateOnly? insurance_cancel_date { get; } = insurance_cancel_date;

        /// <summary>
        /// ds_id
        /// </summary>
        public int? ds_id { get; } = ds_id;
    }

    /// <summary>
    /// CreateUserParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="disable"></param>
    /// <param name="company_code"></param>
    /// <param name="username"></param>
    /// <param name="password"></param>
    /// <param name="name"></param>
    /// <param name="gender"></param>
    /// <param name="birthday"></param>
    /// <param name="telephone"></param>
    /// <param name="mobile_phone"></param>
    /// <param name="email"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="address"></param>
    /// <param name="city_census"></param>
    /// <param name="area_census"></param>
    /// <param name="address_census"></param>
    /// <param name="on_board_date"></param>
    /// <param name="note"></param>
    /// <param name="home_page"></param>
    /// <param name="signin_time"></param>
    /// <param name="check_code"></param>
    /// <param name="web_code"></param>
    /// <param name="app_code"></param>
    /// <param name="google_access_token"></param>
    /// <param name="google_refresh_token"></param>
    /// <param name="device_type"></param>
    /// <param name="device_token"></param>
    /// <param name="ul_id"></param>
    /// <param name="blood_type"></param>
    /// <param name="identity_card"></param>
    /// <param name="ucr_id"></param>
    /// <param name="career_level"></param>
    /// <param name="isresign"></param>
    /// <param name="resign_date"></param>
    /// <param name="resign_reason"></param>
    /// <param name="SMT_username"></param>
    /// <param name="identity_card_en"></param>
    /// <param name="name_en"></param>
    /// <param name="telephone_en"></param>
    /// <param name="mobile_phone_en"></param>
    /// <param name="address_en"></param>
    /// <param name="address_census_en"></param>
    /// <param name="insurance_cancel_date"></param>
    /// <param name="ds_id"></param>
    public class CreateUserParam(
        string cre_userid,
        DateTime cre_time,
        string? disable = null,
        string? company_code = null,
        string? username = null,
        string? password = null,
        string? name = null,
        string? gender = null,
        DateOnly? birthday = null,
        string? telephone = null,
        string? mobile_phone = null,
        string? email = null,
        string? city = null,
        string? area = null,
        string? address = null,
        string? city_census = null,
        string? area_census = null,
        string? address_census = null,
        DateOnly? on_board_date = null,
        string? note = null,
        string? home_page = null,
        DateTime? signin_time = null,
        string? check_code = null,
        string? web_code = null,
        string? app_code = null,
        string? google_access_token = null,
        string? google_refresh_token = null,
        string? device_type = null,
        string? device_token = null,
        int? ul_id = null,
        string? blood_type = null,
        string? identity_card = null,
        int? ucr_id = null,
        int? career_level = null,
        string? isresign = null,
        DateOnly? resign_date = null,
        string? resign_reason = null,
        string? SMT_username = null,
        string? identity_card_en = null,
        string? name_en = null,
        string? telephone_en = null,
        string? mobile_phone_en = null,
        string? address_en = null,
        string? address_census_en = null,
        DateOnly? insurance_cancel_date = null,
        int? ds_id = null) : User(
              cre_userid: cre_userid,
              cre_time: cre_time,
              disable: disable,
              company_code: company_code,
              username: username,
              password: password,
              name: name,
              gender: gender,
              birthday: birthday,
              telephone: telephone,
              mobile_phone: mobile_phone,
              email: email,
              city: city,
              area: area,
              address: address,
              city_census: city_census,
              area_census: area_census,
              address_census: address_census,
              on_board_date: on_board_date,
              note: note,
              home_page: home_page,
              signin_time: signin_time,
              check_code: check_code,
              web_code: web_code,
              app_code: app_code,
              google_access_token: google_access_token,
              google_refresh_token: google_refresh_token,
              device_type: device_type,
              device_token: device_token,
              ul_id: ul_id,
              blood_type: blood_type,
              identity_card: identity_card,
              ucr_id: ucr_id,
              career_level: career_level,
              isresign: isresign,
              resign_date: resign_date,
              resign_reason: resign_reason,
              SMT_username: SMT_username,
              identity_card_en: identity_card_en,
              name_en: name_en,
              telephone_en: telephone_en,
              mobile_phone_en: mobile_phone_en,
              address_en: address_en,
              address_census_en: address_census_en,
              insurance_cancel_date: insurance_cancel_date,
              ds_id: ds_id)
    {
    }

    /// <summary>
    /// UpdateUserParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="user_id"></param>
    /// <param name="birthday"></param>
    /// <param name="on_board_date"></param>
    /// <param name="signin_time"></param>
    /// <param name="resign_date"></param>
    /// <param name="insurance_cancel_date"></param>
    /// <param name="cre_userid"></param>
    /// <param name="disable"></param>
    /// <param name="company_code"></param>
    /// <param name="username"></param>
    /// <param name="password"></param>
    /// <param name="name"></param>
    /// <param name="gender"></param>
    /// <param name="telephone"></param>
    /// <param name="mobile_phone"></param>
    /// <param name="email"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="address"></param>
    /// <param name="city_census"></param>
    /// <param name="area_census"></param>
    /// <param name="address_census"></param>
    /// <param name="note"></param>
    /// <param name="home_page"></param>
    /// <param name="check_code"></param>
    /// <param name="web_code"></param>
    /// <param name="app_code"></param>
    /// <param name="google_access_token"></param>
    /// <param name="google_refresh_token"></param>
    /// <param name="device_type"></param>
    /// <param name="device_token"></param>
    /// <param name="ul_id"></param>
    /// <param name="blood_type"></param>
    /// <param name="identity_card"></param>
    /// <param name="ucr_id"></param>
    /// <param name="career_level"></param>
    /// <param name="isresign"></param>
    /// <param name="resign_reason"></param>
    /// <param name="SMT_username"></param>
    /// <param name="identity_card_en"></param>
    /// <param name="name_en"></param>
    /// <param name="telephone_en"></param>
    /// <param name="mobile_phone_en"></param>
    /// <param name="address_en"></param>
    /// <param name="address_census_en"></param>
    /// <param name="ds_id"></param>
    public class UpdateUserParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        string user_id,
        DateOnly? birthday,
        DateOnly? on_board_date,
        DateTime? signin_time,
        DateOnly? resign_date,
        DateOnly? insurance_cancel_date,
        string cre_userid = api_string_param_no_pass,
        string? disable = api_string_param_no_pass,
        string? company_code = api_string_param_no_pass,
        string? username = api_string_param_no_pass,
        string? password = api_string_param_no_pass,
        string? name = api_string_param_no_pass,
        string? gender = api_string_param_no_pass,
        string? telephone = api_string_param_no_pass,
        string? mobile_phone = api_string_param_no_pass,
        string? email = api_string_param_no_pass,
        string? city = api_string_param_no_pass,
        string? area = api_string_param_no_pass,
        string? address = api_string_param_no_pass,
        string? city_census = api_string_param_no_pass,
        string? area_census = api_string_param_no_pass,
        string? address_census = api_string_param_no_pass,
        string? note = api_string_param_no_pass,
        string? home_page = api_string_param_no_pass,
        string? check_code = api_string_param_no_pass,
        string? web_code = api_string_param_no_pass,
        string? app_code = api_string_param_no_pass,
        string? google_access_token = api_string_param_no_pass,
        string? google_refresh_token = api_string_param_no_pass,
        string? device_type = api_string_param_no_pass,
        string? device_token = api_string_param_no_pass,
        int? ul_id = api_numeric_param_no_pass,
        string? blood_type = api_string_param_no_pass,
        string? identity_card = api_string_param_no_pass,
        int? ucr_id = api_numeric_param_no_pass,
        int? career_level = api_numeric_param_no_pass,
        string? isresign = api_string_param_no_pass,
        string? resign_reason = api_string_param_no_pass,
        string? SMT_username = api_string_param_no_pass,
        string? identity_card_en = api_string_param_no_pass,
        string? name_en = api_string_param_no_pass,
        string? telephone_en = api_string_param_no_pass,
        string? mobile_phone_en = api_string_param_no_pass,
        string? address_en = api_string_param_no_pass,
        string? address_census_en = api_string_param_no_pass,
        int? ds_id = api_numeric_param_no_pass) : User(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              disable: disable,
              company_code: company_code,
              user_id: user_id,
              username: username,
              password: password,
              name: name,
              gender: gender,
              birthday: birthday,
              telephone: telephone,
              mobile_phone: mobile_phone,
              email: email,
              city: city,
              area: area,
              address: address,
              city_census: city_census,
              area_census: area_census,
              address_census: address_census,
              on_board_date: on_board_date,
              note: note,
              home_page: home_page,
              signin_time: signin_time,
              check_code: check_code,
              web_code: web_code,
              app_code: app_code,
              google_access_token: google_access_token,
              google_refresh_token: google_refresh_token,
              device_type: device_type,
              device_token: device_token,
              ul_id: ul_id,
              blood_type: blood_type,
              identity_card: identity_card,
              ucr_id: ucr_id,
              career_level: career_level,
              isresign: isresign,
              resign_date: resign_date,
              resign_reason: resign_reason,
              SMT_username: SMT_username,
              identity_card_en: identity_card_en,
              name_en: name_en,
              telephone_en: telephone_en,
              mobile_phone_en: mobile_phone_en,
              address_en: address_en,
              address_census_en: address_census_en,
              insurance_cancel_date: insurance_cancel_date,
              ds_id: ds_id)
    {
    }

    /// <summary>
    /// SearchUserParam
    /// </summary>
    /// <param name="own_user_id"></param>
    /// <param name="top_ul_id"></param>
    /// <param name="disable"></param>
    /// <param name="user_id"></param>
    /// <param name="user_ids"></param>
    /// <param name="username"></param>
    /// <param name="name"></param>
    /// <param name="name_en"></param>
    /// <param name="gender"></param>
    /// <param name="city"></param>
    /// <param name="area"></param>
    /// <param name="city_census"></param>
    /// <param name="area_census"></param>
    /// <param name="ul_id"></param>
    /// <param name="ul_ids"></param>
    /// <param name="state"></param>
    /// <param name="ucr_id"></param>
    /// <param name="isresign"></param>
    /// <param name="SMT_username"></param>
    /// <param name="on_board_date_start"></param>
    /// <param name="on_board_date_end"></param>
    /// <param name="resign_date_start"></param>
    /// <param name="resign_date_end"></param>
    /// <param name="company_id"></param>
    /// <param name="general_manager_id"></param>
    /// <param name="department_id"></param>
    /// <param name="position_id"></param>
    /// <param name="class_id"></param>
    /// <param name="group_id"></param>
    /// <param name="office_id"></param>
    /// <param name="insurance_cancel_date_start"></param>
    /// <param name="insurance_cancel_date_end"></param>
    /// <param name="ds_dbname"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchUserParam(
        string? own_user_id = null,
        int? top_ul_id = 0,
        string? disable = null,
        string? user_id = null,
        List<string>? user_ids = null,
        string? username = null,
        string? name = null,
        string? name_en = null,
        string? gender = null,
        string? city = null,
        string? area = null,
        string? city_census = null,
        string? area_census = null,
        int? ul_id = null,
        List<int>? ul_ids = null,
        string? state = null,
        int? ucr_id = null,
        string? isresign = null,
        string? SMT_username = null,
        DateOnly? on_board_date_start = null,
        DateOnly? on_board_date_end = null,
        DateOnly? resign_date_start = null,
        DateOnly? resign_date_end = null,
        string? company_id = null,
        string? general_manager_id = null,
        string? department_id = null,
        string? position_id = null,
        string? class_id = null,
        string? group_id = null,
        string? office_id = null,
        DateOnly? insurance_cancel_date_start = null,
        DateOnly? insurance_cancel_date_end = null,
        string? ds_dbname = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// own_user_id
        /// </summary>
        public string? own_user_id { get; } = own_user_id;

        /// <summary>
        /// top_ul_id
        /// </summary>
        public int? top_ul_id { get; } = top_ul_id;

        /// <summary>
        /// disable
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.disable")]
        public string? disable { get; } = disable;

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.user_id")]
        public string? user_id { get; } = user_id;

        /// <summary>
        /// 偷給set 因為想從暫存調整條件
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.In, "Users.user_id")]
        public List<string>? user_ids { get; set; } = user_ids;

        /// <summary>
        /// username
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "Users.username")]
        public string? username { get; } = username;

        /// <summary>
        /// 暫存比對
        /// </summary>
        public string? name { get; } = name;

        /// <summary>
        /// name_en
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.name_en")]
        public string? name_en { get; } = name_en;

        /// <summary>
        /// gender
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.gender")]
        public string? gender { get; } = gender;

        /// <summary>
        /// city
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.city")]
        public string? city { get; } = city;

        /// <summary>
        /// area
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.area")]
        public string? area { get; } = area;

        /// <summary>
        /// city_census
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.city_census")]
        public string? city_census { get; } = city_census;

        /// <summary>
        /// area_census
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.area_census")]
        public string? area_census { get; } = area_census;

        /// <summary>
        /// ul_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.ul_id")]
        public int? ul_id { get; } = ul_id;

        /// <summary>
        /// ul_ids
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.In, "Users.ul_id")]
        public List<int>? ul_ids { get; } = ul_ids;

        /// <summary>
        /// ucr_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.ucr_id")]
        public int? ucr_id { get; } = ucr_id;

        /// <summary>
        /// isresign
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "Users.isresign")]
        public string? isresign { get; } = isresign;

        /// <summary>
        /// SMT_username
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Like, "Users.SMT_username")]
        public string? SMT_username { get; } = SMT_username;

        /// <summary>
        /// on_board_date_start
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeStart, "Users.on_board_date")]
        public DateOnly? on_board_date_start { get; } = on_board_date_start;

        /// <summary>
        /// on_board_date_end
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeEnd, "Users.on_board_date")]
        public DateOnly? on_board_date_end { get; } = on_board_date_end;

        /// <summary>
        /// resign_date_start
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeStart, "Users.resign_date")]
        public DateOnly? resign_date_start { get; } = resign_date_start;

        /// <summary>
        /// resign_date_end
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeEnd, "Users.resign_date")]
        public DateOnly? resign_date_end { get; } = resign_date_end;

        /// <summary>
        /// company_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevel.company_id")]
        public string? company_id { get; } = company_id;

        /// <summary>
        /// general_manager_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevel.general_manager_id")]
        public string? general_manager_id { get; } = general_manager_id;

        /// <summary>
        /// department_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevel.department_id")]
        public string? department_id { get; } = department_id;

        /// <summary>
        /// position_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevel.position_id")]
        public string? position_id { get; } = position_id;

        /// <summary>
        /// class_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevel.class_id")]
        public string? class_id { get; } = class_id;

        /// <summary>
        /// group_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevel.group_id")]
        public string? group_id { get; } = group_id;

        /// <summary>
        /// office_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "UserLevel.office_id")]
        public string? office_id { get; } = office_id;

        /// <summary>
        /// insurance_cancel_date_start
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeStart, "Users.insurance_cancel_date")]
        public DateOnly? insurance_cancel_date_start { get; } = insurance_cancel_date_start;

        /// <summary>
        /// insurance_cancel_date_end
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.RangeEnd, "Users.insurance_cancel_date")]
        public DateOnly? insurance_cancel_date_end { get; } = insurance_cancel_date_end;

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
    /// SearchUserResult
    /// </summary>
    public class SearchUserResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("Users.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("Users.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("Users.upd_time")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("Users.cre_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// disable
        /// </summary>
        [SQLSource("Users.disable")]
        public string? disable { get; set; }

        /// <summary>
        /// company_code
        /// </summary>
        [SQLSource("Users.company_code")]
        public string? company_code { get; set; }

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSource("Users.user_id")]
        public string? user_id { get; set; }

        /// <summary>
        /// username
        /// </summary>
        [SQLSource("Users.username")]
        public string? username { get; set; }

        /// <summary>
        /// password
        /// </summary>
        [SQLSource("Users.password")]
        public string? password { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("Users.name")]
        public string? name { get; set; }

        /// <summary>
        /// name_en
        /// </summary>
        [SQLSource("Users.name_en")]
        public string? name_en { get; set; }

        /// <summary>
        /// gender
        /// </summary>
        [SQLSource("Users.gender")]
        public string? gender { get; set; }

        /// <summary>
        /// gender_name
        /// </summary>
        [SQLSource("ISNULL(SPS_SEX.name,'')")]
        public string? gender_name { get; set; }

        /// <summary>
        /// birthday
        /// </summary>
        [SQLSource("Users.birthday")]
        public DateOnly? birthday { get; set; }

        /// <summary>
        /// telephone
        /// </summary>
        [SQLSource("Users.telephone")]
        public string? telephone { get; set; }

        /// <summary>
        /// mobile_phone
        /// </summary>
        [SQLSource("Users.mobile_phone")]
        public string? mobile_phone { get; set; }

        /// <summary>
        /// email
        /// </summary>
        [SQLSource("Users.email")]
        public string? email { get; set; }

        /// <summary>
        /// city
        /// </summary>
        [SQLSource("Users.city")]
        public string? city { get; set; }

        /// <summary>
        /// area
        /// </summary>
        [SQLSource("Users.area")]
        public string? area { get; set; }

        /// <summary>
        /// address
        /// </summary>
        [SQLSource("Users.address")]
        public string? address { get; set; }

        /// <summary>
        /// city_census
        /// </summary>
        [SQLSource("Users.city_census")]
        public string? city_census { get; set; }

        /// <summary>
        /// area_census
        /// </summary>
        [SQLSource("Users.area_census")]
        public string? area_census { get; set; }

        /// <summary>
        /// address_census
        /// </summary>
        [SQLSource("Users.address_census")]
        public string? address_census { get; set; }

        /// <summary>
        /// on_board_date
        /// </summary>
        [SQLSource("Users.on_board_date")]
        public DateOnly? on_board_date { get; set; }

        /// <summary>
        /// note
        /// </summary>
        [SQLSource("Users.note")]
        public string? note { get; set; }

        /// <summary>
        /// home_page
        /// </summary>
        [SQLSource("Users.home_page")]
        public string? home_page { get; set; }

        /// <summary>
        /// signin_time
        /// </summary>
        [SQLSource("Users.signin_time")]
        public DateTime? signin_time { get; set; }

        /// <summary>
        /// ul_id
        /// </summary>
        [SQLSource("Users.ul_id")]
        public int? ul_id { get; set; }

        /// <summary>
        /// blood_type
        /// </summary>
        [SQLSource("Users.blood_type")]
        public string? blood_type { get; set; }

        /// <summary>
        /// identity_card
        /// </summary>
        [SQLSource("Users.identity_card")]
        public string? identity_card { get; set; }

        /// <summary>
        /// ucr_id
        /// </summary>
        [SQLSource("Users.ucr_id")]
        public int? ucr_id { get; set; }

        /// <summary>
        /// career_level
        /// </summary>
        [SQLSource("Users.career_level")]
        public int? career_level { get; set; }

        /// <summary>
        /// isresign
        /// </summary>
        [SQLSource("Users.isresign")]
        public string? isresign { get; set; }

        /// <summary>
        /// resign_date
        /// </summary>
        [SQLSource("Users.resign_date")]
        public DateOnly? resign_date { get; set; }

        /// <summary>
        /// resign_reason
        /// </summary>
        [SQLSource("Users.resign_reason")]
        public string? resign_reason { get; set; }

        /// <summary>
        /// SMT_username
        /// </summary>
        [SQLSource("Users.SMT_username")]
        public string? SMT_username { get; set; }

        /// <summary>
        /// ul_name
        /// </summary>
        [SQLSource("ISNULL(UL.name,'')")]
        public string? ul_name { get; set; }

        /// <summary>
        /// company_id
        /// </summary>
        [SQLSource("ISNULL(UserLevel.company_id,'')")]
        public string? company_id { get; set; }

        /// <summary>
        /// general_manager_id
        /// </summary>
        [SQLSource("ISNULL(UserLevel.general_manager_id,'')")]
        public string? general_manager_id { get; set; }

        /// <summary>
        /// department_id
        /// </summary>
        [SQLSource("ISNULL(UserLevel.department_id,'')")]
        public string? department_id { get; set; }

        /// <summary>
        /// department_name
        /// </summary>
        [SQLSource("ISNULL(SPS_DEP.name,'')")]
        public string? department_name { get; set; }

        /// <summary>
        /// position_id
        /// </summary>
        [SQLSource("ISNULL(UserLevel.position_id,'')")]
        public string? position_id { get; set; }

        /// <summary>
        /// position_name
        /// </summary>
        [SQLSource("ISNULL(SPS_POS.name,'')")]
        public string? position_name { get; set; }

        /// <summary>
        /// class_id
        /// </summary>
        [SQLSource("ISNULL(UserLevel.class_id,'')")]
        public string? class_id { get; set; }

        /// <summary>
        /// class_name
        /// </summary>
        [SQLSource("ISNULL(SPS_CLA.name,'')")]
        public string? class_name { get; set; }

        /// <summary>
        /// sc_name
        /// </summary>
        [SQLSource("ISNULL(ScheduleXEmployee.sc_name,'')")]
        public string? sc_name { get; set; }

        /// <summary>
        /// group_id
        /// </summary>
        [SQLSource("ISNULL(UserLevel.group_id,'')")]
        public string? group_id { get; set; }

        /// <summary>
        /// office_id
        /// </summary>
        [SQLSource("ISNULL(UserLevel.office_id,'')")]
        public string? office_id { get; set; }

        /// <summary>
        /// home_page_name
        /// </summary>
        [SQLSource("ISNULL(SPS.name,'')")]
        public string? home_page_name { get; set; }

        /// <summary>
        /// check_code
        /// </summary>
        [SQLSource("Users.check_code")]
        public string? check_code { get; set; }

        /// <summary>
        /// web_code
        /// </summary>
        [SQLSource("Users.web_code")]
        public string? web_code { get; set; }

        /// <summary>
        /// app_code
        /// </summary>
        [SQLSource("Users.app_code")]
        public string? app_code { get; set; }

        /// <summary>
        /// insurance_cancel_date
        /// </summary>
        [SQLSource("Users.insurance_cancel_date")]
        public DateOnly? insurance_cancel_date { get; set; }

        /// <summary>
        /// ds_id
        /// </summary>
        [SQLSource("Users.ds_id")]
        public int? ds_id { get; set; }

        /// <summary>
        /// ds_code
        /// </summary>
        [SQLSource("ISNULL(DealerSetting.ds_code,'')")]
        public string? ds_code { get; set; }

        /// <summary>
        /// ds_name
        /// </summary>
        [SQLSource("ISNULL(DealerSetting.ds_name,'')")]
        public string? ds_name { get; set; }

        /// <summary>
        /// ds_dbname
        /// </summary>
        [SQLSource("ISNULL(DealerSetting.ds_dbname,'')")]
        public string? ds_dbname { get; set; }
    }
    #endregion

    #region RelatedCompanyRecord
    /// <summary>
    /// RelatedCompanyRecord
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="rcr_id"></param>
    /// <param name="user_id"></param>
    /// <param name="name"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="visible"></param>
    public class RelatedCompanyRecord(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? rcr_id = null,
        string? user_id = null,
        string? name = null,
        DateOnly? date_start = null,
        DateOnly? date_end = null,
        string? visible = null)
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
        /// rcr_id
        /// </summary>
        [Key]
        public int? rcr_id { get; } = rcr_id;

        /// <summary>
        /// user_id
        /// </summary>
        public string? user_id { get; } = user_id;

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; } = name;

        /// <summary>
        /// date_start
        /// </summary>
        public DateOnly? date_start { get; } = date_start;

        /// <summary>
        /// date_end
        /// </summary>
        public DateOnly? date_end { get; } = date_end;

        /// <summary>
        /// visible
        /// </summary>
        public string? visible { get; } = visible;
    }

    /// <summary>
    /// CreateRelatedCompanyRecordParam
    /// </summary>
    /// <param name="cre_userid"></param>
    /// <param name="cre_time"></param>
    /// <param name="user_id"></param>
    /// <param name="name"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="visible"></param>
    public class CreateRelatedCompanyRecordParam(
        string cre_userid,
        DateTime cre_time,
        string? user_id,
        string? name,
        DateOnly? date_start,
        DateOnly? date_end,
        string? visible = null) : RelatedCompanyRecord(
              cre_userid: cre_userid,
              cre_time: cre_time,
              user_id: user_id,
              name: name,
              date_start: date_start,
              date_end: date_end,
              visible: visible)
    {
    }

    /// <summary>
    /// UpdateRelatedCompanyRecordParam
    /// </summary>
    /// <param name="cre_time"></param>
    /// <param name="upd_userid"></param>
    /// <param name="upd_time"></param>
    /// <param name="rcr_id"></param>
    /// <param name="date_start"></param>
    /// <param name="date_end"></param>
    /// <param name="cre_userid"></param>
    /// <param name="user_id"></param>
    /// <param name="name"></param>
    /// <param name="visible"></param>
    public class UpdateRelatedCompanyRecordParam(
        DateTime cre_time,
        string upd_userid,
        DateTime upd_time,
        int rcr_id,
        DateOnly? date_start,
        DateOnly? date_end,
        string? cre_userid = api_string_param_no_pass,
        string? user_id = api_string_param_no_pass,
        string? name = api_string_param_no_pass,
        string? visible = api_string_param_no_pass) : RelatedCompanyRecord(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              rcr_id: rcr_id,
              user_id: user_id,
              name: name,
              date_start: date_start,
              date_end: date_end,
              visible: visible)
    {
    }

    /// <summary>
    /// SearchRelatedCompanyRecordParam
    /// </summary>
    /// <param name="rcr_id"></param>
    /// <param name="user_id"></param>
    /// <param name="visible"></param>
    /// <param name="page"></param>
    /// <param name="num_per_page"></param>
    public class SearchRelatedCompanyRecordParam(
        int? rcr_id = null,
        string? user_id = null,
        string? visible = null,
        int page = 0,
        int num_per_page = 0)
    {
        /// <summary>
        /// rcr_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "RelatedCompanyRecord.rcr_id")]
        public int? rcr_id { get; } = rcr_id;

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "RelatedCompanyRecord.user_id")]
        public string? user_id { get; } = user_id;

        /// <summary>
        /// visible
        /// </summary>
        [SQLSearchCondition(SQLSearchConditionType.Equal, "RelatedCompanyRecord.visible")]
        public string? visible { get; } = visible;

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
    /// SearchRelatedCompanyRecordResult
    /// </summary>
    public class SearchRelatedCompanyRecordResult
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        [SQLSource("RelatedCompanyRecord.cre_userid")]
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        [SQLSource("RelatedCompanyRecord.cre_time")]
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        [SQLSource("RelatedCompanyRecord.upd_userid")]
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        [SQLSource("RelatedCompanyRecord.upd_time")]
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// rcr_id
        /// </summary>
        [SQLSource("RelatedCompanyRecord.rcr_id")]
        public int? rcr_id { get; set; }

        /// <summary>
        /// user_id
        /// </summary>
        [SQLSource("RelatedCompanyRecord.user_id")]
        public string? user_id { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [SQLSource("RelatedCompanyRecord.name")]
        public string? name { get; set; }

        /// <summary>
        /// date_start
        /// </summary>
        [SQLSource("RelatedCompanyRecord.date_start")]
        public DateOnly? date_start { get; set; }

        /// <summary>
        /// date_end
        /// </summary>
        [SQLSource("RelatedCompanyRecord.date_end")]
        public DateOnly? date_end { get; set; }

        /// <summary>
        /// visible
        /// </summary>
        [SQLSource("RelatedCompanyRecord.visible")]
        public string? visible { get; set; }
    }
    #endregion

    /// <summary>
    /// UserSearch
    /// </summary>
    public class UserSearch
    {
        /// <summary>
        /// 帳號
        /// </summary>
        [NotChinese]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "帳號")]
        public string? username { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "姓名")]
        public string? name { get; set; }

        /// <summary>
        /// 公司流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "公司流水號")]
        public string? company_id { get; set; }

        /// <summary>
        /// 總經理室流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "總經理室流水號")]
        public string? general_manager_id { get; set; }

        /// <summary>
        /// 部門流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "部門流水號")]
        public string? department_id { get; set; }

        /// <summary>
        /// 據點流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "據點流水號")]
        public string? position_id { get; set; }

        /// <summary>
        /// 課級流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "課級流水號")]
        public string? class_id { get; set; }

        /// <summary>
        /// 組級流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "組級流水號")]
        public string? group_id { get; set; }

        /// <summary>
        /// 辦公室流水號
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "辦公室流水號")]
        public string? office_id { get; set; }

        /// <summary>
        /// 帳號狀態
        /// </summary>
        [YN]
        [Display(Name = "帳號狀態")]
        public string? disable { get; set; }

        /// <summary>
        /// 是否離職
        /// </summary>
        [YN]
        [Display(Name = "是否離職")]
        public string? isresign { get; set; }

        /// <summary>
        /// 職務流水號
        /// </summary>
        [Display(Name = "職務流水號")]
        public int? ul_id { get; set; }

        /// <summary>
        /// 點名狀態
        /// </summary>
        [Display(Name = "狀態")]
        public string? state { get; set; } = "到";

        /// <summary>
        /// 打卡時間
        /// </summary>
        [Display(Name = "打卡時間")]
        public string? last_clock_out_time { get; set; }

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
    }

    /// <summary>
    /// UserSearchResponse
    /// </summary>
    public class UserSearchResponse
    {
        /// <summary>
        /// 帳號狀態
        /// </summary>
        public string disable { get; set; } = "";

        /// <summary>
        /// 員工編號
        /// </summary>
        public string user_id { get; set; } = "";

        /// <summary>
        /// 帳號
        /// </summary>
        public string username { get; set; } = "";

        /// <summary>
        /// 員工姓名
        /// </summary>
        public string name { get; set; } = "";

        /// <summary>
        /// 職務名稱
        /// </summary>
        public string ul_name { get; set; } = "";

        /// <summary>
        /// 據點流水號
        /// </summary>
        public string position_id { get; set; } = "";

        /// <summary>
        /// 據點名稱
        /// </summary>
        public string position_name { get; set; } = "";

        /// <summary>
        /// 課級流水號
        /// </summary>
        public string class_id { get; set; } = "";

        /// <summary>
        /// 課級名稱 
        /// </summary>
        public string class_name { get; set; } = "";

        /// <summary>
        /// 班別名稱
        /// </summary>
        public string sc_name { get; set; } = "";

        /// <summary>
        /// 部門流水號
        /// </summary>
        public string department_id { get; set; } = "";

        /// <summary>
        /// 部門名稱
        /// </summary>
        public string department_name { get; set; } = "";

        /// <summary>
        /// 點名狀態
        /// </summary>
        public string state { get; set; } = "到";

        /// <summary>
        /// 打卡時間
        /// </summary>
        public string last_clock_out_time { get; set; } = "";

        /// <summary>
        /// 首頁名稱
        /// </summary>
        public string home_page_name { get; set; } = "";
    }

    /// <summary>
    /// UserSearchNoLevel
    /// </summary>
    public class UserSearchNoLevel
    {
        /// <summary>
        /// username
        /// </summary>
        [NotChinese]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "帳號")]
        public string? username { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "姓名")]
        public string? name { get; set; }

        /// <summary>
        /// page
        /// </summary>
        [Display(Name = "頁碼")]
        public int page { get; set; } = 0;

        /// <summary>
        /// num_per_page
        /// </summary>
        [Display(Name = "一頁幾筆")]
        public int num_per_page { get; set; } = 10;
    }

    /// <summary>
    /// UserExist
    /// </summary>
    public class UserExist
    {
        /// <summary>
        /// username
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [NotChinese]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "帳號")]
        public string username { get; set; } = "";
    }

    /// <summary>
    /// UserCreate
    /// </summary>
    public class UserCreate
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
        /// 密碼
        /// </summary>
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "密碼")]
        public string? password { get; set; }

        /// <summary>
        /// name
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(25, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "姓名")]
        public string name { get; set; } = "";

        /// <summary>
        /// gender
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "性別")]
        public string? gender { get; set; }

        /// <summary>
        /// identity_card
        /// </summary>
        [Display(Name = "身分證")]
        public string? identity_card { get; set; }

        /// <summary>
        /// birthday
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "生日")]
        public DateOnly? birthday { get; set; }

        /// <summary>
        /// telephone
        /// </summary>
        [Display(Name = "電話")]
        public string? telephone { get; set; }

        /// <summary>
        /// mobile_phone
        /// </summary>
        [Display(Name = "手機")]
        public string? mobile_phone { get; set; }

        /// <summary>
        /// email
        /// </summary>
        [MaxLength(120, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "電子信箱")]
        public string? email { get; set; }

        /// <summary>
        /// city
        /// </summary>
        [Display(Name = "城市(聯絡)")]
        public string? city { get; set; }

        /// <summary>
        /// area
        /// </summary>
        [Display(Name = "區域(聯絡)")]
        public string? area { get; set; }

        /// <summary>
        /// address
        /// </summary>
        [Display(Name = "住址(聯絡)")]
        public string? address { get; set; }

        /// <summary>
        /// city_census
        /// </summary>
        [Display(Name = "城市(戶籍)")]
        public string? city_census { get; set; }

        /// <summary>
        /// area_census
        /// </summary>
        [Display(Name = "區域(戶籍)")]
        public string? area_census { get; set; }

        /// <summary>
        /// address_census
        /// </summary>
        [Display(Name = "住址(戶籍)")]
        public string? address_census { get; set; }

        /// <summary>
        /// on_board_date
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "到職日")]
        public DateOnly? on_board_date { get; set; }

        /// <summary>
        /// note
        /// </summary>
        [Display(Name = "備註")]
        public string? note { get; set; }

        /// <summary>
        /// home_page
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "首頁")]
        public string home_page { get; set; } = "";

        /// <summary>
        /// blood_type
        /// </summary>
        [MaxLength(10, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "血型")]
        public string? blood_type { get; set; }

        /// <summary>
        /// SMT_username
        /// </summary>
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "SMT使用者帳號")]
        public string? SMT_username { get; set; }
    }

    /// <summary>
    /// UserDetail
    /// </summary>
    public class UserDetail
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";
    }

    /// <summary>
    /// UserDetailResponse
    /// </summary>
    public class UserDetailResponse
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// disable
        /// </summary>
        public string? disable { get; set; }

        /// <summary>
        /// company_code
        /// </summary>
        public string? company_code { get; set; }

        /// <summary>
        /// user_id
        /// </summary>
        public string? user_id { get; set; }

        /// <summary>
        /// username
        /// </summary>
        public string? username { get; set; }

        /// <summary>
        /// password
        /// </summary>
        public string? password { get; set; }

        /// <summary>
        /// name
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// gender
        /// </summary>
        public string? gender { get; set; }

        /// <summary>
        /// birthday
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly? birthday { get; set; }

        /// <summary>
        /// telephone
        /// </summary>
        public string? telephone { get; set; }

        /// <summary>
        /// mobile_phone
        /// </summary>
        public string? mobile_phone { get; set; }

        /// <summary>
        /// email
        /// </summary>
        public string? email { get; set; }

        /// <summary>
        /// city
        /// </summary>
        public string? city { get; set; }

        /// <summary>
        /// area
        /// </summary>
        public string? area { get; set; }

        /// <summary>
        /// address
        /// </summary>
        public string? address { get; set; }

        /// <summary>
        /// city_census
        /// </summary>
        public string? city_census { get; set; }

        /// <summary>
        /// area_census
        /// </summary>
        public string? area_census { get; set; }

        /// <summary>
        /// address_census
        /// </summary>
        public string? address_census { get; set; }

        /// <summary>
        /// on_board_date
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly? on_board_date { get; set; }

        /// <summary>
        /// note
        /// </summary>
        public string? note { get; set; }

        /// <summary>
        /// home_page
        /// </summary>
        public string? home_page { get; set; }

        /// <summary>
        /// signin_time
        /// </summary>
        public DateTime? signin_time { get; set; }

        /// <summary>
        /// ul_id
        /// </summary>
        public int? ul_id { get; set; }

        /// <summary>
        /// blood_type
        /// </summary>
        public string? blood_type { get; set; }

        /// <summary>
        /// identity_card
        /// </summary>
        public string? identity_card { get; set; }

        /// <summary>
        /// ucr_id
        /// </summary>
        public int? ucr_id { get; set; }

        /// <summary>
        /// career_level
        /// </summary>
        public int? career_level { get; set; }

        /// <summary>
        /// isresign
        /// </summary>
        public string? isresign { get; set; }

        /// <summary>
        /// resign_date
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly? resign_date { get; set; }

        /// <summary>
        /// resign_reason
        /// </summary>
        public string? resign_reason { get; set; }

        /// <summary>
        /// SMT_username
        /// </summary>
        public string? SMT_username { get; set; }

        /// <summary>
        /// ul_name
        /// </summary>
        public string? ul_name { get; set; }

        /// <summary>
        /// home_page_name
        /// </summary>
        public string? home_page_name { get; set; }

        /// <summary>
        /// position_id
        /// </summary>
        public string? position_id { get; set; }

        /// <summary>
        /// insurance_cancel_date
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly? insurance_cancel_date { get; set; }
    }

    /// <summary>
    /// UserUpdate
    /// </summary>
    public class UserUpdate
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// username
        /// </summary>
        [Display(Name = "帳號")]
        public string? username { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// name
        /// </summary>
        [Display(Name = "姓名")]
        public string? name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// gender
        /// </summary>
        [Display(Name = "性別")]
        public string? gender { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// identity_card
        /// </summary>
        [Display(Name = "身分證")]
        public string? identity_card { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// birthday
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "生日")]
        public DateOnly? birthday { get; set; } = api_dateonly_param_no_pass;

        /// <summary>
        /// telephone
        /// </summary>
        [Display(Name = "電話")]
        public string? telephone { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// mobile_phone
        /// </summary>
        [Display(Name = "手機")]
        public string? mobile_phone { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// email
        /// </summary>
        [Display(Name = "電子信箱")]
        public string? email { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// city
        /// </summary>
        [Display(Name = "城市(聯絡)")]
        public string? city { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// area
        /// </summary>
        [Display(Name = "區域(聯絡)")]
        public string? area { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// address
        /// </summary>
        [Display(Name = "住址(聯絡)")]
        public string? address { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// city_census
        /// </summary>
        [Display(Name = "城市(戶籍)")]
        public string? city_census { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// area_census
        /// </summary>
        [Display(Name = "區域(戶籍)")]
        public string? area_census { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// address_census
        /// </summary>
        [Display(Name = "住址(戶籍)")]
        public string? address_census { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// on_board_date
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "到職日")]
        public DateOnly? on_board_date { get; set; } = api_dateonly_param_no_pass;

        /// <summary>
        /// note
        /// </summary>
        [Display(Name = "備註")]
        public string? note { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// home_page
        /// </summary>
        [Display(Name = "首頁")]
        public string? home_page { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// blood_type
        /// </summary>
        [Display(Name = "血型")]
        public string? blood_type { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// SMT_username
        /// </summary>
        [Display(Name = "SMT使用者帳號")]
        public string? SMT_username { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// insurance_cancel_date
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "退保日期")]
        public DateOnly? insurance_cancel_date { get; set; } = api_dateonly_param_no_pass;
    }

    /// <summary>
    /// UserUpdateDisable
    /// </summary>
    public class UserUpdateDisable
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// disable
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [YN]
        [Display(Name = "是否禁用")]
        public string disable { get; set; } = "";
    }

    /// <summary>
    /// UserResign
    /// </summary>
    public class UserResign
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// resign_date
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "離職日期")]
        public DateOnly? resign_date { get; set; }

        /// <summary>
        /// resign_reason
        /// </summary>
        [Display(Name = "離職原因")]
        public string? resign_reason { get; set; }

        /// <summary>
        /// insurance_cancel_date
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "退保日期")]
        public DateOnly? insurance_cancel_date { get; set; }
    }

    /// <summary>
    /// UpdatePassword
    /// </summary>
    public class UpdatePassword
    {
        /// <summary>
        /// old_password
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "原密碼")]
        public string old_password { get; set; } = "";

        /// <summary>
        /// new_password
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "新密碼")]
        public string new_password { get; set; } = "";
    }

    /// <summary>
    /// ResetPassword
    /// </summary>
    public class ResetPassword
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// new_password
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "新密碼")]
        public string new_password { get; set; } = "";
    }

    /// <summary>
    /// UserUpdateLevel
    /// </summary>
    public class UserUpdateLevel : UserUpdateCareerRank
    {
        /// <summary>
        /// ul_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [IsNumeric]
        [Display(Name = "職務流水號")]
        public int ul_id { get; set; } = 0;
    }

    /// <summary>
    /// UserUpdateDuty
    /// </summary>
    public class UserUpdateDuty
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// ud_ids
        /// </summary>
        [Display(Name = "要給跟不給的職責編號")]
        public List<DictionaryKeyValue> ud_ids { get; set; } = [];
    }

    /// <summary>
    /// UserUpdateCareerRank
    /// </summary>
    public class UserUpdateCareerRank
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// ucr_id
        /// </summary>
        [Display(Name = "職等職級流水號")]
        public int? ucr_id { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// career_level
        /// </summary>
        [Display(Name = "職級")]
        public int? career_level { get; set; } = api_numeric_param_no_pass;
    }

    /// <summary>
    /// UserLevelDutyHistoryCreate
    /// </summary>
    public class UserLevelDutyHistoryCreate
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// note
        /// </summary>
        [Display(Name = "備註")]
        public string? note { get; set; }
    }

    /// <summary>
    /// UserCareerRankHistoryCreate
    /// </summary>
    public class UserCareerRankHistoryCreate
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// note
        /// </summary>
        [Display(Name = "備註")]
        public string? note { get; set; }
    }

    /// <summary>
    /// UserLevelDutyHistorySearch
    /// </summary>
    public class UserLevelDutyHistorySearch
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// date_start
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "日期起")]
        public DateOnly? date_start { get; set; }

        /// <summary>
        /// date_end
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "日期迄")]
        public DateOnly? date_end { get; set; }
    }

    /// <summary>
    /// UserLevelDutyHistorySearchResponse
    /// </summary>
    public class UserLevelDutyHistorySearchResponse
    {
        /// <summary>
        /// cre_userid
        /// </summary>
        public string? cre_userid { get; set; }

        /// <summary>
        /// cre_time
        /// </summary>
        public DateTime? cre_time { get; set; }

        /// <summary>
        /// upd_userid
        /// </summary>
        public string? upd_userid { get; set; }

        /// <summary>
        /// upd_time
        /// </summary>
        public DateTime? upd_time { get; set; }

        /// <summary>
        /// uldh_id
        /// </summary>
        public int? uldh_id { get; set; }

        /// <summary>
        /// user_id
        /// </summary>
        public string? user_id { get; set; }

        /// <summary>
        /// date_start
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly? date_start { get; set; }

        /// <summary>
        /// date_end
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly? date_end { get; set; }

        /// <summary>
        /// ul_id
        /// </summary>
        public int? ul_id { get; set; }

        /// <summary>
        /// duty_json
        /// </summary>
        public string? duty_json { get; set; }

        /// <summary>
        /// note
        /// </summary>
        public string? note { get; set; }

        /// <summary>
        /// ul_code
        /// </summary>
        public string? ul_code { get; set; }

        /// <summary>
        /// ul_name
        /// </summary>
        public string? ul_name { get; set; }
    }

    /// <summary>
    /// UserCareerRankHistorySearch
    /// </summary>
    public class UserCareerRankHistorySearch
    {
        /// <summary>
        /// user_id
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "使用者流水號")]
        public string user_id { get; set; } = "";

        /// <summary>
        /// date_start
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "日期起")]
        public DateOnly? date_start { get; set; }

        /// <summary>
        /// date_end
        /// </summary>
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        [Display(Name = "日期迄")]
        public DateOnly? date_end { get; set; }
    }

    /// <summary>
    /// UserUpdateProxyDuty
    /// </summary>
    public class UserUpdateProxyDuty
    {
        /// <summary>
        /// company_code
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "公司編號")]
        public string company_code { get; set; } = "";

        /// <summary>
        /// user_id
        /// </summary>
        [Display(Name = "使用者編號")]
        public string? user_id { get; set; }
    }
}
