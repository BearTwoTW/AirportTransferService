CREATE TABLE [dbo].[CITYAREAZIP] (
    [city] NVARCHAR (255) NULL,
    [area] NVARCHAR (255) NULL,
    [ZIP]  VARCHAR (5)    NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'郵遞區號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CITYAREAZIP', @level2type = N'COLUMN', @level2name = N'ZIP';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CITYAREAZIP', @level2type = N'COLUMN', @level2name = N'area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CITYAREAZIP', @level2type = N'COLUMN', @level2name = N'city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'城市區域郵遞區號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CITYAREAZIP';

