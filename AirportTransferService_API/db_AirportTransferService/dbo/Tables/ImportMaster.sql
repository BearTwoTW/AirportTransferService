CREATE TABLE [dbo].[ImportMaster] (
    [cre_userid]          VARCHAR (50)    NULL,
    [cre_time]            DATETIME        NULL,
    [upd_userid]          VARCHAR (50)    NULL,
    [upd_time]            DATETIME        NULL,
    [import_id]           VARCHAR (50)    NOT NULL,
    [import_code]         VARCHAR (50)    NULL,
    [outer_import_code]   VARCHAR (50)    NULL,
    [import_time]         DATETIME        NULL,
    [import_user]         VARCHAR (50)    NULL,
    [purchase_id]         VARCHAR (50)    NULL,
    [purchase_code]       VARCHAR (50)    NULL,
    [purchase_user]       VARCHAR (50)    NULL,
    [purchase_date]       DATE            NULL,
    [isacceptance]        VARCHAR (1)     NULL,
    [acceptance_date]     DATE            NULL,
    [acceptance_userid]   VARCHAR (50)    NULL,
    [ispaid]              VARCHAR (1)     NULL,
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
    [warehouse_master_id] VARCHAR (50)    NULL,
    [warehouse_id]        VARCHAR (50)    NULL,
    [invoice_number]      VARCHAR (50)    NULL,
    [note]                VARCHAR (255)   NULL,
    [position_id]         VARCHAR (50)    NULL,
    CONSTRAINT [PK__ImportMa__F3E6B05F2E6FD0D3] PRIMARY KEY CLUSTERED ([import_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'invoice_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'warehouse_id';




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯率', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'exchange_rate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'幣別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'currency';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稅率', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'tax_rate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稅別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'tax_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稅額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'tax_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'未稅總額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'untaxed_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'實付金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'actual_pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'應付金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'pay_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'pay_method';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否付款', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'ispaid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗收人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'acceptance_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗收日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'acceptance_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否驗收', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'isacceptance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'purchase_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'purchase_user';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'purchase_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'purchase_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'進貨人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'import_user';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'進貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'import_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外部進貨編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'outer_import_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'進貨編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'import_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'import_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'warehouse_master_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportMaster', @level2type = N'COLUMN', @level2name = N'position_id';

