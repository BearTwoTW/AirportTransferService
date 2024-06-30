CREATE TABLE [dbo].[LeaveRuleAnnual] (
    [cre_userid]           VARCHAR (50)   NULL,
    [cre_time]             DATETIME       NULL,
    [upd_userid]           VARCHAR (50)   NULL,
    [upd_time]             DATETIME       NULL,
    [leave_rule_annual_id] INT            IDENTITY (1, 1) NOT NULL,
    [date_start]           DATE           NULL,
    [date_end]             DATE           NULL,
    [year]                 DECIMAL (5, 2) NULL,
    [basic_day]            DECIMAL (5, 2) NULL,
    PRIMARY KEY CLUSTERED ([leave_rule_annual_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'基礎天數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleAnnual', @level2type = N'COLUMN', @level2name = N'basic_day';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年分', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleAnnual', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleAnnual', @level2type = N'COLUMN', @level2name = N'date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleAnnual', @level2type = N'COLUMN', @level2name = N'date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleAnnual', @level2type = N'COLUMN', @level2name = N'leave_rule_annual_id';

