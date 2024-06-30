CREATE TABLE [dbo].[UserWorkOvertimeRecord] (
    [cre_userid]             VARCHAR (50)   NULL,
    [cre_time]               DATETIME       NULL,
    [upd_userid]             VARCHAR (50)   NULL,
    [upd_time]               DATETIME       NULL,
    [workovertime_record_id] VARCHAR (50)   NOT NULL,
    [sc_id]                  VARCHAR (50)   NULL,
    [sc_name]                VARCHAR (50)   NULL,
    [sc_type]                VARCHAR (50)   NULL,
    [user_id]                VARCHAR (50)   NULL,
    [date]                   DATE           NULL,
    [work_time_json]         NVARCHAR (MAX) NULL,
    [rest_time_json]         NVARCHAR (MAX) NULL,
    [overtime_work_minutes]  INT            NULL,
    [status]                 VARCHAR (50)   NULL,
    [note]                   NVARCHAR (MAX) NULL,
    [source]                 VARCHAR (50)   NULL,
    CONSTRAINT [PK__UserWork__8AE50E1E20F60AF3] PRIMARY KEY CLUSTERED ([workovertime_record_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'來源(班表or申請)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'source';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加班時數(分鐘)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'overtime_work_minutes';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息時段json', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'rest_time_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工作時段json', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'work_time_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表種類(正常工時班表、延長工時班表)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'sc_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'sc_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'sc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加班紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserWorkOvertimeRecord', @level2type = N'COLUMN', @level2name = N'workovertime_record_id';

