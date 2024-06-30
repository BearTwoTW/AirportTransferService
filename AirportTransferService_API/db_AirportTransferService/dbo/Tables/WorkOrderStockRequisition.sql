CREATE TABLE [dbo].[WorkOrderStockRequisition] (
    [cre_userid]      VARCHAR (50)    NULL,
    [cre_time]        DATETIME        NULL,
    [upd_userid]      VARCHAR (50)    NULL,
    [upd_time]        DATETIME        NULL,
    [wosr_id]         VARCHAR (50)    NOT NULL,
    [wotrd_id]        INT             NULL,
    [wom_id]          VARCHAR (50)    NULL,
    [stock_id]        VARCHAR (50)    NULL,
    [commodity_id]    VARCHAR (50)    NULL,
    [count]           DECIMAL (10, 2) NULL,
    [total_price]     DECIMAL (10, 2) NULL,
    [need_calc_stock] VARCHAR (1)     NULL,
    [qcd_id]          VARCHAR (50)    NULL,
    CONSTRAINT [PK__WorkOrde__C203D381370C0CC6] PRIMARY KEY CLUSTERED ([wosr_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'估價單商品細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderStockRequisition', @level2type = N'COLUMN', @level2name = N'qcd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否計算庫存', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderStockRequisition', @level2type = N'COLUMN', @level2name = N'need_calc_stock';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderStockRequisition', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderStockRequisition', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '商品流水號 只是為了方便計算不用再去join', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderStockRequisition', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderStockRequisition', @level2type = N'COLUMN', @level2name = N'stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderStockRequisition', @level2type = N'COLUMN', @level2name = N'wom_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工單交修項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderStockRequisition', @level2type = N'COLUMN', @level2name = N'wotrd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工單庫存領用流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderStockRequisition', @level2type = N'COLUMN', @level2name = N'wosr_id';

