CREATE TABLE [dbo].[CarXCustomerXAppointment] (
    [cre_userid]       VARCHAR (50)  NULL,
    [cre_time]         DATETIME      NULL,
    [upd_userid]       VARCHAR (50)  NULL,
    [upd_time]         DATETIME      NULL,
    [cXcXa_id]         INT           IDENTITY (1, 1) NOT NULL,
    [vin_no]           VARCHAR (50)  NULL,
    [license_plate]    VARCHAR (50)  NULL,
    [customer_name]    VARCHAR (255) NULL,
    [appointment_time] DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([cXcXa_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarXCustomerXAppointment', @level2type = N'COLUMN', @level2name = N'appointment_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車主姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarXCustomerXAppointment', @level2type = N'COLUMN', @level2name = N'customer_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarXCustomerXAppointment', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車身碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarXCustomerXAppointment', @level2type = N'COLUMN', @level2name = N'vin_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarXCustomerXAppointment', @level2type = N'COLUMN', @level2name = N'cXcXa_id';

