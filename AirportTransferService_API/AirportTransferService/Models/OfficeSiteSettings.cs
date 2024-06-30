using static AirportTransferService.App_Code.Appsettings;

namespace AirportTransferService.Models
{
    #region OSS_WebsiteSetting
    public class OSS_WebsiteSetting(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? id = null,
        string? website_name = null,
        string? bussiness_hour = null,
        string? phone = null,
        string? address = null,
        string? email = null,
        string? can_website_cancel_order = null,
        int? buy_limit = null,
        int? bonus_expired_month = null,
        decimal? order_bonus_limit_rate = null,
        string? bonus_isopen = null,
        string? shopping_voucher_isopen = null,
        string? invoice_isopen = null,
        int? days_after_pay_get_bonus = null,
        int? days_after_ship_get_bonus = null,
        string? google_login_isopen = null,
        string? line_login_isopen = null)
    {
        public string? cre_userid { get; } = cre_userid;
        public DateTime? cre_time { get; } = cre_time;
        public string? upd_userid { get; } = upd_userid;
        public DateTime? upd_time { get; } = upd_time;

        [Key]
        public int? id { get; } = id;
        public string? website_name { get; } = website_name;
        public string? bussiness_hour { get; } = bussiness_hour;
        public string? phone { get; } = phone;
        public string? address { get; } = address;
        public string? email { get; } = email;
        public string? can_website_cancel_order { get; } = can_website_cancel_order;
        public int? buy_limit { get; } = buy_limit;
        public int? bonus_expired_month { get; } = bonus_expired_month;
        public decimal? order_bonus_limit_rate { get; } = order_bonus_limit_rate;
        public string? bonus_isopen { get; } = bonus_isopen;
        public string? shopping_voucher_isopen { get; } = shopping_voucher_isopen;
        public string? invoice_isopen { get; } = invoice_isopen;
        public int? days_after_pay_get_bonus { get; } = days_after_pay_get_bonus;
        public int? days_after_ship_get_bonus { get; } = days_after_ship_get_bonus;
        public string? google_login_isopen { get; } = google_login_isopen;
        public string? line_login_isopen { get; } = line_login_isopen;
    }

