CREATE TABLE [dbo].[UserRollcallMaster] (
    [cre_userid]    VARCHAR (50) NULL,
    [cre_time]      DATETIME     NULL,
    [upd_userid]    VARCHAR (50) NULL,
    [upd_time]      DATETIME     NULL,
    [rollcall_id]   VARCHAR (50) NOT NULL,
    [position_id]   VARCHAR (50) NULL,
    [rollcall_time] DATETIME     NULL,
    [user_id]       VARCHAR (50) NULL,
    CONSTRAINT [PK_UserRollcallMaster] PRIMARY KEY CLUSTERED ([rollcall_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點名人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallMaster', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點名時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallMaster', @level2type = N'COLUMN', @level2name = N'rollcall_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallMaster', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點名編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallMaster', @level2type = N'COLUMN', @level2name = N'rollcall_id';

