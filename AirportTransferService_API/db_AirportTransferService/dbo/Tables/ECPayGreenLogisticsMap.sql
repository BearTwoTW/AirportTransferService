CREATE TABLE [dbo].[ECPayGreenLogisticsMap] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [id]                    INT            IDENTITY (1, 1) NOT NULL,
    [customer_id]           VARCHAR (50)   NULL,
    [MerchantID]            VARCHAR (10)   NULL,
    [MerchantTradeNo]       VARCHAR (20)   NULL,
    [LogisticsSubType]      VARCHAR (20)   NULL,
    [CVSStoreID]            VARCHAR (9)    NULL,
    [CVSStoreName]          VARCHAR (10)   NULL,
    [CVSAddress]            VARCHAR (60)   NULL,
    [CVSTelephone]          VARCHAR (20)   NULL,
    [CVSOutSide]            VARCHAR (1)    NULL,
    [ExtraData]             VARCHAR (20)   NULL,
    [RqData]                NVARCHAR (MAX) NULL,
    [ec_order_logistics_id] NVARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請求的JSON', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'RqData';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'額外資訊', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'ExtraData';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者選擇的超商店舖是否為離島店鋪', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'CVSOutSide';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者選擇的超商店舖電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'CVSTelephone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者選擇的超商店舖地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'CVSAddress';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者選擇的超商店舖名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'CVSStoreName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者選擇的超商店舖編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'CVSStoreID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流子類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'LogisticsSubType';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商交易編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'MerchantTradeNo';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'MerchantID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地圖流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap', @level2type = N'COLUMN', @level2name = N'id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單物流流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsMap';

