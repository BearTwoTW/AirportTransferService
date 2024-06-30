CREATE TABLE [dbo].[TelephoneInterviewCommentReply] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [ticr_id]        INT            IDENTITY (1, 1) NOT NULL,
    [mem_id]         VARCHAR (50)   NULL,
    [ti_id]          VARCHAR (50)   NULL,
    [comment]        NVARCHAR (255) NULL,
    [assign_user_id] VARCHAR (50)   NULL,
    [assign_time]    DATETIME       NULL,
    [reply]          NVARCHAR (255) NULL,
    [reply_time]     DATETIME       NULL,
    PRIMARY KEY CLUSTERED ([ticr_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '回覆時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterviewCommentReply', @level2type = N'COLUMN', @level2name = N'reply_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '回覆內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterviewCommentReply', @level2type = N'COLUMN', @level2name = N'reply';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '指派時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterviewCommentReply', @level2type = N'COLUMN', @level2name = N'assign_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '指派對象使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterviewCommentReply', @level2type = N'COLUMN', @level2name = N'assign_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '評論內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterviewCommentReply', @level2type = N'COLUMN', @level2name = N'comment';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterviewCommentReply', @level2type = N'COLUMN', @level2name = N'ti_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪系統對照excel流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterviewCommentReply', @level2type = N'COLUMN', @level2name = N'mem_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪項目評論&回覆流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TelephoneInterviewCommentReply', @level2type = N'COLUMN', @level2name = N'ticr_id';

