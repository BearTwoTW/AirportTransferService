CREATE TABLE [dbo].[ScheduleXEmployee] (
    [cre_userid]                   VARCHAR (50)   NULL,
    [cre_time]                     DATETIME       NULL,
    [upd_userid]                   VARCHAR (50)   NULL,
    [upd_time]                     DATETIME       NULL,
    [sXe_id]                       INT            IDENTITY (1, 1) NOT NULL,
    [sc_id]                        VARCHAR (50)   NULL,
    [sc_name]                      VARCHAR (50)   NULL,
    [user_id]                      VARCHAR (50)   NULL,
    [date]                         DATE           NULL,
    [work_time_json]               NVARCHAR (MAX) NULL,
    [rest_time_json]               NVARCHAR (MAX) NULL,
    [work_minutes]                 INT            NULL,
    [overtime_work_minutes]        INT            NULL,
    [leave_minutes]                INT            NULL,
    [vacation_type]                VARCHAR (50)   NULL,
    [overtime_work_minutes_origin] INT            NULL,
    CONSTRAINT [PK__Schedule__E2A6BDC17155FF05] PRIMARY KEY CLUSTERED ([sXe_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新前的加班分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'overtime_work_minutes_origin';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'假日種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'vacation_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'leave_minutes';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加班分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'overtime_work_minutes';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工作時數(分鐘)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'work_minutes';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息時段json', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'rest_time_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工作時段json', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'work_time_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'員工流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'sc_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleXEmployee', @level2type = N'COLUMN', @level2name = N'sc_id';

