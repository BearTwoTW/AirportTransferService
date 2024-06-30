CREATE TABLE [dbo].[CommodityOnShelfPeriod] (
    [cre_userid]          VARCHAR (50)    NULL,
    [cre_time]            DATETIME        NULL,
    [upd_userid]          VARCHAR (50)    NULL,
    [upd_time]            DATETIME        NULL,
    [cosp_id]             INT             IDENTITY (1, 1) NOT NULL,
    [commodity_id]        VARCHAR (50)    NULL,
    [uc_id]               VARCHAR (50)    NULL,
    [on_shelf_time_start] DATETIME        NULL,
    [on_shelf_time_end]   DATETIME        NULL,
    [suggested_price]     DECIMAL (20, 2) NULL,
    [sale_price]          DECIMAL (20, 2) NULL,
    [note]                NVARCHAR (MAX)  NULL,
    [ccad_ids_1]          NVARCHAR (MAX)  NULL,
    [ccad_ids_2]          NVARCHAR (MAX)  NULL,
    [ccad_price_setting]  NVARCHAR (MAX)  NULL,
    [shopping_notice]     NVARCHAR (MAX)  NULL,
    [is_preorder]         VARCHAR (1)     NULL,
    CONSTRAINT [PK__Commodit__BAF382106FC90D1E] PRIMARY KEY CLUSTERED ([cosp_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'其他描述', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'shopping_notice';




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂屬性價格設定', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'ccad_price_setting';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂屬性細項們2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'ccad_ids_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂屬性細項們1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'ccad_ids_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'sale_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建議售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'suggested_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'上架時間迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'on_shelf_time_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'上架時間起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'on_shelf_time_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'cosp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否預購', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriod', @level2type = N'COLUMN', @level2name = N'is_preorder';

