CREATE TABLE [dbo].[MealOrder] (
    [cre_userid]    VARCHAR (50) NULL,
    [cre_time]      DATETIME     NULL,
    [upd_userid]    VARCHAR (50) NULL,
    [upd_time]      DATETIME     NULL,
    [mo_id]         VARCHAR (50) NOT NULL,
    [mp_id]         INT          NULL,
    [mp_No]         VARCHAR (50) NULL,
    [mpg_id]        INT          NULL,
    [Plant]         VARCHAR (10) NULL,
    [Status]        VARCHAR (1)  NULL,
    [Reading]       VARCHAR (1)  NULL,
    [customer_id]   VARCHAR (50) NULL,
    [user_id]       VARCHAR (50) NULL,
    [isExist]       VARCHAR (1)  NULL,
    [is_employee]   VARCHAR (1)  NULL,
    [license_plate] VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([mo_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否員工', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'is_employee';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否在場', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'isExist';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'員工流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否備餐', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'Reading';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否結單', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'Status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點餐位置所屬樓層ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'mpg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'前台產生座位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'mp_No';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'mo_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點訂單', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'座位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrder', @level2type = N'COLUMN', @level2name = N'mp_id';

