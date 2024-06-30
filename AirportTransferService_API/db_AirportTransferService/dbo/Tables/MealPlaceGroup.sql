CREATE TABLE [dbo].[MealPlaceGroup] (
    [cre_userid]      VARCHAR (50)   NULL,
    [cre_time]        DATETIME       NULL,
    [upd_userid]      VARCHAR (50)   NULL,
    [upd_time]        DATETIME       NULL,
    [mpg_id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]            VARCHAR (50)   NULL,
    [Plant]           VARCHAR (10)   NULL,
    [Remark]          NVARCHAR (100) NULL,
    [epson_print_set] VARCHAR (MAX)  NULL,
    PRIMARY KEY CLUSTERED ([mpg_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'熱感列印機的設定', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup', @level2type = N'COLUMN', @level2name = N'epson_print_set';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup', @level2type = N'COLUMN', @level2name = N'Remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點餐位置所屬樓層名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup', @level2type = N'COLUMN', @level2name = N'Name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點餐位置所屬樓層ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup', @level2type = N'COLUMN', @level2name = N'mpg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點訂單', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceGroup';

