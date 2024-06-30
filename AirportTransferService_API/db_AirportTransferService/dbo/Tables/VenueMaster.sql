CREATE TABLE [dbo].[VenueMaster] (
    [cre_userid]        VARCHAR (50)   NULL,
    [cre_time]          DATETIME       NULL,
    [upd_userid]        VARCHAR (50)   NULL,
    [upd_time]          DATETIME       NULL,
    [venuemaster_id]    VARCHAR (20)   NOT NULL,
    [venue_name]        NVARCHAR (255) NULL,
    [open_time_start]   TIME (0)       NULL,
    [open_time_end]     TIME (0)       NULL,
    [open_across_night] VARCHAR (1)    NULL,
    [visible]           VARCHAR (3)    NULL,
    [venue_type]        NVARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([venuemaster_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueMaster', @level2type = N'COLUMN', @level2name = N'venue_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueMaster', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'營業時間是否過夜', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueMaster', @level2type = N'COLUMN', @level2name = N'open_across_night';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'營業時間(迄)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueMaster', @level2type = N'COLUMN', @level2name = N'open_time_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'營業時間(起)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueMaster', @level2type = N'COLUMN', @level2name = N'open_time_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueMaster', @level2type = N'COLUMN', @level2name = N'venue_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'場域流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VenueMaster', @level2type = N'COLUMN', @level2name = N'venuemaster_id';

