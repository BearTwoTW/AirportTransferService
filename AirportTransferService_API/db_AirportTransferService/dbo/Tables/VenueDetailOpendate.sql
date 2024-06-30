CREATE TABLE [dbo].[VenueDetailOpendate] (
    [cre_userid]      VARCHAR (50)   NULL,
    [cre_time]        DATETIME       NULL,
    [upd_userid]      VARCHAR (50)   NULL,
    [upd_time]        DATETIME       NULL,
    [venuemaster_id]  VARCHAR (20)   NULL,
    [opendate_id]     VARCHAR (20)   NOT NULL,
    [opendate_name]   NVARCHAR (255) NULL,
    [open_date_start] VARCHAR (255)  NULL,
    [open_date_end]   VARCHAR (255)  NULL,
    [used]            VARCHAR (3)    NULL,
    PRIMARY KEY CLUSTERED ([opendate_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否使用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailOpendate', @level2type = N'COLUMN', @level2name = N'used';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'營業日期(迄)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailOpendate', @level2type = N'COLUMN', @level2name = N'open_date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'營業日期(起)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailOpendate', @level2type = N'COLUMN', @level2name = N'open_date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'營業日期名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailOpendate', @level2type = N'COLUMN', @level2name = N'opendate_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'營業日期流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailOpendate', @level2type = N'COLUMN', @level2name = N'opendate_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailOpendate', @level2type = N'COLUMN', @level2name = N'venuemaster_id';

