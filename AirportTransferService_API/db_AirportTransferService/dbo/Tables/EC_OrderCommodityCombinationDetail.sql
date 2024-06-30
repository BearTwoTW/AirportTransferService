CREATE TABLE [dbo].[EC_OrderCommodityCombinationDetail] (
    [cre_userid]              VARCHAR (50)    NULL,
    [cre_time]                DATETIME        NULL,
    [upd_userid]              VARCHAR (50)    NULL,
    [upd_time]                DATETIME        NULL,
    [ec_occd_id]              INT             IDENTITY (1, 1) NOT NULL,
    [ec_order_id]             VARCHAR (50)    NULL,
    [commoditycombination_id] VARCHAR (50)    NULL,
    [ccad_combination_id_1]   VARCHAR (50)    NULL,
    [ccad_combination_id_2]   VARCHAR (50)    NULL,
    [commodity_id]            VARCHAR (50)    NULL,
    [commodity_code]          VARCHAR (50)    NULL,
    [commodity_name]          NVARCHAR (255)  NULL,
    [uc_id]                   VARCHAR (50)    NULL,
    [ccad_id_1]               VARCHAR (50)    NULL,
    [ccad_name_1]             NVARCHAR (255)  NULL,
    [ccad_id_2]               VARCHAR (50)    NULL,
    [ccad_name_2]             NVARCHAR (255)  NULL,
    [count]                   DECIMAL (20, 2) NULL,
    [sale_price]              DECIMAL (20, 2) NULL,
    CONSTRAINT [PK__OrderCom__C523276071C03034] PRIMARY KEY CLUSTERED ([ec_occd_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'sale_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品自定義屬性細項名稱2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_name_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品自定義屬性細項流水號2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品自定義屬性細項名稱1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_name_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品自定義屬性細項流水號1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'commodity_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'commodity_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'組合商品自定義屬性細項流水號2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_combination_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'組合商品自定義屬性細項流水號1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_combination_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'組合商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'commoditycombination_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ec_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ec_occd_id';

