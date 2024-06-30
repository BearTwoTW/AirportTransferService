CREATE TABLE [dbo].[QuestionnaireQuestionSettingDetail] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [qqsd_id]        VARCHAR (50)   NOT NULL,
    [qqsm_id]        VARCHAR (50)   NULL,
    [option_content] NVARCHAR (255) NULL,
    [need_fillin]    VARCHAR (1)    NULL,
    [visible]        VARCHAR (1)    NULL,
    [seq]            INT            NULL,
    [ds_id]          INT            NULL,
    PRIMARY KEY CLUSTERED ([qqsd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'ds_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否需要填寫', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'need_fillin';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '選項內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'option_content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'qqsm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題設定細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'qqsd_id';

