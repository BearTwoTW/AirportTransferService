CREATE TABLE [dbo].[BulletinTarget] (
    [cre_userid]  VARCHAR (50) NULL,
    [cre_time]    DATETIME     NULL,
    [bt_id]       INT          IDENTITY (1, 1) NOT NULL,
    [bulletin_id] VARCHAR (50) NULL,
    [user_id]     VARCHAR (50) NULL,
    [ul_id]       INT          NULL,
    PRIMARY KEY CLUSTERED ([bt_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '職務流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'BulletinTarget', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'BulletinTarget', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '布告欄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'BulletinTarget', @level2type = N'COLUMN', @level2name = N'bulletin_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '布告欄目標流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'BulletinTarget', @level2type = N'COLUMN', @level2name = N'bt_id';

