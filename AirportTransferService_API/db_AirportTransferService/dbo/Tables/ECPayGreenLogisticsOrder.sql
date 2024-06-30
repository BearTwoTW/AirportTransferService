CREATE TABLE [dbo].[ECPayGreenLogisticsOrder] (
    [cre_userid]                 VARCHAR (50)   NULL,
    [cre_time]                   DATETIME       NULL,
    [upd_userid]                 VARCHAR (50)   NULL,
    [upd_time]                   DATETIME       NULL,
    [gplogistics_id]             INT            IDENTITY (1, 1) NOT NULL,
    [customer_id]                VARCHAR (50)   NULL,
    [ec_order_id]                VARCHAR (50)   NULL,
    [ec_order_logistics_id]      VARCHAR (50)   NULL,
    [MerchantID]                 VARCHAR (10)   NULL,
    [MerchantTradeNo]            VARCHAR (20)   NULL,
    [MerchantTradeDate]          VARCHAR (20)   NULL,
    [LogisticsType]              NVARCHAR (20)  NULL,
    [LogisticsSubType]           NVARCHAR (20)  NULL,
    [GoodsAmount]                INT            NULL,
    [GoodsName]                  NVARCHAR (50)  NULL,
    [SenderName]                 NVARCHAR (10)  NULL,
    [SenderPhone]                VARCHAR (10)   NULL,
    [SenderCellPhone]            VARCHAR (10)   NULL,
    [ReceiverName]               NVARCHAR (50)  NULL,
    [ReceiverPhone]              VARCHAR (10)   NULL,
    [ReceiverCellPhone]          VARCHAR (10)   NULL,
    [ReceiverEmail]              VARCHAR (50)   NULL,
    [TradeDesc]                  NVARCHAR (200) NULL,
    [ServerReplyURL]             NVARCHAR (200) NULL,
    [ClientReplyURL]             NVARCHAR (200) NULL,
    [Remark]                     NVARCHAR (200) NULL,
    [PlatformID]                 NVARCHAR (10)  NULL,
    [CheckMacValue]              NVARCHAR (MAX) NULL,
    [CollectionAmount]           INT            NULL,
    [IsCollection]               VARCHAR (1)    NULL,
    [ReceiverStoreID]            NVARCHAR (6)   NULL,
    [ReturnStoreID]              NVARCHAR (6)   NULL,
    [GoodsWeight]                DECIMAL (18)   NULL,
    [SenderZipCode]              NVARCHAR (6)   NULL,
    [SenderAddress]              NVARCHAR (MAX) NULL,
    [ReceiverZipCode]            NVARCHAR (MAX) NULL,
    [ReceiverAddress]            NVARCHAR (MAX) NULL,
    [Temperature]                NVARCHAR (MAX) NULL,
    [Distance]                   NVARCHAR (MAX) NULL,
    [Specification]              NVARCHAR (MAX) NULL,
    [ScheduledPickupTime]        NVARCHAR (MAX) NULL,
    [ScheduledDeliveryTime]      NVARCHAR (MAX) NULL,
    [MerchantID_response]        VARCHAR (10)   NULL,
    [MerchantTradeNo_response]   VARCHAR (20)   NULL,
    [RtnCode_response]           INT            NULL,
    [RtnMsg_response]            NVARCHAR (200) NULL,
    [AllPayLogisticsID_response] VARCHAR (20)   NULL,
    [LogisticsType_response]     VARCHAR (20)   NULL,
    [LogisticsSubType_response]  VARCHAR (20)   NULL,
    [GoodsAmount_response]       INT            NULL,
    [UpdateStatusDate_response]  VARCHAR (20)   NULL,
    [ReceiverName_response]      NVARCHAR (60)  NULL,
    [ReceiverPhone_response]     VARCHAR (20)   NULL,
    [ReceiverCellPhone_response] VARCHAR (20)   NULL,
    [ReceiverEmail_response]     VARCHAR (50)   NULL,
    [ReceiverAddress_response]   NVARCHAR (200) NULL,
    [CVSPaymentNo_response]      VARCHAR (15)   NULL,
    [CVSValidationNo_response]   VARCHAR (10)   NULL,
    [BookingNote_response]       VARCHAR (50)   NULL,
    [CheckMacValue_response]     NVARCHAR (MAX) NULL,
    [logisticsStatus]            NVARCHAR (200) NULL,
    PRIMARY KEY CLUSTERED ([gplogistics_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檢查碼(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'CheckMacValue_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'托運單號(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'BookingNote_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗證碼(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'CVSValidationNo_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'寄貨編號(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'CVSPaymentNo_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人地址(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverAddress_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人email(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverEmail_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人手機(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverCellPhone_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人電話(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverPhone_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人姓名(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverName_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流狀態更新時間(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'UpdateStatusDate_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品金額(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'GoodsAmount_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流子類型(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'LogisticsSubType_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流類型(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'LogisticsType_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'綠界科技的物流交易編號(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'AllPayLogisticsID_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流狀態說明(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'RtnMsg_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'目前物流狀態(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'RtnCode_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商交易編號(回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'MerchantTradeNo_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商編號 (回傳)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'MerchantID_response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨門市代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReturnStoreID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人門市代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverStoreID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否代收貨款', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'IsCollection';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'代收金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'CollectionAmount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檢查碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'CheckMacValue';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'特約合作平台商代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'PlatformID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'Remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Client端回覆網址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ClientReplyURL';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Server端回覆網址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ServerReplyURL';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'交易描述', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'TradeDesc';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人email', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverEmail';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人手機', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverCellPhone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverPhone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ReceiverName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'寄件人手機', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'SenderCellPhone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'寄件人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'SenderPhone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'寄件人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'SenderName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'GoodsName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'GoodsAmount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流子類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'LogisticsSubType';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'LogisticsType';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商交易時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'MerchantTradeDate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商交易編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'MerchantTradeNo';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'MerchantID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ec_order_logistics_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'ec_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsOrder', @level2type = N'COLUMN', @level2name = N'gplogistics_id';

