CREATE TABLE [dbo].[VenueReservation] (
    [cre_userid]               VARCHAR (50)   NULL,
    [cre_time]                 DATETIME       NULL,
    [upd_userid]               VARCHAR (50)   NULL,
    [upd_time]                 DATETIME       NULL,
    [venuereservation_id]      VARCHAR (20)   NOT NULL,
    [customer_id]              VARCHAR (20)   NULL,
    [customer_name]            NVARCHAR (50)  NULL,
    [reservedpersonnel_id]     NVARCHAR (20)  NULL,
    [reservedpersonnel_name]   NVARCHAR (50)  NULL,
    [venuemaster_id]           VARCHAR (20)   NULL,
    [venue_name]               NVARCHAR (50)  NULL,
    [expected_time]            DATETIME       NULL,
    [reservation_time_start]   DATETIME       NULL,
    [reservation_time_end]     DATETIME       NULL,
    [reservation_across_night] VARCHAR (1)    NULL,
    [station_id]               VARCHAR (20)   NULL,
    [station_name]             NVARCHAR (255) NULL,
    [station_user_id]          VARCHAR (50)   NULL,
    [reservationMark]          NVARCHAR (MAX) NULL,
    [status]                   VARCHAR (10)   NULL,
    [venue_type]               NVARCHAR (50)  NULL,
    [reservation_type]         NVARCHAR (50)  NULL,
    [cs_id]                    VARCHAR (50)   NULL,
    [car_id]                   VARCHAR (50)   NULL,
    [order_id]                 VARCHAR (50)   NULL,
    [wom_id]                   VARCHAR (50)   NULL,
    PRIMARY KEY CLUSTERED ([venuereservation_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'wom_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'進場車流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'car_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新車流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域服務種類流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'reservation_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域種類流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'venue_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'進行狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'reservationMark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位工作人員id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'station_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'station_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'station_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約時間(迄)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'reservation_time_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約時間(起)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'reservation_time_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'expected_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'venue_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'venuemaster_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約人員名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'reservedpersonnel_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約人員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'reservedpersonnel_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'customer_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地預約流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation', @level2type = N'COLUMN', @level2name = N'venuereservation_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場地預約', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueReservation';

