CREATE TABLE [dbo].[ToDoListLog] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [tdll_id]    INT            IDENTITY (1, 1) NOT NULL,
    [tdl_id]     INT            NULL,
    [response]   NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([tdll_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'結果', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ToDoListLog', @level2type = N'COLUMN', @level2name = N'response';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'待辦事項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ToDoListLog', @level2type = N'COLUMN', @level2name = N'tdl_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ToDoListLog', @level2type = N'COLUMN', @level2name = N'tdll_id';

