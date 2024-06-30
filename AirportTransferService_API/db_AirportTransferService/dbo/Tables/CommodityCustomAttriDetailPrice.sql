CREATE TABLE [dbo].[CommodityCustomAttriDetailPrice] (
    [cre_userid]           VARCHAR (50)    NULL,
    [cre_time]             DATETIME        NULL,
    [upd_userid]           VARCHAR (50)    NULL,
    [upd_time]             DATETIME        NULL,
    [ccadp_id]             INT             IDENTITY (1, 1) NOT NULL,
    [commodity_id]         VARCHAR (50)    NULL,
    [uc_id]                VARCHAR (50)    NULL,
    [ccad_id_1]            VARCHAR (50)    NULL,
    [ccad_id_2]            VARCHAR (50)    NULL,
    [acceptance_count_sum] DECIMAL (20, 2) NULL,
    [acceptance_price_sum] DECIMAL (20, 2) NULL,
    PRIMARY KEY CLUSTERED ([ccadp_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'進貨驗收總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetailPrice', @level2type = N'COLUMN', @level2name = N'acceptance_price_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'進貨驗收數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetailPrice', @level2type = N'COLUMN', @level2name = N'acceptance_count_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項2流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetailPrice', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項1流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetailPrice', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetailPrice', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetailPrice', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetailPrice', @level2type = N'COLUMN', @level2name = N'ccadp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品自訂規格細項金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetailPrice';

