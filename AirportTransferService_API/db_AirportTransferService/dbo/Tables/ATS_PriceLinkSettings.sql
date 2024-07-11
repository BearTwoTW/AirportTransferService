﻿CREATE TABLE [dbo].[ATS_PriceLinkSettings] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [pls_id]     VARCHAR (10)   NULL,
    [visible]    VARCHAR (2)    DEFAULT ('Y') NULL,
    [price]      DECIMAL (10)   NULL,
    [link]       NVARCHAR (MAX) NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'連結', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_PriceLinkSettings', @level2type = N'COLUMN', @level2name = N'link';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'價錢', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_PriceLinkSettings', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_PriceLinkSettings', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_PriceLinkSettings', @level2type = N'COLUMN', @level2name = N'pls_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_PriceLinkSettings', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_PriceLinkSettings', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_PriceLinkSettings', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_PriceLinkSettings', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'連結設定',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'ATS_PriceLinkSettings',
    @level2type = NULL,
    @level2name = NULL