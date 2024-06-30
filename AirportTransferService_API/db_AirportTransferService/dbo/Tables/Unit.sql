CREATE TABLE [dbo].[Unit] (
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  NULL,
    [upd_time]   DATETIME      NULL,
    [unit_id]    VARCHAR (50)  NOT NULL,
    [unit_name]  NVARCHAR (50) NULL,
    [visible]    VARCHAR (1)   NULL,
    PRIMARY KEY CLUSTERED ([unit_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Unit', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Unit', @level2type = N'COLUMN', @level2name = N'unit_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Unit', @level2type = N'COLUMN', @level2name = N'unit_id';

