CREATE TABLE [dbo].[PDIProcedureMaster] (
    [cre_userid]               VARCHAR (50)   NULL,
    [cre_time]                 DATETIME       NULL,
    [upd_userid]               VARCHAR (50)   NULL,
    [upd_time]                 DATETIME       NULL,
    [pdi_pm_id]                VARCHAR (50)   NOT NULL,
    [cs_id]                    VARCHAR (50)   NULL,
    [procedure_audit_status]   VARCHAR (50)   NULL,
    [finish_audit_status]      VARCHAR (50)   NULL,
    [note]                     NVARCHAR (255) NULL,
    [isvalid]                  VARCHAR (1)    NULL,
    [workstation_audit_status] VARCHAR (50)   NULL,
    [outer_wom_code]           NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([pdi_pm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外部工單號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureMaster', @level2type = N'COLUMN', @level2name = N'outer_wom_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工作站審核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureMaster', @level2type = N'COLUMN', @level2name = N'workstation_audit_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否有效', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureMaster', @level2type = N'COLUMN', @level2name = N'isvalid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '完成審核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureMaster', @level2type = N'COLUMN', @level2name = N'finish_audit_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '流程審核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureMaster', @level2type = N'COLUMN', @level2name = N'procedure_audit_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureMaster', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI流程主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureMaster', @level2type = N'COLUMN', @level2name = N'pdi_pm_id';

