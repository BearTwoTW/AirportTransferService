CREATE TABLE [dbo].[EC_CustomerSigninLog] (
    [Id]          VARCHAR (50) NOT NULL,
    [customer_id] VARCHAR (50) NULL,
    [signin_time] DATETIME     NULL,
    [web_code]    VARCHAR (14) NULL,
    [app_code]    VARCHAR (14) NULL,
    [google_id]   VARCHAR (50) NULL,
    [facebook_id] VARCHAR (50) NULL,
    [line_id]     VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

