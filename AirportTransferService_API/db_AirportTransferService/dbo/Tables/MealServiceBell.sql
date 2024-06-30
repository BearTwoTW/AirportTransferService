CREATE TABLE [dbo].[MealServiceBell] (
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  NULL,
    [upd_time]   DATETIME      NULL,
    [msb_id]     INT           IDENTITY (1, 1) NOT NULL,
    [Plant]      VARCHAR (10)  NULL,
    [isOpen]     VARCHAR (1)   DEFAULT ('N') NULL,
    [text]       NVARCHAR (10) NULL,
    [subtitle]   NVARCHAR (50) NULL,
    [img_path]   VARCHAR (255) NULL,
    [q_id]       VARCHAR (10)  NULL,
    [seq]        INT           NULL,
    PRIMARY KEY CLUSTERED ([msb_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'問卷ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'q_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'圖片路徑', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'img_path';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'副文字', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'subtitle';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'顯示文字', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'text';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否開放', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'isOpen';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'服務項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'msb_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點餐服務鈴項目', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealServiceBell';

