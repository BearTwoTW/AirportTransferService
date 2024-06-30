﻿CREATE TABLE [dbo].[MeetingRoomBooking] (
    [cre_userid] VARCHAR (50)   NOT NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NOT NULL,
    [upd_time]   DATETIME       NULL,
    [mrb_id]     INT            IDENTITY (1, 1) NOT NULL,
    [related_id] VARCHAR (50)   NOT NULL,
    [mr_id]      VARCHAR (50)   NOT NULL,
    [user_id]    VARCHAR (50)   NOT NULL,
    [book_date]  DATE           NULL,
    [book_time]  TIME (0)       NULL,
    [subject]    VARCHAR (100)  NOT NULL,
    [name]       NVARCHAR (50)  NOT NULL,
    [gender]     VARCHAR (50)   NOT NULL,
    [remark]     NVARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_MeetingRoomBooking] PRIMARY KEY CLUSTERED ([mrb_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'性別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'gender';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會議主題', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'subject';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'book_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'book_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會議室編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'mr_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'關聯編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'related_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'mrb_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會議室預約', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MeetingRoomBooking';

