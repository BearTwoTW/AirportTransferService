CREATE TABLE [dbo].[QuestionnaireSettingMaster] (
    [cre_userid]       VARCHAR (50)   NULL,
    [cre_time]         DATETIME       NULL,
    [upd_userid]       VARCHAR (50)   NULL,
    [upd_time]         DATETIME       NULL,
    [qsm_id]           VARCHAR (50)   NOT NULL,
    [qsm_type]         NVARCHAR (50)  NULL,
    [qsm_name]         NVARCHAR (255) NULL,
    [valid_date_start] DATE           NULL,
    [valid_date_end]   DATE           NULL,
    [note]             NVARCHAR (255) NULL,
    [ds_id]            INT            NULL,
    PRIMARY KEY CLUSTERED ([qsm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireSettingMaster', @level2type = N'COLUMN', @level2name = N'ds_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireSettingMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '有效時間迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireSettingMaster', @level2type = N'COLUMN', @level2name = N'valid_date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '有效時間起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireSettingMaster', @level2type = N'COLUMN', @level2name = N'valid_date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單設定名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireSettingMaster', @level2type = N'COLUMN', @level2name = N'qsm_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單設定類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireSettingMaster', @level2type = N'COLUMN', @level2name = N'qsm_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireSettingMaster', @level2type = N'COLUMN', @level2name = N'qsm_id';

