CREATE TABLE [dbo].[PromotionUseLog] (
    [cre_userid]   VARCHAR (50) NULL,
    [cre_time]     DATETIME     NULL,
    [upd_userid]   VARCHAR (50) NULL,
    [upd_time]     DATETIME     NULL,
    [pul_id]       INT          IDENTITY (1, 1) NOT NULL,
    [promotion_id] VARCHAR (50) NULL,
    [ec_order_id]  VARCHAR (50) NULL,
    [customer_id]  VARCHAR (50) NULL,
    [expired_date] DATE         NULL,
    [use_time]     DATETIME     NULL,
    [isvalid]      VARCHAR (1)  NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否有效', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionUseLog', @level2type = N'COLUMN', @level2name = N'isvalid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionUseLog', @level2type = N'COLUMN', @level2name = N'use_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到期日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionUseLog', @level2type = N'COLUMN', @level2name = N'expired_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionUseLog', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionUseLog', @level2type = N'COLUMN', @level2name = N'ec_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionUseLog', @level2type = N'COLUMN', @level2name = N'promotion_id';

