CREATE TABLE [dbo].[TollItemSetting] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [tis_id]     VARCHAR (50)   NOT NULL,
    [tis_type]   NVARCHAR (50)  NULL,
    [tis_code]   NVARCHAR (50)  NULL,
    [tis_name]   NVARCHAR (255) NULL,
    [note]       NVARCHAR (255) NULL,
    [visible]    VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([tis_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSetting', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSetting', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '收費項目名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSetting', @level2type = N'COLUMN', @level2name = N'tis_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '收費項目代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSetting', @level2type = N'COLUMN', @level2name = N'tis_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '收費項目類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSetting', @level2type = N'COLUMN', @level2name = N'tis_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '收費項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSetting', @level2type = N'COLUMN', @level2name = N'tis_id';

