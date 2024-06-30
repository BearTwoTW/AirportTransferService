CREATE TABLE [dbo].[Currency] (
    [cre_userid]    VARCHAR (50)   NULL,
    [cre_time]      DATETIME       NULL,
    [upd_userid]    VARCHAR (50)   NULL,
    [upd_time]      DATETIME       NULL,
    [currency_id]   INT            IDENTITY (1, 1) NOT NULL,
    [currency]      VARCHAR (50)   NULL,
    [exchange_rate] DECIMAL (5, 2) NULL,
    PRIMARY KEY CLUSTERED ([currency_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯率', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Currency', @level2type = N'COLUMN', @level2name = N'exchange_rate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'幣別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Currency', @level2type = N'COLUMN', @level2name = N'currency';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Currency', @level2type = N'COLUMN', @level2name = N'currency_id';

