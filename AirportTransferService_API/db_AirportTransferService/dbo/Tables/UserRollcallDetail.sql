CREATE TABLE [dbo].[UserRollcallDetail] (
    [cre_userid]          VARCHAR (50)  NULL,
    [cre_time]            DATETIME      NULL,
    [upd_userid]          VARCHAR (50)  NULL,
    [upd_time]            DATETIME      NULL,
    [rollcall_detail_id]  INT           IDENTITY (1, 1) NOT NULL,
    [rollcall_id]         VARCHAR (50)  NULL,
    [state]               VARCHAR (10)  NULL,
    [user_id]             VARCHAR (50)  NULL,
    [class_id]            NVARCHAR (10) NULL,
    [sc_id]               VARCHAR (10)  NULL,
    [last_clock_out_time] DATETIME      NULL,
    CONSTRAINT [PK_UserRollcallDetail] PRIMARY KEY CLUSTERED ([rollcall_detail_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最後打卡時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallDetail', @level2type = N'COLUMN', @level2name = N'last_clock_out_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'班別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallDetail', @level2type = N'COLUMN', @level2name = N'sc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'課級單位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallDetail', @level2type = N'COLUMN', @level2name = N'class_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'員工編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallDetail', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點名狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallDetail', @level2type = N'COLUMN', @level2name = N'state';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點名編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallDetail', @level2type = N'COLUMN', @level2name = N'rollcall_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點名細項編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserRollcallDetail', @level2type = N'COLUMN', @level2name = N'rollcall_detail_id';

