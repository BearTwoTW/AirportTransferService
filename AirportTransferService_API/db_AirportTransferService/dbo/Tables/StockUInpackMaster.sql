CREATE TABLE [dbo].[StockUInpackMaster] (
    [cre_userid]       VARCHAR (50)  NULL,
    [cre_time]         DATETIME      NULL,
    [upd_userid]       VARCHAR (50)  NULL,
    [upd_time]         DATETIME      NULL,
    [suim_id]          VARCHAR (50)  NOT NULL,
    [date]             DATE          NULL,
    [note]             VARCHAR (255) NULL,
    [complete_user_id] VARCHAR (50)  NULL,
    [complete_time]    DATETIME      NULL,
    [position_id]      VARCHAR (50)  NULL,
    CONSTRAINT [PK__StockUIn__FA751B5871030204] PRIMARY KEY CLUSTERED ([suim_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'結案時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackMaster', @level2type = N'COLUMN', @level2name = N'complete_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'結案使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackMaster', @level2type = N'COLUMN', @level2name = N'complete_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackMaster', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存開裝箱主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackMaster', @level2type = N'COLUMN', @level2name = N'suim_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存開裝箱主項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackMaster';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockUInpackMaster', @level2type = N'COLUMN', @level2name = N'position_id';

