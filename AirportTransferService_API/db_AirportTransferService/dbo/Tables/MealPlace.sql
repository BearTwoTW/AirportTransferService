CREATE TABLE [dbo].[MealPlace] (
    [cre_userid]    VARCHAR (50)   NULL,
    [cre_time]      DATETIME       NULL,
    [upd_userid]    VARCHAR (50)   NULL,
    [upd_time]      DATETIME       NULL,
    [mp_id]         INT            IDENTITY (1, 1) NOT NULL,
    [mp_No]         VARCHAR (50)   NULL,
    [Name]          VARCHAR (50)   NULL,
    [mpg_id]        INT            NULL,
    [customer_id]   VARCHAR (50)   NULL,
    [user_id]       VARCHAR (50)   NULL,
    [Plant]         VARCHAR (10)   NULL,
    [om_id]         VARCHAR (50)   NULL,
    [Remark]        NVARCHAR (100) NULL,
    [mp_id_des]     VARCHAR (MAX)  NULL,
    [sit_in_time]   DATETIME       NULL,
    [sit_in_name]   NVARCHAR (255) NULL,
    [car_id]        NVARCHAR (100) NULL,
    [license_plate] NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([mp_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'car_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'入座名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'sit_in_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'入座時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'sit_in_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加密的座位ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'mp_id_des';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'Remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地圖ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'om_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點餐位置所屬樓層ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'mpg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點餐位置名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'Name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'前台產生流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'mp_No';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點位置ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'mp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點訂單', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlace';

