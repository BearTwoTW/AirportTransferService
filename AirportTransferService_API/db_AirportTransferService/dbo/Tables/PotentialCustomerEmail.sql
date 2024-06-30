CREATE TABLE [dbo].[PotentialCustomerEmail] (
    [cre_userid]            VARCHAR (50)  NULL,
    [cre_time]              DATETIME      NULL,
    [upd_userid]            VARCHAR (50)  NULL,
    [upd_time]              DATETIME      NULL,
    [pce_id]                INT           IDENTITY (1, 1) NOT NULL,
    [potential_customer_id] VARCHAR (50)  NULL,
    [title]                 NVARCHAR (50) NULL,
    [email]                 VARCHAR (400) NULL,
    PRIMARY KEY CLUSTERED ([pce_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerEmail', @level2type = N'COLUMN', @level2name = N'email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerEmail', @level2type = N'COLUMN', @level2name = N'title';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'潛客流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerEmail', @level2type = N'COLUMN', @level2name = N'potential_customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerEmail', @level2type = N'COLUMN', @level2name = N'pce_id';

