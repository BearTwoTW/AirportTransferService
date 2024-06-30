CREATE TABLE [dbo].[EC_LINEPAYPaymentResponse] (
    [id]              INT            IDENTITY (1, 1) NOT NULL,
    [orderid]         NCHAR (10)     NOT NULL,
    [LPOrderID]       NVARCHAR (50)  NOT NULL,
    [PaymentRseponse] NVARCHAR (MAX) NULL,
    [cre_time]        VARCHAR (14)   NOT NULL,
    CONSTRAINT [PK_EC_LINEPAYPaymentResponse] PRIMARY KEY CLUSTERED ([id] ASC)
);

