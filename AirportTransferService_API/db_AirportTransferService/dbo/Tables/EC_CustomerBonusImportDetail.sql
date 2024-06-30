CREATE TABLE [dbo].[EC_CustomerBonusImportDetail] (
    [cre_userid]           VARCHAR (50)   NULL,
    [cre_time]             DATETIME       NULL,
    [upd_userid]           VARCHAR (50)   NULL,
    [upd_time]             DATETIME       NULL,
    [ec_cbid_id]           INT            IDENTITY (1, 1) NOT NULL,
    [ec_cbim_id]           VARCHAR (50)   NULL,
    [customer_id]          VARCHAR (50)   NULL,
    [bonus]                INT            NULL,
    [expired_date]         DATE           NULL,
    [outer_id]             VARCHAR (50)   NULL,
    [note]                 NVARCHAR (255) NULL,
    [is_import_success]    VARCHAR (2)    NULL,
    [import_failed_reason] NVARCHAR (255) NULL,
    CONSTRAINT [PK_EC_CustomerBonusImportDetail] PRIMARY KEY CLUSTERED ([ec_cbid_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯入失敗原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail', @level2type = N'COLUMN', @level2name = N'import_failed_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否匯入成功', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail', @level2type = N'COLUMN', @level2name = N'is_import_success';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外部識別碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail', @level2type = N'COLUMN', @level2name = N'outer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到期日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail', @level2type = N'COLUMN', @level2name = N'expired_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail', @level2type = N'COLUMN', @level2name = N'bonus';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員紅利紀錄匯入主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail', @level2type = N'COLUMN', @level2name = N'ec_cbim_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員紅利紀錄匯入細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail', @level2type = N'COLUMN', @level2name = N'ec_cbid_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員紅利匯入紀錄細項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportDetail';

