CREATE TABLE [dbo].[InvoicePaymentPayShare] (
    [cre_userid]    VARCHAR (10)    NULL,
    [cre_time]      DATETIME        NULL,
    [upd_userid]    VARCHAR (10)    NULL,
    [upd_time]      DATETIME        NULL,
    [ipps_id]       VARCHAR (50)    NOT NULL,
    [ipd_id]        VARCHAR (50)    NULL,
    [DEP]           NVARCHAR (10)   NULL,
    [price]         DECIMAL (20, 2) NULL,
    [price_percent] DECIMAL (20, 2) NULL
);

