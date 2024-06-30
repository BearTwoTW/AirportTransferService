CREATE TABLE [dbo].[ECPayGreenAIO_LOG] (
    [id]            INT            IDENTITY (1, 1) NOT NULL,
    [ec_order_id]   VARCHAR (50)   NULL,
    [ec_order_code] VARCHAR (50)   NULL,
    [retMsg]        NVARCHAR (MAX) NULL,
    [cre_dt]        DATETIME       DEFAULT (getdate()) NULL
);

