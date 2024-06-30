CREATE TABLE [dbo].[CarStockTransferRecord] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [id]                    INT            IDENTITY (1, 1) NOT NULL,
    [cs_id]                 NVARCHAR (50)  NULL,
    [saleable]              NVARCHAR (1)   NULL,
    [layoff_date]           DATE           NULL,
    [suspension_date]       DATE           NULL,
    [car_species]           NVARCHAR (10)  NULL,
    [licensed_date]         DATE           NULL,
    [asset_transfer_reason] NVARCHAR (255) NULL,
    [asset_type]            NVARCHAR (255) NULL,
    [status]                NVARCHAR (255) NULL,
    CONSTRAINT [PK__CarStock__3213E83F613E0082] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核流程狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'財產種類(貨品、資產)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'asset_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'資產轉換原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'asset_transfer_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'領牌日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'licensed_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車種', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'car_species';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'停牌日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'suspension_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'停駛日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'layoff_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可銷售', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'saleable';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransferRecord', @level2type = N'COLUMN', @level2name = N'id';

