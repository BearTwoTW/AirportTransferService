CREATE TABLE [dbo].[OrderAbnormalReturnLog] (
    [cre_userid]               VARCHAR (50)   NULL,
    [cre_time]                 DATETIME       NULL,
    [upd_userid]               VARCHAR (50)   NULL,
    [upd_time]                 DATETIME       NULL,
    [order_abnormal_return_id] INT            IDENTITY (1, 1) NOT NULL,
    [order_id]                 VARCHAR (50)   NULL,
    [abnormal_return_status]   VARCHAR (50)   NULL,
    [abnormal_return_note]     NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([order_abnormal_return_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'異常回報備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAbnormalReturnLog', @level2type = N'COLUMN', @level2name = N'abnormal_return_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'異常回報狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAbnormalReturnLog', @level2type = N'COLUMN', @level2name = N'abnormal_return_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單編號起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAbnormalReturnLog', @level2type = N'COLUMN', @level2name = N'order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAbnormalReturnLog', @level2type = N'COLUMN', @level2name = N'order_abnormal_return_id';

