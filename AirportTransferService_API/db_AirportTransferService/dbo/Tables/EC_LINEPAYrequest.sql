CREATE TABLE [dbo].[EC_LINEPAYrequest] (
    [id]        INT            IDENTITY (1, 1) NOT NULL,
    [orderid]   NVARCHAR (50)  NOT NULL,
    [resultMsg] NVARCHAR (MAX) NULL,
    [cre_time]  VARCHAR (14)   NOT NULL,
    CONSTRAINT [PK_EC_LINEPAYrequest] PRIMARY KEY CLUSTERED ([id] ASC)
);

