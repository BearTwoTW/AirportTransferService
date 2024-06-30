CREATE TABLE [dbo].[SignOffNoticeSetting] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [upd_userid] VARCHAR (50) NULL,
    [upd_time]   DATETIME     NULL,
    [sons_id]    INT          IDENTITY (1, 1) NOT NULL,
    [sosm_id]    VARCHAR (50) NULL,
    [user_id]    VARCHAR (50) NULL,
    [ul_id]      INT          NULL,
    PRIMARY KEY CLUSTERED ([sons_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '職務流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffNoticeSetting', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffNoticeSetting', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffNoticeSetting', @level2type = N'COLUMN', @level2name = N'sosm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核通知設定流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffNoticeSetting', @level2type = N'COLUMN', @level2name = N'sons_id';

