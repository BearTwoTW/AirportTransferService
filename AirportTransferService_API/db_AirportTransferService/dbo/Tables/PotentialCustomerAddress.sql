CREATE TABLE [dbo].[PotentialCustomerAddress] (
    [cre_userid]            VARCHAR (50)  NULL,
    [cre_time]              DATETIME      NULL,
    [upd_userid]            VARCHAR (50)  NULL,
    [upd_time]              DATETIME      NULL,
    [pca_id]                INT           IDENTITY (1, 1) NOT NULL,
    [potential_customer_id] VARCHAR (50)  NULL,
    [title]                 NVARCHAR (50) NULL,
    [city]                  NVARCHAR (50) NULL,
    [area]                  NVARCHAR (50) NULL,
    [address]               VARCHAR (400) NULL,
    PRIMARY KEY CLUSTERED ([pca_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerAddress', @level2type = N'COLUMN', @level2name = N'address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerAddress', @level2type = N'COLUMN', @level2name = N'area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerAddress', @level2type = N'COLUMN', @level2name = N'city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerAddress', @level2type = N'COLUMN', @level2name = N'title';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'潛客流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerAddress', @level2type = N'COLUMN', @level2name = N'potential_customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerAddress', @level2type = N'COLUMN', @level2name = N'pca_id';

