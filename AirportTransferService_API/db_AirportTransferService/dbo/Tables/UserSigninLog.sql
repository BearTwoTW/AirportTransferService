CREATE TABLE [dbo].[UserSigninLog] (
    [user_id]     VARCHAR (50) NOT NULL,
    [signin_time] DATETIME     NOT NULL,
    [web_code]    VARCHAR (14) NULL,
    [app_code]    VARCHAR (14) NULL,
    CONSTRAINT [PK_UsersLoginLog] PRIMARY KEY CLUSTERED ([user_id] ASC, [signin_time] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'應用程式代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSigninLog', @level2type = N'COLUMN', @level2name = N'app_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'網頁代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSigninLog', @level2type = N'COLUMN', @level2name = N'web_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'登入日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSigninLog', @level2type = N'COLUMN', @level2name = N'signin_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSigninLog', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號登入紀錄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSigninLog';

