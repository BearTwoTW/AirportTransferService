CREATE TABLE [dbo].[CarPartSetting] (
    [cre_userid]        VARCHAR (50)   NULL,
    [cre_time]          DATETIME       NULL,
    [upd_userid]        VARCHAR (50)   NULL,
    [upd_time]          DATETIME       NULL,
    [cps_id]            VARCHAR (50)   NOT NULL,
    [car_part_position] VARCHAR (50)   NULL,
    [cps_code]          NVARCHAR (50)  NULL,
    [cps_name]          NVARCHAR (255) NULL,
    [note]              NVARCHAR (255) NULL,
    [visible]           VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([cps_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarPartSetting', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarPartSetting', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車部位名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarPartSetting', @level2type = N'COLUMN', @level2name = N'cps_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車部位代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarPartSetting', @level2type = N'COLUMN', @level2name = N'cps_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車部位區域代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarPartSetting', @level2type = N'COLUMN', @level2name = N'car_part_position';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車部位流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarPartSetting', @level2type = N'COLUMN', @level2name = N'cps_id';

