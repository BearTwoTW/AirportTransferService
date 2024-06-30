CREATE TABLE [dbo].[OSS_TermSetting] (
    [cre_userid]      VARCHAR (50)   NULL,
    [cre_time]        DATETIME       NULL,
    [upd_userid]      VARCHAR (50)   NULL,
    [upd_time]        DATETIME       NULL,
    [id]              INT            IDENTITY (1, 1) NOT NULL,
    [privacy_policy]  NVARCHAR (MAX) NULL,
    [service_policy]  NVARCHAR (MAX) NULL,
    [purchase_notice] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_OSS_TermSetting] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'購物須知', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_TermSetting', @level2type = N'COLUMN', @level2name = N'purchase_notice';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'服務條款', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_TermSetting', @level2type = N'COLUMN', @level2name = N'service_policy';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'隱私條款', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_TermSetting', @level2type = N'COLUMN', @level2name = N'privacy_policy';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'網站條款設定', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_TermSetting';

