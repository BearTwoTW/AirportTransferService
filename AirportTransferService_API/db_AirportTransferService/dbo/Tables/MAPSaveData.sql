CREATE TABLE [dbo].[MAPSaveData] (
    [cre_userid]     VARCHAR (50)  NULL,
    [cre_time]       DATETIME      NULL,
    [upd_userid]     VARCHAR (50)  NULL,
    [upd_time]       DATETIME      NULL,
    [report_id]      INT           IDENTITY (1, 1) NOT NULL,
    [position_id]    VARCHAR (50)  NULL,
    [SA]             VARCHAR (6)   NULL,
    [report_name]    VARCHAR (50)  NULL,
    [report_JSON]    VARCHAR (MAX) NULL,
    [start_month]    VARCHAR (6)   NULL,
    [end_month]      VARCHAR (6)   NULL,
    [report_month]   VARCHAR (6)   NULL,
    [release]        VARCHAR (1)   NULL,
    [seal]           VARCHAR (1)   NULL,
    [calculate_type] VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([report_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'計算方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'calculate_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否封存', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'seal';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否發佈', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'release';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '報表月份', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'report_month';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '參考月份迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'end_month';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '參考月份起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'start_month';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '報表內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'report_JSON';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '報表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'report_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'SA', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'SA';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '廠別流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'SMT營銷活動計畫報表流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MAPSaveData', @level2type = N'COLUMN', @level2name = N'report_id';

