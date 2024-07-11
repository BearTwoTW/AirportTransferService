CREATE TABLE [dbo].[ATS_OrderDetail] (
    [cre_userid]  VARCHAR (50)   NULL,
    [cre_time]    DATETIME       NULL,
    [upd_userid]  VARCHAR (50)   NULL,
    [upd_time]    DATETIME       NULL,
    [od_id]       VARCHAR (20)   NULL,
    [visible]     VARCHAR (2)    DEFAULT ('Y') NULL,
    [o_id]        VARCHAR (20)   NULL,
    [es_id]       VARCHAR (10)   NULL,
    [es_type]     VARCHAR (10)   NULL,
    [es_name]     NVARCHAR (255) NULL,
    [es_price]    DECIMAL (10)   DEFAULT ((0)) NULL,
    [count]       INT            DEFAULT ((1)) NULL,
    [total_price] DECIMAL (10)   DEFAULT ((0)) NULL
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'價錢小計', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加購價錢', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'es_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加購名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'es_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加購類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'es_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加購編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'es_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'o_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'od_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單明細', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderDetail';

