CREATE TABLE [dbo].[QuestionnaireQuestionGroup] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [qqg_id]     VARCHAR (50)   NOT NULL,
    [qsm_id]     VARCHAR (50)   NULL,
    [qqg_name]   NVARCHAR (255) NULL,
    [seq]        INT            NULL,
    [ds_id]      INT            NULL,
    PRIMARY KEY CLUSTERED ([qqg_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionGroup', @level2type = N'COLUMN', @level2name = N'ds_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionGroup', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題群組名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionGroup', @level2type = N'COLUMN', @level2name = N'qqg_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionGroup', @level2type = N'COLUMN', @level2name = N'qsm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題群組流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuestionnaireQuestionGroup', @level2type = N'COLUMN', @level2name = N'qqg_id';

