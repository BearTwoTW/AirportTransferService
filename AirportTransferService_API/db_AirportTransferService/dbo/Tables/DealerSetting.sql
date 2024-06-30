CREATE TABLE [dbo].[DealerSetting] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [ds_id]      INT            IDENTITY (1, 1) NOT NULL,
    [ds_code]    VARCHAR (10)   NULL,
    [ds_name]    NVARCHAR (255) NULL,
    [ds_dbname]  VARCHAR (50)   NULL,
    PRIMARY KEY CLUSTERED ([ds_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商資料庫名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'DealerSetting', @level2type = N'COLUMN', @level2name = N'ds_dbname';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'DealerSetting', @level2type = N'COLUMN', @level2name = N'ds_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'DealerSetting', @level2type = N'COLUMN', @level2name = N'ds_code';

