CREATE TABLE [dbo].[ECPayGreenLogisticsReverse_HOME] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [gpreversehome_id]      INT            IDENTITY (1, 1) NOT NULL,
    [customer_id]           VARCHAR (50)   NULL,
    [ec_order_id]           VARCHAR (50)   NULL,
    [ec_order_logistics_id] VARCHAR (50)   NULL,
    [MerchantID]            VARCHAR (10)   NULL,
    [AllPayLogisticsID]     VARCHAR (20)   NULL,
    [LogisticsSubType]      VARCHAR (20)   NULL,
    [ServerReplyURL]        VARCHAR (200)  NULL,
    [SenderName]            NVARCHAR (10)  NULL,
    [SenderPhone]           VARCHAR (20)   NULL,
    [SenderCellPhone]       VARCHAR (20)   NULL,
    [SenderZipCode]         VARCHAR (6)    NULL,
    [SenderAddress]         NVARCHAR (60)  NULL,
    [ReceiverName]          NVARCHAR (10)  NULL,
    [ReceiverPhone]         VARCHAR (20)   NULL,
    [ReceiverCellPhone]     VARCHAR (20)   NULL,
    [ReceiverZipCode]       VARCHAR (6)    NULL,
    [ReceiverAddress]       NVARCHAR (60)  NULL,
    [ReceiverEmail]         VARCHAR (50)   NULL,
    [GoodsAmount]           INT            NULL,
    [GoodsName]             VARCHAR (60)   NULL,
    [Temperature]           VARCHAR (4)    NULL,
    [Distance]              VARCHAR (2)    NULL,
    [Specification]         VARCHAR (4)    NULL,
    [ScheduledPickupTime]   VARCHAR (1)    NULL,
    [ScheduledDeliveryTime] VARCHAR (2)    NULL,
    [Remark]                NVARCHAR (200) NULL,
    [PlatformID]            VARCHAR (10)   NULL,
    [CheckMacValue]         VARCHAR (MAX)  NULL,
    PRIMARY KEY CLUSTERED ([gpreversehome_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檢查碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'CheckMacValue';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'特約合作平台商代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'PlatformID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'Remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預定送達時段 ', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ScheduledDeliveryTime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預定取件時段', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ScheduledPickupTime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'規格', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'Specification';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'距離', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'Distance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'溫層', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'Temperature';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'GoodsName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'GoodsAmount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人email', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ReceiverEmail';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ReceiverAddress';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人郵遞區號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ReceiverZipCode';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人手機', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ReceiverCellPhone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ReceiverPhone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ReceiverName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'SenderAddress';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人郵遞區號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'SenderZipCode';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人手機', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'SenderCellPhone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'SenderPhone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'SenderName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Server端回覆網址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ServerReplyURL';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流子類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'LogisticsSubType';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'綠界科技的物流交易編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'AllPayLogisticsID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠商編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'MerchantID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'ec_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'逆物流流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ECPayGreenLogisticsReverse_HOME', @level2type = N'COLUMN', @level2name = N'gpreversehome_id';

