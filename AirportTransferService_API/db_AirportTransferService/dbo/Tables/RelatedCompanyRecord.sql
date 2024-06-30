CREATE TABLE [dbo].[RelatedCompanyRecord] (
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  NULL,
    [upd_time]   DATETIME      NULL,
    [rcr_id]     INT           IDENTITY (1, 1) NOT NULL,
    [user_id]    VARCHAR (50)  NULL,
    [name]       VARCHAR (255) NULL,
    [date_start] DATE          NULL,
    [date_end]   DATE          NULL,
    [visible]    VARCHAR (1)   NULL,
    PRIMARY KEY CLUSTERED ([rcr_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RelatedCompanyRecord', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RelatedCompanyRecord', @level2type = N'COLUMN', @level2name = N'date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RelatedCompanyRecord', @level2type = N'COLUMN', @level2name = N'date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'企業名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RelatedCompanyRecord', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RelatedCompanyRecord', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'RelatedCompanyRecord', @level2type = N'COLUMN', @level2name = N'rcr_id';

