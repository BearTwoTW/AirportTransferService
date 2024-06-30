CREATE TABLE [dbo].[SignOffSettingDetailOption] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [sosdo_id]   INT            IDENTITY (1, 1) NOT NULL,
    [sosd_id]    VARCHAR (50)   NULL,
    [option]     NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([sosdo_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '選項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetailOption', @level2type = N'COLUMN', @level2name = N'option';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定細項選項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetailOption', @level2type = N'COLUMN', @level2name = N'sosd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetailOption', @level2type = N'COLUMN', @level2name = N'sosdo_id';

