CREATE TABLE [dbo].[InvoicePaymentProjectMaster] (
    [cre_userid] VARCHAR (10)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (10)   NULL,
    [upd_time]   DATETIME       NULL,
    [ippm_id]    VARCHAR (50)   NULL,
    [ippm_code]  VARCHAR (50)   NULL,
    [DEP]        VARCHAR (50)   NULL,
    [name]       NVARCHAR (255) NULL,
    [note]       NVARCHAR (MAX) NULL
);

