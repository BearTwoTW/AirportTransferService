CREATE TABLE [dbo].[車型匯入] (
    [車型]       NVARCHAR (255)  NULL,
    [規格代碼]     NVARCHAR (255)  NULL,
    [規格名稱]     NVARCHAR (255)  NULL,
    [年式]       INT             NULL,
    [年份]       INT             NULL,
    [外裝顏色代碼]   NVARCHAR (255)  NULL,
    [外裝顏色名稱]   NVARCHAR (255)  NULL,
    [外裝加價]     DECIMAL (10, 2) NULL,
    [內裝顏色代碼]   NVARCHAR (255)  NULL,
    [內裝顏色名稱]   NVARCHAR (255)  NULL,
    [內裝加價]     DECIMAL (10, 2) NULL,
    [售價]       DECIMAL (10, 2) NULL,
    [還款價]      DECIMAL (10, 2) NULL,
    [可受訂起始日期]  NVARCHAR (255)  NULL,
    [不可受訂起始日期] NVARCHAR (255)  NULL
);

