CREATE TABLE [dbo].[CarStockReserveLog] (
    [cre_userid]             VARCHAR (50)   NULL,
    [cre_time]               DATETIME       NULL,
    [upd_userid]             VARCHAR (50)   NULL,
    [upd_time]               DATETIME       NULL,
    [csrl_id]                INT            IDENTITY (1, 1) NOT NULL,
    [ct_id]                  INT            NULL,
    [ctf_id]                 INT            NULL,
    [ce_id]                  INT            NULL,
    [ci_id]                  INT            NULL,
    [year]                   INT            NULL,
    [status]                 NVARCHAR (255) NULL,
    [arrive_port_date_start] DATE           NULL,
    [arrive_port_date_end]   DATE           NULL,
    [cs_id]                  VARCHAR (50)   NULL,
    [reserve_user_id]        VARCHAR (8)    NULL,
    [reserve_reason]         NVARCHAR (255) NULL,
    [reserve_note]           NVARCHAR (255) NULL,
    [isagree]                VARCHAR (1)    NULL,
    [check_user_id]          VARCHAR (50)   NULL,
    [check_time]             DATETIME       NULL,
    [cancel_user_id]         VARCHAR (50)   NULL,
    [cancel_time]            DATETIME       NULL,
    CONSTRAINT [PK__CarStock__EA07C6161697FA92] PRIMARY KEY CLUSTERED ([csrl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '取消時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'cancel_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '取消使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'cancel_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '確認時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '確認使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'check_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否同意', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'isagree';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保留備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'reserve_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保留原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'reserve_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保留使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'reserve_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '預計到港日期迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'arrive_port_date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '預計到港日期起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'arrive_port_date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '內裝流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'ci_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '外裝流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'ce_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型規格流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'ct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車庫存保留紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStockReserveLog', @level2type = N'COLUMN', @level2name = N'csrl_id';