    public class CreateOSS_WebsiteSettingParam(
        string cre_userid,
        DateTime cre_time,
        string? website_name = null,
        string? bussiness_hour = null,
        string? phone = null,
        string? address = null,
        string? email = null,
        string? can_website_cancel_order = null,
        int? buy_limit = null,
        int? bonus_expired_month = null,
        decimal? order_bonus_limit_rate = null,
        string? bonus_isopen = null,
        string? shopping_voucher_isopen = null,
        string? invoice_isopen = null,
        int? days_after_pay_get_bonus = null,
        int? days_after_ship_get_bonus = null,
        string? google_login_isopen = null,
        string? line_login_isopen = null) : OSS_WebsiteSetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              website_name: website_name,
              bussiness_hour: bussiness_hour,
              phone: phone,
              address: address,
              email: email,
              can_website_cancel_order: can_website_cancel_order,
              buy_limit: buy_limit,
              bonus_expired_month: bonus_expired_month,
              order_bonus_limit_rate: order_bonus_limit_rate,
              bonus_isopen: bonus_isopen,
              shopping_voucher_isopen: shopping_voucher_isopen,
              invoice_isopen: invoice_isopen,
              days_after_pay_get_bonus: days_after_pay_get_bonus,
              days_after_ship_get_bonus: days_after_ship_get_bonus,
              google_login_isopen: google_login_isopen,
              line_login_isopen: line_login_isopen)
    {
    }

    public class UpdateOSS_WebsiteSettingParam(
        string upd_userid,
        DateTime upd_time,
        int id,
        DateTime? cre_time,
        string? cre_userid = api_string_param_no_pass,
        string? website_name = api_string_param_no_pass,
        string? bussiness_hour = api_string_param_no_pass,
        string? phone = api_string_param_no_pass,
        string? address = api_string_param_no_pass,
        string? email = api_string_param_no_pass,
        string? can_website_cancel_order = api_string_param_no_pass,
        int? buy_limit = api_numeric_param_no_pass,
        int? bonus_expired_month = api_numeric_param_no_pass,
        decimal? order_bonus_limit_rate = api_numeric_param_no_pass,
        string? bonus_isopen = api_string_param_no_pass,
        string? shopping_voucher_isopen = api_string_param_no_pass,
        string? invoice_isopen = api_string_param_no_pass,
        int? days_after_pay_get_bonus = api_numeric_param_no_pass,
        int? days_after_ship_get_bonus = api_numeric_param_no_pass,
        string? google_login_isopen = api_string_param_no_pass,
        string? line_login_isopen = api_string_param_no_pass) : OSS_WebsiteSetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              id: id,
              website_name: website_name,
              bussiness_hour: bussiness_hour,
              phone: phone,
              address: address,
              email: email,
              can_website_cancel_order: can_website_cancel_order,
              buy_limit: buy_limit,
              bonus_expired_month: bonus_expired_month,
              order_bonus_limit_rate: order_bonus_limit_rate,
              bonus_isopen: bonus_isopen,
              shopping_voucher_isopen: shopping_voucher_isopen,
              invoice_isopen: invoice_isopen,
              days_after_pay_get_bonus: days_after_pay_get_bonus,
              days_after_ship_get_bonus: days_after_ship_get_bonus,
              google_login_isopen: google_login_isopen,
              line_login_isopen: line_login_isopen)
    {
    }

    public class SearchOSS_WebsiteSettingParam(
        int? id = null,
        string? website_name = null,
        string? phone = null,
        string? address = null,
        string? email = null,
        string? can_website_cancel_order = null,
        string? bonus_isopen = null,
        string? shopping_voucher_isopen = null,
        string? invoice_isopen = null,
        string? google_login_isopen = null,
        string? line_login_isopen = null,
        int page = 0,
        int num_per_page = 0)
    {
        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_WebsiteSetting.id")]
        public int? id { get; } = id;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_WebsiteSetting.website_name")]
        public string? website_name { get; } = website_name;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_WebsiteSetting.phone")]
        public string? phone { get; } = phone;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_WebsiteSetting.address")]
        public string? address { get; } = address;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_WebsiteSetting.email")]
        public string? email { get; } = email;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_WebsiteSetting.can_website_cancel_order")]
        public string? can_website_cancel_order { get; } = can_website_cancel_order;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_WebsiteSetting.bonus_isopen")]
        public string? bonus_isopen { get; } = bonus_isopen;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_WebsiteSetting.shopping_voucher_isopen")]
        public string? shopping_voucher_isopen { get; } = shopping_voucher_isopen;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_WebsiteSetting.invoice_isopen")]
        public string? invoice_isopen { get; } = invoice_isopen;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_WebsiteSetting.google_login_isopen")]
        public string? google_login_isopen { get; } = google_login_isopen;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_WebsiteSetting.line_login_isopen")]
        public string? line_login_isopen { get; } = line_login_isopen;

        public int page { get; } = page;
        public int num_per_page { get; } = num_per_page;
    }

    public class SearchOSS_WebsiteSettingResult
    {

        [SQLSource("OSS_WebsiteSetting.cre_userid")]
        public string? cre_userid { get; set; }

        [SQLSource("OSS_WebsiteSetting.cre_time")]
        public DateTime? cre_time { get; set; }

        [SQLSource("OSS_WebsiteSetting.upd_userid")]
        public string? upd_userid { get; set; }

        [SQLSource("OSS_WebsiteSetting.upd_time")]
        public DateTime? upd_time { get; set; }

        [SQLSource("OSS_WebsiteSetting.id")]
        public int? id { get; set; }

        [SQLSource("OSS_WebsiteSetting.website_name")]
        public string? website_name { get; set; }

        [SQLSource("OSS_WebsiteSetting.bussiness_hour")]
        public string? bussiness_hour { get; set; }

        [SQLSource("OSS_WebsiteSetting.phone")]
        public string? phone { get; set; }

        [SQLSource("OSS_WebsiteSetting.address")]
        public string? address { get; set; }

        [SQLSource("OSS_WebsiteSetting.email")]
        public string? email { get; set; }

        [SQLSource("OSS_WebsiteSetting.can_website_cancel_order")]
        public string? can_website_cancel_order { get; set; }

        [SQLSource("OSS_WebsiteSetting.buy_limit")]
        public int? buy_limit { get; set; }

        [SQLSource("OSS_WebsiteSetting.bonus_expired_month")]
        public int? bonus_expired_month { get; set; }

        [SQLSource("OSS_WebsiteSetting.order_bonus_limit_rate")]
        public decimal? order_bonus_limit_rate { get; set; }

        [SQLSource("OSS_WebsiteSetting.bonus_isopen")]
        public string? bonus_isopen { get; set; }

        [SQLSource("OSS_WebsiteSetting.shopping_voucher_isopen")]
        public string? shopping_voucher_isopen { get; set; }

        [SQLSource("OSS_WebsiteSetting.invoice_isopen")]
        public string? invoice_isopen { get; set; }

        [SQLSource("OSS_WebsiteSetting.days_after_pay_get_bonus")]
        public int? days_after_pay_get_bonus { get; set; }

        [SQLSource("OSS_WebsiteSetting.days_after_ship_get_bonus")]
        public int? days_after_ship_get_bonus { get; set; }

        [SQLSource("OSS_WebsiteSetting.google_login_isopen")]
        public string? google_login_isopen { get; set; }

        [SQLSource("OSS_WebsiteSetting.line_login_isopen")]
        public string? line_login_isopen { get; set; }
    }
    #endregion

    #region OSS_SocialLinkSetting
    public class OSS_SocialLinkSetting(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? id = null,
        string? name = null,
        string? icon = null,
        string? url = null,
        string? visible = null,
        int? seq = null)
    {
        public string? cre_userid { get; } = cre_userid;
        public DateTime? cre_time { get; } = cre_time;
        public string? upd_userid { get; } = upd_userid;
        public DateTime? upd_time { get; } = upd_time;

        [Key]
        public int? id { get; } = id;
        public string? name { get; } = name;
        public string? icon { get; } = icon;
        public string? url { get; } = url;
        public string? visible { get; } = visible;
        public int? seq { get; } = seq;
    }

    public class CreateOSS_SocialLinkSettingParam(
        string cre_userid,
        DateTime cre_time,
        string? name = null,
        string? icon = null,
        string? url = null,
        string? visible = null,
        int? seq = null) : OSS_SocialLinkSetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              name: name,
              icon: icon,
              url: url,
              visible: visible,
              seq: seq)
    {
    }

    public class UpdateOSS_SocialLinkSettingParam(
        string upd_userid,
        DateTime upd_time,
        int id,
        DateTime? cre_time,
        string? cre_userid = api_string_param_no_pass,
        string? name = api_string_param_no_pass,
        string? icon = api_string_param_no_pass,
        string? url = api_string_param_no_pass,
        string? visible = api_string_param_no_pass,
        int? seq = api_numeric_param_no_pass) : OSS_SocialLinkSetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              id: id,
              name: name,
              icon: icon,
              url: url,
              visible: visible,
              seq: seq)
    {
    }

    public class SearchOSS_SocialLinkSettingParam(
        int? id = null,
        string? name = null,
        string? icon = null,
        string? url = null,
        string? visible = null,
        int page = 0,
        int num_per_page = 0)
    {
        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_SocialLinkSetting.id")]
        public int? id { get; } = id;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_SocialLinkSetting.name")]
        public string? name { get; } = name;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_SocialLinkSetting.icon")]
        public string? icon { get; } = icon;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_SocialLinkSetting.url")]
        public string? url { get; } = url;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_SocialLinkSetting.visible")]
        public string? visible { get; } = visible;

        public int page { get; } = page;
        public int num_per_page { get; } = num_per_page;
    }

    public class SearchOSS_SocialLinkSettingResult
    {

        [SQLSource("OSS_SocialLinkSetting.cre_userid")]
        public string? cre_userid { get; set; }

        [SQLSource("OSS_SocialLinkSetting.cre_time")]
        public DateTime? cre_time { get; set; }

        [SQLSource("OSS_SocialLinkSetting.upd_userid")]
        public string? upd_userid { get; set; }

        [SQLSource("OSS_SocialLinkSetting.upd_time")]
        public DateTime? upd_time { get; set; }

        [SQLSource("OSS_SocialLinkSetting.id")]
        public int? id { get; set; }

        [SQLSource("OSS_SocialLinkSetting.name")]
        public string? name { get; set; }

        [SQLSource("OSS_SocialLinkSetting.icon")]
        public string? icon { get; set; }

        [SQLSource("OSS_SocialLinkSetting.url")]
        public string? url { get; set; }

        [SQLSource("OSS_SocialLinkSetting.visible")]
        public string? visible { get; set; }

        [SQLSource("OSS_SocialLinkSetting.seq")]
        public int? seq { get; set; }
    }
    #endregion

    #region OSS_QASetting
    public class OSS_QASetting(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? id = null,
        string? question = null,
        string? answer = null,
        string? visible = null,
        int? seq = null)
    {
        public string? cre_userid { get; } = cre_userid;
        public DateTime? cre_time { get; } = cre_time;
        public string? upd_userid { get; } = upd_userid;
        public DateTime? upd_time { get; } = upd_time;

        [Key]
        public int? id { get; } = id;
        public string? question { get; } = question;
        public string? answer { get; } = answer;
        public string? visible { get; } = visible;
        public int? seq { get; } = seq;
    }

    public class CreateOSS_QASettingParam(
        string cre_userid,
        DateTime cre_time,
        string? question = null,
        string? answer = null,
        string? visible = null,
        int? seq = null) : OSS_QASetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              question: question,
              answer: answer,
              visible: visible,
              seq: seq)
    {
    }

    public class UpdateOSS_QASettingParam(
        string upd_userid,
        DateTime upd_time,
        int id,
        DateTime? cre_time,
        string? cre_userid = api_string_param_no_pass,
        string? question = api_string_param_no_pass,
        string? answer = api_string_param_no_pass,
        string? visible = api_string_param_no_pass,
        int? seq = api_numeric_param_no_pass) : OSS_QASetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              id: id,
              question: question,
              answer: answer,
              visible: visible,
              seq: seq)
    {
    }

    public class SearchOSS_QASettingParam(
        int? id = null,
        string? question = null,
        string? answer = null,
        string? visible = null,
        int page = 0,
        int num_per_page = 0)
    {
        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_QASetting.id")]
        public int? id { get; } = id;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_QASetting.question")]
        public string? question { get; } = question;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_QASetting.answer")]
        public string? answer { get; } = answer;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_QASetting.visible")]
        public string? visible { get; } = visible;

        public int page { get; } = page;
        public int num_per_page { get; } = num_per_page;
    }

    public class SearchOSS_QASettingResult
    {

        [SQLSource("OSS_QASetting.cre_userid")]
        public string? cre_userid { get; set; }

        [SQLSource("OSS_QASetting.cre_time")]
        public DateTime? cre_time { get; set; }

        [SQLSource("OSS_QASetting.upd_userid")]
        public string? upd_userid { get; set; }

        [SQLSource("OSS_QASetting.upd_time")]
        public DateTime? upd_time { get; set; }

        [SQLSource("OSS_QASetting.id")]
        public int? id { get; set; }

        [SQLSource("OSS_QASetting.question")]
        public string? question { get; set; }

        [SQLSource("OSS_QASetting.answer")]
        public string? answer { get; set; }

        [SQLSource("OSS_QASetting.visible")]
        public string? visible { get; set; }

        [SQLSource("OSS_QASetting.seq")]
        public int? seq { get; set; }
    }
    #endregion

    #region OSS_TermSetting
    public class OSS_TermSetting(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? id = null,
        string? privacy_policy = null,
        string? service_policy = null,
        string? purchase_notice = null)
    {
        public string? cre_userid { get; } = cre_userid;
        public DateTime? cre_time { get; } = cre_time;
        public string? upd_userid { get; } = upd_userid;
        public DateTime? upd_time { get; } = upd_time;

        [Key]
        public int? id { get; } = id;
        public string? privacy_policy { get; } = privacy_policy;
        public string? service_policy { get; } = service_policy;
        public string? purchase_notice { get; } = purchase_notice;
    }

    public class CreateOSS_TermSettingParam(
        string cre_userid,
        DateTime cre_time,
        string? privacy_policy = null,
        string? service_policy = null,
        string? purchase_notice = null) : OSS_TermSetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              privacy_policy: privacy_policy,
              service_policy: service_policy,
              purchase_notice: purchase_notice)
    {
    }

    public class UpdateOSS_TermSettingParam(
        string upd_userid,
        DateTime upd_time,
        int id,
        DateTime? cre_time,
        string? cre_userid = api_string_param_no_pass,
        string? privacy_policy = api_string_param_no_pass,
        string? service_policy = api_string_param_no_pass,
        string? purchase_notice = api_string_param_no_pass) : OSS_TermSetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              id: id,
              privacy_policy: privacy_policy,
              service_policy: service_policy,
              purchase_notice: purchase_notice)
    {
    }

    public class SearchOSS_TermSettingParam
    {
        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_TermSetting.id")]
        public int? id { get; }

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_TermSetting.privacy_policy")]
        public string? privacy_policy { get; }

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_TermSetting.service_policy")]
        public string? service_policy { get; }

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_TermSetting.purchase_notice")]
        public string? purchase_notice { get; }

        public int page { get; }
        public int num_per_page { get; }

        public SearchOSS_TermSettingParam(
            int? id = null,
            string? question = null,
            string? answer = null,
            string? visible = null,
            int page = 0,
            int num_per_page = 0)
        {
            this.id = id;
            this.privacy_policy = privacy_policy;
            this.service_policy = service_policy;
            this.purchase_notice = purchase_notice;
            this.page = page;
            this.num_per_page = num_per_page;
        }
    }

    public class SearchOSS_TermSettingResult
    {

        [SQLSource("OSS_TermSetting.cre_userid")]
        public string? cre_userid { get; set; }

        [SQLSource("OSS_TermSetting.cre_time")]
        public DateTime? cre_time { get; set; }

        [SQLSource("OSS_TermSetting.upd_userid")]
        public string? upd_userid { get; set; }

        [SQLSource("OSS_TermSetting.upd_time")]
        public DateTime? upd_time { get; set; }

        [SQLSource("OSS_TermSetting.id")]
        public int? id { get; set; }

        [SQLSource("OSS_TermSetting.privacy_policy")]
        public string? privacy_policy { get; set; }

        [SQLSource("OSS_TermSetting.service_policy")]
        public string? service_policy { get; set; }

        [SQLSource("OSS_TermSetting.purchase_notice")]
        public string? purchase_notice { get; set; }
    }
    #endregion

    #region OSS_CustomPageSetting
    public class OSS_CustomPageSetting(
        string? cre_userid = null,
        DateTime? cre_time = null,
        string? upd_userid = null,
        DateTime? upd_time = null,
        int? id = null,
        string? name = null,
        string? content = null,
        string? visible = null,
        int? seq = null)
    {
        public string? cre_userid { get; } = cre_userid;
        public DateTime? cre_time { get; } = cre_time;
        public string? upd_userid { get; } = upd_userid;
        public DateTime? upd_time { get; } = upd_time;

        [Key]
        public int? id { get; } = id;
        public string? name { get; } = name;
        public string? content { get; } = content;
        public string? visible { get; } = visible;
        public int? seq { get; } = seq;
    }

    public class CreateOSS_CustomPageSettingParam(
        string cre_userid,
        DateTime cre_time,
        string? name = null,
        string? content = null,
        string? visible = null,
        int? seq = null) : OSS_CustomPageSetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              name: name,
              content: content,
              visible: visible,
              seq: seq)
    {
    }

    public class UpdateOSS_CustomPageSettingParam(
        string upd_userid,
        DateTime upd_time,
        int id,
        DateTime? cre_time,
        string? cre_userid = api_string_param_no_pass,
        string? name = api_string_param_no_pass,
        string? content = api_string_param_no_pass,
        string? visible = api_string_param_no_pass,
        int? seq = api_numeric_param_no_pass) : OSS_CustomPageSetting(
              cre_userid: cre_userid,
              cre_time: cre_time,
              upd_userid: upd_userid,
              upd_time: upd_time,
              id: id,
              name: name,
              content: content,
              visible: visible,
              seq: seq)
    {
    }

    public class SearchOSS_CustomPageSettingParam(
        int? id = null,
        string? name = null,
        string? content = null,
        string? visible = null,
        int page = 0,
        int num_per_page = 0)
    {
        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_CustomPageSetting.id")]
        public int? id { get; } = id;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_CustomPageSetting.name")]
        public string? name { get; } = name;

        [SQLSearchCondition(SQLSearchConditionType.Like, "OSS_CustomPageSetting.content")]
        public string? content { get; } = content;

        [SQLSearchCondition(SQLSearchConditionType.Equal, "OSS_CustomPageSetting.visible")]
        public string? visible { get; } = visible;

        public int page { get; } = page;
        public int num_per_page { get; } = num_per_page;
    }

    public class SearchOSS_CustomPageSettingResult
    {

        [SQLSource("OSS_CustomPageSetting.cre_userid")]
        public string? cre_userid { get; set; }

        [SQLSource("OSS_CustomPageSetting.cre_time")]
        public DateTime? cre_time { get; set; }

        [SQLSource("OSS_CustomPageSetting.upd_userid")]
        public string? upd_userid { get; set; }

        [SQLSource("OSS_CustomPageSetting.upd_time")]
        public DateTime? upd_time { get; set; }

        [SQLSource("OSS_CustomPageSetting.id")]
        public int? id { get; set; }

        [SQLSource("OSS_CustomPageSetting.name")]
        public string? name { get; set; }

        [SQLSource("OSS_CustomPageSetting.content")]
        public string? content { get; set; }

        [SQLSource("OSS_CustomPageSetting.visible")]
        public string? visible { get; set; }

        [SQLSource("OSS_CustomPageSetting.seq")]
        public int? seq { get; set; }
    }
    #endregion

    #region API
    public class OSS_AllSettingSearchResponse
    {
        /// <summary>
        /// 網站設定回傳
        /// </summary>
        public OSS_WebsiteSettingSearchResponse website_setting { get; set; } = new();

        /// <summary>
        /// 社群連結回傳
        /// </summary>
        public List<OSS_SocialLinkSettingSearchResponse> social_link_settings { get; set; } = [];

        /// <summary>
        /// 問答回傳
        /// </summary>
        public List<OSS_QASettingSearchResponse> qa_settings { get; set; } = [];

        /// <summary>
        /// 條款回傳
        /// </summary>
        public OSS_TermSettingSearchResponse term_setting { get; set; } = new();

        /// <summary>
        /// 自訂頁面回傳
        /// </summary>
        public List<OSS_CustomPageSettingSearchResponse> custom_page_settings { get; set; } = [];

        /// <summary>
        /// 圖片們回傳
        /// </summary>
        public List<SearchFileResponse> files { get; set; } = [];
    }

    #region OSS_WebsiteSetting
    public class OSS_WebsiteSettingUpdate
    {
        /// <summary>
        /// 網站名稱
        /// </summary>
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "網站名稱")]
        public string? website_name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 營業時間
        /// </summary>
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "營業時間")]
        public string? bussiness_hour { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 聯絡電話
        /// </summary>
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "聯絡電話")]
        public string? phone { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 地址
        /// </summary>
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "地址")]
        public string? address { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// email
        /// </summary>
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "email")]
        public string? email { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 官網是否能取消訂單
        /// </summary>
        [Display(Name = "官網是否能取消訂單")]
        public string? can_website_cancel_order { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 購買上限
        /// </summary>
        [Display(Name = "購買上限")]
        public int? buy_limit { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 取得紅利幾個月後到期
        /// </summary>
        [Display(Name = "取得紅利幾個月後到期")]
        public int? bonus_expired_month { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 訂單可用紅利比例上限
        /// </summary>
        [Display(Name = "訂單可用紅利比例上限")]
        public decimal? order_bonus_limit_rate { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 是否開放紅利
        /// </summary>
        [Display(Name = "是否開放紅利")]
        public string? bonus_isopen { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 是否開放購物金
        /// </summary>
        [Display(Name = "是否開放購物金")]
        public string? shopping_voucher_isopen { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 是否開放發票
        /// </summary>
        [Display(Name = "是否開放發票")]
        public string? invoice_isopen { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 付款幾天後得到紅利
        /// </summary>
        [Display(Name = "付款幾天後得到紅利")]
        public int? days_after_pay_get_bonus { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 出貨幾天後得到紅利
        /// </summary>
        [Display(Name = "出貨幾天後得到紅利")]
        public int? days_after_ship_get_bonus { get; set; } = api_numeric_param_no_pass;

        /// <summary>
        /// 是否開放google登入
        /// </summary>
        [Display(Name = "是否開放google登入")]
        public string? google_login_isopen { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 是否開放line登入
        /// </summary>
        [Display(Name = "是否開放line登入")]
        public string? line_login_isopen { get; set; } = api_string_param_no_pass;
    }

    public class OSS_WebsiteSettingSearchResponse
    {
        /// <summary>
        /// 網站名稱
        /// </summary>
        [Display(Name = "網站名稱")]
        public string? website_name { get; set; }

        /// <summary>
        /// 營業時間
        /// </summary>
        [Display(Name = "營業時間")]
        public string? bussiness_hour { get; set; }

        /// <summary>
        /// 聯絡電話
        /// </summary>
        [Display(Name = "聯絡電話")]
        public string? phone { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        [Display(Name = "地址")]
        public string? address { get; set; }

        /// <summary>
        /// email
        /// </summary>
        [Display(Name = "email")]
        public string? email { get; set; }

        /// <summary>
        /// 官網是否能取消訂單
        /// </summary>
        [Display(Name = "官網是否能取消訂單")]
        public string? can_website_cancel_order { get; set; }

        /// <summary>
        /// 購買上限
        /// </summary>
        [Display(Name = "購買上限")]
        public int? buy_limit { get; set; }

        /// <summary>
        /// 取得紅利幾個月後到期
        /// </summary>
        [Display(Name = "取得紅利幾個月後到期")]
        public int? bonus_expired_month { get; set; }

        /// <summary>
        /// 訂單可用紅利比例上限
        /// </summary>
        [Display(Name = "訂單可用紅利比例上限")]
        public decimal? order_bonus_limit_rate { get; set; }

        /// <summary>
        /// 是否開放紅利
        /// </summary>
        [Display(Name = "是否開放紅利")]
        public string? bonus_isopen { get; set; }

        /// <summary>
        /// 是否開放購物金
        /// </summary>
        [Display(Name = "是否開放購物金")]
        public string? shopping_voucher_isopen { get; set; }

        /// <summary>
        /// 是否開放發票
        /// </summary>
        [Display(Name = "是否開放發票")]
        public string? invoice_isopen { get; set; }

        /// <summary>
        /// 付款幾天後得到紅利
        /// </summary>
        [Display(Name = "付款幾天後得到紅利")]
        public int? days_after_pay_get_bonus { get; set; }

        /// <summary>
        /// 出貨幾天後得到紅利
        /// </summary>
        [Display(Name = "出貨幾天後得到紅利")]
        public int? days_after_ship_get_bonus { get; set; }

        /// <summary>
        /// 是否開放google登入
        /// </summary>
        [Display(Name = "是否開放google登入")]
        public string? google_login_isopen { get; set; }

        /// <summary>
        /// 是否開放line登入
        /// </summary>
        [Display(Name = "是否開放line登入")]
        public string? line_login_isopen { get; set; }
    }
    #endregion

    #region OSS_SocialLinkSetting
    public class OSS_SocialLinkSettingCreate
    {
        /// <summary>
        /// 名稱
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(50, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// icon
        /// </summary>
        [Display(Name = "icon")]
        public string? icon { get; set; }

        /// <summary>
        /// 連結
        /// </summary>
        [Display(Name = "連結")]
        public string? url { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; } = 0;
    }

    public class OSS_SocialLinkSettingUpdate
    {
        /// <summary>
        /// 流水號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int id { get; set; }

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// icon
        /// </summary>
        [Display(Name = "icon")]
        public string? icon { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 連結
        /// </summary>
        [Display(Name = "連結")]
        public string? url { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; } = api_numeric_param_no_pass;
    }

    public class OSS_SocialLinkSettingDelete
    {
        /// <summary>
        /// 流水號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int id { get; set; }
    }

    public class OSS_SocialLinkSettingSearchResponse
    {
        /// <summary>
        /// 流水號
        /// </summary>
        [Display(Name = "流水號")]
        public int? id { get; set; }

        /// <summary>
        /// 名稱
        /// </summary>
        [Display(Name = "名稱")]
        public string? name { get; set; }

        /// <summary>
        /// icon
        /// </summary>
        [Display(Name = "icon")]
        public string? icon { get; set; }

        /// <summary>
        /// 連結
        /// </summary>
        [Display(Name = "連結")]
        public string? url { get; set; }

        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; }
    }
    #endregion

    #region OSS_QASetting
    public class OSS_QASettingCreate
    {
        /// <summary>
        /// 問
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "問")]
        public string question { get; set; } = "";

        /// <summary>
        /// 答
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "答")]
        public string answer { get; set; } = "";

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; } = 0;
    }

    public class OSS_QASettingUpdate
    {
        ///<summary>
        /// 流水號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int id { get; set; }

        ///<summary>
        /// 問
        /// </summary>
        [Display(Name = "問")]
        public string? question { get; set; } = api_string_param_no_pass;

        ///<summary>
        /// 答
        /// </summary>
        [Display(Name = "答")]
        public string? answer { get; set; } = api_string_param_no_pass;

        ///<summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; } = api_numeric_param_no_pass;
    }

    public class OSS_QASettingDelete
    {
        ///<summary>
        /// 流水號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int id { get; set; }
    }

    public class OSS_QASettingSearchResponse
    {
        ///<summary>
        /// 流水號
        /// </summary>
        [Display(Name = "流水號")]
        public int? id { get; set; }

        ///<summary>
        /// 問
        /// </summary>
        [Display(Name = "問")]
        public string? question { get; set; }

        ///<summary>
        /// 答
        /// </summary>
        [Display(Name = "答")]
        public string? answer { get; set; }

        ///<summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; }
    }
    #endregion

    #region OSS_TermSetting
    public class OSS_TermSettingUpdate
    {
        ///<summary>
        /// 隱私權政策
        /// </summary>
        [Display(Name = "隱私權政策")]
        public string? privacy_policy { get; set; } = api_string_param_no_pass;

        ///<summary>
        /// 服務條款
        /// </summary>
        [Display(Name = "服務條款")]
        public string? service_policy { get; set; } = api_string_param_no_pass;

        ///<summary>
        /// 購買須知
        /// </summary>
        [Display(Name = "購買須知")]
        public string? purchase_notice { get; set; } = api_string_param_no_pass;
    }

    public class OSS_TermSettingSearchResponse
    {
        ///<summary>
        /// 隱私權政策
        /// </summary>
        [Display(Name = "隱私權政策")]
        public string? privacy_policy { get; set; }

        ///<summary>
        /// 服務條款
        /// </summary>
        [Display(Name = "服務條款")]
        public string? service_policy { get; set; }

        ///<summary>
        /// 購買須知
        /// </summary>
        [Display(Name = "購買須知")]
        public string? purchase_notice { get; set; }
    }
    #endregion

    #region OSS_CustomPageSetting
    public class OSS_CustomPageSettingCreate
    {
        /// <summary>
        /// 頁面名稱
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [MaxLength(100, ErrorMessage = "{0}長度最大為{1}字元")]
        [Display(Name = "頁面名稱")]
        public string name { get; set; } = "";

        /// <summary>
        /// 頁面內容
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "頁面內容")]
        public string content { get; set; } = "";

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; } = 0;
    }

    public class OSS_CustomPageSettingUpdate
    {
        /// <summary>
        /// 流水號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int id { get; set; }

        /// <summary>
        /// 頁面名稱
        /// </summary>
        [Display(Name = "頁面名稱")]
        public string? name { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 頁面內容
        /// </summary>
        [Display(Name = "頁面內容")]
        public string? content { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; } = api_string_param_no_pass;

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; } = api_numeric_param_no_pass;
    }

    public class OSS_CustomPageSettingSearchResponse
    {
        /// <summary>
        /// 流水號
        /// </summary>
        [Display(Name = "流水號")]
        public int? id { get; set; }

        /// <summary>
        /// 頁面名稱
        /// </summary>
        [Display(Name = "頁面名稱")]
        public string? name { get; set; }

        /// <summary>
        /// 頁面內容
        /// </summary>
        [Display(Name = "頁面內容")]
        public string? content { get; set; }

        /// <summary>
        /// 是否可見
        /// </summary>
        [Display(Name = "是否可見")]
        public string? visible { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        [Display(Name = "排序")]
        public int? seq { get; set; }

        /// <summary>
        /// 圖片流水號
        /// </summary>
        [Display(Name = "圖片流水號")]
        public int? file_id { get; set; }

        /// <summary>
        /// 圖片路徑
        /// </summary>
        [Display(Name = "圖片路徑")]
        public string? file_path { get; set; }

        /// <summary>
        /// 圖片連結
        /// </summary>
        [Display(Name = "圖片連結")]
        public string? file_url { get; set; }
    }

    public class OSS_CustomPageSettingDelete
    {
        /// <summary>
        /// 流水號
        /// </summary>
        [Required(ErrorMessage = "請輸入{0}")]
        [Display(Name = "流水號")]
        public int id { get; set; }
    }
    #endregion

    #endregion
}