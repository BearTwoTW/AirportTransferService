CREATE TABLE [dbo].[UserSalaryLog] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [usl_id]     INT            IDENTITY (1, 1) NOT NULL,
    [user_id]    VARCHAR (50)   NULL,
    [date]       DATE           NULL,
    [ussd_id]    VARCHAR (50)   NULL,
    [content]    NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([usl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalaryLog', @level2type = N'COLUMN', @level2name = N'content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者薪資設定細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalaryLog', @level2type = N'COLUMN', @level2name = N'ussd_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '年月日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalaryLog', @level2type = N'COLUMN', @level2name = N'date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalaryLog', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalaryLog', @level2type = N'COLUMN', @level2name = N'usl_id';

