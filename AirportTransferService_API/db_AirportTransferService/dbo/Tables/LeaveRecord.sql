CREATE TABLE [dbo].[LeaveRecord] (
    [cre_userid]                  VARCHAR (50)    NULL,
    [cre_time]                    DATETIME        NULL,
    [upd_userid]                  VARCHAR (50)    NULL,
    [upd_time]                    DATETIME        NULL,
    [leave_record_id]             VARCHAR (50)    NOT NULL,
    [user_id]                     VARCHAR (50)    NULL,
    [leave_rule_no_annual_id]     INT             NULL,
    [leave_type]                  VARCHAR (50)    NULL,
    [leave_date_start]            DATE            NULL,
    [leave_date_end]              DATE            NULL,
    [leave_time_start]            DATETIME        NULL,
    [leave_time_end]              DATETIME        NULL,
    [leave_minute_start]          INT             NULL,
    [leave_minute_end]            INT             NULL,
    [is_full_day_start]           VARCHAR (1)     NULL,
    [is_full_day_end]             VARCHAR (1)     NULL,
    [key_date]                    DATE            NULL,
    [day_this_year]               DECIMAL (20, 2) NULL,
    [day_next_year]               DECIMAL (20, 2) NULL,
    [minute_this_year]            INT             NULL,
    [minute_next_year]            INT             NULL,
    [year_this]                   DECIMAL (20, 2) NULL,
    [year_next]                   DECIMAL (20, 2) NULL,
    [status]                      VARCHAR (50)    NULL,
    [note]                        NVARCHAR (MAX)  NULL,
    [used_compensatory_json]      NVARCHAR (MAX)  NULL,
    [overtime_work_minutes_start] INT             NULL,
    [overtime_work_minutes_end]   INT             NULL,
    [proxy_user_id]               VARCHAR (50)    NULL,
    [day_touch]                   INT             NULL,
    CONSTRAINT [PK__LeaveRec__08AA6A3DE5FE60F0] PRIMARY KEY CLUSTERED ([leave_record_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假碰到的工作天數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'day_touch';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'代理人編號(使用者)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'proxy_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假日期迄抵掉的加班分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'overtime_work_minutes_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假日期起抵掉的加班分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'overtime_work_minutes_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用的補休紀錄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'used_compensatory_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'隔年年度(特休0.5跟一般週年2020不一樣)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'year_next';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'當年年度(特休0.5跟一般週年2020不一樣)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'year_this';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'隔年度分鐘數(特休0.5跟一般週年2020不一樣)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'minute_next_year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'當年度分鐘數(特休0.5跟一般週年2020不一樣)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'minute_this_year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'隔年度天數(特休0.5跟一般週年2020不一樣)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'day_next_year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'當年度天數(特休0.5跟一般週年2020不一樣)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'day_this_year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'關鍵日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'key_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期迄是否整天', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'is_full_day_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期起是否整天', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'is_full_day_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假日期迄請的分鐘數(請非整天才會用到的欄位)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'leave_minute_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假日期起請的分鐘數(請非整天才會用到的欄位)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'leave_minute_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假時間迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'leave_time_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假時間起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'leave_time_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假日期迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'leave_date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假日期起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'leave_date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假假別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'leave_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'假別流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'leave_rule_no_annual_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'假單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRecord', @level2type = N'COLUMN', @level2name = N'leave_record_id';

