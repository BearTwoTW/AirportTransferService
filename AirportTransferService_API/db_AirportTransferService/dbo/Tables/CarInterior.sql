CREATE TABLE [dbo].[CarInterior] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [ci_id]          INT            IDENTITY (1, 1) NOT NULL,
    [interior_code]  NVARCHAR (255) NULL,
    [interior_color] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([ci_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝顏色名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarInterior', @level2type = N'COLUMN', @level2name = N'interior_color';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝顏色代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarInterior', @level2type = N'COLUMN', @level2name = N'interior_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarInterior', @level2type = N'COLUMN', @level2name = N'ci_id';

