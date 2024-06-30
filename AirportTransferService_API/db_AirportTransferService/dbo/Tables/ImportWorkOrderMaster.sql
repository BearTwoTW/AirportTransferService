CREATE TABLE [dbo].[ImportWorkOrderMaster] (
    [id]         INT             NOT NULL,
    [cre_userid] VARCHAR (50)    NULL,
    [cre_time]   DATETIME        NULL,
    [工作單號]       NVARCHAR (255)  NULL,
    [客戶姓名]       NVARCHAR (255)  NULL,
    [聯絡人]        NVARCHAR (255)  NULL,
    [車牌號碼]       NVARCHAR (255)  NULL,
    [交修項目]       NVARCHAR (255)  NULL,
    [進場時間]       DATETIME        NULL,
    [上次進場時間]     DATETIME        NULL,
    [完工時間]       DATETIME        NULL,
    [接待]         NVARCHAR (255)  NULL,
    [技師]         NVARCHAR (255)  NULL,
    [維修]         VARCHAR (255)   NULL,
    [顧客狀態]       VARCHAR (255)   NULL,
    [里程]         DECIMAL (10, 2) NULL,
    [上次里程]       DECIMAL (10, 2) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

