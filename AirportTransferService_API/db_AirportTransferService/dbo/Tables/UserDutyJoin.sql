CREATE TABLE [dbo].[UserDutyJoin] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [id]         INT          IDENTITY (1, 1) NOT NULL,
    [user_id]    VARCHAR (50) NULL,
    [ud_id]      INT          NULL,
    [isneed]     VARCHAR (1)  NULL,
    CONSTRAINT [PK_UserDutyJoin] PRIMARY KEY CLUSTERED ([id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職責編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDutyJoin', @level2type = N'COLUMN', @level2name = N'ud_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDutyJoin', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職責綁定帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDutyJoin';

