CREATE TABLE [dbo].[UserDutyPermissionJoin] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [id]         INT          IDENTITY (1, 1) NOT NULL,
    [pg_id]      INT          NULL,
    [page_id]    INT          NULL,
    [pc_id]      INT          NULL,
    [ud_id]      INT          NULL,
    CONSTRAINT [PK_UserDutyPermission] PRIMARY KEY CLUSTERED ([id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'UserDuty的id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDutyPermissionJoin', @level2type = N'COLUMN', @level2name = N'ud_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'PageControl的id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDutyPermissionJoin', @level2type = N'COLUMN', @level2name = N'pc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Pages的id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDutyPermissionJoin', @level2type = N'COLUMN', @level2name = N'page_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'PageGroup的id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDutyPermissionJoin', @level2type = N'COLUMN', @level2name = N'pg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職責綁定功能權限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDutyPermissionJoin';

