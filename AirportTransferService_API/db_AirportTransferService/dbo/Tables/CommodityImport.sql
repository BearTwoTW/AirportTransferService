CREATE TABLE [dbo].[CommodityImport] (
    [cre_userid]          VARCHAR (50)    NULL,
    [cre_time]            DATETIME        NULL,
    [id]                  INT             IDENTITY (1, 1) NOT NULL,
    [commodity_code]      VARCHAR (50)    NULL,
    [commodity_name]      VARCHAR (255)   NULL,
    [type]                VARCHAR (50)    NULL,
    [label_big]           VARCHAR (10)    NULL,
    [label_mid]           VARCHAR (10)    NULL,
    [label_small]         VARCHAR (10)    NULL,
    [on_shelf_time]       DATETIME        NULL,
    [off_shelf_time]      DATETIME        NULL,
    [unit]                VARCHAR (50)    NULL,
    [note]                VARCHAR (255)   NULL,
    [buy_retail_price]    DECIMAL (20, 2) NULL,
    [buy_wholesale_price] DECIMAL (20, 2) NULL,
    [sale_price]          DECIMAL (20, 2) NULL,
    [suggested_price]     DECIMAL (20, 2) NULL,
    [safe_storage]        DECIMAL (9, 2)  NULL,
    [need_calc_stock]     VARCHAR (1)     NULL,
    [iscombination]       VARCHAR (1)     NULL,
    [ccam_name_1]         VARCHAR (255)   NULL,
    [ccad_name_1]         VARCHAR (255)   NULL,
    [ccam_name_2]         VARCHAR (255)   NULL,
    [ccad_name_2]         VARCHAR (255)   NULL,
    [company]             VARCHAR (255)   NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'company';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項名稱2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'ccad_name_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性主項名稱2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'ccam_name_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項名稱1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'ccad_name_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性主項名稱1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'ccam_name_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否組合商品', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'iscombination';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否需要計算庫存', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'need_calc_stock';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'安全庫存', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'safe_storage';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建議售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'suggested_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'sale_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'批發買入價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'buy_wholesale_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'零售買入價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'buy_retail_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'unit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'下架時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'off_shelf_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'上架時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'on_shelf_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'小標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'label_small';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'中標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'label_mid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'大標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'label_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'commodity_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'commodity_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityImport', @level2type = N'COLUMN', @level2name = N'id';

