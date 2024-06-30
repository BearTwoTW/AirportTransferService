CREATE TABLE [dbo].[MRA] (
    [Plant]         VARCHAR (10)   NOT NULL,
    [mra_id]        VARCHAR (50)   NOT NULL,
    [license_plate] VARCHAR (50)   NULL,
    [ESATime]       DATETIME       NULL,
    [SCTime]        DATETIME       NULL,
    [technician]    VARCHAR (50)   NULL,
    [suggestions]   NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_MRA] PRIMARY KEY CLUSTERED ([Plant] ASC, [mra_id] ASC)
);

