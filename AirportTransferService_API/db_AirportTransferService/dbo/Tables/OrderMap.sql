CREATE TABLE [dbo].[OrderMap] (
    [cre_userid] VARCHAR (50)  DEFAULT ('') NULL,
    [cre_time]   DATETIME      NULL,
    [upd_userid] VARCHAR (50)  DEFAULT ('') NULL,
    [upd_time]   DATETIME      NULL,
    [om_id]      VARCHAR (50)  DEFAULT ('') NOT NULL,
    [Plant]      VARCHAR (10)  DEFAULT ('') NULL,
    [RoomNo]     VARCHAR (10)  DEFAULT ('') NULL,
    [MapStr]     VARCHAR (MAX) DEFAULT ('') NULL,
    [isUsing]    VARCHAR (1)   DEFAULT ('N') NULL,
    [file_path]  VARCHAR (MAX) CONSTRAINT [DF_OrderMap_file_path] DEFAULT ('') NULL,
    PRIMARY KEY CLUSTERED ([om_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'檔案路徑', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'file_path';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否使用中', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'isUsing';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地圖字串', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'MapStr';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'樓層ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'RoomNo';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'Plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地圖ID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'om_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'後廠每月營業報表', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderMap';

