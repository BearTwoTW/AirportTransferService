CREATE TABLE [dbo].[MRM] (
    [Plant]         VARCHAR (10)  NOT NULL,
    [mrm_id]        VARCHAR (50)  NOT NULL,
    [license_plate] VARCHAR (50)  NOT NULL,
    [vin_no]        VARCHAR (50)  NULL,
    [status]        VARCHAR (4)   NULL,
    [items]         VARCHAR (40)  NULL,
    [mileage]       INT           NULL,
    [technician]    VARCHAR (50)  NULL,
    [suggestions]   VARCHAR (MAX) NULL,
    [ESATime]       DATETIME      NULL,
    [PSCTime]       DATETIME      NULL,
    [SCTime]        DATETIME      NULL,
    [PCTime]        DATETIME      NULL,
    [reception]     VARCHAR (50)  NULL,
    [customer]      VARCHAR (40)  NULL,
    [address]       VARCHAR (80)  NULL,
    [contacter]     VARCHAR (20)  NULL,
    [phone_O]       VARCHAR (20)  NULL,
    [phone_H]       VARCHAR (20)  NULL,
    [cellphone]     VARCHAR (20)  NULL,
    [note]          VARCHAR (200) NULL,
    [Notice]        VARCHAR (10)  NULL,
    CONSTRAINT [PK_Maintenance] PRIMARY KEY CLUSTERED ([Plant] ASC, [mrm_id] ASC, [license_plate] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計交車時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MRM', @level2type = N'COLUMN', @level2name = N'PSCTime';

