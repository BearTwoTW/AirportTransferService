CREATE TABLE [dbo].[TestDrive] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [td_id]      INT            IDENTITY (1, 1) NOT NULL,
    [user_id]    VARCHAR (50)   NULL,
    [test_date]  DATE           NULL,
    [test_time]  TIME (0)       NULL,
    [name]       NVARCHAR (50)  NULL,
    [gender]     VARCHAR (5)    NULL,
    [remark]     NVARCHAR (MAX) NULL,
    [tdc_id]     VARCHAR (50)   NULL,
    [ul_id]      INT            NULL,
    CONSTRAINT [PK_TestDrive] PRIMARY KEY CLUSTERED ([td_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'性別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'gender';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'試乘時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'test_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'試乘日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'test_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'試乘編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'td_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'試乘', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TestDrive';

