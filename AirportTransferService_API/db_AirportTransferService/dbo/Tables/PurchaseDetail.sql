CREATE TABLE [dbo].[PurchaseDetail] (
    [cre_userid]       VARCHAR (50)    NULL,
    [cre_time]         DATETIME        NULL,
    [upd_userid]       VARCHAR (50)    NULL,
    [upd_time]         DATETIME        NULL,
    [pd_id]            VARCHAR (50)    NOT NULL,
    [purchase_id]      VARCHAR (50)    NULL,
    [commodity_id]     VARCHAR (50)    NULL,
    [commodity_code]   VARCHAR (50)    NULL,
    [commodity_name]   VARCHAR (255)   NULL,
    [purchase_count]   DECIMAL (20, 2) NULL,
    [unit_price_type]  VARCHAR (50)    NULL,
    [unit_price]       DECIMAL (20, 2) NULL,
    [uc_id]            VARCHAR (50)    NULL,
    [ccad_id_1]        VARCHAR (50)    NULL,
    [ccad_id_2]        VARCHAR (50)    NULL,
    [imported_count]   DECIMAL (20, 2) NULL,
    [returned_count]   DECIMAL (20, 2) NULL,
    [acceptance_count] DECIMAL (20, 2) NULL,
    CONSTRAINT [PK__Purchase__F7562CCFB9956F96] PRIMARY KEY CLUSTERED ([pd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗收數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'acceptance_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'已退貨數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'returned_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'已進貨數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'imported_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項2流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項1流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位換算流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'unit_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單價種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'unit_price_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'purchase_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'commodity_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'commodity_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'採購流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'purchase_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseDetail', @level2type = N'COLUMN', @level2name = N'pd_id';

