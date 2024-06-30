CREATE TABLE [dbo].[OSS_WebsiteSetting] (
    [cre_userid]                VARCHAR (50)   NULL,
    [cre_time]                  DATETIME       NULL,
    [upd_userid]                VARCHAR (50)   NULL,
    [upd_time]                  DATETIME       NULL,
    [id]                        INT            IDENTITY (1, 1) NOT NULL,
    [website_name]              NVARCHAR (255) NULL,
    [bussiness_hour]            NVARCHAR (255) NULL,
    [phone]                     NVARCHAR (50)  NULL,
    [address]                   NVARCHAR (255) NULL,
    [email]                     NVARCHAR (255) NULL,
    [can_website_cancel_order]  VARCHAR (2)    NULL,
    [buy_limit]                 INT            NULL,
    [bonus_expired_month]       INT            NULL,
    [order_bonus_limit_rate]    DECIMAL (5, 2) NULL,
    [bonus_isopen]              VARCHAR (2)    NULL,
    [shopping_voucher_isopen]   VARCHAR (2)    NULL,
    [invoice_isopen]            VARCHAR (2)    NULL,
    [days_after_pay_get_bonus]  INT            NULL,
    [days_after_ship_get_bonus] INT            NULL,
    [google_login_isopen]       VARCHAR (2)    NULL,
    [line_login_isopen]         VARCHAR (2)    NULL,
    CONSTRAINT [PK_OSS_WebsiteSetting] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否開放line登入', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'line_login_isopen';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否開放google登入', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'google_login_isopen';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取貨幾天後得到紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'days_after_ship_get_bonus';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款幾天後得到紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'days_after_pay_get_bonus';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否開放發票', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'invoice_isopen';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否開放購物金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'shopping_voucher_isopen';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否開放紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'bonus_isopen';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單可用紅利比例上限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'order_bonus_limit_rate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取得紅利幾個月後到期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'bonus_expired_month';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'購買上限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'buy_limit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'官網是否能取消訂單', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'can_website_cancel_order';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'email', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'營業時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'bussiness_hour';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'網站名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting', @level2type = N'COLUMN', @level2name = N'website_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'網站設定', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_WebsiteSetting';

