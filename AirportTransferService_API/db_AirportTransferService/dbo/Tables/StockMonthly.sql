CREATE TABLE [dbo].[StockMonthly] (
    [cre_userid]       VARCHAR (50)    NULL,
    [cre_time]         DATETIME        NULL,
    [stock_id]         VARCHAR (50)    NOT NULL,
    [month]            DATE            NOT NULL,
    [commodity_id]     VARCHAR (50)    NULL,
    [uc_id]            VARCHAR (50)    NULL,
    [ccad_id_1]        VARCHAR (50)    NULL,
    [ccad_id_2]        VARCHAR (50)    NULL,
    [warehouse_id]     VARCHAR (50)    NULL,
    [last_count]       DECIMAL (20, 2) NULL,
    [change_count]     DECIMAL (20, 2) NULL,
    [monthly_count]    DECIMAL (20, 2) NULL,
    [expired_date]     DATE            NULL,
    [unit_price]       DECIMAL (20, 2) NULL,
    [actual_pay_price] DECIMAL (20, 2) NULL,
    [acceptance_count] DECIMAL (20, 2) NULL,
    [scrap_count]      DECIMAL (20, 2) NULL,
    [refund]           DECIMAL (20, 2) NULL,
    [adjust_count]     DECIMAL (20, 2) NULL,
    [unpack_count]     DECIMAL (20, 2) NULL,
    [inpack_count]     DECIMAL (20, 2) NULL,
    [order_count]      DECIMAL (20, 2) NULL,
    [sale_price]       DECIMAL (20, 2) NULL,
    CONSTRAINT [PK_StockMonthly] PRIMARY KEY CLUSTERED ([stock_id] ASC, [month] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單商品總售價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'sale_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單商品數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'order_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'裝箱異動數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'inpack_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'開箱異動數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'unpack_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'調整異動數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'adjust_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退費總額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'refund';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退回數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'scrap_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗收(入庫)數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'acceptance_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'actual_pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'平均單價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'unit_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到期日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'expired_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'計算完這個月數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'monthly_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'月結月份異動總數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'change_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'上次數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'last_count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'warehouse_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項1流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項1流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位換算流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年月', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'month';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockMonthly', @level2type = N'COLUMN', @level2name = N'stock_id';

