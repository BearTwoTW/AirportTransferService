CREATE TABLE [dbo].[StockUInpackDetail] (
    [cre_userid] VARCHAR (50)    NULL,
    [cre_time]   DATETIME        NULL,
    [upd_userid] VARCHAR (50)    NULL,
    [upd_time]   DATETIME        NULL,
    [suid_id]    INT             IDENTITY (1, 1) NOT NULL,
    [suim_id]    VARCHAR (50)    NULL,
    [stock_id]   VARCHAR (50)    NULL,
    [type]       VARCHAR (50)    NULL,
    [count]      DECIMAL (20, 2) NULL,
    PRIMARY KEY CLUSTERED ([suid_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'操作類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackDetail', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackDetail', @level2type = N'COLUMN', @level2name = N'stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存開裝箱主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackDetail', @level2type = N'COLUMN', @level2name = N'suim_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存開裝箱細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackDetail', @level2type = N'COLUMN', @level2name = N'suid_id';

