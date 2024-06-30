CREATE TABLE [dbo].[Commodity] (
    [cre_userid]      VARCHAR (50)    NULL,
    [cre_time]        DATETIME        NULL,
    [upd_userid]      VARCHAR (50)    NULL,
    [upd_time]        DATETIME        NULL,
    [commodity_id]    VARCHAR (50)    NOT NULL,
    [commodity_code]  VARCHAR (50)    NULL,
    [commodity_name]  NVARCHAR (255)  NULL,
    [type]            VARCHAR (50)    NULL,
    [label_big]       VARCHAR (10)    NULL,
    [label_mid]       VARCHAR (10)    NULL,
    [label_small]     VARCHAR (10)    NULL,
    [unit]            VARCHAR (50)    NULL,
    [note]            VARCHAR (255)   NULL,
    [visible]         VARCHAR (1)     NULL,
    [need_calc_stock] VARCHAR (1)     NULL,
    [iscombination]   VARCHAR (1)     NULL,
    [on_shelf_time]   DATETIME        NULL,
    [off_shelf_time]  DATETIME        NULL,
    [ccam_id_1]       VARCHAR (50)    NULL,
    [ccam_id_2]       VARCHAR (50)    NULL,
    [weight]          DECIMAL (10, 2) NULL,
    [introduction]    NVARCHAR (MAX)  NULL,
    [seq]             INT             NULL,
    [ship_type]       VARCHAR (50)    NULL,
    [buy_limit]       INT             NULL,
    CONSTRAINT [PK__Commodit__4BD0F1473AFFA724] PRIMARY KEY CLUSTERED ([commodity_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品介紹', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'introduction';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'重量(公斤)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'weight';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂屬性主項2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'ccam_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂屬性主項1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'ccam_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'下架時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'off_shelf_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'上架時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'on_shelf_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否組合商品', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'iscombination';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否需要計算庫存', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'need_calc_stock';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'unit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'小標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'label_small';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'中標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'label_mid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'大標籤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'label_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'commodity_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'commodity_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'運送方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'ship_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'購買上限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Commodity', @level2type = N'COLUMN', @level2name = N'buy_limit';

