CREATE TABLE [dbo].[UserSalarySettingMaster] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [ussm_id]    VARCHAR (50)   NOT NULL,
    [ussm_name]  NVARCHAR (255) NULL,
    [note]       NVARCHAR (255) NULL,
    [disable]    VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([ussm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否啟用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingMaster', @level2type = N'COLUMN', @level2name = N'disable';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者薪資設定主項名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingMaster', @level2type = N'COLUMN', @level2name = N'ussm_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者薪資設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingMaster', @level2type = N'COLUMN', @level2name = N'ussm_id';

