CREATE TABLE [dbo].[OrderAllotmentLog] (
    [cre_userid]         VARCHAR (50)  NULL,
    [cre_time]           DATETIME      NULL,
    [upd_userid]         VARCHAR (50)  NULL,
    [upd_time]           DATETIME      NULL,
    [order_allotment_id] INT           IDENTITY (1, 1) NOT NULL,
    [order_number_start] VARCHAR (50)  NULL,
    [order_number_end]   VARCHAR (50)  NULL,
    [custody_unit_id]    VARCHAR (255) NULL,
    [custody_user_id]    VARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([order_allotment_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保管人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAllotmentLog', @level2type = N'COLUMN', @level2name = N'custody_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保管單位(據點流水號)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAllotmentLog', @level2type = N'COLUMN', @level2name = N'custody_unit_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單編號迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAllotmentLog', @level2type = N'COLUMN', @level2name = N'order_number_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單編號起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAllotmentLog', @level2type = N'COLUMN', @level2name = N'order_number_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單配發紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAllotmentLog', @level2type = N'COLUMN', @level2name = N'order_allotment_id';

