CREATE TABLE [dbo].[TI_MatchExcelDetail] (
    [cre_userid]    VARCHAR (50)   NULL,
    [cre_time]      DATETIME       NULL,
    [upd_userid]    VARCHAR (50)   NULL,
    [upd_time]      DATETIME       NULL,
    [med_id]        INT            IDENTITY (1, 1) NOT NULL,
    [mem_id]        VARCHAR (50)   NOT NULL,
    [column_name]   NVARCHAR (255) NULL,
    [is_encryption] VARCHAR (1)    NULL,
    [is_require]    VARCHAR (1)    NULL,
    [data_type]     VARCHAR (50)   NULL,
    [is_key]        VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([med_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否唯一值', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelDetail', @level2type = N'COLUMN', @level2name = N'is_key';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '資料型態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelDetail', @level2type = N'COLUMN', @level2name = N'data_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '欄位是否必填', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelDetail', @level2type = N'COLUMN', @level2name = N'is_require';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '欄位是否加密', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelDetail', @level2type = N'COLUMN', @level2name = N'is_encryption';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '欄位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelDetail', @level2type = N'COLUMN', @level2name = N'column_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelDetail', @level2type = N'COLUMN', @level2name = N'mem_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TI_MatchExcelDetail', @level2type = N'COLUMN', @level2name = N'med_id';

