CREATE TABLE [dbo].[MealServiceBellCheckCarCondition_log] (
    [cre_userid]    VARCHAR (50) NULL,
    [cre_time]      DATETIME     NULL,
    [upd_userid]    VARCHAR (50) NULL,
    [upd_time]      DATETIME     NULL,
    [ccc_id]        INT          IDENTITY (1, 1) NOT NULL,
    [Plant]         VARCHAR (10) NULL,
    [mp_id]         INT          NULL,
    [license_plate] VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([ccc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellCheckCarCondition_log', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'座位ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellCheckCarCondition_log', @level2type = N'COLUMN', @level2name = N'mp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellCheckCarCondition_log', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'資料表ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellCheckCarCondition_log', @level2type = N'COLUMN', @level2name = N'ccc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'服務鈴查詢車況紀錄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellCheckCarCondition_log';

