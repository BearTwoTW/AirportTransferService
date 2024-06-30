CREATE TABLE [dbo].[ECPayGreenLogisticsLog] (
    [cre_userid]            NVARCHAR (255) NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            NVARCHAR (255) NULL,
    [upd_time]              DATETIME       NULL,
    [id]                    INT            NOT NULL,
    [ec_order_id]           VARCHAR (50)   NULL,
    [ec_order_logistics_id] VARCHAR (50)   NULL,
    [JSONtData]             NVARCHAR (MAX) NULL,
    [logisticsStep]         NVARCHAR (20)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

