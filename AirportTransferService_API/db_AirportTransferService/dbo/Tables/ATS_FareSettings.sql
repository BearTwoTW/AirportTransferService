CREATE TABLE [dbo].[ATS_FareSettings] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [fs_id]      VARCHAR (10)   NOT NULL,
    [visible]    VARCHAR (2)    CONSTRAINT [DF_ATS_FareSettings_visible] DEFAULT ('Y') NULL,
    [cms_id]     VARCHAR (10)   NULL,
    [city]       NVARCHAR (255) NULL,
    [area]       NVARCHAR (255) NULL,
    [road]       NVARCHAR (255) NULL,
    [section]    NVARCHAR (255) NULL,
    [airport]    NVARCHAR (255) NULL,
    [terminal]   NVARCHAR (255) NULL,
    [price]      DECIMAL (10)   CONSTRAINT [DF_ATS_FareSettings_price] DEFAULT ((0)) NULL,
    CONSTRAINT [PK_ATS_FareSettings] PRIMARY KEY CLUSTERED ([fs_id] ASC)
);










GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'價錢', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'航廈', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'terminal';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'機場', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'airport';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'段', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'section';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'路', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'road';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'cms_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'fs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_FareSettings', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'車資設定',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'ATS_FareSettings',
    @level2type = NULL,
    @level2name = NULL