CREATE TABLE [dbo].[SystemSetting] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [ssm_id]     INT            IDENTITY (1, 1) NOT NULL,
    [ssm_name]   VARCHAR (255)  NULL,
    [value_json] NVARCHAR (MAX) NULL,
    [note]       NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ssm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SystemSetting', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容(看各種情況使用)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SystemSetting', @level2type = N'COLUMN', @level2name = N'value_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主項名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SystemSetting', @level2type = N'COLUMN', @level2name = N'ssm_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SystemSetting', @level2type = N'COLUMN', @level2name = N'ssm_id';

