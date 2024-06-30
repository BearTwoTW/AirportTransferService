CREATE TABLE [dbo].[Supplier] (
    [cre_userid]    VARCHAR (10)   NULL,
    [cre_time]      DATETIME       NULL,
    [upd_userid]    VARCHAR (10)   NULL,
    [upd_time]      DATETIME       NULL,
    [supplier_id]   NVARCHAR (50)  NOT NULL,
    [supplier_code] NVARCHAR (50)  NULL,
    [supplier_type] VARCHAR (50)   NULL,
    [supplier_name] NVARCHAR (255) NULL,
    [note]          NVARCHAR (255) NULL,
    [is_visible]    VARCHAR (1)    NULL,
    CONSTRAINT [PK_supplier] PRIMARY KEY CLUSTERED ([supplier_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否隱藏', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Supplier', @level2type = N'COLUMN', @level2name = N'is_visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Supplier', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'供應商名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Supplier', @level2type = N'COLUMN', @level2name = N'supplier_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'供應商類型(代碼檔)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Supplier', @level2type = N'COLUMN', @level2name = N'supplier_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'供應商代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Supplier', @level2type = N'COLUMN', @level2name = N'supplier_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'供應商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Supplier', @level2type = N'COLUMN', @level2name = N'supplier_id';

