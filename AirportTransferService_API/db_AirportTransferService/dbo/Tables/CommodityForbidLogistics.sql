CREATE TABLE [dbo].[CommodityForbidLogistics] (
    [cre_userid]   VARCHAR (50) NULL,
    [cre_time]     DATETIME     NULL,
    [upd_userid]   VARCHAR (50) NULL,
    [upd_time]     DATETIME     NULL,
    [id]           INT          IDENTITY (1, 1) NOT NULL,
    [commodity_id] VARCHAR (50) NULL,
    [logistics_id] INT          NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityForbidLogistics', @level2type = N'COLUMN', @level2name = N'logistics_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityForbidLogistics', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityForbidLogistics', @level2type = N'COLUMN', @level2name = N'id';

