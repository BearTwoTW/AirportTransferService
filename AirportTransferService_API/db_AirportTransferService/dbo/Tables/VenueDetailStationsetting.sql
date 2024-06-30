CREATE TABLE [dbo].[VenueDetailStationsetting] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [venuemaster_id] VARCHAR (20)   NULL,
    [station_id]     VARCHAR (20)   NOT NULL,
    [station_name]   NVARCHAR (255) NULL,
    [user_id]        VARCHAR (50)   NULL,
    [station_mark]   NVARCHAR (MAX) NULL,
    [used]           VARCHAR (3)    NULL,
    PRIMARY KEY CLUSTERED ([station_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否使用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationsetting', @level2type = N'COLUMN', @level2name = N'used';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationsetting', @level2type = N'COLUMN', @level2name = N'station_mark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位工作人員id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationsetting', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationsetting', @level2type = N'COLUMN', @level2name = N'station_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationsetting', @level2type = N'COLUMN', @level2name = N'station_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationsetting', @level2type = N'COLUMN', @level2name = N'venuemaster_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地細項工位設定', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueDetailStationsetting';

