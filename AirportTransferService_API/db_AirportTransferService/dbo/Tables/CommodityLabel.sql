CREATE TABLE [dbo].[CommodityLabel] (
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  NULL,
    [upd_time]   DATETIME      NULL,
    [cl_id]      VARCHAR (50)  NOT NULL,
    [type]       VARCHAR (50)  NULL,
    [is_front]   VARCHAR (1)   NULL,
    [is_nav]     VARCHAR (1)   NULL,
    [label_big]  VARCHAR (50)  NULL,
    [label_mid]  VARCHAR (50)  NULL,
    [content]    NVARCHAR (50) NULL,
    [visible]    VARCHAR (1)   NULL,
    [seq]        INT           NULL,
    CONSTRAINT [PK__Commodit__70632433CCF2E19A] PRIMARY KEY CLUSTERED ([cl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityLabel', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityLabel', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityLabel', @level2type = N'COLUMN', @level2name = N'content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'第二層流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityLabel', @level2type = N'COLUMN', @level2name = N'label_mid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'第一層流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityLabel', @level2type = N'COLUMN', @level2name = N'label_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否放在nav', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityLabel', @level2type = N'COLUMN', @level2name = N'is_nav';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否前台用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityLabel', @level2type = N'COLUMN', @level2name = N'is_front';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityLabel', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityLabel', @level2type = N'COLUMN', @level2name = N'cl_id';

