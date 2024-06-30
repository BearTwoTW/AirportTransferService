CREATE TABLE [dbo].[WorkOrderTurnoverRepairDetail] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [wotrd_id]   INT            IDENTITY (1, 1) NOT NULL,
    [wom_id]     VARCHAR (50)   NULL,
    [trs_id]     VARCHAR (50)   NULL,
    [trs_code]   NVARCHAR (50)  NULL,
    [trs_name]   NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([wotrd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '交修項目名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderTurnoverRepairDetail', @level2type = N'COLUMN', @level2name = N'trs_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '交修項目代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderTurnoverRepairDetail', @level2type = N'COLUMN', @level2name = N'trs_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '交修項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderTurnoverRepairDetail', @level2type = N'COLUMN', @level2name = N'trs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderTurnoverRepairDetail', @level2type = N'COLUMN', @level2name = N'wom_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工單交修項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderTurnoverRepairDetail', @level2type = N'COLUMN', @level2name = N'wotrd_id';

