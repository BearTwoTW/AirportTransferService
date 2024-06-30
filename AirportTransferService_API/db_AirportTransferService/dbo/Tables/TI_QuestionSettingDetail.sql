CREATE TABLE [dbo].[TI_QuestionSettingDetail] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [qsd_id]         VARCHAR (50)   NOT NULL,
    [qsm_id]         VARCHAR (50)   NULL,
    [option_content] NVARCHAR (255) NULL,
    [visible]        VARCHAR (1)    NULL,
    [seq]            INT            NULL,
    PRIMARY KEY CLUSTERED ([qsd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '選項內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'option_content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪問題設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'qsm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪問題設定細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_QuestionSettingDetail', @level2type = N'COLUMN', @level2name = N'qsd_id';

