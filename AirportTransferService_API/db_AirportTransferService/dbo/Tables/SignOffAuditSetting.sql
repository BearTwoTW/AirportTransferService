CREATE TABLE [dbo].[SignOffAuditSetting] (
    [cre_userid] VARCHAR (50) NULL,
    [cre_time]   DATETIME     NULL,
    [upd_userid] VARCHAR (50) NULL,
    [upd_time]   DATETIME     NULL,
    [soas_id]    INT          IDENTITY (1, 1) NOT NULL,
    [sosm_id]    VARCHAR (50) NULL,
    [ul_id]      INT          NULL,
    [audit_type] VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([soas_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '審核類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffAuditSetting', @level2type = N'COLUMN', @level2name = N'audit_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '職務流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffAuditSetting', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核設定主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffAuditSetting', @level2type = N'COLUMN', @level2name = N'sosm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '簽核審核規則設定流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SignOffAuditSetting', @level2type = N'COLUMN', @level2name = N'soas_id';

