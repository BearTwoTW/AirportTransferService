CREATE TABLE [dbo].[Customer] (
    [cre_userid]                 VARCHAR (50)   NULL,
    [cre_time]                   DATETIME       NULL,
    [upd_userid]                 VARCHAR (50)   NULL,
    [upd_time]                   DATETIME       NULL,
    [customer_id]                VARCHAR (50)   NOT NULL,
    [customer_name]              VARCHAR (400)  NULL,
    [customer_name_en]           VARCHAR (256)  NULL,
    [customer_phone]             VARCHAR (400)  NULL,
    [customer_phone_en]          VARCHAR (256)  NULL,
    [remark]                     NVARCHAR (256) NULL,
    [source_id]                  NVARCHAR (50)  NULL,
    [source_upd_time]            DATETIME       NULL,
    [customer_email]             VARCHAR (400)  NULL,
    [customer_email_en]          VARCHAR (256)  NULL,
    [city]                       NVARCHAR (50)  NULL,
    [area]                       NVARCHAR (50)  NULL,
    [customer_address]           VARCHAR (400)  NULL,
    [city_census]                NVARCHAR (50)  NULL,
    [area_census]                NVARCHAR (50)  NULL,
    [customer_address_census]    NVARCHAR (400) NULL,
    [customer_address_en]        VARCHAR (256)  NULL,
    [customer_address_census_en] NVARCHAR (256) NULL,
    PRIMARY KEY CLUSTERED ([customer_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'customer_address_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'area_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'city_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'customer_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車主信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'customer_email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'同步來源修改日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'source_upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'同步來源id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'source_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車主電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'customer_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車主姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Customer', @level2type = N'COLUMN', @level2name = N'customer_name';

