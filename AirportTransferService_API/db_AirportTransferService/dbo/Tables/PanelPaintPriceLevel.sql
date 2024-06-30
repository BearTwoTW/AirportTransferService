CREATE TABLE [dbo].[PanelPaintPriceLevel] (
    [cre_userid]   VARCHAR (50)    NULL,
    [cre_time]     DATETIME        NULL,
    [upd_userid]   VARCHAR (50)    NULL,
    [upd_time]     DATETIME        NULL,
    [pppl_id]      INT             IDENTITY (1, 1) NOT NULL,
    [price_start]  DECIMAL (20, 2) NULL,
    [price_end]    DECIMAL (20, 2) NULL,
    [severe_level] INT             NULL,
    [visible]      VARCHAR (1)     NULL,
    PRIMARY KEY CLUSTERED ([pppl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintPriceLevel', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '重大維修等級', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintPriceLevel', @level2type = N'COLUMN', @level2name = N'severe_level';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '金額迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintPriceLevel', @level2type = N'COLUMN', @level2name = N'price_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '金額起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintPriceLevel', @level2type = N'COLUMN', @level2name = N'price_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PanelPaintPriceLevel', @level2type = N'COLUMN', @level2name = N'pppl_id';

