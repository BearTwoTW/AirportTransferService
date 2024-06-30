CREATE TABLE [dbo].[QuotationMaster] (
    [cre_userid]                   VARCHAR (50)    NOT NULL,
    [cre_time]                     DATETIME        NOT NULL,
    [upd_userid]                   VARCHAR (50)    NOT NULL,
    [upd_time]                     DATETIME        NOT NULL,
    [qm_id]                        VARCHAR (50)    NOT NULL,
    [wom_id]                       VARCHAR (50)    NOT NULL,
    [is_insurance]                 VARCHAR (1)     NOT NULL,
    [first_approved_time]          DATETIME        NOT NULL,
    [approved_user_id]             VARCHAR (50)    NOT NULL,
    [approved_time]                DATETIME        NOT NULL,
    [cus_agree_time]               DATETIME        NOT NULL,
    [isapproved]                   VARCHAR (1)     NOT NULL,
    [is_cus_agree]                 VARCHAR (1)     NOT NULL,
    [qm_code]                      VARCHAR (50)    NOT NULL,
    [qm_date]                      DATE            NOT NULL,
    [total_price]                  DECIMAL (10, 2) NOT NULL,
    [insurance_price]              DECIMAL (10, 2) NOT NULL,
    [deductible_price]             DECIMAL (10, 2) NOT NULL,
    [discount_price]               DECIMAL (10, 2) NOT NULL,
    [note]                         NVARCHAR (255)  NOT NULL,
    [invalid_user_id]              VARCHAR (50)    NOT NULL,
    [invalid_time]                 DATETIME        NOT NULL,
    [invalid_reason]               NVARCHAR (255)  NOT NULL,
    [total_price_tax]              DECIMAL (10, 2) NOT NULL,
    [total_price_tax_include]      DECIMAL (10, 2) NOT NULL,
    [insurance_price_tax]          DECIMAL (10, 2) NOT NULL,
    [insurance_price_tax_include]  DECIMAL (10, 2) NOT NULL,
    [deductible_price_tax]         DECIMAL (10, 2) NOT NULL,
    [deductible_price_tax_include] DECIMAL (10, 2) NOT NULL,
    CONSTRAINT [PK__Quotatio__20F518622DAED66E] PRIMARY KEY CLUSTERED ([qm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'deductible_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'deductible_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'insurance_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'insurance_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '總金額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'total_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '總金額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'total_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'作廢原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'invalid_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'作廢時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'invalid_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'作廢使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'invalid_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'discount_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'deductible_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'insurance_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'qm_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價單號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'qm_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客人是否同意', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'is_cus_agree';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否核准', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'isapproved';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客人同意時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'cus_agree_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'核准時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'approved_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'核准使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'approved_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'初次核准時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'first_approved_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否保險', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'is_insurance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'wom_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價單主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationMaster', @level2type = N'COLUMN', @level2name = N'qm_id';

