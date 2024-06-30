CREATE TABLE [dbo].[ColumnUpdateLog] (
    [cre_userid]       VARCHAR (50)   NULL,
    [cre_time]         DATETIME       NULL,
    [cul_id]           INT            IDENTITY (1, 1) NOT NULL,
    [table_name]       VARCHAR (50)   NULL,
    [key_value]        VARCHAR (50)   NULL,
    [column_name]      VARCHAR (50)   NULL,
    [column_old_value] NVARCHAR (400) NULL,
    [column_new_value] NVARCHAR (400) NULL,
    PRIMARY KEY CLUSTERED ([cul_id] ASC)
);




GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '欄位新值', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ColumnUpdateLog', @level2type = N'COLUMN', @level2name = N'column_new_value';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '欄位舊值', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ColumnUpdateLog', @level2type = N'COLUMN', @level2name = N'column_old_value';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '欄位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ColumnUpdateLog', @level2type = N'COLUMN', @level2name = N'column_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '資料表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ColumnUpdateLog', @level2type = N'COLUMN', @level2name = N'table_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ColumnUpdateLog', @level2type = N'COLUMN', @level2name = N'cul_id';

