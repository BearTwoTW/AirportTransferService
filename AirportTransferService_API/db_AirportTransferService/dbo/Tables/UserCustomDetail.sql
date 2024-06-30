CREATE TABLE [dbo].[UserCustomDetail] (
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  NULL,
    [upd_time]   DATETIME      NULL,
    [ucd_id]     INT           IDENTITY (1, 1) NOT NULL,
    [ucm_id]     VARCHAR (50)  NULL,
    [ucd_name]   VARCHAR (255) NULL,
    [type]       VARCHAR (50)  NULL,
    [order]      INT           NULL,
    [visible]    VARCHAR (1)   NULL,
    PRIMARY KEY CLUSTERED ([ucd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustomDetail', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'順序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustomDetail', @level2type = N'COLUMN', @level2name = N'order';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustomDetail', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'細項名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustomDetail', @level2type = N'COLUMN', @level2name = N'ucd_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'細項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustomDetail', @level2type = N'COLUMN', @level2name = N'ucm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCustomDetail', @level2type = N'COLUMN', @level2name = N'ucd_id';

