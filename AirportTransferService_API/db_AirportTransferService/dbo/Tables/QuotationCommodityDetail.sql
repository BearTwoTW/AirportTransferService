CREATE TABLE [dbo].[QuotationCommodityDetail] (
    [cre_userid]                   VARCHAR (50)    NULL,
    [cre_time]                     DATETIME        NULL,
    [upd_userid]                   VARCHAR (50)    NULL,
    [upd_time]                     DATETIME        NULL,
    [qcd_id]                       VARCHAR (50)    NOT NULL,
    [wotrd_id]                     INT             NULL,
    [qm_id]                        VARCHAR (50)    NULL,
    [commodity_id]                 VARCHAR (50)    NULL,
    [uc_id]                        VARCHAR (50)    NULL,
    [commodity_type]               NVARCHAR (50)   NULL,
    [commodity_code]               NVARCHAR (50)   NULL,
    [commodity_name]               NVARCHAR (255)  NULL,
    [count]                        DECIMAL (10, 2) NULL,
    [total_price]                  DECIMAL (10, 2) NULL,
    [insurance_price]              DECIMAL (10, 2) NULL,
    [deductible_price]             DECIMAL (10, 2) NULL,
    [discount]                     DECIMAL (10, 2) NULL,
    [discount_price]               DECIMAL (10, 2) NULL,
    [note]                         NVARCHAR (255)  NULL,
    [insurance_price_tax]          DECIMAL (10, 2) NULL,
    [insurance_price_tax_include]  DECIMAL (10, 2) NULL,
    [deductible_price_tax]         DECIMAL (10, 2) NULL,
    [deductible_price_tax_include] DECIMAL (10, 2) NULL,
    CONSTRAINT [PK__Quotatio__1AC55DE49B6B9EBD] PRIMARY KEY CLUSTERED ([qcd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自負額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'deductible_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自負額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'deductible_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保險金額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'insurance_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保險金額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'insurance_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'discount_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'discount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'deductible_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'insurance_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'commodity_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '商品編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'commodity_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '商品種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'commodity_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價單主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'qm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工單交修項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'wotrd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價單商品細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationCommodityDetail', @level2type = N'COLUMN', @level2name = N'qcd_id';

