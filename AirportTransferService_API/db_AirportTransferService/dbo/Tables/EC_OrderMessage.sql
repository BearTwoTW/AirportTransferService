CREATE TABLE [dbo].[EC_OrderMessage] (
    [cre_userid]  VARCHAR (50)   NULL,
    [cre_time]    DATETIME       NULL,
    [upd_userid]  VARCHAR (50)   NULL,
    [upd_time]    DATETIME       NULL,
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [ec_order_id] VARCHAR (50)   NULL,
    [user_id]     VARCHAR (50)   NULL,
    [customer_id] VARCHAR (50)   NULL,
    [message]     NVARCHAR (255) NULL,
    CONSTRAINT [PK_EC_OrderLogisticsQA] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'留言訊息', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderMessage', @level2type = N'COLUMN', @level2name = N'message';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderMessage', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderMessage', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderMessage', @level2type = N'COLUMN', @level2name = N'ec_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderMessage', @level2type = N'COLUMN', @level2name = N'id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單留言紀錄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderMessage';

