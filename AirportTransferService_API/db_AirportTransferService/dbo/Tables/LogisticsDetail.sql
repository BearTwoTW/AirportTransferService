CREATE TABLE [dbo].[LogisticsDetail] (
    [cre_userid]              VARCHAR (50)   NULL,
    [cre_time]                DATETIME       NULL,
    [upd_userid]              VARCHAR (50)   NULL,
    [upd_time]                DATETIME       NULL,
    [id]                      INT            IDENTITY (1, 1) NOT NULL,
    [lm_id]                   VARCHAR (50)   NULL,
    [freight]                 DECIMAL (9, 2) NULL,
    [visible]                 VARCHAR (1)    NULL,
    [note]                    NVARCHAR (255) NULL,
    [ship_type]               VARCHAR (50)   NULL,
    [position_id]             VARCHAR (50)   NULL,
    [position_store_name]     NVARCHAR (255) NULL,
    [position_city]           NVARCHAR (40)  NULL,
    [position_area]           NVARCHAR (40)  NULL,
    [position_address]        NVARCHAR (255) NULL,
    [position_bussiness_hour] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'門市據點營業時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'position_bussiness_hour';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'門市據點地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'position_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'門市據點區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'position_area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'門市據點城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'position_city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'門市據點名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'position_store_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'門市據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'運送方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'ship_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'運費', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'freight';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'lm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LogisticsDetail', @level2type = N'COLUMN', @level2name = N'id';

