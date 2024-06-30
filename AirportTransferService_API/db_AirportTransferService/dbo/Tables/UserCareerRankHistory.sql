CREATE TABLE [dbo].[UserCareerRankHistory] (
    [cre_userid]   VARCHAR (50)   NULL,
    [cre_time]     DATETIME       NULL,
    [upd_userid]   VARCHAR (50)   NULL,
    [upd_time]     DATETIME       NULL,
    [ucrh_id]      INT            IDENTITY (1, 1) NOT NULL,
    [user_id]      VARCHAR (50)   NULL,
    [date_start]   DATE           NULL,
    [date_end]     DATE           NULL,
    [ucr_id]       INT            NULL,
    [career_level] INT            NULL,
    [note]         NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ucrh_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRankHistory', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職級', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRankHistory', @level2type = N'COLUMN', @level2name = N'career_level';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職等職級流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRankHistory', @level2type = N'COLUMN', @level2name = N'ucr_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRankHistory', @level2type = N'COLUMN', @level2name = N'date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'日期起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRankHistory', @level2type = N'COLUMN', @level2name = N'date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRankHistory', @level2type = N'COLUMN', @level2name = N'user_id';

