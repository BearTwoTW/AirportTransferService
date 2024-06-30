CREATE TABLE [dbo].[CompanyContacter] (
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  NULL,
    [upd_time]   DATETIME      NULL,
    [cc_id]      INT           IDENTITY (1, 1) NOT NULL,
    [company_id] VARCHAR (50)  NULL,
    [name]       VARCHAR (255) NULL,
    [phone]      VARCHAR (50)  NULL,
    [gender]     VARCHAR (20)  NULL,
    [position]   VARCHAR (50)  NULL,
    [email]      VARCHAR (255) NULL,
    CONSTRAINT [PK__CompanyC__9F1E187B4D4DEF07] PRIMARY KEY CLUSTERED ([cc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CompanyContacter', @level2type = N'COLUMN', @level2name = N'email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CompanyContacter', @level2type = N'COLUMN', @level2name = N'position';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'性別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CompanyContacter', @level2type = N'COLUMN', @level2name = N'gender';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CompanyContacter', @level2type = N'COLUMN', @level2name = N'phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CompanyContacter', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公司流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CompanyContacter', @level2type = N'COLUMN', @level2name = N'company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CompanyContacter', @level2type = N'COLUMN', @level2name = N'cc_id';

