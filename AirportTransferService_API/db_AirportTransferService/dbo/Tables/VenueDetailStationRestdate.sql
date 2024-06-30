CREATE TABLE [dbo].[VenueDetailStationRestdate] (
    [cre_userid]             VARCHAR (50)  NULL,
    [cre_time]               DATETIME      NULL,
    [upd_userid]             VARCHAR (50)  NULL,
    [upd_time]               DATETIME      NULL,
    [venuemaster_id]         VARCHAR (20)  NULL,
    [station_restdate_id]    VARCHAR (20)  NOT NULL,
    [station_restdate_name]  NVARCHAR (50) NULL,
    [station_id]             VARCHAR (20)  NULL,
    [station_restdate_start] DATE          NULL,
    [station_restdate_end]   DATE          NULL,
    PRIMARY KEY CLUSTERED ([station_restdate_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位休息日(迄)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationRestdate', @level2type = N'COLUMN', @level2name = N'station_restdate_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位休息日(起)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationRestdate', @level2type = N'COLUMN', @level2name = N'station_restdate_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationRestdate', @level2type = N'COLUMN', @level2name = N'station_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位休息日名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationRestdate', @level2type = N'COLUMN', @level2name = N'station_restdate_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位休息日流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationRestdate', @level2type = N'COLUMN', @level2name = N'station_restdate_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationRestdate', @level2type = N'COLUMN', @level2name = N'venuemaster_id';

