CREATE TABLE [dbo].[CarStockTransport] (
    [cre_userid]          VARCHAR (50)   NULL,
    [cre_time]            DATETIME       NULL,
    [upd_userid]          VARCHAR (50)   NULL,
    [upd_time]            DATETIME       NULL,
    [id]                  INT            IDENTITY (1, 1) NOT NULL,
    [cs_id]               NVARCHAR (50)  NULL,
    [cw_id]               NVARCHAR (50)  NULL,
    [predict_arrive_date] DATE           NULL,
    [actual_arrive_date]  DATE           NULL,
    [ischeck]             NVARCHAR (1)   NULL,
    [check_time]          DATETIME       NULL,
    [note]                NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransport', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'確認時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransport', @level2type = N'COLUMN', @level2name = N'check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否確認', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransport', @level2type = N'COLUMN', @level2name = N'ischeck';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'實際抵達日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransport', @level2type = N'COLUMN', @level2name = N'actual_arrive_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計抵達日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransport', @level2type = N'COLUMN', @level2name = N'predict_arrive_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車倉儲流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransport', @level2type = N'COLUMN', @level2name = N'cw_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransport', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockTransport', @level2type = N'COLUMN', @level2name = N'id';

