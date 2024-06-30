CREATE TABLE [dbo].[AutoNumber] (
    [number_name]    VARCHAR (50) NOT NULL,
    [current_prefix] VARCHAR (20) NOT NULL,
    [digits_width]   INT          NULL,
    [current_digits] INT          NULL,
    [value_interval] INT          NULL,
    [min_value]      INT          NULL,
    CONSTRAINT [PK_AutoNumber] PRIMARY KEY CLUSTERED ([number_name] ASC, [current_prefix] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最小值', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AutoNumber', @level2type = N'COLUMN', @level2name = N'min_value';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'增加單位', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AutoNumber', @level2type = N'COLUMN', @level2name = N'value_interval';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'目前編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AutoNumber', @level2type = N'COLUMN', @level2name = N'current_digits';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編碼長度', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AutoNumber', @level2type = N'COLUMN', @level2name = N'digits_width';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'前置字串', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AutoNumber', @level2type = N'COLUMN', @level2name = N'current_prefix';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'資料表名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AutoNumber', @level2type = N'COLUMN', @level2name = N'number_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自動編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'AutoNumber';

