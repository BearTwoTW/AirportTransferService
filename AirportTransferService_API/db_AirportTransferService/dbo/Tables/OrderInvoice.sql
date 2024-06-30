CREATE TABLE [dbo].[OrderInvoice] (
    [cre_userid]     VARCHAR (50)    NULL,
    [cre_time]       DATETIME        NULL,
    [upd_userid]     VARCHAR (50)    NULL,
    [upd_time]       DATETIME        NULL,
    [oi_id]          INT             IDENTITY (1, 1) NOT NULL,
    [order_id]       VARCHAR (50)    NULL,
    [invoice_price]  DECIMAL (20, 2) NULL,
    [invoice_number] VARCHAR (50)    NULL,
    [invoice_date]   DATE            NULL,
    PRIMARY KEY CLUSTERED ([oi_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderInvoice', @level2type = N'COLUMN', @level2name = N'invoice_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderInvoice', @level2type = N'COLUMN', @level2name = N'invoice_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderInvoice', @level2type = N'COLUMN', @level2name = N'invoice_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderInvoice', @level2type = N'COLUMN', @level2name = N'order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderInvoice', @level2type = N'COLUMN', @level2name = N'oi_id';

