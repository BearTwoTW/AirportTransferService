CREATE TABLE [dbo].[InvoiceMachine] (
    [Machine_id]                   VARCHAR (10)   NOT NULL,
    [Machine_name]                 NVARCHAR (50)  NULL,
    [ECloud_init_path]             NVARCHAR (255) NULL,
    [ECloud_PosInfo_box_serail]    VARCHAR (20)   NULL,
    [ECloud_PosInfo_Environment]   VARCHAR (10)   NULL,
    [ECloud_PosInfo_inc_id]        VARCHAR (20)   NULL,
    [ECloud_PosInfo_pwd]           VARCHAR (20)   NULL,
    [ECloud_PosInfo_username]      VARCHAR (20)   NULL,
    [ECloud_Printer_baudrate]      VARCHAR (10)   NULL,
    [ECloud_Printer_logopath]      VARCHAR (255)  NULL,
    [ECloud_Printer_logoURL]       VARCHAR (255)  NULL,
    [ECloud_Printer_port]          VARCHAR (10)   NULL,
    [ECloud_Printer_printName]     VARCHAR (20)   NULL,
    [ECloud_SalesInfo_aes_key]     VARCHAR (50)   NULL,
    [ECloud_SalesInfo_bussinessID] VARCHAR (10)   NULL,
    [ECloud_SalesInfo_sellerID]    VARCHAR (10)   NULL,
    [ECloud_SalesInfo_store_ID]    VARCHAR (10)   NULL,
    CONSTRAINT [PK_InvoiceSetting] PRIMARY KEY CLUSTERED ([Machine_id] ASC)
);

