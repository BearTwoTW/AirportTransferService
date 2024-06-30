CREATE TABLE [dbo].[PanelPaintWorkstation] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [ppw_id]     VARCHAR (50)   NOT NULL,
    [ppw_name]   NVARCHAR (255) NULL,
    [note]       NVARCHAR (255) NULL,
    [visible]    VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([ppw_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintWorkstation', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintWorkstation', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工作站名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintWorkstation', @level2type = N'COLUMN', @level2name = N'ppw_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工作站流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintWorkstation', @level2type = N'COLUMN', @level2name = N'ppw_id';

