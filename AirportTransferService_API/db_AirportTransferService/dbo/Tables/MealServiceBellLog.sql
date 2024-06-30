CREATE TABLE [dbo].[MealServiceBellLog] (
    [cre_userid]      VARCHAR (50)   NULL,
    [cre_time]        DATETIME       NULL,
    [upd_userid]      VARCHAR (50)   NULL,
    [upd_time]        DATETIME       NULL,
    [msbl_id]         INT            IDENTITY (1, 1) NOT NULL,
    [Plant]           VARCHAR (10)   NULL,
    [mpg_id]          INT            NULL,
    [mp_id]           INT            NULL,
    [customer_id]     VARCHAR (20)   NULL,
    [service_request] NVARCHAR (MAX) NULL,
    [isReading]       VARCHAR (1)    DEFAULT ('N') NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否已讀', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'isReading';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'服務需求JSON', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'service_request';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶車號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'座位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'mpg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'服務紀錄ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'msbl_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點餐服務鈴使用紀錄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBellLog';

