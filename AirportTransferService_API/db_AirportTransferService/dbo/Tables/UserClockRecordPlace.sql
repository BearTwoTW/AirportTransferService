CREATE TABLE [dbo].[UserClockRecordPlace] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [place_id]   INT            IDENTITY (1, 1) NOT NULL,
    [name]       VARCHAR (255)  NULL,
    [ips]        NVARCHAR (MAX) NULL,
    [distance]   FLOAT (53)     NULL,
    [longitude]  FLOAT (53)     NULL,
    [latitude]   FLOAT (53)     NULL,
    [visible]    VARCHAR (1)    NULL,
    CONSTRAINT [PK__UserCloc__BF2B684A84D3A3C8] PRIMARY KEY CLUSTERED ([place_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecordPlace', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'緯度', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecordPlace', @level2type = N'COLUMN', @level2name = N'latitude';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經度', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecordPlace', @level2type = N'COLUMN', @level2name = N'longitude';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'距離限制', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecordPlace', @level2type = N'COLUMN', @level2name = N'distance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'限定ip們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecordPlace', @level2type = N'COLUMN', @level2name = N'ips';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecordPlace', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecordPlace', @level2type = N'COLUMN', @level2name = N'place_id';

