CREATE TABLE [dbo].[CarTypeFormat] (
    [cre_userid]  VARCHAR (50)   NULL,
    [cre_time]    DATETIME       NULL,
    [upd_userid]  VARCHAR (50)   NULL,
    [upd_time]    DATETIME       NULL,
    [ctf_id]      INT            IDENTITY (1, 1) NOT NULL,
    [ct_id]       INT            NULL,
    [format_code] NVARCHAR (255) NULL,
    [format_name] NVARCHAR (255) NULL,
    [outer_id]    NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([ctf_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外部id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormat', @level2type = N'COLUMN', @level2name = N'outer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'規格名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormat', @level2type = N'COLUMN', @level2name = N'format_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'規格代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormat', @level2type = N'COLUMN', @level2name = N'format_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormat', @level2type = N'COLUMN', @level2name = N'ct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarTypeFormat', @level2type = N'COLUMN', @level2name = N'ctf_id';

