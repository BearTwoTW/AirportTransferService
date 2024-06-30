CREATE TABLE [dbo].[ImportDetail] (
    [cre_userid]       VARCHAR (50)    NULL,
    [cre_time]         DATETIME        NULL,
    [upd_userid]       VARCHAR (50)    NULL,
    [upd_time]         DATETIME        NULL,
    [importdetail_id]  VARCHAR (50)    NOT NULL,
    [import_id]        VARCHAR (50)    NULL,
    [commodity_id]     VARCHAR (50)    NULL,
    [commodity_code]   VARCHAR (50)    NULL,
    [commodity_name]   VARCHAR (255)   NULL,
    [purchase_count]   DECIMAL (20, 2) NULL,
    [unit_price_type]  VARCHAR (50)    NULL,
    [unit_price]       DECIMAL (20, 2) NULL,
    [uc_id]            VARCHAR (50)    NULL,
    [ccad_id_1]        VARCHAR (50)    NULL,
    [ccad_id_2]        VARCHAR (50)    NULL,
    [import_count]     DECIMAL (20, 2) NULL,
    [return_count]     DECIMAL (20, 2) NULL,
    [acceptance_count] DECIMAL (20, 2) NULL,
    [expired_date]     DATE            NULL,
    [warehouse_id]     VARCHAR (50)    NULL,
    CONSTRAINT [PK__ImportDe__4C1172227B5C482F] PRIMARY KEY CLUSTERED ([importdetail_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到期日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'expired_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗收數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'acceptance_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'本次退貨數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'return_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'本次進貨數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'import_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項2流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項1流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位換算流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'unit_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單價種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'unit_price_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'purchase_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'commodity_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'commodity_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'進貨流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'import_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'importdetail_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportDetail', @level2type = N'COLUMN', @level2name = N'warehouse_id';

