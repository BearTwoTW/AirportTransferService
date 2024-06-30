CREATE TABLE [dbo].[AccountsReceivableDetail] (
    [cre_userid]      VARCHAR (10)    NULL,
    [cre_time]        DATETIME        NULL,
    [upd_userid]      VARCHAR (50)    NULL,
    [upd_time]        DATETIME        NULL,
    [ard_id]          VARCHAR (50)    NULL,
    [arm_id]          VARCHAR (50)    NULL,
    [POS]             VARCHAR (10)    NULL,
    [DEP]             VARCHAR (10)    NULL,
    [subsidy_payment] VARCHAR (10)    NULL,
    [name]            NVARCHAR (255)  NULL,
    [est_pay_date]    DATE            NULL,
    [pay_date]        DATE            NULL,
    [ar_price]        DECIMAL (10, 2) NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'應收帳款細項金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableDetail', @level2type = N'COLUMN', @level2name = N'ar_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'下款日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableDetail', @level2type = N'COLUMN', @level2name = N'pay_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計下款日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableDetail', @level2type = N'COLUMN', @level2name = N'est_pay_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'項目名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableDetail', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'補助方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableDetail', @level2type = N'COLUMN', @level2name = N'subsidy_payment';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'部門', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableDetail', @level2type = N'COLUMN', @level2name = N'DEP';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableDetail', @level2type = N'COLUMN', @level2name = N'POS';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'應收帳款主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableDetail', @level2type = N'COLUMN', @level2name = N'arm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'應收帳款細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AccountsReceivableDetail', @level2type = N'COLUMN', @level2name = N'ard_id';

