CREATE TABLE [dbo].[CommodityCustomAttriMaster] (
    [cre_userid]   VARCHAR (50)   NULL,
    [cre_time]     DATETIME       NULL,
    [upd_userid]   VARCHAR (50)   NULL,
    [upd_time]     DATETIME       NULL,
    [ccam_id]      VARCHAR (50)   NOT NULL,
    [commodity_id] VARCHAR (50)   NULL,
    [ccam_name]    NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([ccam_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性主項名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriMaster', @level2type = N'COLUMN', @level2name = N'ccam_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriMaster', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriMaster', @level2type = N'COLUMN', @level2name = N'ccam_id';

