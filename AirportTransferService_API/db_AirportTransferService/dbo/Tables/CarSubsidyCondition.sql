CREATE TABLE [dbo].[CarSubsidyCondition] (
    [cre_userid]          VARCHAR (50)    NULL,
    [cre_time]            DATETIME        NULL,
    [upd_userid]          VARCHAR (50)    NULL,
    [upd_time]            DATETIME        NULL,
    [csc_id]              VARCHAR (50)    NOT NULL,
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
    [note]                NVARCHAR (255)  NULL,
    [visible]             VARCHAR (1)     NULL,
    [label_big]           VARCHAR (50)    NULL,
    [commodity_id]        VARCHAR (50)    NULL,
    [uc_id]               VARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([csc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件類型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'label_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'discount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'金額來源車補助條件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'price_source_csc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'可折不可折', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'deductible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'異常銷售種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'abnormal_sale_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'關聯車補助條件流水號們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'associate_csc_ids';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'關聯類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'associate_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'品項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'分類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'category';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'文案來源', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'documet_source';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'cc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件類型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'cct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車補助條件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyCondition', @level2type = N'COLUMN', @level2name = N'csc_id';

