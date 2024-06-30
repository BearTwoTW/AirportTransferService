CREATE TABLE [dbo].[Users] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [disable]               VARCHAR (1)    NULL,
    [company_code]          VARCHAR (10)   NULL,
    [user_id]               VARCHAR (50)   NOT NULL,
    [username]              NVARCHAR (50)  NULL,
    [password]              NVARCHAR (50)  NULL,
    [name]                  NVARCHAR (400) NULL,
    [gender]                VARCHAR (10)   NULL,
    [birthday]              DATE           NULL,
    [telephone]             NVARCHAR (400) NULL,
    [mobile_phone]          NVARCHAR (400) NULL,
    [email]                 NVARCHAR (120) NULL,
    [city]                  NVARCHAR (40)  NULL,
    [area]                  NVARCHAR (40)  NULL,
    [address]               NVARCHAR (400) NULL,
    [city_census]           NVARCHAR (40)  NULL,
    [area_census]           NVARCHAR (40)  NULL,
    [address_census]        NVARCHAR (400) NULL,
    [on_board_date]         DATE           NULL,
    [note]                  NVARCHAR (MAX) NULL,
    [home_page]             VARCHAR (50)   NULL,
    [signin_time]           DATETIME       NULL,
    [check_code]            VARCHAR (20)   NULL,
    [web_code]              VARCHAR (14)   NULL,
    [app_code]              VARCHAR (14)   NULL,
    [google_access_token]   NVARCHAR (MAX) NULL,
    [google_refresh_token]  NVARCHAR (MAX) NULL,
    [device_type]           NVARCHAR (50)  NULL,
    [device_token]          NVARCHAR (MAX) NULL,
    [ul_id]                 INT            NULL,
    [blood_type]            NVARCHAR (10)  NULL,
    [identity_card]         NVARCHAR (400) NULL,
    [identity_card_en]      NVARCHAR (256) NULL,
    [ucr_id]                INT            NULL,
    [career_level]          INT            NULL,
    [name_en]               NVARCHAR (256) NULL,
    [telephone_en]          NVARCHAR (256) NULL,
    [mobile_phone_en]       NVARCHAR (256) NULL,
    [address_en]            NVARCHAR (256) NULL,
    [address_census_en]     NVARCHAR (256) NULL,
    [isresign]              VARCHAR (1)    NULL,
    [resign_date]           DATE           NULL,
    [resign_reason]         NVARCHAR (255) NULL,
    [SMT_username]          NVARCHAR (255) NULL,
    [insurance_cancel_date] DATE           NULL,
    [ds_id]                 INT            NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([user_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'ds_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退保日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'insurance_cancel_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'SMT使用者帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'SMT_username';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職級', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'career_level';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職等職級流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'ucr_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'身分證', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'identity_card';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'血型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'blood_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職務編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'裝置Token', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'device_token';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'裝置類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'device_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Google Refresh Token', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'google_refresh_token';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'Google Access Token', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'google_access_token';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'應用程式代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'app_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'網頁代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'web_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗證碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'check_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'登入時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'signin_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'首頁', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'home_page';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到職日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'on_board_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'address_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'area_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'戶籍城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'city_census';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'電子信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'手機', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'mobile_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'telephone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'birthday';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'性別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'gender';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'密碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'password';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'username';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公司代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'company_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'停用', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'disable';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Users';

