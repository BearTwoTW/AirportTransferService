CREATE TABLE [dbo].[InvoiceSetting] (
    [name]        VARCHAR (50)   NOT NULL,
    [value]       VARCHAR (255)  NULL,
    [description] NVARCHAR (255) NULL,
    CONSTRAINT [PK_InvoiceSettingSystem] PRIMARY KEY CLUSTERED ([name] ASC)
);

