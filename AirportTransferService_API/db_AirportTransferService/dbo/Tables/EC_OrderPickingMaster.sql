CREATE TABLE [dbo].[EC_OrderPickingMaster] (
    [cre_userid]    VARCHAR (50)  NULL,
    [cre_time]      DATETIME      NULL,
    [upd_userid]    VARCHAR (50)  NULL,
    [upd_time]      DATETIME      NULL,
    [ec_opm_id]     VARCHAR (50)  NOT NULL,
    [note]          VARCHAR (255) NULL,
    [complete_time] DATETIME      NULL,
    [ship_type]     VARCHAR (50)  NULL,
    [position_id]   VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([ec_opm_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderPickingMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'揀貨單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderPickingMaster', @level2type = N'COLUMN', @level2name = N'ec_opm_id';




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'運送方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderPickingMaster', @level2type = N'COLUMN', @level2name = N'ship_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderPickingMaster', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'完成時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderPickingMaster', @level2type = N'COLUMN', @level2name = N'complete_time';

