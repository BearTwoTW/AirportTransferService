CREATE TABLE [dbo].[CarTypeExteriorPrice] (
    [cre_userid]     VARCHAR (50)    NULL,
    [cre_time]       DATETIME        NULL,
    [upd_userid]     VARCHAR (50)    NULL,
    [upd_time]       DATETIME        NULL,
    [ctep_id]        INT             IDENTITY (1, 1) NOT NULL,
    [ctf_id]         INT             NULL,
    [ce_id]          INT             NULL,
    [exterior_price] DECIMAL (10, 2) NULL,
    [exterior_cost]  DECIMAL (10, 2) NULL,
    [valid_date]     DATE            NULL,
    [invalid_date]   DATE            NULL,
    CONSTRAINT [PK__CarTypeE__5B88D74D8BB80A9A] PRIMARY KEY CLUSTERED ([ctep_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'不可受訂起始日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeExteriorPrice', @level2type = N'COLUMN', @level2name = N'invalid_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'可受訂起始日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeExteriorPrice', @level2type = N'COLUMN', @level2name = N'valid_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝成本', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeExteriorPrice', @level2type = N'COLUMN', @level2name = N'exterior_cost';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝加價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeExteriorPrice', @level2type = N'COLUMN', @level2name = N'exterior_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝顏色對照流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeExteriorPrice', @level2type = N'COLUMN', @level2name = N'ce_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型規格對照流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeExteriorPrice', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeExteriorPrice', @level2type = N'COLUMN', @level2name = N'ctep_id';

