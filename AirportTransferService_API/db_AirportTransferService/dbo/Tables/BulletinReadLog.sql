CREATE TABLE [dbo].[BulletinReadLog] (
    [cre_userid]  VARCHAR (50) NULL,
    [cre_time]    DATETIME     NULL,
    [brl_id]      INT          IDENTITY (1, 1) NOT NULL,
    [bulletin_id] VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([brl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '布告欄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'BulletinReadLog', @level2type = N'COLUMN', @level2name = N'bulletin_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '布告欄已讀紀錄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'BulletinReadLog', @level2type = N'COLUMN', @level2name = N'brl_id';

