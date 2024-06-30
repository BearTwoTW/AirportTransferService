CREATE TABLE [dbo].[EC_CustomerCollection] (
    [cre_userid]   VARCHAR (50) NULL,
    [cre_time]     DATETIME     NULL,
    [upd_userid]   VARCHAR (50) NULL,
    [upd_time]     DATETIME     NULL,
    [eccc_id]      INT          IDENTITY (1, 1) NOT NULL,
    [customer_id]  VARCHAR (50) NULL,
    [commodity_id] VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([eccc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerCollection', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerCollection', @level2type = N'COLUMN', @level2name = N'customer_id';

