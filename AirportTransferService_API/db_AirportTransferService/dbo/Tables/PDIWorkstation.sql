CREATE TABLE [dbo].[PDIWorkstation] (
    [cre_userid]      VARCHAR (50)   NULL,
    [cre_time]        DATETIME       NULL,
    [upd_userid]      VARCHAR (50)   NULL,
    [upd_time]        DATETIME       NULL,
    [pdi_ws_id]       VARCHAR (50)   NOT NULL,
    [pdi_ws_name]     NVARCHAR (255) NULL,
    [note]            NVARCHAR (255) NULL,
    [visible]         VARCHAR (1)    NULL,
    [cars_per_day]    INT            NULL,
    [hours_per_car]   INT            NULL,
    [seq]             INT            NULL,
    [is_custody_only] VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([pdi_ws_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否限定保管人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIWorkstation', @level2type = N'COLUMN', @level2name = N'is_custody_only';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'排序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIWorkstation', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'每台車最多要花幾小時', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIWorkstation', @level2type = N'COLUMN', @level2name = N'hours_per_car';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'每天最多可處理幾幾台車', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIWorkstation', @level2type = N'COLUMN', @level2name = N'cars_per_day';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIWorkstation', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIWorkstation', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI工作站名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIWorkstation', @level2type = N'COLUMN', @level2name = N'pdi_ws_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI工作站流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIWorkstation', @level2type = N'COLUMN', @level2name = N'pdi_ws_id';

