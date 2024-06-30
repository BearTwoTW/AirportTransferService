CREATE TABLE [dbo].[OrderAuditLog] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [order_audit_id] INT            IDENTITY (1, 1) NOT NULL,
    [order_id]       VARCHAR (50)   NULL,
    [audit_status]   VARCHAR (50)   NULL,
    [audit_note]     NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([order_audit_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稽核備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAuditLog', @level2type = N'COLUMN', @level2name = N'audit_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稽核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAuditLog', @level2type = N'COLUMN', @level2name = N'audit_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單編號起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAuditLog', @level2type = N'COLUMN', @level2name = N'order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderAuditLog', @level2type = N'COLUMN', @level2name = N'order_audit_id';

