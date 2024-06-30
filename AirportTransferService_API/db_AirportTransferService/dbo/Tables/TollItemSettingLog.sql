CREATE TABLE [dbo].[TollItemSettingLog] (
    [cre_userid]          VARCHAR (50)    NULL,
    [cre_time]            DATETIME        NULL,
    [upd_userid]          VARCHAR (50)    NULL,
    [upd_time]            DATETIME        NULL,
    [tisl_id]             INT             IDENTITY (1, 1) NOT NULL,
    [tis_id]              VARCHAR (50)    NULL,
    [work_hours]          DECIMAL (10, 2) NULL,
    [work_hours_warranty] DECIMAL (10, 2) NULL,
    [price]               DECIMAL (20, 2) NULL,
    [note]                NVARCHAR (255)  NULL,
    [date_start]          DATE            NULL,
    [date_end]            DATE            NULL,
    PRIMARY KEY CLUSTERED ([tisl_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '日期迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSettingLog', @level2type = N'COLUMN', @level2name = N'date_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '日期起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSettingLog', @level2type = N'COLUMN', @level2name = N'date_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSettingLog', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSettingLog', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工時(保固)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSettingLog', @level2type = N'COLUMN', @level2name = N'work_hours_warranty';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工時(正常)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSettingLog', @level2type = N'COLUMN', @level2name = N'work_hours';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '收費項目流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSettingLog', @level2type = N'COLUMN', @level2name = N'tis_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '收費項目紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'TollItemSettingLog', @level2type = N'COLUMN', @level2name = N'tisl_id';

