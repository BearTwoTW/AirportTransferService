CREATE TABLE [dbo].[Stock] (
    [cre_userid]   VARCHAR (50)    NULL,
    [cre_time]     DATETIME        NULL,
    [upd_userid]   VARCHAR (50)    NULL,
    [upd_time]     DATETIME        NULL,
    [stock_id]     VARCHAR (50)    NOT NULL,
    [commodity_id] VARCHAR (50)    NULL,
    [uc_id]        VARCHAR (50)    NULL,
    [warehouse_id] VARCHAR (50)    NULL,
    [count]        DECIMAL (20, 2) NULL,
    [expired_date] DATE            NULL,
    [ccad_id_1]    VARCHAR (50)    NULL,
    [ccad_id_2]    VARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([stock_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項2流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Stock', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項1流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Stock', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到期日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Stock', @level2type = N'COLUMN', @level2name = N'expired_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Stock', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Stock', @level2type = N'COLUMN', @level2name = N'warehouse_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位換算流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Stock', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Stock', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Stock', @level2type = N'COLUMN', @level2name = N'stock_id';

