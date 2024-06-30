CREATE TABLE [dbo].[ScheduleClass] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [sc_id]                 VARCHAR (50)   NOT NULL,
    [sc_name]               VARCHAR (50)   NULL,
    [salary_type]           NVARCHAR (10)  NULL,
    [note]                  VARCHAR (255)  NULL,
    [visible]               VARCHAR (1)    NULL,
    [work_time_json]        NVARCHAR (MAX) NULL,
    [rest_time_json]        NVARCHAR (MAX) NULL,
    [basic_work_minutes]    INT            NULL,
    [work_minutes]          INT            NULL,
    [overtime_work_minutes] INT            NULL,
    [sc_code]               NVARCHAR (2)   NULL,
    [sc_type]               VARCHAR (50)   NULL,
    [sc_label]              VARCHAR (50)   NULL,
    CONSTRAINT [PK__Schedule__32C79455EAC84951] PRIMARY KEY CLUSTERED ([sc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表種類(正常工時班表、延長工時班表)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'sc_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'sc_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加班時數(分鐘)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'overtime_work_minutes';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工作時數(分鐘)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'work_minutes';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'基本工時(分鐘)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'basic_work_minutes';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'休息時段json', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'rest_time_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工作時段json', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'work_time_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'薪水種類(時薪、月薪)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'salary_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'sc_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班表流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ScheduleClass', @level2type = N'COLUMN', @level2name = N'sc_id';

