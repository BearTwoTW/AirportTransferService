CREATE TABLE [dbo].[VenueSubType] (
    [cre_userid]        VARCHAR (50)   NULL,
    [cre_time]          DATETIME       NULL,
    [upd_userid]        VARCHAR (50)   NULL,
    [upd_time]          DATETIME       NULL,
    [venuesubtype_id]   VARCHAR (20)   NOT NULL,
    [venue_type]        VARCHAR (10)   NULL,
    [venuesubtype_name] NVARCHAR (50)  NULL,
    [remark]            NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([venuesubtype_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueSubType', @level2type = N'COLUMN', @level2name = N'remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域服務名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueSubType', @level2type = N'COLUMN', @level2name = N'venuesubtype_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域種類流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueSubType', @level2type = N'COLUMN', @level2name = N'venue_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域服務流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueSubType', @level2type = N'COLUMN', @level2name = N'venuesubtype_id';

