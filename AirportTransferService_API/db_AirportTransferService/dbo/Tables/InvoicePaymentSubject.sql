CREATE TABLE [dbo].[InvoicePaymentSubject] (
    [cre_userid]   VARCHAR (10)   NULL,
    [cre_time]     DATETIME       NULL,
    [upd_userid]   VARCHAR (10)   NULL,
    [upd_time]     DATETIME       NULL,
    [ips_id]       VARCHAR (50)   NOT NULL,
    [ips_code]     VARCHAR (50)   NULL,
    [type]         NVARCHAR (50)  NULL,
    [name]         NVARCHAR (255) NULL,
    [note]         NVARCHAR (MAX) NULL,
    [balance_type] NVARCHAR (50)  NULL,
    CONSTRAINT [PK_ReceiptSubject] PRIMARY KEY CLUSTERED ([ips_id] ASC)
);

