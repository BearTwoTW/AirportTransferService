CREATE TABLE [dbo].[TI_MatchExcelMaster] (
    [cre_userid]         VARCHAR (50)   NULL,
    [cre_time]           DATETIME       NULL,
    [upd_userid]         VARCHAR (50)   NULL,
    [upd_time]           DATETIME       NULL,
    [mem_id]             VARCHAR (50)   NOT NULL,
    [TI_type]            NVARCHAR (255) NULL,
    [TI_table_name]      NVARCHAR (255) NULL,
    [source_table_name]  NVARCHAR (255) NULL,
    [source_table_PK]    NVARCHAR (255) NULL,
    [sys_column_name1]   NVARCHAR (255) NULL,
    [excel_column_name1] NVARCHAR (255) NULL,
    [sys_column_name2]   NVARCHAR (255) NULL,
    [excel_column_name2] NVARCHAR (255) NULL,
    [TI_day_alert]       INT            NULL,
    PRIMARY KEY CLUSTERED ([mem_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪天數提醒(幾天內要電訪)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'TI_day_alert';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'excel欄位2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'excel_column_name2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '系統欄位2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'sys_column_name2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'excel欄位1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'excel_column_name1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '系統欄位1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'sys_column_name1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '來源資料表主鍵欄位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'source_table_PK';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '來源資料表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'source_table_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪項目資料表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'TI_table_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '電訪項目', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'TI_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelMaster', @level2type = N'COLUMN', @level2name = N'mem_id';

