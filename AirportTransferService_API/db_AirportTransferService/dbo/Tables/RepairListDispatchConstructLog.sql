CREATE TABLE [dbo].[RepairListDispatchConstructLog] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [upd_userid] VARCHAR (50) NULL,
    [upd_time]   DATETIME     NULL,
    [rldcl_id]   INT          IDENTITY (1, 1) NOT NULL,
    [group_key]  VARCHAR (50) NULL,
    [rld_id]     VARCHAR (50) NULL,
    [time_start] DATETIME     NULL,
    [time_end]   DATETIME     NULL,
    PRIMARY KEY CLUSTERED ([rldcl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '結束時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDispatchConstructLog', @level2type = N'COLUMN', @level2name = N'time_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '開始時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDispatchConstructLog', @level2type = N'COLUMN', @level2name = N'time_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '維修清單細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDispatchConstructLog', @level2type = N'COLUMN', @level2name = N'rld_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '判別同時開工的欄位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDispatchConstructLog', @level2type = N'COLUMN', @level2name = N'group_key';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RepairListDispatchConstructLog', @level2type = N'COLUMN', @level2name = N'rldcl_id';

