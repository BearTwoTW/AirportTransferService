CREATE TABLE [dbo].[MealPlaceLog] (
    [cre_userid]      VARCHAR (50)   NULL,
    [cre_time]        DATETIME       NULL,
    [upd_userid]      VARCHAR (50)   NULL,
    [upd_time]        DATETIME       NULL,
    [mpl_id]          INT            IDENTITY (1, 1) NOT NULL,
    [Plant]           VARCHAR (10)   NULL,
    [mpg_id]          INT            NULL,
    [mp_id]           INT            NULL,
    [customer_id]     VARCHAR (50)   NULL,
    [sit_in_time]     DATETIME       NULL,
    [sit_in_name]     NVARCHAR (255) NULL,
    [leave_seat_time] DATETIME       NULL,
    [car_id]          NVARCHAR (100) NULL,
    [license_plate]   NVARCHAR (100) NULL,
    [user_id]         VARCHAR (50)   NULL,
    PRIMARY KEY CLUSTERED ([mpl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'car_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'離開座時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'leave_seat_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'入座名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'sit_in_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'入座時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'sit_in_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'樓層ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'mpg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'服務項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'mpl_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點餐地圖劃位紀錄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealPlaceLog';

