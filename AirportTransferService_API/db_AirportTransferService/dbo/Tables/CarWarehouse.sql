CREATE TABLE [dbo].[CarWarehouse] (
    [cre_userid]         VARCHAR (50)  NULL,
    [cre_time]           DATETIME      NULL,
    [upd_userid]         VARCHAR (50)  NULL,
    [upd_time]           DATETIME      NULL,
    [cw_id]              VARCHAR (50)  NOT NULL,
    [store_department]   VARCHAR (255) NULL,
    [store_space]        VARCHAR (255) NULL,
    [park_number_all]    INT           NULL,
    [park_number_now]    INT           NULL,
    [park_number_remain] INT           NULL,
    [manage_user_id]     VARCHAR (255) NULL,
    [manage_ul_id]       INT           NULL,
    [custody_unit_id]    VARCHAR (255) NULL,
    [visible]            VARCHAR (1)   NULL,
    PRIMARY KEY CLUSTERED ([cw_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保管單位編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'custody_unit_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫管理職務編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'manage_ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'倉庫管理人帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'manage_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'剩餘車位數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'park_number_remain';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'停放數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'park_number_now';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車位數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'park_number_all';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'儲位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'store_space';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'存放部門', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'store_department';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車倉儲流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse', @level2type = N'COLUMN', @level2name = N'cw_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車倉儲', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarWarehouse';

