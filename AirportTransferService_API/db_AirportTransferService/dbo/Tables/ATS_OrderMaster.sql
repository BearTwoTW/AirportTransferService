CREATE TABLE [dbo].[ATS_OrderMaster] (
    [cre_userid]        VARCHAR (50)   NULL,
    [cre_time]          DATETIME       NULL,
    [upd_userid]        VARCHAR (50)   NULL,
    [upd_time]          DATETIME       NULL,
    [o_id]              VARCHAR (20)   NOT NULL,
    [visible]           VARCHAR (2)    CONSTRAINT [DF_ATS_OrderMaster_visible] DEFAULT ('Y') NULL,
    [order_status]      VARCHAR (6)    NULL,
    [type]              VARCHAR (4)    NULL,
    [city]              NVARCHAR (255) NULL,
    [area]              NVARCHAR (255) NULL,
    [road]              NVARCHAR (255) NULL,
    [section]           NVARCHAR (255) NULL,
    [address]           NVARCHAR (255) NULL,
    [airport]           NVARCHAR (255) NULL,
    [terminal]          NVARCHAR (255) NULL,
    [flght_number]      VARCHAR (10)   NULL,
    [date_travel]       DATE           NULL,
    [time_travel]       TIME (0)       NULL,
    [number_passenger]  INT            NULL,
    [number_bags]       INT            NULL,
    [cms_id]            VARCHAR (10)   NULL,
    [signboard_title]   VARCHAR (255)  NULL,
    [signboard_content] VARCHAR (MAX)  NULL,
    [name_purchaser]    VARCHAR (255)  NULL,
    [phone_purchaser]   VARCHAR (50)   NULL,
    [email_purchaser]   VARCHAR (255)  NULL,
    [name_passenger]    VARCHAR (255)  NULL,
    [phone_passenger]   VARCHAR (50)   NULL,
    [email_passenger]   VARCHAR (255)  NULL,
    [price]             DECIMAL (10)   NULL,
    [link]              NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_ATS_OrderMaster] PRIMARY KEY CLUSTERED ([o_id] ASC)
);










GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'連結', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'link';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'價錢', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'乘客電子信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'email_passenger';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'乘客電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'phone_passenger';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'乘客姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'name_passenger';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂購人電子信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'email_purchaser';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂購人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'phone_purchaser';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂購人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'name_purchaser';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'舉牌內容', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'signboard_content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'舉牌標題', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'signboard_title';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'cms_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'行李數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'number_bags';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'人數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'number_passenger';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'乘車時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'time_travel';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'乘車日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'date_travel';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'航班號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'flght_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'航廈', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'terminal';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'機場', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'airport';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'巷弄與門牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'段', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'section';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'路', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'road';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'類別(接機/送機)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'o_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ATS_OrderMaster', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'訂單管理',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'ATS_OrderMaster',
    @level2type = NULL,
    @level2name = NULL
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'訂單狀態',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'ATS_OrderMaster',
    @level2type = N'COLUMN',
    @level2name = N'order_status'