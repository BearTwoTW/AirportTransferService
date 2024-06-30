CREATE TABLE [dbo].[StockPutInDetail] (
    [cre_userid]   VARCHAR (50)    NULL,
    [cre_time]     DATETIME        NULL,
    [upd_userid]   VARCHAR (50)    NULL,
    [upd_time]     DATETIME        NULL,
    [spid_id]      INT             IDENTITY (1, 1) NOT NULL,
    [spim_id]      VARCHAR (50)    NOT NULL,
    [commodity_id] VARCHAR (50)    NULL,
    [uc_id]        VARCHAR (50)    NULL,
    [ccad_id_1]    VARCHAR (50)    NULL,
    [ccad_id_2]    VARCHAR (50)    NULL,
    [count]        DECIMAL (20, 2) NULL,
    [unit_price]   DECIMAL (20, 2) NULL,
    [warehouse_id] VARCHAR (50)    NULL,
    CONSTRAINT [PK_StockPutInDetail] PRIMARY KEY CLUSTERED ([spid_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail', @level2type = N'COLUMN', @level2name = N'warehouse_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail', @level2type = N'COLUMN', @level2name = N'unit_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂規格細項流水號2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂規格細項流水號1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存入庫主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail', @level2type = N'COLUMN', @level2name = N'spim_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存入庫細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail', @level2type = N'COLUMN', @level2name = N'spid_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存入庫細項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'StockPutInDetail';

