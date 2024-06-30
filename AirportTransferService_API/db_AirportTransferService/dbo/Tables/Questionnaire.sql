CREATE TABLE [dbo].[Questionnaire] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [q_id]           VARCHAR (10)   NOT NULL,
    [name]           NVARCHAR (100) NULL,
    [is_release]     VARCHAR (1)    NULL,
    [Plant]          VARCHAR (10)   NULL,
    [type]           VARCHAR (10)   NULL,
    [date_start]     DATETIME       NULL,
    [date_end]       DATETIME       NULL,
    [questions_json] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([q_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'問題JSON', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire', @level2type = N'COLUMN', @level2name = N'questions_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'失效日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire', @level2type = N'COLUMN', @level2name = N'date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire', @level2type = N'COLUMN', @level2name = N'date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'類型(顯示位置)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否開放', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire', @level2type = N'COLUMN', @level2name = N'is_release';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'問卷名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'問卷ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire', @level2type = N'COLUMN', @level2name = N'q_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'問卷', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Questionnaire';

