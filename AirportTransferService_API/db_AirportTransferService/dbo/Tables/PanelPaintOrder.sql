CREATE TABLE [dbo].[PanelPaintOrder] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [ppo_id]                VARCHAR (50)   NOT NULL,
    [wom_id]                VARCHAR (50)   NULL,
    [pppl_id]               INT            NULL,
    [ppsl_big]              VARCHAR (50)   NULL,
    [ppsl_mid]              VARCHAR (50)   NULL,
    [ppsl_small]            VARCHAR (50)   NULL,
    [predict_complete_time] DATETIME       NULL,
    [dispatch_time]         DATETIME       NULL,
    [dispatch_user_id]      VARCHAR (50)   NULL,
    [complete_time]         DATETIME       NULL,
    [complete_user_id]      VARCHAR (50)   NULL,
    [invalid_time]          DATETIME       NULL,
    [invalid_user_id]       VARCHAR (50)   NULL,
    [note]                  NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([ppo_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '按作廢的使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'invalid_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '作廢時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'invalid_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '按完工的使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'complete_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '完工時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'complete_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '按派工的使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'dispatch_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '派工時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'dispatch_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '預計完工時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'predict_complete_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '狀態小標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'ppsl_small';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '狀態中標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'ppsl_mid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '狀態大標籤流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'ppsl_big';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '金額等級流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'pppl_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工單主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'wom_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '鈑烤工單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintOrder', @level2type = N'COLUMN', @level2name = N'ppo_id';

