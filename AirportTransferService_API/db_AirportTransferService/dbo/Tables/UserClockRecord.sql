CREATE TABLE [dbo].[UserClockRecord] (
    [cre_userid]     VARCHAR (50)  NULL,
    [cre_time]       DATETIME      NULL,
    [upd_userid]     VARCHAR (50)  NULL,
    [upd_time]       DATETIME      NULL,
    [record_id]      INT           IDENTITY (1, 1) NOT NULL,
    [place_id]       INT           NULL,
    [date]           DATE          NULL,
    [time]           DATETIME      NULL,
    [user_id]        VARCHAR (50)  NULL,
    [ip]             NVARCHAR (50) NULL,
    [distance]       FLOAT (53)    NULL,
    [type]           VARCHAR (50)  NULL,
    [longitude]      FLOAT (53)    NULL,
    [latitude]       FLOAT (53)    NULL,
    [isvalid]        VARCHAR (1)   NULL,
    [invalid_reason] VARCHAR (255) NULL,
    [status]         VARCHAR (50)  NULL,
    [is_makeup]      VARCHAR (1)   NULL,
    [makeup_reason]  VARCHAR (50)  NULL,
    [note]           VARCHAR (255) NULL,
    CONSTRAINT [PK__UserCloc__BFCFB4DD98CAEACE] PRIMARY KEY CLUSTERED ([record_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'補打卡原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'makeup_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否補打卡', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'is_makeup';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'打卡狀態(正常、遲到、早退)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'無效原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'invalid_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否有效', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'isvalid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'緯度', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'latitude';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經度', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'longitude';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'種類(上班、下班)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'距離', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'distance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'ip', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'ip';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'打卡地點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'place_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserClockRecord', @level2type = N'COLUMN', @level2name = N'record_id';

