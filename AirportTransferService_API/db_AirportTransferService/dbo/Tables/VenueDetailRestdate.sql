CREATE TABLE [dbo].[VenueDetailRestdate] (
    [cre_userid]      VARCHAR (50)   NULL,
    [cre_time]        DATETIME       NULL,
    [upd_userid]      VARCHAR (50)   NULL,
    [upd_time]        DATETIME       NULL,
    [venuemaster_id]  VARCHAR (20)   NULL,
    [restdate_id]     VARCHAR (20)   NOT NULL,
    [restdate_name]   NVARCHAR (255) NULL,
    [rest_date_start] DATE           NULL,
    [rest_date_end]   DATE           NULL,
    [used]            VARCHAR (3)    NULL,
    PRIMARY KEY CLUSTERED ([restdate_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否使用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailRestdate', @level2type = N'COLUMN', @level2name = N'used';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息日(迄)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailRestdate', @level2type = N'COLUMN', @level2name = N'rest_date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息日(起)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailRestdate', @level2type = N'COLUMN', @level2name = N'rest_date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息日名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailRestdate', @level2type = N'COLUMN', @level2name = N'restdate_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息日流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailRestdate', @level2type = N'COLUMN', @level2name = N'restdate_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailRestdate', @level2type = N'COLUMN', @level2name = N'venuemaster_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地細項休息日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailRestdate';

