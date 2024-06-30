CREATE TABLE [dbo].[CarStockReserveImportMaster] (
    [cre_userid]   VARCHAR (50)   NULL,
    [cre_time]     DATETIME       NULL,
    [upd_userid]   VARCHAR (50)   NULL,
    [upd_time]     DATETIME       NULL,
    [csrim_id]     VARCHAR (50)   NOT NULL,
    [import_count] INT            NULL,
    [note]         NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([csrim_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存備註流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '匯入筆數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportMaster', @level2type = N'COLUMN', @level2name = N'import_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存保留匯入主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportMaster', @level2type = N'COLUMN', @level2name = N'csrim_id';

