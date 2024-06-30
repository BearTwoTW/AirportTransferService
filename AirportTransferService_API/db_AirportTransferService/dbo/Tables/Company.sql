CREATE TABLE [dbo].[Company] (
    [cre_userid]        VARCHAR (50)  NULL,
    [cre_time]          DATETIME      NULL,
    [upd_userid]        VARCHAR (50)  NULL,
    [upd_time]          DATETIME      NULL,
    [company_id]        VARCHAR (50)  NOT NULL,
    [type]              VARCHAR (255) NULL,
    [name]              VARCHAR (255) NULL,
    [code]              VARCHAR (50)  NULL,
    [tax_id]            VARCHAR (50)  NULL,
    [city]              VARCHAR (50)  NULL,
    [area]              VARCHAR (50)  NULL,
    [address]           VARCHAR (255) NULL,
    [phone]             VARCHAR (50)  NULL,
    [url]               VARCHAR (255) NULL,
    [note]              VARCHAR (255) NULL,
    [visible]           VARCHAR (1)   NULL,
    [transfer_account]  VARCHAR (50)  NULL,
    [start_date]        VARCHAR (6)   NULL,
    [howmany_month]     INT           NULL,
    [which_date]        INT           NULL,
    [howmany_beforeday] INT           NULL,
    CONSTRAINT [PK__Company__3E267235BF707578] PRIMARY KEY CLUSTERED ([company_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'幾天前通知', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'howmany_beforeday';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'幾號付款', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'which_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'每幾個月', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'howmany_month';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'起始年月', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'start_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯款帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'transfer_account';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'網址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'url';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地區', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'統編號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'tax_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公司代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公司名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Company', @level2type = N'COLUMN', @level2name = N'company_id';

