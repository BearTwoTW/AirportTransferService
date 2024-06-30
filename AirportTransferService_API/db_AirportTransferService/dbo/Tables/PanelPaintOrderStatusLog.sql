CREATE TABLE [dbo].[PanelPaintOrderStatusLog] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [upd_userid] VARCHAR (50) NULL,
    [upd_time]   DATETIME     NULL,
    [pposl_id]   INT          IDENTITY (1, 1) NOT NULL,
    [ppo_id]     VARCHAR (50) NULL,
    [ppsl_big]   VARCHAR (50) NULL,
    [ppsl_mid]   VARCHAR (50) NULL,
    [ppsl_small] VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([pposl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '狀態小標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrderStatusLog', @level2type = N'COLUMN', @level2name = N'ppsl_small';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '狀態中標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrderStatusLog', @level2type = N'COLUMN', @level2name = N'ppsl_mid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '狀態大標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrderStatusLog', @level2type = N'COLUMN', @level2name = N'ppsl_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '鈑烤工單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrderStatusLog', @level2type = N'COLUMN', @level2name = N'ppo_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrderStatusLog', @level2type = N'COLUMN', @level2name = N'pposl_id';

