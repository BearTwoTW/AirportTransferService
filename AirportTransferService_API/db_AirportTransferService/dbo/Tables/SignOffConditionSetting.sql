CREATE TABLE [dbo].[SignOffConditionSetting] (
    [cre_userid] VARCHAR (50)    NULL,
    [cre_time]   DATETIME        NULL,
    [upd_userid] VARCHAR (50)    NULL,
    [upd_time]   DATETIME        NULL,
    [socs_id]    INT             IDENTITY (1, 1) NOT NULL,
    [sosd_id]    VARCHAR (50)    NULL,
    [ul_id]      INT             NULL,
    [threshold]  DECIMAL (10, 2) NULL,
    PRIMARY KEY CLUSTERED ([socs_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '門檻', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffConditionSetting', @level2type = N'COLUMN', @level2name = N'threshold';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '職務流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffConditionSetting', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffConditionSetting', @level2type = N'COLUMN', @level2name = N'sosd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核條件規則設定流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffConditionSetting', @level2type = N'COLUMN', @level2name = N'socs_id';

