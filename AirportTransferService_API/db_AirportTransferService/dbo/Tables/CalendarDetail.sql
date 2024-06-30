CREATE TABLE [dbo].[CalendarDetail] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [cd_id]      INT            IDENTITY (1, 1) NOT NULL,
    [cm_id]      VARCHAR (50)   NULL,
    [date]       DATE           NULL,
    [holiday]    VARCHAR (1)    NULL,
    [note]       NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([cd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'說明', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CalendarDetail', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否假日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CalendarDetail', @level2type = N'COLUMN', @level2name = N'holiday';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CalendarDetail', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CalendarDetail', @level2type = N'COLUMN', @level2name = N'cm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CalendarDetail', @level2type = N'COLUMN', @level2name = N'cd_id';

