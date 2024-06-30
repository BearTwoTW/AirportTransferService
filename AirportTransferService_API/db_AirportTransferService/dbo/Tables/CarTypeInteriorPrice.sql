CREATE TABLE [dbo].[CarTypeInteriorPrice] (
    [cre_userid]     VARCHAR (50)    NULL,
    [cre_time]       DATETIME        NULL,
    [upd_userid]     VARCHAR (50)    NULL,
    [upd_time]       DATETIME        NULL,
    [ctip_id]        INT             IDENTITY (1, 1) NOT NULL,
    [ctf_id]         INT             NULL,
    [ci_id]          INT             NULL,
    [interior_price] DECIMAL (10, 2) NULL,
    [interior_cost]  DECIMAL (10, 2) NULL,
    [valid_date]     DATE            NULL,
    [invalid_date]   DATE            NULL,
    CONSTRAINT [PK__CarTypeI__CAE1273B52287CD6] PRIMARY KEY CLUSTERED ([ctip_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'不可受訂起始日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeInteriorPrice', @level2type = N'COLUMN', @level2name = N'invalid_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'可受訂起始日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeInteriorPrice', @level2type = N'COLUMN', @level2name = N'valid_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝成本', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeInteriorPrice', @level2type = N'COLUMN', @level2name = N'interior_cost';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝加價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeInteriorPrice', @level2type = N'COLUMN', @level2name = N'interior_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝顏色對照流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeInteriorPrice', @level2type = N'COLUMN', @level2name = N'ci_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型規格對照流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeInteriorPrice', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeInteriorPrice', @level2type = N'COLUMN', @level2name = N'ctip_id';

