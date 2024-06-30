CREATE TABLE [dbo].[車源SMT] (
    [是否開放銷售] VARCHAR (1)    NULL,
    [車輛位置]   NVARCHAR (255) NULL,
    [訂單編號]   FLOAT (53)     NULL,
    [FO]     NVARCHAR (255) NULL,
    [年式]     INT            NULL,
    [車型]     NVARCHAR (255) NULL,
    [顏色]     NVARCHAR (255) NULL,
    [內裝]     NVARCHAR (255) NULL,
    [車身碼]    NVARCHAR (255) NULL,
    [預定到港日期] DATETIME       NULL,
    [最後修改日期] DATETIME       NULL,
    [特殊配備]   NVARCHAR (255) NULL,
    [備註]     NVARCHAR (255) NULL,
    [發票日期]   DATETIME       NULL,
    [倉庫]     NVARCHAR (255) NULL,
    [儲位]     NVARCHAR (255) NULL,
    [是否到港]   VARCHAR (1)    NULL,
    [是否提車]   VARCHAR (1)    NULL
);

