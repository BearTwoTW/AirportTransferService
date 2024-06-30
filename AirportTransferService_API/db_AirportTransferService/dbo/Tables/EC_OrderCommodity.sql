CREATE TABLE [dbo].[EC_OrderCommodity] (
    [cre_userid]                  VARCHAR (50)    NULL,
    [cre_time]                    DATETIME        NULL,
    [upd_userid]                  VARCHAR (50)    NULL,
    [upd_time]                    DATETIME        NULL,
    [ec_oc_id]                    INT             IDENTITY (1, 1) NOT NULL,
    [ec_order_id]                 VARCHAR (50)    NULL,
    [ec_order_logistics_id]       VARCHAR (50)    NULL,
    [commodity_id]                VARCHAR (50)    NULL,
    [commodity_code]              VARCHAR (50)    NULL,
    [commodity_name]              NVARCHAR (255)  NULL,
    [iscombination]               VARCHAR (1)     NULL,
    [uc_id]                       VARCHAR (50)    NULL,
    [count]                       DECIMAL (20, 2) NULL,
    [picked_count]                INT             NULL,
    [pick_time]                   DATETIME        NULL,
    [suggested_price]             DECIMAL (20, 2) NULL,
    [original_price]              DECIMAL (20, 2) NULL,
    [sale_price]                  DECIMAL (20, 2) NULL,
    [shopping_voucher]            DECIMAL (20, 2) NULL,
    [bonus_use]                   DECIMAL (20, 2) NULL,
    [bonus_get]                   DECIMAL (20, 2) NULL,
    [ccad_id_1]                   VARCHAR (50)    NULL,
    [ccad_name_1]                 NVARCHAR (255)  NULL,
    [ccad_id_2]                   VARCHAR (50)    NULL,
    [ccad_name_2]                 NVARCHAR (255)  NULL,
    [promotion_calculate_process] NVARCHAR (MAX)  NULL,
    [isgift]                      VARCHAR (1)     NULL,
    [promotion_id]                VARCHAR (50)    NULL,
    [pxg_id]                      INT             NULL,
    [return_count]                DECIMAL (20, 2) NULL,
    [scrap_count]                 DECIMAL (20, 2) NULL,
    [is_preorder]                 VARCHAR (1)     NULL,
    [cosp_id]                     INT             NULL,
    [acceptance_note]             NVARCHAR (MAX)  NULL,
    [acceptance_time]             DATETIME        NULL,
    [return_stock_id]             VARCHAR (50)    NULL,
    [scrap_stock_id]              VARCHAR (50)    NULL,
    [stock_id]                    VARCHAR (50)    NULL,
    CONSTRAINT [PK__OrderCom__FE067D511C343282] PRIMARY KEY CLUSTERED ([ec_oc_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷活動贈品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'pxg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷活動流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'promotion_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否贈品', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'isgift';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷計算過程', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'promotion_calculate_process';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項2名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'ccad_name_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項2流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項1名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'ccad_name_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項1流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'sale_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'原價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'original_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建議售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'suggested_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'已揀貨數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'picked_count';




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否組合商品', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'iscombination';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'commodity_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'commodity_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'ec_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'ec_oc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'扣庫庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用購物金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'shopping_voucher';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'報廢庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'scrap_stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'報廢數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'scrap_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'return_stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'return_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'揀貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'pick_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否預購', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'is_preorder';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單物流流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'ec_order_logistics_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'上架時段流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'cosp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'bonus_use';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'紅利回饋', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'bonus_get';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨驗貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'acceptance_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗貨備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderCommodity', @level2type = N'COLUMN', @level2name = N'acceptance_note';

