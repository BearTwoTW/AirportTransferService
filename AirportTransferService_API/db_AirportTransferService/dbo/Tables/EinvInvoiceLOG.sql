CREATE TABLE [dbo].[EinvInvoiceLOG] (
    [cre_userid]  VARCHAR (50)   DEFAULT ('') NULL,
    [cre_time]    DATETIME       DEFAULT ('') NULL,
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [einv_id]     INT            DEFAULT ((0)) NULL,
    [ec_order_id] VARCHAR (50)   DEFAULT ('') NULL,
    [JSONData]    NVARCHAR (MAX) DEFAULT ('') NULL,
    [type]        NVARCHAR (20)  DEFAULT ('') NULL,
    CONSTRAINT [PK_EinvInvoiceLOG] PRIMARY KEY CLUSTERED ([id] ASC)
);

