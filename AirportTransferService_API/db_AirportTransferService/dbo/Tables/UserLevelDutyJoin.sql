CREATE TABLE [dbo].[UserLevelDutyJoin] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [id]         INT          IDENTITY (1, 1) NOT NULL,
    [ul_id]      INT          NULL,
    [ud_id]      INT          NULL,
    CONSTRAINT [PK_UserLevelDutyJoin] PRIMARY KEY CLUSTERED ([id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Users的id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyJoin', @level2type = N'COLUMN', @level2name = N'ud_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'UserDuty的id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyJoin', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職務綁定職責', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyJoin';

