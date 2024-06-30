CREATE TABLE [dbo].[TelephoneInterview_LOG] (
    [cre_userid]       VARCHAR (50)   NULL,
    [cre_time]         DATETIME       NULL,
    [upd_userid]       VARCHAR (50)   NULL,
    [upd_time]         DATETIME       NULL,
    [til_id]           VARCHAR (50)   NOT NULL,
    [mem_id]           VARCHAR (50)   NULL,
    [ti_id]            VARCHAR (50)   NULL,
    [ti_time]          DATETIME       NULL,
    [ti_result]        VARCHAR (50)   NULL,
    [ti_status]        VARCHAR (50)   NULL,
    [cus_issatisfy]    VARCHAR (1)    NULL,
    [cus_opinion]      NVARCHAR (255) NULL,
    [phone_update]     VARCHAR (50)   NULL,
    [ti_caller_report] NVARCHAR (255) NULL,
    [ti_error_report]  NVARCHAR (255) NULL,
    [caller_note]      NVARCHAR (255) NULL,
    [need_reserve]     VARCHAR (1)    NULL,
    [need_reply]       VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([til_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否需回覆', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'need_reply';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否需預約', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'need_reserve';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'電訪人員備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'caller_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '錯誤回報', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'ti_error_report';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪人員回報', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'ti_caller_report';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '異動電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'phone_update';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '客人意見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'cus_opinion';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '客人是否滿意', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'cus_issatisfy';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'ti_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪結果', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'ti_result';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'ti_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'ti_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪系統對照excel流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'mem_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterview_LOG', @level2type = N'COLUMN', @level2name = N'til_id';

