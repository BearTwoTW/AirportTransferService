CREATE TABLE [dbo].[StockPutInMaster] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [spim_id]    VARCHAR (50)   NOT NULL,
    [date]       DATE           NULL,
    [note]       NVARCHAR (255) NULL,
    CONSTRAINT [PK_StockPutInMaster] PRIMARY KEY CLUSTERED ([spim_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInMaster', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存入庫主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInMaster', @level2type = N'COLUMN', @level2name = N'spim_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存入庫主項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInMaster';

