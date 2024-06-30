CREATE TABLE [dbo].[QuotationItemSetting] (
    [cre_userid]          VARCHAR (50)    NULL,
    [cre_time]            DATETIME        NULL,
    [upd_userid]          VARCHAR (50)    NULL,
    [upd_time]            DATETIME        NULL,
    [qis_id]              VARCHAR (50)    NOT NULL,
    [ct_id]               INT             NULL,
    [cps_id]              VARCHAR (50)    NULL,
    [was_id]              VARCHAR (50)    NULL,
    [qis_type]            NVARCHAR (50)   NULL,
    [qis_code]            NVARCHAR (50)   NULL,
    [qis_name]            NVARCHAR (255)  NULL,
    [work_hours]          DECIMAL (10, 2) NULL,
    [work_hours_warranty] DECIMAL (10, 2) NULL,
    [price]               DECIMAL (20, 2) NULL,
    [note]                NVARCHAR (255)  NULL,
    [visible]             VARCHAR (1)     NULL,
    CONSTRAINT [PK__Quotatio__0596B73B412A5D8E] PRIMARY KEY CLUSTERED ([qis_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工時(保固)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'work_hours_warranty';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工時(正常)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'work_hours';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價項目名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'qis_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價項目代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'qis_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價項目類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'qis_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '施工動作流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'was_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車部位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'cps_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'ct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '估價項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'QuotationItemSetting', @level2type = N'COLUMN', @level2name = N'qis_id';

