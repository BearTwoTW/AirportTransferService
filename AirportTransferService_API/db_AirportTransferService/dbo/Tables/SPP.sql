CREATE TABLE [dbo].[SPP] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [upd_userid] VARCHAR (50)   NULL,
    [upd_time]   DATETIME       NULL,
    [spp_id]     VARCHAR (50)   NOT NULL,
    [su]         VARCHAR (1)    NULL,
    [name]       NVARCHAR (50)  NULL,
    [remark]     NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_SPP_1] PRIMARY KEY CLUSTERED ([spp_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SPP', @level2type = N'COLUMN', @level2name = N'remark';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SPP', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否系統使用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SPP', @level2type = N'COLUMN', @level2name = N'su';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'大分類代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SPP', @level2type = N'COLUMN', @level2name = N'spp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SPP', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SPP', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SPP', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SPP', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'大分類代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'SPP';

