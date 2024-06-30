CREATE TABLE [dbo].[OSS_QASetting] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [id]         INT            IDENTITY (1, 1) NOT NULL,
    [question]   NVARCHAR (255) NULL,
    [answer]     NVARCHAR (255) NULL,
    [visible]    VARCHAR (1)    NULL,
    [seq]        INT            NULL,
    CONSTRAINT [PK_OSS_QASetting] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_QASetting', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_QASetting', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'答', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_QASetting', @level2type = N'COLUMN', @level2name = N'answer';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'問', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_QASetting', @level2type = N'COLUMN', @level2name = N'question';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'網站問答設定', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OSS_QASetting';

