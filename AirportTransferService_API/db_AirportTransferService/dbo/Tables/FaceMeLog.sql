CREATE TABLE [dbo].[FaceMeLog] (
    [cre_userid]  VARCHAR (50)   NULL,
    [cre_time]    DATETIME       NULL,
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [json]        NVARCHAR (MAX) NULL,
    [image_path]  NVARCHAR (MAX) NULL,
    [customer_id] VARCHAR (50)   NULL,
    [position_id] VARCHAR (50)   NULL,
    [camera_name] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'攝影機名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'FaceMeLog', @level2type = N'COLUMN', @level2name = N'camera_name';

