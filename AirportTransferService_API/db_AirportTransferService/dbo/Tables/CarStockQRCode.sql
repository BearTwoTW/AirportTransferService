CREATE TABLE [dbo].[CarStockQRCode] (
    [cre_userid]  VARCHAR (50)  NULL,
    [cre_time]    DATETIME      NULL,
    [upd_userid]  VARCHAR (50)  NULL,
    [upd_time]    DATETIME      NULL,
    [csqrc_id]    INT           IDENTITY (1, 1) NOT NULL,
    [cs_id]       VARCHAR (50)  NULL,
    [qrcode_type] VARCHAR (50)  NULL,
    [note]        NVARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([csqrc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockQRCode', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'QRCode類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockQRCode', @level2type = N'COLUMN', @level2name = N'qrcode_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockQRCode', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存QRCode流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockQRCode', @level2type = N'COLUMN', @level2name = N'csqrc_id';

