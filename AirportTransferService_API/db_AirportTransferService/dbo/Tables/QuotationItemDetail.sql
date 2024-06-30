CREATE TABLE [dbo].[QuotationItemDetail] (
    [cre_userid]                   VARCHAR (50)    NULL,
    [cre_time]                     DATETIME        NULL,
    [upd_userid]                   VARCHAR (50)    NULL,
    [upd_time]                     DATETIME        NULL,
    [qid_id]                       VARCHAR (50)    NOT NULL,
    [wotrd_id]                     INT             NULL,
    [qm_id]                        VARCHAR (50)    NULL,
    [qis_id]                       VARCHAR (50)    NULL,
    [cps_id]                       VARCHAR (50)    NULL,
    [was_id]                       VARCHAR (50)    NULL,
    [qis_type]                     NVARCHAR (50)   NULL,
    [qis_code]                     NVARCHAR (50)   NULL,
    [qis_name]                     NVARCHAR (255)  NULL,
    [work_hours_setting]           DECIMAL (10, 2) NULL,
    [total_price]                  DECIMAL (10, 2) NULL,
    [insurance_price]              DECIMAL (10, 2) NULL,
    [deductible_price]             DECIMAL (10, 2) NULL,
    [discount]                     DECIMAL (10, 2) NULL,
    [discount_price]               DECIMAL (10, 2) NULL,
    [note]                         NVARCHAR (255)  NULL,
    [status]                       NVARCHAR (255)  NULL,
    [insurance_price_tax]          DECIMAL (10, 2) NULL,
    [insurance_price_tax_include]  DECIMAL (10, 2) NULL,
    [deductible_price_tax]         DECIMAL (10, 2) NULL,
    [deductible_price_tax_include] DECIMAL (10, 2) NULL,
    CONSTRAINT [PK__Quotatio__9E66E62FDAD414DF] PRIMARY KEY CLUSTERED ([qid_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'deductible_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'deductible_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'insurance_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'insurance_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '偷記錄新增修改刪除狀態因為核准的時候才會更新維修清單', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'discount_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'discount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'deductible_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'insurance_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'標準工時', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'work_hours_setting';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價項目名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'qis_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價項目代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'qis_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價項目類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'qis_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'施工動作流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'was_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車部位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'cps_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'qis_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價單主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'qm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工單交修項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'wotrd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價單項目細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemDetail', @level2type = N'COLUMN', @level2name = N'qid_id';

