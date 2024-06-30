CREATE TABLE [dbo].[SignOffSettingMaster] (
    [cre_userid]    VARCHAR (10)   NULL,
    [cre_time]      DATETIME       NULL,
    [upd_userid]    VARCHAR (10)   NULL,
    [upd_time]      DATETIME       NULL,
    [sosm_id]       VARCHAR (50)   NOT NULL,
    [sosm_name]     NVARCHAR (255) NULL,
    [so_table_name] NVARCHAR (255) NULL,
    [type]          NVARCHAR (255) NULL,
    [disable]       VARCHAR (1)    NULL,
    CONSTRAINT [PK__SignOffS__F6159E8EE141EBEF] PRIMARY KEY CLUSTERED ([sosm_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否啟用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingMaster', @level2type = N'COLUMN', @level2name = N'disable';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核項目資料表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingMaster', @level2type = N'COLUMN', @level2name = N'so_table_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定主項名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingMaster', @level2type = N'COLUMN', @level2name = N'sosm_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingMaster', @level2type = N'COLUMN', @level2name = N'sosm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核流程類型(是否為系統設定的一種)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingMaster', @level2type = N'COLUMN', @level2name = N'type';

