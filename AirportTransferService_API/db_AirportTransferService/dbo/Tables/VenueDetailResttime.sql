CREATE TABLE [dbo].[VenueDetailResttime] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [venuemaster_id]        VARCHAR (20)   NULL,
    [resttime_id]           VARCHAR (20)   NOT NULL,
    [resttime_name]         NVARCHAR (255) NULL,
    [resttime_start]        TIME (0)       NULL,
    [resttime_end]          TIME (0)       NULL,
    [resttime_across_night] VARCHAR (1)    NULL,
    [used]                  VARCHAR (3)    NULL,
    PRIMARY KEY CLUSTERED ([resttime_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否使用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailResttime', @level2type = N'COLUMN', @level2name = N'used';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息時間(迄)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailResttime', @level2type = N'COLUMN', @level2name = N'resttime_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息時間(起)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailResttime', @level2type = N'COLUMN', @level2name = N'resttime_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息時間名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailResttime', @level2type = N'COLUMN', @level2name = N'resttime_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息時間流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailResttime', @level2type = N'COLUMN', @level2name = N'resttime_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailResttime', @level2type = N'COLUMN', @level2name = N'venuemaster_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地細項休息時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailResttime';

