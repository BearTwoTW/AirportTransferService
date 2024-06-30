CREATE TABLE [dbo].[Car] (
    [cre_userid]        VARCHAR (50)    NULL,
    [cre_time]          DATETIME        NULL,
    [upd_userid]        VARCHAR (50)    NULL,
    [upd_time]          DATETIME        NULL,
    [car_id]            VARCHAR (50)    NOT NULL,
    [vin_no]            VARCHAR (50)    NULL,
    [license_plate]     VARCHAR (50)    NULL,
    [licensed_date]     DATE            NULL,
    [customer_id]       VARCHAR (50)    NULL,
    [driver_name]       VARCHAR (400)   NULL,
    [driver_name_en]    VARCHAR (256)   NULL,
    [driver_phone]      VARCHAR (400)   NULL,
    [driver_phone_en]   VARCHAR (256)   NULL,
    [source_id]         NVARCHAR (50)   NULL,
    [source_upd_time]   DATETIME        NULL,
    [ctf_id]            INT             NULL,
    [year]              INT             NULL,
    [mileage]           DECIMAL (10, 2) NULL,
    [driver_email]      VARCHAR (400)   NULL,
    [driver_email_en]   VARCHAR (256)   NULL,
    [driver_city]       VARCHAR (40)    NULL,
    [driver_area]       VARCHAR (40)    NULL,
    [driver_address]    VARCHAR (400)   NULL,
    [driver_address_en] VARCHAR (256)   NULL,
    CONSTRAINT [PK__Car__4C9A0DB379C7BF51] PRIMARY KEY CLUSTERED ([car_id] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_Car_vin_no]
    ON [dbo].[Car]([vin_no] ASC);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'駕駛地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'driver_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'駕駛區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'driver_area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'駕駛城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'driver_city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'駕駛信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'driver_email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'里程', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'mileage';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型規格對照流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'同步來源修改日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'source_upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'同步來源id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'source_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用人(手機)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'driver_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用人(駕駛)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'driver_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車主流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'領牌日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'licensed_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車身碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'vin_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車籍流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Car', @level2type = N'COLUMN', @level2name = N'car_id';

