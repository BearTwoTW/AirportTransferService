CREATE TABLE [dbo].[ECGreenPay_Log] (
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [l_id]        INT            DEFAULT ((0)) NULL,
    [cre_userid]  VARCHAR (50)   DEFAULT ('') NULL,
    [cre_time]    DATETIME       DEFAULT (getdate()) NULL,
    [customer_id] VARCHAR (50)   DEFAULT ('') NULL,
    [JSONdata]    NVARCHAR (MAX) DEFAULT ('') NULL,
    [type]        NVARCHAR (50)  DEFAULT ('') NULL,
    CONSTRAINT [PK_ECGreenPay_Log] PRIMARY KEY CLUSTERED ([id] ASC)
);

