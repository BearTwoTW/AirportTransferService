CREATE TABLE [dbo].[UserCareerRank] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [ucr_id]                INT            IDENTITY (1, 1) NOT NULL,
    [career_rank]           INT            NULL,
    [salary_basic]          DECIMAL (9, 2) NULL,
    [salary_diff_per_level] DECIMAL (9, 2) NULL,
    [max_career_level]      INT            NULL,
    [bonus_json]            NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ucr_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職等的津貼們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRank', @level2type = N'COLUMN', @level2name = N'bonus_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最大職級', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRank', @level2type = N'COLUMN', @level2name = N'max_career_level';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'各級差額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRank', @level2type = N'COLUMN', @level2name = N'salary_diff_per_level';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'本薪', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRank', @level2type = N'COLUMN', @level2name = N'salary_basic';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職等', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCareerRank', @level2type = N'COLUMN', @level2name = N'career_rank';

