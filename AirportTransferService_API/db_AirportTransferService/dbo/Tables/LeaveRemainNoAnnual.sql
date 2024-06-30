CREATE TABLE [dbo].[LeaveRemainNoAnnual] (
    [cre_userid]              VARCHAR (50) NULL,
    [cre_time]                DATETIME     NULL,
    [upd_userid]              VARCHAR (50) NULL,
    [upd_time]                DATETIME     NULL,
    [lrna_id]                 INT          IDENTITY (1, 1) NOT NULL,
    [user_id]                 VARCHAR (50) NULL,
    [year]                    INT          NULL,
    [leave_rule_no_annual_id] INT          NULL,
    [leave_type]              VARCHAR (50) NULL,
    [day_get]                 INT          NULL,
    [day_remain]              INT          NULL,
    [minute_get]              INT          NULL,
    [minute_remain]           INT          NULL,
    [key_date]                DATE         NULL,
    [date_start]              DATE         NULL,
    [date_end]                DATE         NULL,
    [divisible]               VARCHAR (1)  NULL,
    CONSTRAINT [PK__LeaveRem__472446136D4AEDC1] PRIMARY KEY CLUSTERED ([lrna_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可分次請休', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'divisible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效日期迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效日期起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'關鍵日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'key_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'剩餘的分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'minute_remain';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'得到的分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'minute_get';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'剩餘的日數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'day_remain';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'得到的日數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'day_get';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'leave_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'假別流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'leave_rule_no_annual_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年分', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainNoAnnual', @level2type = N'COLUMN', @level2name = N'lrna_id';

