CREATE TABLE [dbo].[Questionnaire_Q] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [upd_userid] VARCHAR (50) NULL,
    [upd_time]   DATETIME     NULL,
    [qq_id]      VARCHAR (50) NOT NULL,
    [ql_id]      VARCHAR (50) NULL,
    [qqsm_id]    VARCHAR (50) NULL,
    [qqg_id]     VARCHAR (50) NULL,
    [qsm_id]     VARCHAR (50) NULL,
    [qqg_seq]    INT          NULL,
    [qqsm_seq]   INT          NULL,
    [isrequired] VARCHAR (1)  NULL,
    PRIMARY KEY CLUSTERED ([qq_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否必填', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_Q', @level2type = N'COLUMN', @level2name = N'isrequired';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題群組排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_Q', @level2type = N'COLUMN', @level2name = N'qqsm_seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題設定主項排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_Q', @level2type = N'COLUMN', @level2name = N'qqg_seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_Q', @level2type = N'COLUMN', @level2name = N'qsm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題群組流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_Q', @level2type = N'COLUMN', @level2name = N'qqg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_Q', @level2type = N'COLUMN', @level2name = N'qqsm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_Q', @level2type = N'COLUMN', @level2name = N'ql_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單問題流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_Q', @level2type = N'COLUMN', @level2name = N'qq_id';

