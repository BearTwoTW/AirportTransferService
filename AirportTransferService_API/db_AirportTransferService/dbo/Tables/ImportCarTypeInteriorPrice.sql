CREATE TABLE [dbo].[ImportCarTypeInteriorPrice] (
    [cre_userid]     VARCHAR (50)    NULL,
    [cre_time]       DATETIME        NULL,
    [id]             INT             IDENTITY (1, 1) NOT NULL,
    [car_type]       NVARCHAR (255)  NULL,
    [format_code]    NVARCHAR (255)  NULL,
    [interior_code]  NVARCHAR (255)  NULL,
    [interior_color] NVARCHAR (255)  NULL,
    [interior_price] DECIMAL (10, 2) NULL,
    [valid_date]     DATE            NULL,
    [invalid_date]   DATE            NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

