CREATE TABLE [dbo].[PurchaseMaster] (
    [cre_userid]          VARCHAR (50)    NULL,
    [cre_time]            DATETIME        NULL,
    [upd_userid]          VARCHAR (50)    NULL,
    [upd_time]            DATETIME        NULL,
    [purchase_id]         VARCHAR (50)    NOT NULL,
    [purchase_code]       VARCHAR (50)    NULL,
    [outer_purchase_code] VARCHAR (50)    NULL,
    [source_type]         NVARCHAR (50)   NULL,
    [source_id]           VARCHAR (50)    NULL,
    [purchase_user]       VARCHAR (50)    NULL,
    [purchase_date]       DATE            NULL,
    [status]              VARCHAR (50)    NULL,
    [ispaid]              VARCHAR (2)     NULL,
    [pay_method]          VARCHAR (50)    NULL,
    [pay_date]            DATE            NULL,
    [pay_price]           DECIMAL (20, 2) NULL,
    [actual_pay_price]    DECIMAL (20, 2) NULL,
    [untaxed_price]       DECIMAL (20, 2) NULL,
    [tax_price]           DECIMAL (20, 2) NULL,
    [tax_type]            INT             NULL,
    [tax_rate]            DECIMAL (5, 2)  NULL,
    [currency]            INT             NULL,
    [exchange_rate]       DECIMAL (5, 2)  NULL,
    [company_id]          VARCHAR (50)    NULL,
    [note]                VARCHAR (255)   NULL,
    [ispay_date]          DATE            NULL,
    [invoice_number]      VARCHAR (50)    NULL,
    CONSTRAINT [PK__Purchase__87071CB992BFE195] PRIMARY KEY CLUSTERED ([purchase_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'invoice_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'實際付款日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'ispay_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯率', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'exchange_rate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'幣別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'currency';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稅率', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'tax_rate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稅別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'tax_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稅額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'tax_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'未稅總額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'untaxed_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'實付金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'actual_pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'應付金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'pay_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'pay_method';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否付款', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'ispaid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'purchase_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'purchase_user';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外部採購編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'outer_purchase_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'purchase_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'purchase_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'來源類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'source_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'來源流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseMaster', @level2type = N'COLUMN', @level2name = N'source_id';

