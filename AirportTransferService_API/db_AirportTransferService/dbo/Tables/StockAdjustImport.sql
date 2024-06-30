CREATE TABLE [dbo].[StockAdjustImport] (
    [cre_userid]     VARCHAR (50)    NULL,
    [cre_time]       DATETIME        NULL,
    [upd_userid]     VARCHAR (50)    NULL,
    [upd_time]       DATETIME        NULL,
    [id]             INT             IDENTITY (1, 1) NOT NULL,
    [stock_id]       VARCHAR (50)    NULL,
    [commodity_code] VARCHAR (50)    NULL,
    [commodity_name] VARCHAR (255)   NULL,
    [sys_count]      DECIMAL (20, 2) NULL,
    [real_count]     DECIMAL (20, 2) NULL,
    [unit]           VARCHAR (255)   NULL,
    [ccad_name_1]    VARCHAR (255)   NULL,
    [ccad_name_2]    VARCHAR (255)   NULL,
    [expired_date]   DATE            NULL,
    [warehouse_name] VARCHAR (100)   NULL,
    CONSTRAINT [PK__StockAdj__3213E83F25F2193D] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'warehouse_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到期日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'expired_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂屬性細項2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'ccad_name_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂屬性細項1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'ccad_name_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位說明', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'unit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'實際庫存數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'real_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'系統庫存數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'sys_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'commodity_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'commodity_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockAdjustImport', @level2type = N'COLUMN', @level2name = N'id';

