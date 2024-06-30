CREATE TABLE [dbo].[UserCourseLicense] (
    [cre_userid]   VARCHAR (50)  NULL,
    [cre_time]     DATETIME      NULL,
    [upd_userid]   VARCHAR (50)  NULL,
    [upd_time]     DATETIME      NULL,
    [id]           INT           IDENTITY (1, 1) NOT NULL,
    [user_id]      VARCHAR (50)  NULL,
    [course_name]  VARCHAR (255) NULL,
    [course_hours] INT           NULL,
    [file_id]      INT           NULL,
    [note]         VARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCourseLicense', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檔案流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCourseLicense', @level2type = N'COLUMN', @level2name = N'file_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'課程時數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCourseLicense', @level2type = N'COLUMN', @level2name = N'course_hours';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'課程名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCourseLicense', @level2type = N'COLUMN', @level2name = N'course_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用者編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCourseLicense', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserCourseLicense', @level2type = N'COLUMN', @level2name = N'id';

