CREATE TABLE [dbo].[Files] (
    [cre_userid]  VARCHAR (50)   NULL,
    [cre_time]    DATETIME       NULL,
    [upd_userid]  VARCHAR (50)   NULL,
    [upd_time]    DATETIME       NULL,
    [file_id]     INT            IDENTITY (1, 1) NOT NULL,
    [file_code]   VARCHAR (50)   NULL,
    [belong]      VARCHAR (100)  NULL,
    [id]          VARCHAR (100)  NULL,
    [type]        VARCHAR (100)  NULL,
    [path]        VARCHAR (255)  NULL,
    [isvalid]     VARCHAR (1)    NULL,
    [custom_key1] VARCHAR (100)  NULL,
    [custom_key2] VARCHAR (100)  NULL,
    [seq]         INT            NULL,
    [url]         NVARCHAR (MAX) NULL,
    CONSTRAINT [PK__Files__07D884C60E308F9C] PRIMARY KEY CLUSTERED ([file_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂key2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'custom_key2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂key1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'custom_key1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否有效', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'isvalid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'圖片路徑', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'path';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'圖片種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'所屬流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'所屬類別(Customer、ConsultMaster)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'belong';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檔案號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'file_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檔案流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'file_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'連結', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'url';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Files', @level2type = N'COLUMN', @level2name = N'seq';

