CREATE TABLE [dbo].[LeaveRemainAnnual] (
    [cre_userid]    VARCHAR (50)    NULL,
    [cre_time]      DATETIME        NULL,
    [upd_userid]    VARCHAR (50)    NULL,
    [upd_time]      DATETIME        NULL,
    [lra_id]        INT             IDENTITY (1, 1) NOT NULL,
    [user_id]       VARCHAR (50)    NULL,
    [year]          DECIMAL (20, 2) NULL,
    [day_get]       DECIMAL (20, 2) NULL,
    [day_remain]    DECIMAL (20, 2) NULL,
    [minute_get]    INT             NULL,
    [minute_remain] INT             NULL,
    CONSTRAINT [PK__LeaveRem__31FC33732F72EA8A] PRIMARY KEY CLUSTERED ([lra_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'剩餘的時數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnual', @level2type = N'COLUMN', @level2name = N'minute_remain';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'得到的時數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnual', @level2type = N'COLUMN', @level2name = N'minute_get';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'剩餘的日數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnual', @level2type = N'COLUMN', @level2name = N'day_remain';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'得到的日數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnual', @level2type = N'COLUMN', @level2name = N'day_get';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年度', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnual', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnual', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnual', @level2type = N'COLUMN', @level2name = N'lra_id';

