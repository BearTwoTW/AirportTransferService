CREATE TABLE [dbo].[PermissionFunctionList] (
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  NULL,
    [upd_time]   DATETIME      NULL,
    [pfl_id]     INT           IDENTITY (1, 1) NOT NULL,
    [type]       VARCHAR (255) NULL,
    [name]       VARCHAR (255) NULL,
    [api_name]   VARCHAR (255) NULL,
    [join_limit] INT           NULL,
    CONSTRAINT [PK__Permissi__D9F8EC30C9563D21] PRIMARY KEY CLUSTERED ([pfl_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'綁定數量限制0就是不限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PermissionFunctionList', @level2type = N'COLUMN', @level2name = N'join_limit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'api名稱(系統用不給看不給改)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PermissionFunctionList', @level2type = N'COLUMN', @level2name = N'api_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'顯示名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PermissionFunctionList', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'分類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PermissionFunctionList', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PermissionFunctionList', @level2type = N'COLUMN', @level2name = N'pfl_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'系統特殊功能', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PermissionFunctionList';

