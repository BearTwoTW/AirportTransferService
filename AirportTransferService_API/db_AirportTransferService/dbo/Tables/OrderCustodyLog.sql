CREATE TABLE [dbo].[OrderCustodyLog] (
    [cre_userid]          VARCHAR (50)  NULL,
    [cre_time]            DATETIME      NULL,
    [upd_userid]          VARCHAR (50)  NULL,
    [upd_time]            DATETIME      NULL,
    [ocl_id]              INT           IDENTITY (1, 1) NOT NULL,
    [order_id]            VARCHAR (50)  NULL,
    [custodyfrom_unit_id] VARCHAR (255) NULL,
    [custodyfrom_user_id] VARCHAR (255) NULL,
    [custodyto_unit_id]   VARCHAR (255) NULL,
    [custodyto_user_id]   VARCHAR (255) NULL,
    [last_ocl_id]         VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([ocl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'前次異動id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCustodyLog', @level2type = N'COLUMN', @level2name = N'last_ocl_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'目標保管人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCustodyLog', @level2type = N'COLUMN', @level2name = N'custodyto_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'目標保管單位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCustodyLog', @level2type = N'COLUMN', @level2name = N'custodyto_unit_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'來源保管人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCustodyLog', @level2type = N'COLUMN', @level2name = N'custodyfrom_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'來源保管單位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCustodyLog', @level2type = N'COLUMN', @level2name = N'custodyfrom_unit_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCustodyLog', @level2type = N'COLUMN', @level2name = N'order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderCustodyLog', @level2type = N'COLUMN', @level2name = N'ocl_id';

