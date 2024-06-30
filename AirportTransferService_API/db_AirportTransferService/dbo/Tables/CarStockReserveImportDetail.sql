CREATE TABLE [dbo].[CarStockReserveImportDetail] (
    [cre_userid]        VARCHAR (50)   NULL,
    [cre_time]          DATETIME       NULL,
    [upd_userid]        VARCHAR (50)   NULL,
    [upd_time]          DATETIME       NULL,
    [csrid_id]          INT            IDENTITY (1, 1) NOT NULL,
    [csrim_id]          VARCHAR (50)   NULL,
    [status]            NVARCHAR (255) NULL,
    [car_type_name]     NVARCHAR (255) NULL,
    [format_name]       NVARCHAR (255) NULL,
    [year]              INT            NULL,
    [exterior_code]     NVARCHAR (255) NULL,
    [interior_code]     NVARCHAR (255) NULL,
    [arrive_port_date]  DATE           NULL,
    [special_equipment] NVARCHAR (255) NULL,
    [count]             INT            NULL,
    [note]              NVARCHAR (255) NULL,
    [is_arrive_port]    VARCHAR (1)    NULL,
    [is_pickup]         VARCHAR (1)    NULL,
    CONSTRAINT [PK__CarStock__C1C4A9ACACF00E57] PRIMARY KEY CLUSTERED ([csrid_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否提車', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'is_pickup';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否到港', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'is_arrive_port';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '特殊配備', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'special_equipment';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '到港日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'arrive_port_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '內裝', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'interior_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '外裝', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'exterior_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '規格', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'format_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'car_type_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存保留匯入主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'csrim_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存保留匯入細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveImportDetail', @level2type = N'COLUMN', @level2name = N'csrid_id';

