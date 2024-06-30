CREATE TABLE [dbo].[CommodityCustomAttriDetail] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [ccad_id]    VARCHAR (50)   NOT NULL,
    [ccam_id]    VARCHAR (50)   NULL,
    [ccad_name]  NVARCHAR (255) NULL,
    [color_code] NVARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([ccad_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'色碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetail', @level2type = N'COLUMN', @level2name = N'color_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'屬性細項名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetail', @level2type = N'COLUMN', @level2name = N'ccad_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetail', @level2type = N'COLUMN', @level2name = N'ccam_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCustomAttriDetail', @level2type = N'COLUMN', @level2name = N'ccad_id';

