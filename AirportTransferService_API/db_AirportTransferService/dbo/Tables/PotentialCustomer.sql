CREATE TABLE [dbo].[PotentialCustomer] (
    [cre_userid]            VARCHAR (50)   NULL,
    [cre_time]              DATETIME       NULL,
    [upd_userid]            VARCHAR (50)   NULL,
    [upd_time]              DATETIME       NULL,
    [potential_customer_id] VARCHAR (50)   NOT NULL,
    [name]                  VARCHAR (400)  NULL,
    [gender]                VARCHAR (50)   NULL,
    [first_contact_date]    DATE           NULL,
    [source]                VARCHAR (50)   NULL,
    [birthday]              DATE           NULL,
    [career]                VARCHAR (50)   NULL,
    [note]                  NVARCHAR (255) NULL,
    [own_car_brand]         VARCHAR (50)   NULL,
    [own_car_type]          NVARCHAR (255) NULL,
    [own_car_year]          INT            NULL,
    [consider_car_brand]    VARCHAR (50)   NULL,
    [consider_car_type]     NVARCHAR (255) NULL,
    [compare_car_brand]     VARCHAR (50)   NULL,
    [compare_car_type]      NVARCHAR (255) NULL,
    [like_car_color]        NVARCHAR (255) NULL,
    [user_id]               VARCHAR (50)   NULL,
    CONSTRAINT [PK__Potentia__DB83A0998D154DB6] PRIMARY KEY CLUSTERED ([potential_customer_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'負責帳號流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'喜好車車色', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'like_car_color';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'比較車車型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'compare_car_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'比較車品牌', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'compare_car_brand';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'考慮車車型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'consider_car_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'考慮車品牌', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'consider_car_brand';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'現有車年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'own_car_year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'現有車車型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'own_car_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'現有車品牌', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'own_car_brand';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職業', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'career';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'birthday';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'客戶來源', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'source';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'首次接觸日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'first_contact_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'性別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'gender';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'潛客流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PotentialCustomer', @level2type = N'COLUMN', @level2name = N'potential_customer_id';

