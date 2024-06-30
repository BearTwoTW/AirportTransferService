CREATE TABLE [dbo].[CommodityOnShelfPeriodXLabel] (
    [cre_userid]  VARCHAR (50) NULL,
    [cre_time]    DATETIME     NULL,
    [upd_userid]  VARCHAR (50) NULL,
    [upd_time]    DATETIME     NULL,
    [cospxl_id]   INT          IDENTITY (1, 1) NOT NULL,
    [cosp_id]     INT          NULL,
    [label_big]   VARCHAR (10) NULL,
    [label_mid]   VARCHAR (10) NULL,
    [label_small] VARCHAR (10) NULL,
    PRIMARY KEY CLUSTERED ([cospxl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'小標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriodXLabel', @level2type = N'COLUMN', @level2name = N'label_small';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'中標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriodXLabel', @level2type = N'COLUMN', @level2name = N'label_mid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'大標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriodXLabel', @level2type = N'COLUMN', @level2name = N'label_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品上架時段流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriodXLabel', @level2type = N'COLUMN', @level2name = N'cosp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityOnShelfPeriodXLabel', @level2type = N'COLUMN', @level2name = N'cospxl_id';

