CREATE TABLE [dbo].[CarSubsidyDetail] (
    [cre_userid] VARCHAR (50)    NULL,
    [cre_time]   DATETIME        NULL,
    [upd_userid] VARCHAR (50)    NULL,
    [upd_time]   DATETIME        NULL,
    [csd_id]     INT             IDENTITY (1, 1) NOT NULL,
    [csm_id]     VARCHAR (50)    NULL,
    [csc_id]     VARCHAR (50)    NULL,
    [price]      DECIMAL (10, 2) NULL,
    [visible]    VARCHAR (1)     NULL,
    PRIMARY KEY CLUSTERED ([csd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車補助條件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'csc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車補助主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'csm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車補助細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyDetail', @level2type = N'COLUMN', @level2name = N'csd_id';

