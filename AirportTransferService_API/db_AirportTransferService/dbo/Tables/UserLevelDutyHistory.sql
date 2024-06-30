CREATE TABLE [dbo].[UserLevelDutyHistory] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [uldh_id]    INT            IDENTITY (1, 1) NOT NULL,
    [user_id]    VARCHAR (50)   NULL,
    [date_start] DATE           NULL,
    [date_end]   DATE           NULL,
    [ul_id]      INT            NULL,
    [duty_json]  NVARCHAR (MAX) NULL,
    [note]       NVARCHAR (MAX) NULL,
    CONSTRAINT [PK__UserLeve__21D638A416665C60] PRIMARY KEY CLUSTERED ([uldh_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyHistory', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職責們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyHistory', @level2type = N'COLUMN', @level2name = N'duty_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職務編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyHistory', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyHistory', @level2type = N'COLUMN', @level2name = N'date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyHistory', @level2type = N'COLUMN', @level2name = N'date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyHistory', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevelDutyHistory', @level2type = N'COLUMN', @level2name = N'uldh_id';

