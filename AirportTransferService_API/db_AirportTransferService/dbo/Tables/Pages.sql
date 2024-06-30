CREATE TABLE [dbo].[Pages] (
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  NULL,
    [upd_time]   DATETIME      NULL,
    [page_id]    INT NOT NULL,
    [pg_id]      INT           NOT NULL,
    [su]         VARCHAR (1)   NULL,
    [seq]        INT           NULL,
    [code]       VARCHAR (20)  NOT NULL,
    [icon]       VARCHAR (20)  NULL,
    [name]       NVARCHAR (50) NULL,
    CONSTRAINT [PK_Pages_1] PRIMARY KEY CLUSTERED ([page_id] ASC, [pg_id] ASC, [code] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Icon', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'icon';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'序號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否系統使用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'su';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'頁面群組編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'pg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'頁面編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'page_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'頁面', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Pages';

