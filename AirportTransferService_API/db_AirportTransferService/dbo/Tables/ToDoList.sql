CREATE TABLE [dbo].[ToDoList] (
    [cre_userid]   VARCHAR (50)   NULL,
    [cre_time]     DATETIME       NULL,
    [upd_userid]   VARCHAR (50)   NULL,
    [upd_time]     DATETIME       NULL,
    [tdl_id]       INT            IDENTITY (1, 1) NOT NULL,
    [url]          NVARCHAR (255) NULL,
    [request]      NVARCHAR (MAX) NULL,
    [execute_date] DATE           NULL,
    [is_canceled]  VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([tdl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否取消', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ToDoList', @level2type = N'COLUMN', @level2name = N'is_canceled';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'執行日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ToDoList', @level2type = N'COLUMN', @level2name = N'execute_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'輸入物件', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ToDoList', @level2type = N'COLUMN', @level2name = N'request';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'路徑', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ToDoList', @level2type = N'COLUMN', @level2name = N'url';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ToDoList', @level2type = N'COLUMN', @level2name = N'tdl_id';

