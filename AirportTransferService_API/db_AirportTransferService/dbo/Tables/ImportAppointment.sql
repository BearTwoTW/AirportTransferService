CREATE TABLE [dbo].[ImportAppointment] (
    [cre_userid]       VARCHAR (50)   NULL,
    [cre_time]         DATETIME       NULL,
    [upd_userid]       VARCHAR (50)   NULL,
    [upd_time]         DATETIME       NULL,
    [ia_id]            INT            IDENTITY (1, 1) NOT NULL,
    [Plant]            VARCHAR (50)   NULL,
    [vin_no]           VARCHAR (50)   NULL,
    [license_plate]    VARCHAR (50)   NULL,
    [driver_name]      NVARCHAR (255) NULL,
    [driver_phone]     NVARCHAR (255) NULL,
    [customer_name]    NVARCHAR (255) NULL,
    [customer_phone]   VARCHAR (255)  NULL,
    [appointment_time] DATETIME       NULL,
    [appointment_no]   VARCHAR (50)   NULL,
    [content]          NVARCHAR (MAX) NULL,
    [note]             NVARCHAR (MAX) NULL,
    CONSTRAINT [PK__ImportAp__79B922B342622006] PRIMARY KEY CLUSTERED ([ia_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約事項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約單號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'appointment_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'appointment_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人電話(車主)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'customer_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人(車主)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'customer_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用人(手機)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'driver_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用人(駕駛)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'driver_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車身碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'vin_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportAppointment', @level2type = N'COLUMN', @level2name = N'ia_id';

