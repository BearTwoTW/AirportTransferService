CREATE TABLE [dbo].[AuditProcedure] (
    [cre_userid]         VARCHAR (50)   NULL,
    [cre_time]           DATETIME       NULL,
    [upd_userid]         VARCHAR (50)   NULL,
    [upd_time]           DATETIME       NULL,
    [audit_procedure_id] INT            IDENTITY (1, 1) NOT NULL,
    [type]               VARCHAR (50)   NULL,
    [id]                 VARCHAR (50)   NULL,
    [audit_json]         VARCHAR (MAX)  NULL,
    [status]             VARCHAR (50)   NULL,
    [note]               NVARCHAR (MAX) NULL,
    CONSTRAINT [PK__LeaveAud__3213E83FB0C1BFA7] PRIMARY KEY CLUSTERED ([audit_procedure_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AuditProcedure', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核流程狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AuditProcedure', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核進度json', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AuditProcedure', @level2type = N'COLUMN', @level2name = N'audit_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AuditProcedure', @level2type = N'COLUMN', @level2name = N'id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'種類(請假、銷假、加班、調班)之類的', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AuditProcedure', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核流程流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AuditProcedure', @level2type = N'COLUMN', @level2name = N'audit_procedure_id';

