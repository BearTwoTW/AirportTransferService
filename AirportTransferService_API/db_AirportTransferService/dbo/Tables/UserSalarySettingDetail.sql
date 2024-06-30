CREATE TABLE [dbo].[UserSalarySettingDetail] (
    [cre_userid]  VARCHAR (50)   NULL,
    [cre_time]    DATETIME       NULL,
    [upd_userid]  VARCHAR (50)   NULL,
    [upd_time]    DATETIME       NULL,
    [ussd_id]     VARCHAR (50)   NOT NULL,
    [ussm_id]     VARCHAR (50)   NULL,
    [column_name] NVARCHAR (255) NULL,
    [data_type]   VARCHAR (50)   NULL,
    [visible]     VARCHAR (1)    NULL,
    [seq]         INT            NULL,
    CONSTRAINT [PK__UserSala__CD2C23ABFC75865B] PRIMARY KEY CLUSTERED ([ussd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '順序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingDetail', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingDetail', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '資料型態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingDetail', @level2type = N'COLUMN', @level2name = N'data_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '欄位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingDetail', @level2type = N'COLUMN', @level2name = N'column_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者薪資設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingDetail', @level2type = N'COLUMN', @level2name = N'ussm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者薪資設定細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingDetail', @level2type = N'COLUMN', @level2name = N'ussd_id';

