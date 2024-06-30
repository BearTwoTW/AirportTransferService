CREATE TABLE [dbo].[PDIProcedureWorkstation] (
    [cre_userid]       VARCHAR (50)   NULL,
    [cre_time]         DATETIME       NULL,
    [upd_userid]       VARCHAR (50)   NULL,
    [upd_time]         DATETIME       NULL,
    [pdi_pw_id]        INT            IDENTITY (1, 1) NOT NULL,
    [pdi_pm_id]        VARCHAR (50)   NULL,
    [pdi_ws_id]        VARCHAR (50)   NULL,
    [pdi_ws_name]      NVARCHAR (255) NULL,
    [appointment_time] DATETIME       NULL,
    [start_time]       DATETIME       NULL,
    [end_time]         DATETIME       NULL,
    [qrcode]           NVARCHAR (255) NULL,
    [note]             NVARCHAR (255) NULL,
    [seq]              INT            NULL,
    CONSTRAINT [PK__PDIProce__95F85557CF32DFD0] PRIMARY KEY CLUSTERED ([pdi_pw_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'QRCode', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'qrcode';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '結束時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'end_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'開工時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'start_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預約時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'appointment_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI工作站名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'pdi_ws_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI工作站流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'pdi_ws_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI流程主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'pdi_pm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI流程工作站流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProcedureWorkstation', @level2type = N'COLUMN', @level2name = N'pdi_pw_id';

