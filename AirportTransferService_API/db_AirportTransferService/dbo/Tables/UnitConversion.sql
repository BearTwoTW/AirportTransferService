CREATE TABLE [dbo].[UnitConversion] (
    [cre_userid]           VARCHAR (50)    NULL,
    [cre_time]             DATETIME        NULL,
    [upd_userid]           VARCHAR (50)    NULL,
    [upd_time]             DATETIME        NULL,
    [uc_id]                VARCHAR (50)    NOT NULL,
    [commodity_id]         VARCHAR (50)    NULL,
    [convert_unit_id]      VARCHAR (50)    NULL,
    [convert_count]        DECIMAL (9, 2)  NULL,
    [basic_unit_id]        VARCHAR (50)    NULL,
    [basic_count]          DECIMAL (9, 2)  NULL,
    [safe_storage]         DECIMAL (9, 2)  NULL,
    [buy_retail_price]     DECIMAL (20, 2) NULL,
    [buy_wholesale_price]  DECIMAL (20, 2) NULL,
    [sale_price]           DECIMAL (20, 2) NULL,
    [visible]              VARCHAR (1)     NULL,
    [acceptance_count_sum] DECIMAL (20, 2) NULL,
    [acceptance_price_sum] DECIMAL (20, 2) NULL,
    PRIMARY KEY CLUSTERED ([uc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總驗收金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'acceptance_price_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總驗收數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'acceptance_count_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'sale_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'批發買入價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'buy_wholesale_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'零售買入價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'buy_retail_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'安全庫存', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'safe_storage';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'基本單位數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'basic_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'基本單位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'basic_unit_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'轉換單位數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'convert_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'轉換單位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'convert_unit_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位換算流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UnitConversion', @level2type = N'COLUMN', @level2name = N'uc_id';

