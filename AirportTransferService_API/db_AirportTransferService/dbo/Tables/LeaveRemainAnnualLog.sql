CREATE TABLE [dbo].[LeaveRemainAnnualLog] (
    [cre_userid]        VARCHAR (50)    NULL,
    [cre_time]          DATETIME        NULL,
    [id]                INT             IDENTITY (1, 1) NOT NULL,
    [lra_id]            INT             NULL,
    [user_id]           VARCHAR (50)    NULL,
    [year]              DECIMAL (20, 2) NULL,
    [day_get]           DECIMAL (20, 2) NULL,
    [day_remain]        DECIMAL (20, 2) NULL,
    [minute_get]        INT             NULL,
    [minute_remain]     INT             NULL,
    [day_get_new]       DECIMAL (20, 2) NULL,
    [day_remain_new]    DECIMAL (20, 2) NULL,
    [minute_get_new]    INT             NULL,
    [minute_remain_new] INT             NULL,
    [reason]            NVARCHAR (255)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'異動原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnualLog', @level2type = N'COLUMN', @level2name = N'reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改後剩餘分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnualLog', @level2type = N'COLUMN', @level2name = N'minute_remain_new';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改後得到分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnualLog', @level2type = N'COLUMN', @level2name = N'minute_get_new';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改後剩餘天數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnualLog', @level2type = N'COLUMN', @level2name = N'day_remain_new';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改後得到天數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnualLog', @level2type = N'COLUMN', @level2name = N'day_get_new';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'原剩餘分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnualLog', @level2type = N'COLUMN', @level2name = N'minute_remain';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'原得到分鐘數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnualLog', @level2type = N'COLUMN', @level2name = N'minute_get';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'原剩餘天數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnualLog', @level2type = N'COLUMN', @level2name = N'day_remain';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'原得到天數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LeaveRemainAnnualLog', @level2type = N'COLUMN', @level2name = N'day_get';

