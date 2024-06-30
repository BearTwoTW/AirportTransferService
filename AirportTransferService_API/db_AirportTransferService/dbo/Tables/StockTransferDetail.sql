CREATE TABLE [dbo].[StockTransferDetail] (
    [cre_userid]   VARCHAR (50)    NULL,
    [cre_time]     DATETIME        NULL,
    [upd_userid]   VARCHAR (50)    NULL,
    [upd_time]     DATETIME        NULL,
    [std_id]       INT             IDENTITY (1, 1) NOT NULL,
    [stm_id]       VARCHAR (50)    NULL,
    [stock_id]     VARCHAR (50)    NULL,
    [count]        DECIMAL (20, 2) NULL,
    [warehouse_id] VARCHAR (50)    NULL,
    [stock_id_to]  VARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([std_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'目標倉庫流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockTransferDetail', @level2type = N'COLUMN', @level2name = N'warehouse_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockTransferDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockTransferDetail', @level2type = N'COLUMN', @level2name = N'stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'移庫主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockTransferDetail', @level2type = N'COLUMN', @level2name = N'stm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockTransferDetail', @level2type = N'COLUMN', @level2name = N'std_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'移去的庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockTransferDetail', @level2type = N'COLUMN', @level2name = N'stock_id_to';

