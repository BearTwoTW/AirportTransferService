CREATE TABLE [dbo].[StockAdjustDetail] (
    [cre_userid] VARCHAR (50)    NULL,
    [cre_time]   DATETIME        NULL,
    [upd_userid] VARCHAR (50)    NULL,
    [upd_time]   DATETIME        NULL,
    [sad_id]     INT             IDENTITY (1, 1) NOT NULL,
    [sam_id]     VARCHAR (50)    NULL,
    [stock_id]   VARCHAR (50)    NULL,
    [count]      DECIMAL (20, 2) NULL,
    PRIMARY KEY CLUSTERED ([sad_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'調整數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustDetail', @level2type = N'COLUMN', @level2name = N'stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存調整主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustDetail', @level2type = N'COLUMN', @level2name = N'sam_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存調整細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustDetail', @level2type = N'COLUMN', @level2name = N'sad_id';

