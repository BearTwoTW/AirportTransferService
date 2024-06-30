CREATE TABLE [dbo].[Appointment] (
    [cre_userid]       VARCHAR (50)   NULL,
    [cre_time]         DATETIME       NULL,
    [upd_userid]       VARCHAR (50)   NULL,
    [upd_time]         DATETIME       NULL,
    [appointment_id]   VARCHAR (50)   NOT NULL,
    [car_id]           VARCHAR (50)   NULL,
    [customer_id]      VARCHAR (50)   NULL,
    [appointment_no]   VARCHAR (50)   NULL,
    [appointment_time] DATETIME       NULL,
    [note]             NVARCHAR (MAX) NULL,
    [content]          NVARCHAR (MAX) NULL,
    [Plant]            VARCHAR (10)   NULL,
    [mrm_id]           VARCHAR (12)   NULL,
    [mra_id]           VARCHAR (12)   NULL,
    CONSTRAINT [PK__Appointm__A50828FCA28D44A7] PRIMARY KEY CLUSTERED ([appointment_id] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_Appointment_no]
    ON [dbo].[Appointment]([appointment_no] ASC);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Appointment', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Appointment', @level2type = N'COLUMN', @level2name = N'appointment_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約單號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Appointment', @level2type = N'COLUMN', @level2name = N'appointment_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車主流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Appointment', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車籍流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Appointment', @level2type = N'COLUMN', @level2name = N'car_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Appointment', @level2type = N'COLUMN', @level2name = N'appointment_id';

