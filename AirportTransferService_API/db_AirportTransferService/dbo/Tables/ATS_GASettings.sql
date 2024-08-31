CREATE TABLE [dbo].[ATS_GASettings] (
    [cre_userid]      VARCHAR (50)   NULL,
    [cre_time]        DATETIME       NULL,
    [upd_userid]      VARCHAR (50)   NULL,
    [upd_time]        DATETIME       NULL,
    [gas_id]          VARCHAR (10)   NOT NULL,
    [tracking_code]   NVARCHAR (MAX) NULL,
    [keyword]         NVARCHAR (MAX) NULL,
    [summary]         NVARCHAR (MAX) NULL,
    [descriptive_url] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_ATS_GASettings] PRIMARY KEY CLUSTERED ([gas_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'描述性URL', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_GASettings', @level2type = N'COLUMN', @level2name = N'descriptive_url';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'簡介', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_GASettings', @level2type = N'COLUMN', @level2name = N'summary';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'關鍵字', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_GASettings', @level2type = N'COLUMN', @level2name = N'keyword';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'追蹤碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_GASettings', @level2type = N'COLUMN', @level2name = N'tracking_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_GASettings', @level2type = N'COLUMN', @level2name = N'gas_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_GASettings', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_GASettings', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_GASettings', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_GASettings', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'GA設定',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'ATS_GASettings',
    @level2type = NULL,
    @level2name = NULL