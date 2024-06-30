CREATE TABLE [dbo].[EC_CustomerLevel] (
    [cre_userid] VARCHAR (50)    NULL,
    [cre_time]   DATETIME        NULL,
    [upd_userid] VARCHAR (50)    NULL,
    [upd_time]   DATETIME        NULL,
    [cl_id]      INT             IDENTITY (1, 1) NOT NULL,
    [cl_name]    NVARCHAR (50)   NULL,
    [cl_level]   DECIMAL (10, 2) NULL,
    [note]       NVARCHAR (255)  NULL,
    [visible]    VARCHAR (1)     NULL,
    [is_default] VARCHAR (1)     NULL,
    PRIMARY KEY CLUSTERED ([cl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否預設', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerLevel', @level2type = N'COLUMN', @level2name = N'is_default';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerLevel', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerLevel', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員層級階級', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerLevel', @level2type = N'COLUMN', @level2name = N'cl_level';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員等級名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerLevel', @level2type = N'COLUMN', @level2name = N'cl_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員層級流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerLevel', @level2type = N'COLUMN', @level2name = N'cl_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員等級', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerLevel';

