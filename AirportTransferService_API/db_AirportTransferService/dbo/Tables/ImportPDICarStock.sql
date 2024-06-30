CREATE TABLE [dbo].[ImportPDICarStock] (
    [cre_userid]               VARCHAR (50)   NULL,
    [cre_time]                 DATETIME       NULL,
    [upd_userid]               VARCHAR (50)   NULL,
    [upd_time]                 DATETIME       NULL,
    [id]                       INT            IDENTITY (1, 1) NOT NULL,
    [saleable]                 NVARCHAR (50)  NULL,
    [status]                   NVARCHAR (255) NULL,
    [transaction_code]         NVARCHAR (255) NULL,
    [car_type]                 NVARCHAR (255) NULL,
    [format_code]              NVARCHAR (255) NULL,
    [format_name]              NVARCHAR (255) NULL,
    [year]                     INT            NULL,
    [year_age]                 INT            NULL,
    [exterior_code]            NVARCHAR (255) NULL,
    [exterior_color]           NVARCHAR (255) NULL,
    [interior_code]            NVARCHAR (255) NULL,
    [interior_color]           NVARCHAR (255) NULL,
    [FO]                       NVARCHAR (255) NULL,
    [vin_no]                   NVARCHAR (255) NULL,
    [body_code_no]             NVARCHAR (255) NULL,
    [predict_arrive_port_date] DATE           NULL,
    [special_equipment]        NVARCHAR (255) NULL,
    [note]                     NVARCHAR (255) NULL,
    [invoice_date]             DATE           NULL,
    [store_department]         NVARCHAR (255) NULL,
    [store_space]              NVARCHAR (255) NULL,
    [reserve_status]           NVARCHAR (255) NULL,
    [is_arrive_port]           VARCHAR (1)    NULL,
    [is_pickup]                VARCHAR (1)    NULL,
    CONSTRAINT [PK__ImportPD__3213E83F3CB624EA] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否提車', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'is_pickup';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否到港', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'is_arrive_port';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保留狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'reserve_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'儲位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'store_space';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'存放部門', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'store_department';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'invoice_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'特殊配備', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'special_equipment';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預定到港日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'predict_arrive_port_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車身號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'body_code_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'VIN號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'vin_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'FO號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'FO';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝顏色', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'interior_color';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'interior_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝顏色', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'exterior_color';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'exterior_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年份', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'year_age';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'format_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'format_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'car_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'transaction_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否開放銷售', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'saleable';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportPDICarStock', @level2type = N'COLUMN', @level2name = N'id';

