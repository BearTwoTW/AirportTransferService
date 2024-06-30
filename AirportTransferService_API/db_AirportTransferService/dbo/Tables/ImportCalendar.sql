CREATE TABLE [dbo].[ImportCalendar] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [id]         INT            IDENTITY (1, 1) NOT NULL,
    [cm_id]      VARCHAR (50)   NULL,
    [year]       INT            NULL,
    [date]       DATE           NULL,
    [note]       NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'說明', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportCalendar', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportCalendar', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年度', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportCalendar', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'行事曆主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportCalendar', @level2type = N'COLUMN', @level2name = N'cm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportCalendar', @level2type = N'COLUMN', @level2name = N'id';

