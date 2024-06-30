CREATE TABLE [dbo].[UserCustom] (
    [cre_userid]   VARCHAR (50)   NULL,
    [cre_time]     DATETIME       NULL,
    [upd_userid]   VARCHAR (50)   NULL,
    [upd_time]     DATETIME       NULL,
    [uc_id]        INT            IDENTITY (1, 1) NOT NULL,
    [user_id]      VARCHAR (50)   NULL,
    [ucm_id]       VARCHAR (50)   NULL,
    [ucd_contents] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([uc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'細項內容們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustom', @level2type = N'COLUMN', @level2name = N'ucd_contents';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustom', @level2type = N'COLUMN', @level2name = N'ucm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustom', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustom', @level2type = N'COLUMN', @level2name = N'uc_id';

