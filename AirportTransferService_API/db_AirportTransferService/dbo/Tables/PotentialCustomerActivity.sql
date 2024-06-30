CREATE TABLE [dbo].[PotentialCustomerActivity] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [pca_id]                VARCHAR (50)   NOT NULL,
    [potential_customer_id] VARCHAR (50)   NULL,
    [notice_date]           DATE           NULL,
    [notice_message]        NVARCHAR (255) NULL,
    [complete_date]         DATE           NULL,
    [complete_message]      NVARCHAR (255) NULL,
    [note]                  NVARCHAR (255) NULL,
    [user_id]               VARCHAR (50)   NULL,
    PRIMARY KEY CLUSTERED ([pca_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerActivity', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerActivity', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'完成事項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerActivity', @level2type = N'COLUMN', @level2name = N'complete_message';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'完成日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerActivity', @level2type = N'COLUMN', @level2name = N'complete_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'提醒事項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerActivity', @level2type = N'COLUMN', @level2name = N'notice_message';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'提醒日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerActivity', @level2type = N'COLUMN', @level2name = N'notice_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'潛客流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerActivity', @level2type = N'COLUMN', @level2name = N'potential_customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomerActivity', @level2type = N'COLUMN', @level2name = N'pca_id';

