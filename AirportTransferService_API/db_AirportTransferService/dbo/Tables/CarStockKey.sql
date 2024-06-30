CREATE TABLE [dbo].[CarStockKey] (
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  NULL,
    [upd_time]   DATETIME      NULL,
    [csk_id]     INT           IDENTITY (1, 1) NOT NULL,
    [cs_id]      VARCHAR (50)  NULL,
    [key_id]     INT           NULL,
    [note]       VARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([csk_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockKey', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '鑰匙編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockKey', @level2type = N'COLUMN', @level2name = N'key_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockKey', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車鑰匙流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockKey', @level2type = N'COLUMN', @level2name = N'csk_id';

