CREATE TABLE [dbo].[WorkHoursRuleDetailG] (
    [cre_userid]        VARCHAR (50)  NULL,
    [cre_time]          DATETIME      NULL,
    [upd_userid]        VARCHAR (50)  NULL,
    [upd_time]          DATETIME      NULL,
    [whrdg_id]          INT           IDENTITY (1, 1) NOT NULL,
    [whrm_id]           VARCHAR (50)  NULL,
    [whrdg_name]        VARCHAR (255) NULL,
    [every_few_days]    INT           NULL,
    [ud_id_list]        VARCHAR (MAX) NULL,
    [sc_id_min_json]    VARCHAR (MAX) NULL,
    [ud_id_except_list] VARCHAR (MAX) NULL,
    [note]              VARCHAR (255) NULL,
    [visible]           VARCHAR (1)   NULL,
    [check_type]        VARCHAR (50)  NULL,
    CONSTRAINT [PK__WorkHour__D2AB091BC66B17DC] PRIMARY KEY CLUSTERED ([whrdg_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檢查種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'check_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'某些職責們不計', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'ud_id_except_list';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最少要幾個某班表', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'sc_id_min_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'某些職責們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'ud_id_list';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'每幾天', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'every_few_days';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'規則名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'whrdg_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工時規則主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'whrm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工時規則細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleDetailG', @level2type = N'COLUMN', @level2name = N'whrdg_id';

