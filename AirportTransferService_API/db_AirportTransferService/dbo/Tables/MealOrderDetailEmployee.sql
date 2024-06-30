CREATE TABLE [dbo].[MealOrderDetailEmployee] (
    [Cre_Userid] VARCHAR (50)   NULL,
    [Cre_Time]   DATETIME       NULL,
    [Upd_Userid] VARCHAR (50)   NULL,
    [Upd_Time]   DATETIME       NULL,
    [mode_id]    INT            IDENTITY (1, 1) NOT NULL,
    [moe_id]     VARCHAR (50)   NULL,
    [m_id]       VARCHAR (10)   NULL,
    [Quentity]   INT            NULL,
    [remark]     NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([mode_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee', @level2type = N'COLUMN', @level2name = N'remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee', @level2type = N'COLUMN', @level2name = N'Quentity';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee', @level2type = N'COLUMN', @level2name = N'm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee', @level2type = N'COLUMN', @level2name = N'moe_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單紀錄細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee', @level2type = N'COLUMN', @level2name = N'mode_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee', @level2type = N'COLUMN', @level2name = N'Upd_Time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee', @level2type = N'COLUMN', @level2name = N'Upd_Userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee', @level2type = N'COLUMN', @level2name = N'Cre_Time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee', @level2type = N'COLUMN', @level2name = N'Cre_Userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'員工餐點訂單明細', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MealOrderDetailEmployee';

