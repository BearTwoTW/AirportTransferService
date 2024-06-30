CREATE TABLE [dbo].[CarComponent] (
    [cre_userid]     VARCHAR (50)    NULL,
    [cre_time]       DATETIME        NULL,
    [upd_userid]     VARCHAR (50)    NULL,
    [upd_time]       DATETIME        NULL,
    [cc_id]          VARCHAR (50)    NOT NULL,
    [cct_id]         INT             NULL,
    [front_code]     VARCHAR (50)    NULL,
    [mid_code]       VARCHAR (50)    NULL,
    [back_code]      VARCHAR (50)    NULL,
    [component_name] NVARCHAR (255)  NULL,
    [service_price]  DECIMAL (10, 2) NULL,
    [newcar_price]   DECIMAL (10, 2) NULL,
    [valid_date]     DATE            NULL,
    [stop_sale_date] DATE            NULL,
    [visible]        VARCHAR (1)     NULL,
    CONSTRAINT [PK__CarCompo__9F1E187B7AEDCAF8] PRIMARY KEY CLUSTERED ([cc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'停賣時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'stop_sale_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'valid_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新車優惠價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'newcar_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'服務廠售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'service_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'品名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'component_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'後段代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'back_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'中段代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'mid_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'前段代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'front_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'cct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車零件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponent', @level2type = N'COLUMN', @level2name = N'cc_id';

