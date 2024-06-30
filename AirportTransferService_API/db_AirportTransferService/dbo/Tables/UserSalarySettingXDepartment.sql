CREATE TABLE [dbo].[UserSalarySettingXDepartment] (
    [cre_userid]    VARCHAR (50) NULL,
    [cre_time]      DATETIME     NULL,
    [upd_userid]    VARCHAR (50) NULL,
    [upd_time]      DATETIME     NULL,
    [ussxd_id]      INT          IDENTITY (1, 1) NOT NULL,
    [ussm_id]       VARCHAR (50) NULL,
    [department_id] VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([ussxd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '部門流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingXDepartment', @level2type = N'COLUMN', @level2name = N'department_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者薪資設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingXDepartment', @level2type = N'COLUMN', @level2name = N'ussm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserSalarySettingXDepartment', @level2type = N'COLUMN', @level2name = N'ussxd_id';

