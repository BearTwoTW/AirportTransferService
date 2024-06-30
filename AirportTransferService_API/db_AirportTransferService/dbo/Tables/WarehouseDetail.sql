CREATE TABLE [dbo].[WarehouseDetail] (
    [cre_userid]          VARCHAR (50) NULL,
    [cre_time]            DATETIME     NULL,
    [upd_userid]          VARCHAR (50) NULL,
    [upd_time]            DATETIME     NULL,
    [warehouse_id]        VARCHAR (50) NOT NULL,
    [warehouse_master_id] VARCHAR (50) NULL,
    [storage_space]       VARCHAR (50) NULL,
    [visible]             VARCHAR (1)  NULL,
    CONSTRAINT [PK_WarehouseDetail] PRIMARY KEY CLUSTERED ([warehouse_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WarehouseDetail', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'儲位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WarehouseDetail', @level2type = N'COLUMN', @level2name = N'storage_space';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WarehouseDetail', @level2type = N'COLUMN', @level2name = N'warehouse_master_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WarehouseDetail', @level2type = N'COLUMN', @level2name = N'warehouse_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫細項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WarehouseDetail';

