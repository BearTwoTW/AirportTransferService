CREATE TABLE [dbo].[EC_CustomerBonusLog] (
    [cre_userid]   VARCHAR (50)   NULL,
    [cre_time]     DATETIME       NULL,
    [upd_userid]   VARCHAR (50)   NULL,
    [upd_time]     DATETIME       NULL,
    [id]           INT            IDENTITY (1, 1) NOT NULL,
    [ec_cbs_id]    VARCHAR (50)   NULL,
    [source_type]  VARCHAR (50)   NULL,
    [source_id]    VARCHAR (50)   NULL,
    [customer_id]  VARCHAR (50)   NULL,
    [bonus]        INT            NULL,
    [expired_date] DATE           NULL,
    [note]         NVARCHAR (255) NULL,
    CONSTRAINT [PK_EC_CustomerBonusLog] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusLog', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到期日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusLog', @level2type = N'COLUMN', @level2name = N'expired_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusLog', @level2type = N'COLUMN', @level2name = N'bonus';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusLog', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'來源流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusLog', @level2type = N'COLUMN', @level2name = N'source_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'來源種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusLog', @level2type = N'COLUMN', @level2name = N'source_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員紅利庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusLog', @level2type = N'COLUMN', @level2name = N'ec_cbs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusLog', @level2type = N'COLUMN', @level2name = N'id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員紅利紀錄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerBonusLog';

