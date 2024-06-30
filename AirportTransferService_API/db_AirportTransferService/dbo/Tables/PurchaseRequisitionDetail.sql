CREATE TABLE [dbo].[PurchaseRequisitionDetail] (
    [cre_userid] VARCHAR (10)    NULL,
    [cre_time]   DATETIME        NULL,
    [upd_userid] VARCHAR (10)    NULL,
    [upd_time]   DATETIME        NULL,
    [prd_id]     VARCHAR (50)    NOT NULL,
    [prm_id]     VARCHAR (50)    NULL,
    [name]       NVARCHAR (255)  NULL,
    [spec]       NVARCHAR (255)  NULL,
    [count]      DECIMAL (20, 2) NULL,
    [price]      DECIMAL (20, 2) NULL,
    [price_tax]  DECIMAL (20, 2) NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'價格(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionDetail', @level2type = N'COLUMN', @level2name = N'price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'價格(未稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionDetail', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'規格(廠商/型號等)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionDetail', @level2type = N'COLUMN', @level2name = N'spec';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購單主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionDetail', @level2type = N'COLUMN', @level2name = N'prm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購單細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionDetail', @level2type = N'COLUMN', @level2name = N'prd_id';

