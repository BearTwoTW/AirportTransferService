CREATE TABLE [dbo].[CarTypeFormatPrice] (
    [cre_userid]      VARCHAR (50)    NULL,
    [cre_time]        DATETIME        NULL,
    [upd_userid]      VARCHAR (50)    NULL,
    [upd_time]        DATETIME        NULL,
    [ctfp_id]         INT             IDENTITY (1, 1) NOT NULL,
    [ctf_id]          INT             NULL,
    [year]            INT             NULL,
    [year_age]        INT             NULL,
    [car_type_price]  DECIMAL (10, 2) NULL,
    [repayment_price] DECIMAL (10, 2) NULL,
    [valid_date]      DATE            NULL,
    [invalid_date]    DATE            NULL,
    CONSTRAINT [PK__CarTypeF__45C978C5B3F592FF] PRIMARY KEY CLUSTERED ([ctfp_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'不可受訂起始日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormatPrice', @level2type = N'COLUMN', @level2name = N'invalid_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'可受訂起始日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormatPrice', @level2type = N'COLUMN', @level2name = N'valid_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'還款價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormatPrice', @level2type = N'COLUMN', @level2name = N'repayment_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormatPrice', @level2type = N'COLUMN', @level2name = N'car_type_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年份', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormatPrice', @level2type = N'COLUMN', @level2name = N'year_age';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormatPrice', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型規格對照流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormatPrice', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormatPrice', @level2type = N'COLUMN', @level2name = N'ctfp_id';

