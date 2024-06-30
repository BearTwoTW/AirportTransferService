CREATE TABLE [dbo].[EC_LINEConfirmResponse] (
    [id]              INT            IDENTITY (1, 1) NOT NULL,
    [orderId]         NVARCHAR (50)  NOT NULL,
    [LPOrderID]       NVARCHAR (50)  NOT NULL,
    [returnCode]      VARCHAR (4)    NOT NULL,
    [returnMessage]   VARCHAR (50)   NOT NULL,
    [ConfirmRseponse] NVARCHAR (MAX) NULL,
    [cre_time]        VARCHAR (14)   NOT NULL,
    CONSTRAINT [PK_EC_LINEConfirmResponse] PRIMARY KEY CLUSTERED ([id] ASC)
);

