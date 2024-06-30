CREATE TABLE [dbo].[EC_CustomerBonusStock] (
    [cre_userid]   VARCHAR (50) NULL,
    [cre_time]     DATETIME     NULL,
    [upd_userid]   VARCHAR (50) NULL,
    [upd_time]     DATETIME     NULL,
    [ec_cbs_id]    VARCHAR (50) NOT NULL,
    [customer_id]  VARCHAR (50) NULL,
    [bonus]        INT          NULL,
    [expired_date] DATE         NULL,
    CONSTRAINT [PK_EC_CustomerBonusStock] PRIMARY KEY CLUSTERED ([ec_cbs_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到期日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusStock', @level2type = N'COLUMN', @level2name = N'expired_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusStock', @level2type = N'COLUMN', @level2name = N'bonus';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusStock', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusStock', @level2type = N'COLUMN', @level2name = N'ec_cbs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員紅利庫存', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusStock';

