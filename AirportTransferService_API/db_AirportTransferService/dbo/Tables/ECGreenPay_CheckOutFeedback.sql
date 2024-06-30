CREATE TABLE [dbo].[ECGreenPay_CheckOutFeedback] (
    [id]                   INT           IDENTITY (1, 1) NOT NULL,
    [CheckMacValue]        VARCHAR (128) NULL,
    [CustomField1]         VARCHAR (50)  NULL,
    [CustomField2]         VARCHAR (50)  NULL,
    [CustomField3]         VARCHAR (50)  NULL,
    [CustomField4]         VARCHAR (50)  NULL,
    [MerchantID]           VARCHAR (10)  NULL,
    [MerchantTradeNo]      VARCHAR (20)  NULL,
    [PaymentDate]          VARCHAR (20)  NULL,
    [PaymentType]          VARCHAR (20)  NULL,
    [PaymentTypeChargeFee] VARCHAR (10)  NULL,
    [RtnCode]              VARCHAR (10)  NULL,
    [RtnMsg]               VARCHAR (200) NULL,
    [SimulatePaid]         VARCHAR (10)  NULL,
    [StoreID]              VARCHAR (20)  NULL,
    [TradeAmt]             VARCHAR (10)  NULL,
    [TradeDate]            VARCHAR (20)  NULL,
    [TradeNo]              VARCHAR (20)  NULL,
    [cre_dt]               DATETIME      CONSTRAINT [DF_ECGreenPay_CheckOutFeedback_cre_dt] DEFAULT (getdate()) NULL
);

