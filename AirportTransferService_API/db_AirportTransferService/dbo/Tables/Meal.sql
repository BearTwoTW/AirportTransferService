CREATE TABLE [dbo].[Meal] (
    [cre_userid]        VARCHAR (50)    NULL,
    [cre_time]          DATETIME        NULL,
    [upd_userid]        VARCHAR (50)    NULL,
    [upd_time]          DATETIME        NULL,
    [m_id]              INT             IDENTITY (1, 1) NOT NULL,
    [Name]              NVARCHAR (100)  NULL,
    [mg_id]             INT             NULL,
    [Plant]             VARCHAR (10)    NULL,
    [Remark]            NVARCHAR (100)  NULL,
    [isRelease]         VARCHAR (1)     NULL,
    [m_Photo]           VARCHAR (100)   NULL,
    [sortBy]            INT             NULL,
    [one_serving_price] DECIMAL (10, 2) NULL,
    [ds_id]             INT             NULL,
    CONSTRAINT [PK__Meal__7C8D7D29017922BC] PRIMARY KEY CLUSTERED ([m_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'ds_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'成本', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'one_serving_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'sortBy';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品圖片', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'm_Photo';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否開放', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'isRelease';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'Remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點類型ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'mg_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'Name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'餐點訂單', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Meal';

