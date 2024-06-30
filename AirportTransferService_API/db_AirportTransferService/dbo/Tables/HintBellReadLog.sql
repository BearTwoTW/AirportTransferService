CREATE TABLE [dbo].[HintBellReadLog] (
    [cre_userid]     VARCHAR (50) NULL,
    [cre_time]       DATETIME     NULL,
    [upd_userid]     VARCHAR (50) NULL,
    [upd_time]       DATETIME     NULL,
    [hbrl_id]        INT          IDENTITY (1, 1) NOT NULL,
    [hb_id]          VARCHAR (50) NULL,
    [user_id]        VARCHAR (50) NULL,
    [is_read]        VARCHAR (1)  NULL,
    [is_notice_only] VARCHAR (1)  NULL,
    PRIMARY KEY CLUSTERED ([hbrl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否僅通知', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBellReadLog', @level2type = N'COLUMN', @level2name = N'is_notice_only';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否已讀', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBellReadLog', @level2type = N'COLUMN', @level2name = N'is_read';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBellReadLog', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'提示鈴鐺紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBellReadLog', @level2type = N'COLUMN', @level2name = N'hb_id';

