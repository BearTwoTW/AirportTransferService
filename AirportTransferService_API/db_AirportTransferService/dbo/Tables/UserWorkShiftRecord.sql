CREATE TABLE [dbo].[UserWorkShiftRecord] (
    [cre_userid]          VARCHAR (50)   NULL,
    [cre_time]            DATETIME       NULL,
    [upd_userid]          VARCHAR (50)   NULL,
    [upd_time]            DATETIME       NULL,
    [workshift_record_id] VARCHAR (50)   NOT NULL,
    [user_id]             VARCHAR (50)   NULL,
    [date1]               DATE           NULL,
    [date2]               DATE           NULL,
    [status]              VARCHAR (50)   NULL,
    [note]                NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([workshift_record_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkShiftRecord', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkShiftRecord', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkShiftRecord', @level2type = N'COLUMN', @level2name = N'date2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkShiftRecord', @level2type = N'COLUMN', @level2name = N'date1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkShiftRecord', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkShiftRecord', @level2type = N'COLUMN', @level2name = N'workshift_record_id';

