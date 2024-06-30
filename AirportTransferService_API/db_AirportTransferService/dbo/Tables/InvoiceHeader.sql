﻿CREATE TABLE [dbo].[InvoiceHeader] (
    [id]                      INT             IDENTITY (1, 1) NOT NULL,
    [GTLPaymentID]            VARCHAR (20)    NULL,
    [GTLPaymentStatus]        VARCHAR (10)    NULL,
    [trackYear]               CHAR (4)        NULL,
    [trackPeriod]             CHAR (1)        NULL,
    [invoiceNumber]           CHAR (10)       NULL,
    [invoiceDate]             CHAR (8)        NULL,
    [invoiceTime]             CHAR (6)        NULL,
    [invoicePrinterDateTime]  CHAR (20)       NULL,
    [printTaxFormat]          VARCHAR (2)     NULL,
    [buyerIdentifier]         CHAR (8)        NULL,
    [buyerName]               VARCHAR (55)    NULL,
    [buyerAddress]            VARCHAR (255)   NULL,
    [buyerEmail]              VARCHAR (255)   NULL,
    [buyerTel]                VARCHAR (20)    NULL,
    [salesAmount]             DECIMAL (10, 2) NULL,
    [freeTaxSalesAmount]      DECIMAL (10, 2) NULL,
    [zeroTaxSalesAmount]      DECIMAL (10, 2) NULL,
    [taxTypeEnum]             CHAR (1)        NULL,
    [taxAmount]               DECIMAL (10, 2) NULL,
    [totalAmount]             DECIMAL (10, 2) NULL,
    [carrierType]             VARCHAR (10)    NULL,
    [carrierString1]          VARCHAR (20)    NULL,
    [carrierString2]          VARCHAR (20)    NULL,
    [printMark]               VARCHAR (50)    NULL,
    [randomNumber]            VARCHAR (10)    NULL,
    [npoBan]                  VARCHAR (20)    NULL,
    [taxRate]                 DECIMAL (5, 2)  NULL,
    [payMethod]               VARCHAR (20)    NULL,
    [extraData]               VARCHAR (50)    NULL,
    [memberCarrierIdentifier] VARCHAR (20)    NULL,
    [memberCarrierIncId]      VARCHAR (20)    NULL,
    [transactionData]         VARCHAR (255)   NULL,
    [customsClearanceMark]    VARCHAR (255)   NULL,
    [mainRemark]              VARCHAR (255)   NULL,
    [invoiceFootString]       VARCHAR (255)   NULL,
    [isExchange]              VARCHAR (10)    NULL,
    [noCheck]                 VARCHAR (255)   NULL,
    CONSTRAINT [PK_InvoiceHeader] PRIMARY KEY CLUSTERED ([id] ASC)
);

