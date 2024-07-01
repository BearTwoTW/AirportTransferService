CREATE TABLE [dbo].[ATS_CarModelSettings] (
    [cre_userid]         VARCHAR (50)   NULL,
    [cre_time]           DATETIME       NULL,
    [upd_userid]         VARCHAR (50)   NULL,
    [upd_time]           DATETIME       NULL,
    [cms_id]             VARCHAR (10)   NULL,
    [visible]            VARCHAR (2)    NULL,
    [name]               NVARCHAR (255) NULL,
    [max_passengers]     INT            NULL,
    [max_luggage]        INT            NULL,
    [max_child_seats]    INT            NULL,
    [max_service_extras] INT            NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'服務加成項目上限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'max_service_extras';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'安全座椅上限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'max_child_seats';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'行李數上限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'max_luggage';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'乘車人數上限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'max_passengers';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'cms_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_CarModelSettings', @level2type = N'COLUMN', @level2name = N'cre_userid';

