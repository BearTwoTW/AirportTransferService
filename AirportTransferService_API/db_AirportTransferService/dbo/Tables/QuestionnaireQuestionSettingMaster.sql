CREATE TABLE [dbo].[QuestionnaireQuestionSettingMaster] (
    [cre_userid]       VARCHAR (50)   NULL,
    [cre_time]         DATETIME       NULL,
    [upd_userid]       VARCHAR (50)   NULL,
    [upd_time]         DATETIME       NULL,
    [qqsm_id]          VARCHAR (50)   NOT NULL,
    [qsm_id]           VARCHAR (50)   NULL,
    [qqg_id]           VARCHAR (50)   NULL,
    [question_type]    VARCHAR (50)   NULL,
    [question_content] NVARCHAR (255) NULL,
    [visible]          VARCHAR (1)    NULL,
    [isrequired]       VARCHAR (1)    NULL,
    [seq]              INT            NULL,
    [label_left]       NVARCHAR (255) NULL,
    [label_right]      NVARCHAR (255) NULL,
    [ds_id]            INT            NULL,
    PRIMARY KEY CLUSTERED ([qqsm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'ds_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'右標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'label_right';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'左標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'label_left';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否必填', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'isrequired';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問題內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'question_content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問題類型(是非、單選、多選、填空)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'question_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題群組流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'qqg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'qsm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'qqsm_id';

