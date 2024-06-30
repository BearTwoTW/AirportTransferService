CREATE TABLE [dbo].[TelephoneInterview_A] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [tia_id]         INT            IDENTITY (1, 1) NOT NULL,
    [tiq_id]         VARCHAR (50)   NULL,
    [qsd_id]         VARCHAR (50)   NULL,
    [question_reply] NVARCHAR (255) NULL,
    [is_selected]    VARCHAR (1)    NULL,
    [seq]            INT            NULL,
    PRIMARY KEY CLUSTERED ([tia_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_A', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否選擇', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_A', @level2type = N'COLUMN', @level2name = N'is_selected';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '問題回答', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_A', @level2type = N'COLUMN', @level2name = N'question_reply';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪問題設定細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_A', @level2type = N'COLUMN', @level2name = N'qsd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪項目問題流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_A', @level2type = N'COLUMN', @level2name = N'tiq_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪項目回答流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_A', @level2type = N'COLUMN', @level2name = N'tia_id';

