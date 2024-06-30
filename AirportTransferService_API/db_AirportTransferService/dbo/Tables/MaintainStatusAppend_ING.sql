CREATE TABLE [dbo].[MaintainStatusAppend_ING] (
    [id]         INT           IDENTITY (1, 1) NOT NULL,
    [m_id]       VARCHAR (20)  NULL,
    [work_time]  INT           NULL,
    [position]   VARCHAR (50)  NULL,
    [note]       VARCHAR (400) NULL,
    [cre_userid] VARCHAR (50)  NULL,
    [cre_time]   DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusAppend_ING', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'位置', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusAppend_ING', @level2type = N'COLUMN', @level2name = N'position';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'追加工時', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusAppend_ING', @level2type = N'COLUMN', @level2name = N'work_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusAppend_ING', @level2type = N'COLUMN', @level2name = N'm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusAppend_ING', @level2type = N'COLUMN', @level2name = N'id';

