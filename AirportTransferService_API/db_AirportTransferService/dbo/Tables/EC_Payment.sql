CREATE TABLE [dbo].[EC_Payment] (
    [cre_userid]             VARCHAR (50)    NULL,
    [cre_time]               DATETIME        NULL,
    [upd_userid]             VARCHAR (50)    NULL,
    [upd_time]               DATETIME        NULL,
    [id]                     VARCHAR (50)    NOT NULL,
    [payment_name]           VARCHAR (255)   NULL,
    [payment_code]           VARCHAR (50)    NULL,
    [note]                   VARCHAR (255)   NULL,
    [transfer_account]       VARCHAR (50)    NULL,
    [transfer_account_name]  VARCHAR (255)   NULL,
    [transfer_bank_code]     VARCHAR (50)    NULL,
    [transfer_bank]          VARCHAR (255)   NULL,
    [series_connection_type] VARCHAR (50)    NULL,
    [visible]                VARCHAR (2)     NULL,
    [min_order_price]        DECIMAL (20, 2) NULL,
    CONSTRAINT [PK_EC_Payment] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最低訂單金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'min_order_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'串接名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'series_connection_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'轉帳銀行', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'transfer_bank';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'轉帳銀行代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'transfer_bank_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'轉帳帳號名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'transfer_account_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'轉帳帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'transfer_account';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款方式代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'payment_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款方式名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'payment_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment', @level2type = N'COLUMN', @level2name = N'id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'電商付款方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Payment';

