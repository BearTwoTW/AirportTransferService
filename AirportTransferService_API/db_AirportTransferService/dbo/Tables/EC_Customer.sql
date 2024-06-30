CREATE TABLE [dbo].[EC_Customer] (
    [cre_userid]                 VARCHAR (50)    NULL,
    [cre_time]                   DATETIME        NULL,
    [upd_userid]                 VARCHAR (50)    NULL,
    [upd_time]                   DATETIME        NULL,
    [customer_id]                VARCHAR (50)    NOT NULL,
    [username]                   NVARCHAR (256)  NULL,
    [password]                   NVARCHAR (50)   NULL,
    [customer_name]              VARCHAR (400)   NULL,
    [customer_phone]             VARCHAR (400)   NULL,
    [customer_mobile_phone]      VARCHAR (400)   NULL,
    [cl_id]                      INT             NULL,
    [gender]                     VARCHAR (50)    NULL,
    [birthday]                   DATE            NULL,
    [note]                       NVARCHAR (256)  NULL,
    [source_id]                  NVARCHAR (50)   NULL,
    [source_upd_time]            DATETIME        NULL,
    [customer_email]             VARCHAR (400)   NULL,
    [zip_code]                   VARCHAR (50)    NULL,
    [city]                       NVARCHAR (50)   NULL,
    [area]                       NVARCHAR (50)   NULL,
    [customer_address]           VARCHAR (400)   NULL,
    [zip_code_census]            VARCHAR (50)    NULL,
    [city_census]                NVARCHAR (50)   NULL,
    [area_census]                NVARCHAR (50)   NULL,
    [customer_address_census]    NVARCHAR (400)  NULL,
    [identity_card]              VARCHAR (400)   NULL,
    [ismember]                   VARCHAR (1)     NULL,
    [disable]                    VARCHAR (1)     NULL,
    [signin_time]                DATETIME        NULL,
    [web_code]                   VARCHAR (14)    NULL,
    [app_code]                   VARCHAR (14)    NULL,
    [verify_code]                VARCHAR (256)   NULL,
    [customer_name_en]           VARCHAR (256)   NULL,
    [customer_phone_en]          VARCHAR (256)   NULL,
    [customer_mobile_phone_en]   VARCHAR (256)   NULL,
    [customer_email_en]          NVARCHAR (256)  NULL,
    [customer_address_en]        VARCHAR (256)   NULL,
    [customer_address_census_en] NVARCHAR (256)  NULL,
    [identity_card_en]           NVARCHAR (256)  NULL,
    [google_id]                  VARCHAR (50)    NULL,
    [facebook_id]                VARCHAR (50)    NULL,
    [line_id]                    VARCHAR (50)    NULL,
    [google_email]               VARCHAR (400)   NULL,
    [line_email]                 VARCHAR (400)   NULL,
    [google_email_en]            NVARCHAR (256)  NULL,
    [line_email_en]              NVARCHAR (256)  NULL,
    [shopping_voucher]           DECIMAL (20, 2) NULL,
    CONSTRAINT [PK__Customer__CD65CB85D28F7EF4] PRIMARY KEY CLUSTERED ([customer_id] ASC)
);




GO
CREATE NONCLUSTERED INDEX [IX_Customer_phone_en]
    ON [dbo].[EC_Customer]([customer_phone_en] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Customer_name_en]
    ON [dbo].[EC_Customer]([customer_name_en] ASC);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'註冊驗證碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'verify_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'app識別碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'app_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'網頁識別碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'web_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'登入時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'signin_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否停用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'disable';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否會員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'ismember';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'身分證', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'identity_card';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'customer_address_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'area_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'city_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'customer_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'customer_email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'同步來源修改日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'source_upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'同步來源id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'source_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'birthday';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'性別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'gender';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'手機', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'customer_mobile_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車主姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'customer_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'密碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'password';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'username';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車主流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍郵遞區號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'zip_code_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'郵遞區號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'zip_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'購物金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'shopping_voucher';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員層級流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Customer', @level2type = N'COLUMN', @level2name = N'cl_id';

