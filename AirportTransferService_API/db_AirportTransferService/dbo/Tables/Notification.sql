CREATE TABLE [dbo].[Notification] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [id]         INT            IDENTITY (1, 1) NOT NULL,
    [type]       VARCHAR (255)  NULL,
    [content]    NVARCHAR (255) NULL,
    [isread]     VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否已讀', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Notification', @level2type = N'COLUMN', @level2name = N'isread';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Notification', @level2type = N'COLUMN', @level2name = N'content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Notification', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Notification', @level2type = N'COLUMN', @level2name = N'id';

