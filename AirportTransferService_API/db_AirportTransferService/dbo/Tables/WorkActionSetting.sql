CREATE TABLE [dbo].[WorkActionSetting] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [was_id]     VARCHAR (50)   NOT NULL,
    [was_type]   NVARCHAR (50)  NULL,
    [was_code]   NVARCHAR (50)  NULL,
    [was_name]   NVARCHAR (255) NULL,
    [note]       NVARCHAR (255) NULL,
    [visible]    VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([was_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkActionSetting', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkActionSetting', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '施工動作名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkActionSetting', @level2type = N'COLUMN', @level2name = N'was_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '施工動作代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkActionSetting', @level2type = N'COLUMN', @level2name = N'was_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '施工動作類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkActionSetting', @level2type = N'COLUMN', @level2name = N'was_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '施工動作流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkActionSetting', @level2type = N'COLUMN', @level2name = N'was_id';

