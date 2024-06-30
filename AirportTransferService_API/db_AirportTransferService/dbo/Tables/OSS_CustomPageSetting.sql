CREATE TABLE [dbo].[OSS_CustomPageSetting] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [id]         INT            IDENTITY (1, 1) NOT NULL,
    [name]       NVARCHAR (255) NULL,
    [content]    NVARCHAR (MAX) NULL,
    [visible]    VARCHAR (1)    NULL,
    [seq]        INT            NULL,
    CONSTRAINT [PK_OSS_CustomPageSetting] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_CustomPageSetting', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_CustomPageSetting', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'頁面內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_CustomPageSetting', @level2type = N'COLUMN', @level2name = N'content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'頁面名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_CustomPageSetting', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'網站自訂頁面設定', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_CustomPageSetting';

