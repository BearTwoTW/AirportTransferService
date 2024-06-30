CREATE TABLE [dbo].[InvoiceDetail] (
    [id]            INT             IDENTITY (1, 1) NOT NULL,
    [GTLPaymentID]  VARCHAR (20)    NULL,
    [invoiceNumber] CHAR (10)       NULL,
    [itemId]        VARCHAR (20)    NULL,
    [description]   VARCHAR (255)   NULL,
    [Quantity]      INT             NULL,
    [unitPrice]     DECIMAL (10, 2) NULL,
    [Amount]        DECIMAL (10, 2) NULL,
    [taxTypeEnum]   CHAR (1)        NULL,
    [reMark]        VARCHAR (255)   NULL,
    [Unit]          VARCHAR (10)    NULL,
    CONSTRAINT [PK_InvoiceDetail] PRIMARY KEY CLUSTERED ([id] ASC)
);

