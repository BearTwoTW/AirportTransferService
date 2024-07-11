CREATE TABLE [dbo].[ATS_AirportTerminalSettings] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [ats_id]     VARCHAR (10)   NOT NULL,
    [visible]    VARCHAR (2)    CONSTRAINT [DF_ATS_AirportTerminalSettings_visible] DEFAULT ('Y') NULL,
    [airport]    NVARCHAR (255) NULL,
    [terminal]   NVARCHAR (255) NULL,
    CONSTRAINT [PK_ATS_AirportTerminalSettings] PRIMARY KEY CLUSTERED ([ats_id] ASC)
);






GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'航廈', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_AirportTerminalSettings', @level2type = N'COLUMN', @level2name = N'terminal';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'機場', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_AirportTerminalSettings', @level2type = N'COLUMN', @level2name = N'airport';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_AirportTerminalSettings', @level2type = N'COLUMN', @level2name = N'ats_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_AirportTerminalSettings', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_AirportTerminalSettings', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_AirportTerminalSettings', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_AirportTerminalSettings', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_AirportTerminalSettings', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'機場設定',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'ATS_AirportTerminalSettings',
    @level2type = NULL,
    @level2name = NULL