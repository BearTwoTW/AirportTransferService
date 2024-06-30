CREATE TABLE [dbo].[RepairListDetail] (
    [cre_userid]                   VARCHAR (50)    NULL,
    [cre_time]                     DATETIME        NULL,
    [upd_userid]                   VARCHAR (50)    NULL,
    [upd_time]                     DATETIME        NULL,
    [rld_id]                       VARCHAR (50)    NOT NULL,
    [wotrd_id]                     INT             NULL,
    [wom_id]                       VARCHAR (50)    NULL,
    [master_type]                  NVARCHAR (50)   NULL,
    [master_id]                    NVARCHAR (50)   NULL,
    [detail_id]                    NVARCHAR (50)   NULL,
    [rld_type]                     NVARCHAR (50)   NULL,
    [rld_code]                     NVARCHAR (50)   NULL,
    [rld_name]                     NVARCHAR (255)  NULL,
    [dispatch_status]              NVARCHAR (50)   NULL,
    [dispatch_user_id]             VARCHAR (50)    NULL,
    [dispatch_company_id]          VARCHAR (50)    NULL,
    [dispatch_company_cost]        DECIMAL (10, 2) NULL,
    [dispatch_time]                DATETIME        NULL,
    [finish_time]                  DATETIME        NULL,
    [work_hours_setting]           DECIMAL (10, 2) NULL,
    [work_hours_actual]            DECIMAL (10, 2) NULL,
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
    CONSTRAINT [PK__RepairLi__DF5F7C685D99CFF3] PRIMARY KEY CLUSTERED ([rld_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'deductible_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'deductible_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'insurance_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'insurance_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'discount_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '折扣', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'discount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'deductible_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'insurance_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '維修清單細項數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '實際工時', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'work_hours_actual';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '標準工時', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'work_hours_setting';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '完成時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'finish_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '派工時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'dispatch_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'派工外包成本', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'dispatch_company_cost';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外包廠商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'dispatch_company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '被派工使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'dispatch_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'派工狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'dispatch_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '維修清單細項名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'rld_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '維修清單細項代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'rld_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '維修清單細項類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'rld_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '來源細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'detail_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '來源主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'master_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '來源類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'master_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'wom_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工單交修項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'wotrd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '維修清單細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDetail', @level2type = N'COLUMN', @level2name = N'rld_id';

