CREATE TABLE [dbo].[Warehouse] (
    [cre_userid]          VARCHAR (50)   NULL,
    [cre_time]            DATETIME       NULL,
    [upd_userid]          VARCHAR (50)   NULL,
    [upd_time]            DATETIME       NULL,
    [warehouse_id]        VARCHAR (50)   NOT NULL,
    [warehouse_master_id] VARCHAR (50)   NULL,
    [name]                VARCHAR (100)  NULL,
    [storage_space]       VARCHAR (50)   NULL,
    [address]             VARCHAR (255)  NULL,
    [isforsale]           VARCHAR (1)    NULL,
    [visible]             VARCHAR (1)    NULL,
    [type]                VARCHAR (50)   NULL,
    [position_id]         VARCHAR (50)   NULL,
    [note]                NVARCHAR (255) NULL,
    CONSTRAINT [PK__Warehous__734FE6BF3427E956] PRIMARY KEY CLUSTERED ([warehouse_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否販售用倉庫', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'isforsale';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'儲位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'storage_space';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫明細流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'warehouse_id';




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫細項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'warehouse_master_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Warehouse', @level2type = N'COLUMN', @level2name = N'note';

