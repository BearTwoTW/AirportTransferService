CREATE TABLE [dbo].[LackMaterialDetail] (
    [cre_userid]   VARCHAR (50)   NULL,
    [cre_time]     DATETIME       NULL,
    [upd_userid]   VARCHAR (50)   NULL,
    [upd_time]     DATETIME       NULL,
    [lmd_id]       VARCHAR (50)   NOT NULL,
    [lmm_id]       VARCHAR (50)   NULL,
    [commodity_id] VARCHAR (50)   NULL,
    [count]        DECIMAL (18)   NULL,
    [note]         NVARCHAR (255) NULL,
    CONSTRAINT [PK_LackMaterialDetail] PRIMARY KEY CLUSTERED ([lmd_id] ASC)
);

