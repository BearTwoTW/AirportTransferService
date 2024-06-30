CREATE TABLE [dbo].[CarExterior] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [ce_id]          INT            IDENTITY (1, 1) NOT NULL,
    [exterior_code]  NVARCHAR (255) NULL,
    [exterior_color] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([ce_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝顏色名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarExterior', @level2type = N'COLUMN', @level2name = N'exterior_color';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝顏色代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarExterior', @level2type = N'COLUMN', @level2name = N'exterior_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarExterior', @level2type = N'COLUMN', @level2name = N'ce_id';

