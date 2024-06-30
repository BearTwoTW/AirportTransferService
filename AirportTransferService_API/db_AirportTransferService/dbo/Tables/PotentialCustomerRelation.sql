CREATE TABLE [dbo].[PotentialCustomerRelation] (
    [cre_userid]              VARCHAR (50)   NULL,
    [cre_time]                DATETIME       NULL,
    [upd_userid]              VARCHAR (50)   NULL,
    [upd_time]                DATETIME       NULL,
    [pcr_id]                  INT            IDENTITY (1, 1) NOT NULL,
    [potential_customer_id_1] VARCHAR (50)   NULL,
    [potential_customer_id_2] VARCHAR (50)   NULL,
    [relation]                NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([pcr_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'關係', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerRelation', @level2type = N'COLUMN', @level2name = N'relation';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'潛客流水號2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerRelation', @level2type = N'COLUMN', @level2name = N'potential_customer_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'潛客流水號1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerRelation', @level2type = N'COLUMN', @level2name = N'potential_customer_id_1';

