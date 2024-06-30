CREATE TABLE [dbo].[StockScrapDetail] (
    [cre_userid] VARCHAR (50)    NULL,
    [cre_time]   DATETIME        NULL,
    [upd_userid] VARCHAR (50)    NULL,
    [upd_time]   DATETIME        NULL,
    [ssd_id]     INT             IDENTITY (1, 1) NOT NULL,
    [ssm_id]     VARCHAR (50)    NULL,
    [stock_id]   VARCHAR (50)    NULL,
    [count]      DECIMAL (20, 2) NULL,
    [refund]     DECIMAL (20, 2) NULL,
    [note]       VARCHAR (255)   NULL,
    PRIMARY KEY CLUSTERED ([ssd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapDetail', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退費', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapDetail', @level2type = N'COLUMN', @level2name = N'refund';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退回數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapDetail', @level2type = N'COLUMN', @level2name = N'stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存退回主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapDetail', @level2type = N'COLUMN', @level2name = N'ssm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存退回細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapDetail', @level2type = N'COLUMN', @level2name = N'ssd_id';

