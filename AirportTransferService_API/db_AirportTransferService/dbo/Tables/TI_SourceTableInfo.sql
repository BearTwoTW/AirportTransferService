CREATE TABLE [dbo].[TI_SourceTableInfo] (
    [cre_userid]               VARCHAR (50)   NULL,
    [cre_time]                 DATETIME       NULL,
    [upd_userid]               VARCHAR (50)   NULL,
    [upd_time]                 DATETIME       NULL,
    [id]                       INT            IDENTITY (1, 1) NOT NULL,
    [source_table_name]        NVARCHAR (255) NULL,
    [source_table_description] NVARCHAR (255) NULL,
    [source_table_PK]          NVARCHAR (255) NULL,
    [usable_columns]           NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '可對照欄位們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_SourceTableInfo', @level2type = N'COLUMN', @level2name = N'usable_columns';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '來源資料表主鍵欄位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_SourceTableInfo', @level2type = N'COLUMN', @level2name = N'source_table_PK';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '來源資料表說明', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_SourceTableInfo', @level2type = N'COLUMN', @level2name = N'source_table_description';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '來源資料表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_SourceTableInfo', @level2type = N'COLUMN', @level2name = N'source_table_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_SourceTableInfo', @level2type = N'COLUMN', @level2name = N'id';

