CREATE TABLE [dbo].[InvoicePaymentMaster] (
    [cre_userid]     VARCHAR (10)    NULL,
    [cre_time]       DATETIME        NULL,
    [upd_userid]     VARCHAR (10)    NULL,
    [upd_time]       DATETIME        NULL,
    [ipm_id]         VARCHAR (50)    NOT NULL,
    [ipm_code]       VARCHAR (50)    NULL,
    [so_id]          VARCHAR (50)    NULL,
    [title]          NVARCHAR (255)  NULL,
    [status]         NVARCHAR (255)  NULL,
    [user_id]        VARCHAR (50)    NULL,
    [ul_id]          INT             NULL,
    [DEP]            VARCHAR (50)    NULL,
    [type]           NVARCHAR (50)   NULL,
    [date]           DATE            NULL,
    [approve_date]   DATE            NULL,
    [total_price]    DECIMAL (20, 2) NULL,
    [ippm_id]        NVARCHAR (50)   NULL,
    [supplier_id]    NVARCHAR (50)   NULL,
    [customize_name] NVARCHAR (255)  NULL,
    [pay_method]     NVARCHAR (255)  NULL,
    [source_type]    NVARCHAR (50)   NULL,
    [source_id]      VARCHAR (50)    NULL,
    [reason]         NVARCHAR (255)  NULL,
    [note]           NVARCHAR (255)  NULL,
    [is_urgent]      VARCHAR (1)     NULL,
    CONSTRAINT [PK_Invoice] PRIMARY KEY CLUSTERED ([ipm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否急件', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'is_urgent';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請款原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'pay_method';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂供應商名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'customize_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'供應商', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'supplier_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請款專案主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'ippm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請款總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'期望付款日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'approve_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請款日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請款類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請款部門', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'DEP';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核用戶職務', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核用戶流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'標題', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'title';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核流程流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'so_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請款單主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'InvoicePaymentMaster', @level2type = N'COLUMN', @level2name = N'ipm_id';

