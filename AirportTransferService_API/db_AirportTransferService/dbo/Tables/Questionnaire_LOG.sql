CREATE TABLE [dbo].[Questionnaire_LOG] (
    [cre_userid]     VARCHAR (50)  NULL,
    [cre_time]       DATETIME      NULL,
    [upd_userid]     VARCHAR (50)  NULL,
    [upd_time]       DATETIME      NULL,
    [ql_id]          VARCHAR (50)  NOT NULL,
    [qsm_id]         VARCHAR (50)  NULL,
    [system_id]      VARCHAR (50)  NULL,
    [fill_form_id]   VARCHAR (50)  NULL,
    [fill_form_name] VARCHAR (255) NULL,
    [position_id]    VARCHAR (50)  NULL,
    CONSTRAINT [PK__Question__AEE5334AAA81E2C7] PRIMARY KEY CLUSTERED ([ql_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_LOG', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'填表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_LOG', @level2type = N'COLUMN', @level2name = N'fill_form_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'填表id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_LOG', @level2type = N'COLUMN', @level2name = N'fill_form_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '系統對照id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_LOG', @level2type = N'COLUMN', @level2name = N'system_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_LOG', @level2type = N'COLUMN', @level2name = N'qsm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問卷表單紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire_LOG', @level2type = N'COLUMN', @level2name = N'ql_id';

