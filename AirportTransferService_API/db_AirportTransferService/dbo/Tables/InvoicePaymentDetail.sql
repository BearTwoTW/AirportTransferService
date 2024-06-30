CREATE TABLE [dbo].[InvoicePaymentDetail] (
    [cre_userid]   VARCHAR (10)    NULL,
    [cre_time]     DATETIME        NULL,
    [upd_userid]   VARCHAR (10)    NULL,
    [upd_time]     DATETIME        NULL,
    [ipd_id]       VARCHAR (50)    NOT NULL,
    [ipm_id]       VARCHAR (50)    NULL,
    [ips_id]       VARCHAR (50)    NULL,
    [receipt_num]  NVARCHAR (255)  NULL,
    [receipt_date] DATE            NULL,
    [description]  NVARCHAR (255)  NULL,
    [price]        DECIMAL (20, 2) NULL,
    [receipt_file] NVARCHAR (255)  NULL,
    [PRM_file]     NVARCHAR (255)  NULL,
    [is_payShare]  VARCHAR (1)     NULL,
    [is_receipt]   VARCHAR (1)     NULL,
    CONSTRAINT [PK_InvoicePaymentDetail] PRIMARY KEY CLUSTERED ([ipd_id] ASC)
);

