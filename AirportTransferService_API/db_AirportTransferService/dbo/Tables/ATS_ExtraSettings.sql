﻿CREATE TABLE [dbo].[ATS_ExtraSettings] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [es_id]      VARCHAR (10)   NOT NULL,
    [visible]    VARCHAR (2)    CONSTRAINT [DF_ATS_ExtraSettings_visible] DEFAULT ('Y') NULL,
    [type]       VARCHAR (10)   NULL,
    [name]       NVARCHAR (255) NULL,
    [price]      DECIMAL (10)   CONSTRAINT [DF_ATS_ExtraSettings_price] DEFAULT ((0)) NULL,
    CONSTRAINT [PK_ATS_ExtraSettings] PRIMARY KEY CLUSTERED ([es_id] ASC)
);










GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'價錢', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_ExtraSettings', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_ExtraSettings', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_ExtraSettings', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_ExtraSettings', @level2type = N'COLUMN', @level2name = N'es_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_ExtraSettings', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_ExtraSettings', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_ExtraSettings', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_ExtraSettings', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_ExtraSettings', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'加價設定',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'ATS_ExtraSettings',
    @level2type = NULL,
    @level2name = NULL