CREATE TABLE [dbo].[PromotionXGift] (
    [cre_userid]   VARCHAR (50)    NULL,
    [cre_time]     DATETIME        NULL,
    [upd_userid]   VARCHAR (50)    NULL,
    [upd_time]     DATETIME        NULL,
    [pxg_id]       INT             IDENTITY (1, 1) NOT NULL,
    [promotion_id] VARCHAR (50)    NULL,
    [commodity_id] VARCHAR (50)    NULL,
    [uc_id]        VARCHAR (50)    NULL,
    [ccad_id_1]    VARCHAR (50)    NULL,
    [ccad_id_2]    VARCHAR (50)    NULL,
    [count]        INT             NULL,
    [price]        DECIMAL (20, 2) NULL,
    CONSTRAINT [PK__Promotio__026B484EB1CA27B1] PRIMARY KEY CLUSTERED ([pxg_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'價格', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXGift', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXGift', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂屬性細項流水號2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXGift', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂屬性細項流水號1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXGift', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXGift', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXGift', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷活動流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionXGift', @level2type = N'COLUMN', @level2name = N'promotion_id';

