CREATE TABLE [dbo].[PermissionFunctionUserDutyJoin] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [upd_userid] VARCHAR (50) NULL,
    [upd_time]   DATETIME     NULL,
    [pfl_id]     INT          NOT NULL,
    [ud_id]      INT          NOT NULL,
    CONSTRAINT [PK_PermissionFunctionUserDutyJoin] PRIMARY KEY CLUSTERED ([pfl_id] ASC, [ud_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職責流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PermissionFunctionUserDutyJoin', @level2type = N'COLUMN', @level2name = N'ud_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'權限功能流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PermissionFunctionUserDutyJoin', @level2type = N'COLUMN', @level2name = N'pfl_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'系統特殊功能綁定職責', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PermissionFunctionUserDutyJoin';

