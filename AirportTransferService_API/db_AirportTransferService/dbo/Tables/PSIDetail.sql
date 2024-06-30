CREATE TABLE [dbo].[PSIDetail] (
    [id]                      INT             IDENTITY (1, 1) NOT NULL,
    [psi_id]                  VARCHAR (50)    NULL,
    [cre_time]                DATETIME        NULL,
    [commodity_id]            VARCHAR (50)    NULL,
    [commodity_name]          NVARCHAR (255)  NULL,
    [pre_balance_count]       DECIMAL (20, 2) NULL,
    [pre_balance_price]       DECIMAL (10, 2) NULL,
    [import_count]            DECIMAL (20, 2) NULL,
    [import_price]            DECIMAL (10, 2) NULL,
    [stock_adjust_count]      DECIMAL (20, 2) NULL,
    [stock_scrap_count]       DECIMAL (20, 2) NULL,
    [stock_scrap_refund]      DECIMAL (10, 2) NULL,
    [stock_requisition_count] DECIMAL (20, 2) NULL,
    [stock_requisition_cost]  DECIMAL (20, 2) NULL,
    [stock_requisition_price] DECIMAL (20, 2) NULL,
    [balance_count]           DECIMAL (20, 2) NULL,
    [balance_price]           DECIMAL (10, 2) NULL,
    [difference]              DECIMAL (20, 2) NULL,
    CONSTRAINT [PK__PSIDetai__3213E83F5AF6C5F1] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'本期銷貨成本', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PSIDetail', @level2type = N'COLUMN', @level2name = N'stock_requisition_cost';

