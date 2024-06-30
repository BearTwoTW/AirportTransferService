CREATE TABLE [dbo].[ECPayGreenLogisticsReverse_CVS] (
    [cre_userid]            VARCHAR (50)  NULL,
    [cre_time]              DATETIME      NULL,
    [upd_userid]            VARCHAR (50)  NULL,
    [upd_time]              DATETIME      NULL,
    [gpreversecvs_id]       INT           IDENTITY (1, 1) NOT NULL,
    [customer_id]           VARCHAR (50)  NULL,
    [ec_order_id]           VARCHAR (MAX) NULL,
    [ec_order_logistics_id] VARCHAR (50)  NULL,
    [MerchantID]            VARCHAR (10)  NULL,
    [AllPayLogisticsID]     VARCHAR (20)  NULL,
    [ServerReplyURL]        VARCHAR (200) NULL,
    [GoodsName]             VARCHAR (50)  NULL,
    [GoodsAmount]           INT           NULL,
    [CollectionAmount]      INT           NULL,
    [ServiceType]           VARCHAR (5)   NULL,
    [SenderName]            VARCHAR (10)  NULL,
    [SenderPhone]           VARCHAR (20)  NULL,
    [Remark]                VARCHAR (20)  NULL,
    [PlatformID]            VARCHAR (10)  NULL,
    [CheckMacValue]         VARCHAR (MAX) NULL,
    [RtnMerchantTradeNo]    VARCHAR (20)  NULL,
    [RtnOrderNo]            VARCHAR (12)  NULL,
    PRIMARY KEY CLUSTERED ([gpreversecvs_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'RtnOrderNo';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'綠界科技逆物流交易編號 ', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'RtnMerchantTradeNo';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檢查碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'CheckMacValue';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'特約合作平台商代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'PlatformID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人手機', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'SenderPhone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'SenderName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'服務型態代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'ServiceType';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'代收金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'CollectionAmount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'GoodsAmount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'GoodsName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Server端回覆網址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'ServerReplyURL';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流交易編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'AllPayLogisticsID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'MerchantID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'ec_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_CVS', @level2type = N'COLUMN', @level2name = N'customer_id';

