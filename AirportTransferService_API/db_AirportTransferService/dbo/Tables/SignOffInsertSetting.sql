CREATE TABLE [dbo].[SignOffInsertSetting] (
    [cre_userid]      VARCHAR (50)    NULL,
    [cre_time]        DATETIME        NULL,
    [upd_userid]      VARCHAR (50)    NULL,
    [upd_time]        DATETIME        NULL,
    [sois_id]         INT             IDENTITY (1, 1) NOT NULL,
    [sosm_id]         VARCHAR (50)    NULL,
    [ul_id]           INT             NULL,
    [insert_position] DECIMAL (10, 2) NULL,
    PRIMARY KEY CLUSTERED ([sois_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '插入位置', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffInsertSetting', @level2type = N'COLUMN', @level2name = N'insert_position';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '職務流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffInsertSetting', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffInsertSetting', @level2type = N'COLUMN', @level2name = N'sosm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核插入規則設定流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffInsertSetting', @level2type = N'COLUMN', @level2name = N'sois_id';

