CREATE TABLE [dbo].[PromotionXCommodityLabel] (
    [cre_userid]   VARCHAR (50)  NULL,
    [cre_time]     DATETIME      NULL,
    [upd_userid]   VARCHAR (50)  NULL,
    [upd_time]     DATETIME      NULL,
    [pxcl_id]      INT           IDENTITY (1, 1) NOT NULL,
    [promotion_id] VARCHAR (50)  NULL,
    [type]         NVARCHAR (50) NULL,
    [label_big]    VARCHAR (50)  NULL,
    [label_mid]    VARCHAR (50)  NULL,
    [label_small]  VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([pxcl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'小標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXCommodityLabel', @level2type = N'COLUMN', @level2name = N'label_small';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'中標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXCommodityLabel', @level2type = N'COLUMN', @level2name = N'label_mid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'大標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXCommodityLabel', @level2type = N'COLUMN', @level2name = N'label_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'類型(限制、目標)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXCommodityLabel', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷活動流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXCommodityLabel', @level2type = N'COLUMN', @level2name = N'promotion_id';

