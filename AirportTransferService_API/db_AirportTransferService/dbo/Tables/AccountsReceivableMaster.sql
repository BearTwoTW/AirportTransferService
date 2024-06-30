CREATE TABLE [dbo].[AccountsReceivableMaster] (
    [cre_userid]       VARCHAR (50)    NULL,
    [cre_time]         DATETIME        NULL,
    [upd_userid]       VARCHAR (50)    NULL,
    [upd_time]         DATETIME        NULL,
    [arm_id]           VARCHAR (50)    NOT NULL,
    [inv_num]          VARCHAR (50)    NULL,
    [inv_date]         DATE            NULL,
    [inv_price]        DECIMAL (10, 2) NULL,
    [inv_file]         NVARCHAR (255)  NULL,
    [company_id]       VARCHAR (50)    NULL,
    [cc_id]            VARCHAR (50)    NULL,
    [principal_userid] VARCHAR (50)    NULL,
    [est_receive_date] DATE            NULL,
    [finish_userid]    VARCHAR (50)    NULL,
    [finish_time]      DATETIME        NULL,
    [caseclose_userid] VARCHAR (50)    NULL,
    [caseclose_time]   DATETIME        NULL,
    [status]           NVARCHAR (50)   NULL,
    [note]             NVARCHAR (255)  NULL,
    CONSTRAINT [PK_AccountsReceivableMaster] PRIMARY KEY CLUSTERED ([arm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'應收帳款狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'結案時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'caseclose_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'結案人員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'caseclose_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計收款日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'est_receive_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'案件負責人員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'principal_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商負責人流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'cc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票檔案', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'inv_file';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'inv_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'inv_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'inv_num';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'應收帳款主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableMaster', @level2type = N'COLUMN', @level2name = N'arm_id';

