CREATE TABLE [dbo].[PSIMaster] (
    [psi_id]       VARCHAR (50)  NOT NULL,
    [cre_time]     DATETIME      NULL,
    [balance_time] VARCHAR (6)   NULL,
    [cre_userid]   VARCHAR (50)  NULL,
    [note]         VARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([psi_id] ASC)
);

