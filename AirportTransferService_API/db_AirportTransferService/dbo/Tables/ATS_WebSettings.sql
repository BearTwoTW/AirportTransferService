CREATE TABLE [dbo].[ATS_WebSettings] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [ws_id]      VARCHAR (10)   NULL,
    [title]      NVARCHAR (255) NULL,
    [image]      NVARCHAR (255) NULL,
    [text1]      NVARCHAR (MAX) NULL,
    [text2]      NVARCHAR (MAX) NULL,
    [text3]      NVARCHAR (MAX) NULL,
    [html1]      NVARCHAR (MAX) NULL,
    [html2]      NVARCHAR (MAX) NULL,
    [html3]      NVARCHAR (MAX) NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'html3', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'html3';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'html2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'html2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'html1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'html1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'文字3', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'text3';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'文字2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'text2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'文字1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'text1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'圖片連結', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'image';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'標題', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'title';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'ws_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_WebSettings', @level2type = N'COLUMN', @level2name = N'cre_userid';

