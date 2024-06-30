CREATE TABLE [dbo].[LogisticsMaster] (
    [cre_userid]             VARCHAR (50)  NULL,
    [cre_time]               DATETIME      NULL,
    [upd_userid]             VARCHAR (50)  NULL,
    [upd_time]               DATETIME      NULL,
    [lm_id]                  VARCHAR (50)  NOT NULL,
    [lm_name]                VARCHAR (50)  NULL,
    [note]                   VARCHAR (255) NULL,
    [visible]                VARCHAR (1)   NULL,
    [series_connection_type] VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([lm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'串接名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsMaster', @level2type = N'COLUMN', @level2name = N'series_connection_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsMaster', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流主項名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsMaster', @level2type = N'COLUMN', @level2name = N'lm_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsMaster', @level2type = N'COLUMN', @level2name = N'lm_id';

