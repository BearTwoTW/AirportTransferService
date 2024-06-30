CREATE TABLE [dbo].[ECGreenPay_CheckOut] (
    [id]                INT           IDENTITY (1, 1) NOT NULL,
    [MerchantID]        VARCHAR (10)  NULL,
    [MerchantTradeNo]   VARCHAR (20)  NULL,
    [StoreID]           VARCHAR (20)  NULL,
    [MerchantTradeDate] VARCHAR (20)  NULL,
    [PaymentType]       VARCHAR (30)  NULL,
    [TotalAmount]       INT           NULL,
    [TradeDesc]         VARCHAR (200) NULL,
    [ItemName]          VARCHAR (400) NULL,
    [ReturnURL]         VARCHAR (200) NULL,
    [ChoosePayment]     VARCHAR (20)  NULL,
    [CheckMacValue]     VARCHAR (128) NULL,
    [ClientBackURL]     VARCHAR (200) NULL,
    [OrderResultURL]    VARCHAR (200) NULL,
    [Remark]            VARCHAR (100) NULL,
    [EncryptType]       INT           NULL,
    [cre_dt]            DATETIME      CONSTRAINT [DF_ECGreenPay_CheckOut_cre_dt] DEFAULT (getdate()) NULL
);

