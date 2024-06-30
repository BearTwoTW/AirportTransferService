CREATE TABLE [dbo].[TelephoneInterview_Q] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [upd_userid] VARCHAR (50) NULL,
    [upd_time]   DATETIME     NULL,
    [tiq_id]     VARCHAR (50) NOT NULL,
    [mem_id]     VARCHAR (50) NULL,
    [ti_id]      VARCHAR (50) NULL,
    [qsm_id]     VARCHAR (50) NULL,
    [seq]        INT          NULL,
    PRIMARY KEY CLUSTERED ([tiq_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_Q', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪問題設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_Q', @level2type = N'COLUMN', @level2name = N'qsm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_Q', @level2type = N'COLUMN', @level2name = N'ti_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪系統對照excel流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_Q', @level2type = N'COLUMN', @level2name = N'mem_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪項目問題流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_Q', @level2type = N'COLUMN', @level2name = N'tiq_id';

