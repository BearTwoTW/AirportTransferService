CREATE TABLE [dbo].[Questionnaire_A] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [qa_id]          INT            IDENTITY (1, 1) NOT NULL,
    [qq_id]          VARCHAR (50)   NULL,
    [qqsd_id]        VARCHAR (50)   NULL,
    [question_reply] NVARCHAR (255) NULL,
    [need_fillin]    VARCHAR (1)    NULL,
    [is_selected]    VARCHAR (1)    NULL,
    [qqsd_seq]       INT            NULL,
    PRIMARY KEY CLUSTERED ([qa_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題設定細項排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_A', @level2type = N'COLUMN', @level2name = N'qqsd_seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否選擇', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_A', @level2type = N'COLUMN', @level2name = N'is_selected';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否需要填寫', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_A', @level2type = N'COLUMN', @level2name = N'need_fillin';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問題回答', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_A', @level2type = N'COLUMN', @level2name = N'question_reply';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題設定細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_A', @level2type = N'COLUMN', @level2name = N'qqsd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_A', @level2type = N'COLUMN', @level2name = N'qq_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題回答流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_A', @level2type = N'COLUMN', @level2name = N'qa_id';

