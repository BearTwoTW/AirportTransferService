CREATE TABLE [dbo].[OrderCarSubsidyDetail] (
    [cre_userid]          VARCHAR (50)    NULL,
    [cre_time]            DATETIME        NULL,
    [upd_userid]          VARCHAR (50)    NULL,
    [upd_time]            DATETIME        NULL,
    [ocsd_id]             INT             IDENTITY (1, 1) NOT NULL,
    [order_id]            VARCHAR (50)    NULL,
    [csc_id]              VARCHAR (50)    NULL,
    [csd_id]              INT             NULL,
    [csm_id]              VARCHAR (50)    NULL,
    [ct_id]               INT             NULL,
    [ctf_id]              INT             NULL,
    [year]                INT             NULL,
    [year_age]            INT             NULL,
    [cct_id]              INT             NULL,
    [cc_id]               VARCHAR (50)    NULL,
    [cs_id]               VARCHAR (50)    NULL,
    [documet_source]      NVARCHAR (255)  NULL,
    [category]            NVARCHAR (50)   NULL,
    [type]                NVARCHAR (255)  NULL,
    [name]                NVARCHAR (255)  NULL,
    [associate_type]      NVARCHAR (50)   NULL,
    [associate_csc_ids]   NVARCHAR (MAX)  NULL,
    [abnormal_sale_type]  NVARCHAR (50)   NULL,
    [deductible]          NVARCHAR (50)   NULL,
    [price_source_csc_id] VARCHAR (50)    NULL,
    [discount]            DECIMAL (10, 2) NULL,
    [price]               DECIMAL (10, 2) NULL,
    [isvalid]             VARCHAR (2)     NULL,
    [label_big]           VARCHAR (50)    NULL,
    [commodity_id]        VARCHAR (50)    NULL,
    [uc_id]               VARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([ocsd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件類型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'label_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否成立', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'isvalid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'discount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'金額來源車補助條件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'price_source_csc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'可折不可折', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'deductible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'異常銷售種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'abnormal_sale_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'關聯車補助條件流水號們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'associate_csc_ids';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'關聯類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'associate_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'品項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'分類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'category';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'文案來源', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'documet_source';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'cc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件類型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'cct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年份', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'year_age';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型規格流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'ct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車補助主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'csm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車補助細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'csd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車補助條件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'csc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單車補助細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'ocsd_id';

