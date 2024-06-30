CREATE TABLE [dbo].[PayLog] (
    [cre_userid]               VARCHAR (50)    NULL,
    [cre_time]                 DATETIME        NULL,
    [upd_userid]               VARCHAR (50)    NULL,
    [upd_time]                 DATETIME        NULL,
    [pl_id]                    VARCHAR (50)    NOT NULL,
    [master_type]              VARCHAR (50)    NULL,
    [master_id]                VARCHAR (50)    NULL,
    [is_insurance]             VARCHAR (1)     NULL,
    [price]                    DECIMAL (20, 2) NULL,
    [discount]                 DECIMAL (20, 2) NULL,
    [pay_price]                DECIMAL (20, 2) NULL,
    [payer_name]               NVARCHAR (255)  NULL,
    [pay_method]               VARCHAR (50)    NULL,
    [pay_date]                 DATE            NULL,
    [invoice_number]           NVARCHAR (255)  NULL,
    [note]                     NVARCHAR (255)  NULL,
    [select_ids]               NVARCHAR (MAX)  NULL,
    [is_system_invoice]        VARCHAR (1)     NULL,
    [invoice_status]           VARCHAR (50)    NULL,
    [credit_card_type]         VARCHAR (50)    NULL,
    [credit_card_number]       VARCHAR (400)   NULL,
    [insurance_company_id]     VARCHAR (50)    NULL,
    [tax_id]                   VARCHAR (50)    NULL,
    [heading]                  VARCHAR (50)    NULL,
    [invoice_date]             DATE            NULL,
    [invoice_discount_price]   DECIMAL (20, 2) NULL,
    [invoice_discount_user_id] VARCHAR (50)    NULL,
    [invoice_discount_time]    DATETIME        NULL,
    CONSTRAINT [PK__PayLog__0CBEC8855733BC3E] PRIMARY KEY CLUSTERED ([pl_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票折讓操作時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'invoice_discount_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票折讓操作使用者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'invoice_discount_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票折讓金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'invoice_discount_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'invoice_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'抬頭', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'heading';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'統編號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'tax_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保險公司流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'insurance_company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'信用卡號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'credit_card_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'信用卡別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'credit_card_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'開發票狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'invoice_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否系統開發票', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'is_system_invoice';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'選擇的項目id們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'select_ids';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '發票號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'invoice_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '付款日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'pay_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '付款方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'pay_method';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款人名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'payer_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'discount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否保險', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'is_insurance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '主項id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'master_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '主項類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'master_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '付款記錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PayLog', @level2type = N'COLUMN', @level2name = N'pl_id';

