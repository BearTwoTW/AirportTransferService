CREATE TABLE [dbo].[CarStockManageLog] (
    [cre_userid]  VARCHAR (50)  NULL,
    [cre_time]    DATETIME      NULL,
    [upd_userid]  VARCHAR (50)  NULL,
    [upd_time]    DATETIME      NULL,
    [csml_id]     INT           IDENTITY (1, 1) NOT NULL,
    [cs_id]       VARCHAR (50)  NULL,
    [master_type] VARCHAR (50)  NULL,
    [detail_type] VARCHAR (50)  NULL,
    [id]          INT           NULL,
    [time]        DATETIME      NULL,
    [user_id]     VARCHAR (50)  NULL,
    [note]        VARCHAR (255) NULL,
    CONSTRAINT [PK__CarStock__EBD399AFA1696878] PRIMARY KEY CLUSTERED ([csml_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockManageLog', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockManageLog', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockManageLog', @level2type = N'COLUMN', @level2name = N'time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockManageLog', @level2type = N'COLUMN', @level2name = N'id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'細項類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockManageLog', @level2type = N'COLUMN', @level2name = N'detail_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主項類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockManageLog', @level2type = N'COLUMN', @level2name = N'master_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockManageLog', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存管理紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockManageLog', @level2type = N'COLUMN', @level2name = N'csml_id';

