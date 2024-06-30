CREATE TABLE [dbo].[EC_CustomerBonusImportMaster] (
    [cre_userid]    VARCHAR (50)   NULL,
    [cre_time]      DATETIME       NULL,
    [upd_userid]    VARCHAR (50)   NULL,
    [upd_time]      DATETIME       NULL,
    [ec_cbim_id]    VARCHAR (50)   NOT NULL,
    [import_userid] VARCHAR (50)   NULL,
    [import_time]   DATETIME       NULL,
    [note]          NVARCHAR (255) NULL,
    CONSTRAINT [PK_EC_CustomerBonusImportMaster] PRIMARY KEY CLUSTERED ([ec_cbim_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯入時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportMaster', @level2type = N'COLUMN', @level2name = N'import_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯入使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportMaster', @level2type = N'COLUMN', @level2name = N'import_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員紅利紀錄匯入主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportMaster', @level2type = N'COLUMN', @level2name = N'ec_cbim_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員紅利匯入紀錄主項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusImportMaster';

