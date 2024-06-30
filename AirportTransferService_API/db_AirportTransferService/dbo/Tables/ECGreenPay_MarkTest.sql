﻿CREATE TABLE [dbo].[ECGreenPay_MarkTest] (
    [id]                  INT             IDENTITY (1, 1) NOT NULL,
    [cre_userid]          VARCHAR (50)    DEFAULT ('') NULL,
    [cre_time]            DATETIME        DEFAULT (getdate()) NULL,
    [upd_userid]          VARCHAR (50)    DEFAULT ('') NULL,
    [upd_time]            DATETIME        DEFAULT (getdate()) NULL,
    [customer_id]         VARCHAR (50)    DEFAULT ('') NULL,
    [order_id]            VARCHAR (50)    DEFAULT ('') NULL,
    [RtnCode]             INT             DEFAULT ((0)) NULL,
    [RtnMsg]              NVARCHAR (200)  DEFAULT ('') NULL,
    [MerchantID]          NVARCHAR (10)   DEFAULT ('') NULL,
    [MerchantTradeNo]     NVARCHAR (20)   DEFAULT ('') NULL,
    [LogisticsID]         NVARCHAR (20)   DEFAULT ('') NULL,
    [LogisticsStatus]     NVARCHAR (8)    DEFAULT ('') NULL,
    [LogisticsStatusName] NVARCHAR (100)  DEFAULT ('') NULL,
    [LogisticsType]       NVARCHAR (20)   DEFAULT ('') NULL,
    [LogisticsSubType]    NVARCHAR (20)   DEFAULT ('') NULL,
    [GoodsAmount]         INT             DEFAULT ((0)) NULL,
    [GoodsWeight]         DECIMAL (10, 2) DEFAULT ((0.00)) NULL,
    [UpdateStatusDate]    NVARCHAR (20)   DEFAULT ('') NULL,
    [ReceiverName]        NVARCHAR (100)  DEFAULT ('') NULL,
    [ReceiverPhone]       NVARCHAR (20)   DEFAULT ('') NULL,
    [ReceiverCellPhone]   NVARCHAR (20)   DEFAULT ('') NULL,
    [ReceiverEmail]       NVARCHAR (50)   DEFAULT ('') NULL,
    [ReceiverAddress]     NVARCHAR (200)  DEFAULT ('') NULL,
    [BookingNote]         NVARCHAR (50)   DEFAULT ('') NULL,
    [CVSPaymentNo]        NVARCHAR (15)   DEFAULT ('') NULL,
    [CVSValidationNo]     NVARCHAR (10)   DEFAULT ('') NULL,
    CONSTRAINT [PK_ECGreenPay_MarkTest] PRIMARY KEY CLUSTERED ([id] ASC)
);
