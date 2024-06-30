CREATE TABLE [dbo].[HintBell] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [hb_id]      VARCHAR (50)   NOT NULL,
    [sps_id]     VARCHAR (50)   NULL,
    [json]       NVARCHAR (MAX) NULL,
    [title]      NVARCHAR (255) NULL,
    [apply_name] NVARCHAR (255) NULL,
    [status]     NVARCHAR (255) NULL,
    [info_json]  NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([hb_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'通知需要顯示的內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBell', @level2type = N'COLUMN', @level2name = N'info_json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBell', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'申請人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBell', @level2type = N'COLUMN', @level2name = N'apply_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主題', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBell', @level2type = N'COLUMN', @level2name = N'title';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'導頁後查詢需要的參數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBell', @level2type = N'COLUMN', @level2name = N'json';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'類型代碼流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBell', @level2type = N'COLUMN', @level2name = N'sps_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'提示鈴鐺紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HintBell', @level2type = N'COLUMN', @level2name = N'hb_id';

