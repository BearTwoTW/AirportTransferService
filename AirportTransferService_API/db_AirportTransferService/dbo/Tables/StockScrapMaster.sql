CREATE TABLE [dbo].[StockScrapMaster] (
    [cre_userid]       VARCHAR (50)  NULL,
    [cre_time]         DATETIME      NULL,
    [upd_userid]       VARCHAR (50)  NULL,
    [upd_time]         DATETIME      NULL,
    [ssm_id]           VARCHAR (50)  NOT NULL,
    [date]             DATE          NULL,
    [note]             VARCHAR (255) NULL,
    [company_id]       VARCHAR (255) NULL,
    [complete_user_id] VARCHAR (50)  NULL,
    [complete_time]    DATETIME      NULL,
    [position_id]      VARCHAR (50)  NULL,
    CONSTRAINT [PK__StockScr__E581D0AFDB98725F] PRIMARY KEY CLUSTERED ([ssm_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'結案時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapMaster', @level2type = N'COLUMN', @level2name = N'complete_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'結案使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapMaster', @level2type = N'COLUMN', @level2name = N'complete_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapMaster', @level2type = N'COLUMN', @level2name = N'company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapMaster', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存退回主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapMaster', @level2type = N'COLUMN', @level2name = N'ssm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存退回主項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapMaster';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockScrapMaster', @level2type = N'COLUMN', @level2name = N'position_id';

