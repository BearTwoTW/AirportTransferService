CREATE TABLE [dbo].[CarStockReserveImportLog] (
    [cre_userid]      VARCHAR (50)    NULL,
    [cre_time]        DATETIME        NULL,
    [upd_userid]      VARCHAR (50)    NULL,
    [upd_time]        DATETIME        NULL,
    [csril_id]        INT             IDENTITY (1, 1) NOT NULL,
    [csrid_id]        INT             NULL,
    [reserve_user_id] VARCHAR (8)     NULL,
    [reserve_reason]  NVARCHAR (255)  NULL,
    [reserve_note]    NVARCHAR (255)  NULL,
    [isagree]         VARCHAR (1)     NULL,
    [check_user_id]   VARCHAR (50)    NULL,
    [check_time]      DATETIME        NULL,
    [cancel_user_id]  VARCHAR (50)    NULL,
    [cancel_time]     DATETIME        NULL,
    [price]           DECIMAL (20, 2) NULL,
    [pay_method]      VARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([csril_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'pay_method';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'定金金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '取消時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'cancel_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '取消使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'cancel_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '確認時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '確認使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'check_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否同意', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'isagree';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保留備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'reserve_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保留原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'reserve_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保留使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'reserve_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存保留匯入細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'csrid_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存匯入保留紀錄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportLog', @level2type = N'COLUMN', @level2name = N'csril_id';

