CREATE TABLE [dbo].[SignOffSettingDetail] (
    [cre_userid]    VARCHAR (50)   NULL,
    [cre_time]      DATETIME       NULL,
    [upd_userid]    VARCHAR (50)   NULL,
    [upd_time]      DATETIME       NULL,
    [sosd_id]       VARCHAR (50)   NOT NULL,
    [sosm_id]       VARCHAR (50)   NULL,
    [column_name]   NVARCHAR (255) NULL,
    [is_encryption] VARCHAR (1)    NULL,
    [is_require]    VARCHAR (1)    NULL,
    [data_type]     VARCHAR (50)   NULL,
    [seq]           INT            NULL,
    [is_notice]     VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([sosd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否需通知', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetail', @level2type = N'COLUMN', @level2name = N'is_notice';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '順序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetail', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '資料型態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetail', @level2type = N'COLUMN', @level2name = N'data_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否必填', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetail', @level2type = N'COLUMN', @level2name = N'is_require';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否加密', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetail', @level2type = N'COLUMN', @level2name = N'is_encryption';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '欄位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetail', @level2type = N'COLUMN', @level2name = N'column_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetail', @level2type = N'COLUMN', @level2name = N'sosm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffSettingDetail', @level2type = N'COLUMN', @level2name = N'sosd_id';

