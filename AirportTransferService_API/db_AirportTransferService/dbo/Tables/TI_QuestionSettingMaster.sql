CREATE TABLE [dbo].[TI_QuestionSettingMaster] (
    [cre_userid]       VARCHAR (50)   NULL,
    [cre_time]         DATETIME       NULL,
    [upd_userid]       VARCHAR (50)   NULL,
    [upd_time]         DATETIME       NULL,
    [qsm_id]           VARCHAR (50)   NOT NULL,
    [mem_id]           VARCHAR (50)   NULL,
    [question_type]    VARCHAR (50)   NULL,
    [question_content] NVARCHAR (255) NULL,
    [visible]          VARCHAR (1)    NULL,
    [seq]              INT            NULL,
    PRIMARY KEY CLUSTERED ([qsm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問題內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'question_content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問題類型(是非、單選、多選、填空)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'question_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪系統對照主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'mem_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪問題設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingMaster', @level2type = N'COLUMN', @level2name = N'qsm_id';

