CREATE TABLE [dbo].[Bulletin] (
    [cre_userid]    VARCHAR (50)   NULL,
    [cre_time]      DATETIME       NULL,
    [upd_userid]    VARCHAR (50)   NULL,
    [upd_time]      DATETIME       NULL,
    [bulletin_id]   VARCHAR (50)   NOT NULL,
    [subject]       NVARCHAR (255) NULL,
    [content]       NVARCHAR (MAX) NULL,
    [valid_date]    DATE           NULL,
    [invalid_date]  DATE           NULL,
    [is_top]        VARCHAR (1)    NULL,
    [visible]       VARCHAR (1)    NULL,
    [is_login_read] VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([bulletin_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否需登入已讀', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Bulletin', @level2type = N'COLUMN', @level2name = N'is_login_read';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Bulletin', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否置頂', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Bulletin', @level2type = N'COLUMN', @level2name = N'is_top';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'失效日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Bulletin', @level2type = N'COLUMN', @level2name = N'invalid_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Bulletin', @level2type = N'COLUMN', @level2name = N'valid_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Bulletin', @level2type = N'COLUMN', @level2name = N'content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主題', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Bulletin', @level2type = N'COLUMN', @level2name = N'subject';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公告欄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Bulletin', @level2type = N'COLUMN', @level2name = N'bulletin_id';

