CREATE TABLE [dbo].[WorkHoursRuleDetailP] (
    [cre_userid]              VARCHAR (50)   NULL,
    [cre_time]                DATETIME       NULL,
    [upd_userid]              VARCHAR (50)   NULL,
    [upd_time]                DATETIME       NULL,
    [whrdp_id]                INT            IDENTITY (1, 1) NOT NULL,
    [whrm_id]                 VARCHAR (50)   NULL,
    [whrdp_name]              VARCHAR (255)  NULL,
    [every_few_days]          INT            NULL,
    [work_hours_max]          DECIMAL (5, 2) NULL,
    [overtime_work_hours_max] DECIMAL (5, 2) NULL,
    [vacation_min]            INT            NULL,
    [note]                    VARCHAR (255)  NULL,
    [visible]                 VARCHAR (1)    NULL,
    [check_type]              VARCHAR (50)   NULL,
    CONSTRAINT [PK__WorkHour__5ADBA809D2D630C6] PRIMARY KEY CLUSTERED ([whrdp_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檢查類型(提醒、禁止)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'check_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最少假日日數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'vacation_min';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最多加班時數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'overtime_work_hours_max';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最多工時時數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'work_hours_max';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'每幾天', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'every_few_days';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'規則名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'whrdp_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工時規則主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'whrm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工時規則細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailP', @level2type = N'COLUMN', @level2name = N'whrdp_id';

