CREATE TABLE [dbo].[Tax] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [tax_id]     INT            IDENTITY (1, 1) NOT NULL,
    [tax_type]   VARCHAR (50)   NULL,
    [tax_rate]   DECIMAL (5, 2) NULL,
    PRIMARY KEY CLUSTERED ([tax_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稅率', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Tax', @level2type = N'COLUMN', @level2name = N'tax_rate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稅別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Tax', @level2type = N'COLUMN', @level2name = N'tax_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Tax', @level2type = N'COLUMN', @level2name = N'tax_id';

