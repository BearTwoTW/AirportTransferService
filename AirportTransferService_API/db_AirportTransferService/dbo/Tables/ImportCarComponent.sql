CREATE TABLE [dbo].[ImportCarComponent] (
    [cre_userid]     VARCHAR (50)    NULL,
    [cre_time]       DATETIME        NULL,
    [upd_userid]     VARCHAR (50)    NULL,
    [upd_time]       DATETIME        NULL,
    [id]             INT             IDENTITY (1, 1) NOT NULL,
    [component_type] VARCHAR (255)   NULL,
    [front_code]     VARCHAR (50)    NULL,
    [mid_code]       VARCHAR (50)    NULL,
    [back_code]      VARCHAR (50)    NULL,
    [component_name] NVARCHAR (255)  NULL,
    [service_price]  DECIMAL (10, 2) NULL,
    [newcar_price]   DECIMAL (10, 2) NULL,
    [valid_date]     DATE            NULL,
    [stop_sale_date] DATE            NULL,
    CONSTRAINT [PK__ImportCa__3213E83F34D21458] PRIMARY KEY CLUSTERED ([id] ASC)
);

