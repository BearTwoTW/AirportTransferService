CREATE TABLE [dbo].[ImportAccount] (
    [cre_userid] VARCHAR (50)   NULL,
    [cre_time]   DATETIME       NULL,
    [帳號]         NVARCHAR (255) NULL,
    [姓名]         NVARCHAR (255) NULL,
    [性別]         NVARCHAR (255) NULL,
    [身分證]        NVARCHAR (255) NULL,
    [生日]         DATE           NULL,
    [電話]         NVARCHAR (255) NULL,
    [手機]         NVARCHAR (255) NULL,
    [電子信箱]       NVARCHAR (255) NULL,
    [縣市(聯絡)]     NVARCHAR (255) NULL,
    [區域(聯絡)]     NVARCHAR (255) NULL,
    [住址(聯絡)]     NVARCHAR (255) NULL,
    [縣市(戶籍)]     NVARCHAR (255) NULL,
    [區域(戶籍)]     NVARCHAR (255) NULL,
    [住址(戶籍)]     NVARCHAR (255) NULL,
    [到職日]        DATE           NULL,
    [備註]         NVARCHAR (255) NULL,
    [血型]         NVARCHAR (255) NULL
);

