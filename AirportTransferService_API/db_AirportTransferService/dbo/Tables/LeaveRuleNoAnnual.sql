CREATE TABLE [dbo].[LeaveRuleNoAnnual] (
    [cre_userid]                VARCHAR (50)    NULL,
    [cre_time]                  DATETIME        NULL,
    [upd_userid]                VARCHAR (50)    NULL,
    [upd_time]                  DATETIME        NULL,
    [leave_rule_no_annual_id]   INT             IDENTITY (1, 1) NOT NULL,
    [leave_rule_no_annual_code] VARCHAR (50)    NULL,
    [leave_rule_no_annual_name] VARCHAR (255)   NULL,
    [min_unit_type]             VARCHAR (50)    NULL,
    [min_unit_num]              DECIMAL (20, 2) NULL,
    [basic_day]                 INT             NULL,
    [few_days_before]           INT             NULL,
    [few_days_after]            INT             NULL,
    [divisible]                 VARCHAR (1)     NULL,
    [need_document]             VARCHAR (1)     NULL,
    [visible]                   VARCHAR (1)     NULL,
    [deadline_note]             NVARCHAR (MAX)  NULL,
    [document_note]             NVARCHAR (MAX)  NULL,
    [leave_type]                VARCHAR (50)    NULL,
    [gender]                    VARCHAR (10)    NULL,
    CONSTRAINT [PK__LeaveRul__4724461346446F6A] PRIMARY KEY CLUSTERED ([leave_rule_no_annual_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'適用性別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'gender';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'假別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'leave_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'佐證資料說明', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'document_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用期限說明', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'deadline_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否需要文件', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'need_document';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可分次請休', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'divisible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'後幾天', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'few_days_after';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'前幾天', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'few_days_before';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'基礎天數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'basic_day';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最小數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'min_unit_num';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最小單位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'min_unit_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'假別名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'leave_rule_no_annual_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'假別代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'leave_rule_no_annual_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'假別流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRuleNoAnnual', @level2type = N'COLUMN', @level2name = N'leave_rule_no_annual_id';

