﻿CREATE TABLE [dbo].[ECPayGreenAIO_sendbeck] (
    [cre_userid]           VARCHAR (50)    DEFAULT ('') NULL,
    [cre_time]             DATETIME        DEFAULT (getdate()) NULL,
    [upd_userid]           VARCHAR (50)    DEFAULT ('') NULL,
    [upd_time]             DATETIME        DEFAULT (getdate()) NULL,
    [PaymentResponse_id]   INT             IDENTITY (1, 1) NOT NULL,
    [ec_order_id]          VARCHAR (50)    NULL,
    [ec_order_code]        VARCHAR (50)    NULL,
    [MerchantID]           VARCHAR (10)    NULL,
    [MerchantTradeNo]      VARCHAR (20)    NULL,
    [StoreID]              VARCHAR (20)    NULL,
    [RtnCode]              INT             NULL,
    [RtnMsg]               VARCHAR (200)   NULL,
    [TradeNo]              VARCHAR (20)    NULL,
    [TradeAmt]             INT             NULL,
    [PaymentDate]          VARCHAR (20)    NULL,
    [PaymentType]          VARCHAR (20)    NULL,
    [PaymentTypeChargeFee] DECIMAL (10, 2) NULL,
    [TradeDate]            VARCHAR (20)    NULL,
    [SimulatePaid]         INT             NULL,
    [CustomField1]         VARCHAR (50)    NULL,
    [CustomField2]         VARCHAR (50)    NULL,
    [CustomField3]         VARCHAR (50)    NULL,
    [CustomField4]         VARCHAR (50)    NULL,
    [CheckMacValue]        VARCHAR (MAX)   NULL,
    [BankCode]             VARCHAR (3)     NULL,
    [VAccount]             VARCHAR (16)    NULL,
    [ExpireDate]           VARCHAR (20)    NULL,
    [PaymentNo]            VARCHAR (14)    NULL,
    [Barcode1]             VARCHAR (20)    NULL,
    [Barcode2]             VARCHAR (20)    NULL,
    [Barcode3]             VARCHAR (20)    NULL,
    [BNPLTradeNo]          VARCHAR (64)    NULL,
    [BNPLInstallment]      INT             NULL
);
