CREATE TABLE [dbo].[PurchaseRequisitionMaster] (
    [cre_userid]      VARCHAR (10)    NULL,
    [cre_time]        DATETIME        NULL,
    [upd_userid]      VARCHAR (10)    NULL,
    [upd_time]        DATETIME        NULL,
    [prm_id]          VARCHAR (50)    CONSTRAINT [DF_PurchaseRequisitionMaster_prm_id] DEFAULT ('') NOT NULL,
    [prm_code]        VARCHAR (50)    NULL,
    [so_id]           VARCHAR (50)    NULL,
    [title]           NVARCHAR (255)  NULL,
    [status]          NVARCHAR (255)  NULL,
    [user_id]         VARCHAR (50)    NULL,
    [ul_id]           INT             NULL,
    [DEP]             VARCHAR (50)    NULL,
    [type]            NVARCHAR (50)   NULL,
    [date]            DATE            NULL,
    [need_date]       DATE            NULL,
    [approve_date]    DATE            NULL,
    [total_price]     DECIMAL (20, 2) NULL,
    [total_price_tax] DECIMAL (20, 2) NULL,
    [reason]          NVARCHAR (255)  NULL,
    [note]            NVARCHAR (255)  NULL,
    [pay_status]      NVARCHAR (255)  NULL,
    [is_urgent]       VARCHAR (1)     NULL,
    [PDF_file]        NVARCHAR (MAX)  NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'pay_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購單總價格(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'total_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購單總價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'期望核准日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'approve_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'需求日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'need_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請款部門代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'DEP';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職務流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'標題', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'title';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購單代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'prm_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請購單主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PurchaseRequisitionMaster', @level2type = N'COLUMN', @level2name = N'prm_id';

