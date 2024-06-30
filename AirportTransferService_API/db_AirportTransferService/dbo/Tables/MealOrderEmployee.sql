CREATE TABLE [dbo].[MealOrderEmployee] (
    [Cre_Userid] VARCHAR (50) NULL,
    [Cre_Time]   DATETIME     NULL,
    [Upd_Userid] VARCHAR (50) NULL,
    [Upd_Time]   DATETIME     NULL,
    [moe_id]     VARCHAR (50) NOT NULL,
    [mp_No]      VARCHAR (10) NULL,
    [mpg_id]     INT          NULL,
    [Plant]      VARCHAR (10) NULL,
    [Status]     VARCHAR (1)  NULL,
    [Reading]    VARCHAR (1)  NULL,
    [user_id]    VARCHAR (10) NULL,
    [isExist]    VARCHAR (1)  NULL,
    PRIMARY KEY CLUSTERED ([moe_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否在場', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'isExist';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'員工帳號ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否備餐', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'Reading';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否結單', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'Status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點餐位置所屬樓層ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'mpg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'前台產生座位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'mp_No';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'員工餐點訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'moe_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'Upd_Time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'Upd_Userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'Cre_Time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee', @level2type = N'COLUMN', @level2name = N'Cre_Userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'員工餐點訂單', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderEmployee';

