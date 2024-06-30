CREATE TABLE [dbo].[CommodityXCompany] (
    [cre_userid]   VARCHAR (50) NULL,
    [cre_time]     DATETIME     NULL,
    [upd_userid]   VARCHAR (50) NULL,
    [upd_time]     DATETIME     NULL,
    [cxc_id]       INT          IDENTITY (1, 1) NOT NULL,
    [commodity_id] VARCHAR (50) NULL,
    [company_id]   VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([cxc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityXCompany', @level2type = N'COLUMN', @level2name = N'company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityXCompany', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityXCompany', @level2type = N'COLUMN', @level2name = N'cxc_id';

