CREATE TABLE [dbo].[EC_CustomerShoppingCart] (
    [cre_userid]    VARCHAR (50)  NULL,
    [cre_time]      DATETIME      NULL,
    [upd_userid]    VARCHAR (50)  NULL,
    [upd_time]      DATETIME      NULL,
    [csh_id]        INT           IDENTITY (1, 1) NOT NULL,
    [customer_id]   VARCHAR (50)  NULL,
    [commodity_id]  NVARCHAR (50) NULL,
    [uc_id]         VARCHAR (50)  NULL,
    [count]         INT           NULL,
    [ccad_id_1]     VARCHAR (50)  NULL,
    [ccad_id_2]     VARCHAR (50)  NULL,
    [is_gift]       VARCHAR (1)   NULL,
    [promotion_id]  VARCHAR (50)  NULL,
    [pxg_id]        INT           NULL,
    [gift_loop_now] INT           NULL,
    [logistics_id]  INT           NULL,
    CONSTRAINT [PK__Customer__0399ED7EC026AC42] PRIMARY KEY CLUSTERED ([csh_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷活動贈品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'pxg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷活動流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'promotion_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否贈品', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'is_gift';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項2流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項1流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerShoppingCart', @level2type = N'COLUMN', @level2name = N'logistics_id';

