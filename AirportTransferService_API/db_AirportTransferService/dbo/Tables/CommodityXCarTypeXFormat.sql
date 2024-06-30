CREATE TABLE [dbo].[CommodityXCarTypeXFormat] (
    [cre_userid]   VARCHAR (50) NULL,
    [cre_time]     DATETIME     NULL,
    [upd_userid]   VARCHAR (50) NULL,
    [upd_time]     DATETIME     NULL,
    [cxctxf_id]    INT          IDENTITY (1, 1) NOT NULL,
    [commodity_id] VARCHAR (50) NULL,
    [ct_id]        INT          NULL,
    [ctf_id]       INT          NULL,
    PRIMARY KEY CLUSTERED ([cxctxf_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型規格流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityXCarTypeXFormat', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityXCarTypeXFormat', @level2type = N'COLUMN', @level2name = N'ct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityXCarTypeXFormat', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '商品綁車型規格流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityXCarTypeXFormat', @level2type = N'COLUMN', @level2name = N'cxctxf_id';

