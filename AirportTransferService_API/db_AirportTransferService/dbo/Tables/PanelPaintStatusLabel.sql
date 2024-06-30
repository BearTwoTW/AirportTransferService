CREATE TABLE [dbo].[PanelPaintStatusLabel] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [ppsl_id]    VARCHAR (50)   NOT NULL,
    [label_big]  VARCHAR (50)   NULL,
    [label_mid]  VARCHAR (50)   NULL,
    [content]    NVARCHAR (255) NULL,
    [visible]    VARCHAR (1)    NULL,
    [seq]        INT            NULL,
    PRIMARY KEY CLUSTERED ([ppsl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintStatusLabel', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintStatusLabel', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintStatusLabel', @level2type = N'COLUMN', @level2name = N'content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '第二層流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintStatusLabel', @level2type = N'COLUMN', @level2name = N'label_mid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '第一層流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintStatusLabel', @level2type = N'COLUMN', @level2name = N'label_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '狀態標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintStatusLabel', @level2type = N'COLUMN', @level2name = N'ppsl_id';

