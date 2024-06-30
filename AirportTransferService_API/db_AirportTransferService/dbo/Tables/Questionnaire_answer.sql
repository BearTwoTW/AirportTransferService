CREATE TABLE [dbo].[Questionnaire_answer] (
    [cre_userid]  VARCHAR (50)   NULL,
    [cre_time]    DATETIME       NULL,
    [a_id]        VARCHAR (11)   NOT NULL,
    [q_id]        VARCHAR (10)   NULL,
    [user_type]   VARCHAR (10)   NULL,
    [answer_json] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([a_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'答案JSON', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_answer', @level2type = N'COLUMN', @level2name = N'answer_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'填寫人類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_answer', @level2type = N'COLUMN', @level2name = N'user_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'問卷ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_answer', @level2type = N'COLUMN', @level2name = N'q_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'答案ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_answer', @level2type = N'COLUMN', @level2name = N'a_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'問卷的答案', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_answer';

