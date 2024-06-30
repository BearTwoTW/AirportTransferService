CREATE TABLE [dbo].[WorkOrderMaster] (
    [cre_userid]                       VARCHAR (50)    NULL,
    [cre_time]                         DATETIME        NULL,
    [upd_userid]                       VARCHAR (50)    NULL,
    [upd_time]                         DATETIME        NULL,
    [wom_id]                           VARCHAR (50)    NOT NULL,
    [wom_code]                         VARCHAR (50)    NULL,
    [status]                           VARCHAR (50)    NULL,
    [complete_user_id]                 VARCHAR (50)    NULL,
    [complete_time]                    DATETIME        NULL,
    [invalid_user_id]                  VARCHAR (50)    NULL,
    [invalid_time]                     DATETIME        NULL,
    [invalid_reason]                   NVARCHAR (255)  NULL,
    [caseclose_user_id]                VARCHAR (50)    NULL,
    [caseclose_time]                   DATETIME        NULL,
    [user_id]                          VARCHAR (50)    NULL,
    [ul_id]                            INT             NULL,
    [position_id]                      VARCHAR (50)    NULL,
    [customer_id]                      VARCHAR (50)    NULL,
    [customer_name]                    NVARCHAR (400)  NULL,
    [contacter_name]                   NVARCHAR (400)  NULL,
    [contacter_phone]                  NVARCHAR (400)  NULL,
    [contacter_email]                  NVARCHAR (400)  NULL,
    [contacter_city]                   NVARCHAR (40)   NULL,
    [contacter_area]                   NVARCHAR (40)   NULL,
    [contacter_address]                NVARCHAR (400)  NULL,
    [car_id]                           VARCHAR (50)    NULL,
    [vin_no]                           NVARCHAR (50)   NULL,
    [license_plate]                    NVARCHAR (50)   NULL,
    [last_mileage]                     DECIMAL (10, 2) NULL,
    [mileage]                          DECIMAL (10, 2) NULL,
    [ctf_id]                           INT             NULL,
    [ct_id]                            INT             NULL,
    [car_type]                         NVARCHAR (255)  NULL,
    [format_code]                      NVARCHAR (255)  NULL,
    [format_name]                      NVARCHAR (255)  NULL,
    [year]                             INT             NULL,
    [last_time_enter]                  DATETIME        NULL,
    [time_enter]                       DATETIME        NULL,
    [time_leave]                       DATETIME        NULL,
    [insurance_company_id]             VARCHAR (50)    NULL,
    [insurance_company_name]           NVARCHAR (255)  NULL,
    [insurance_case_number]            NVARCHAR (50)   NULL,
    [insurance_company_contacter_id]   INT             NULL,
    [insurance_company_contacter_name] VARCHAR (50)    NULL,
    [rld_total_price]                  DECIMAL (10, 2) NULL,
    [rld_discount_price]               DECIMAL (10, 2) NULL,
    [total_price]                      DECIMAL (10, 2) NULL,
    [insurance_price]                  DECIMAL (10, 2) NULL,
    [insurance_price_tax]              DECIMAL (10, 2) NULL,
    [insurance_price_tax_include]      DECIMAL (10, 2) NULL,
    [insurance_balance]                DECIMAL (10, 2) NULL,
    [deductible_price]                 DECIMAL (10, 2) NULL,
    [deductible_price_tax]             DECIMAL (10, 2) NULL,
    [deductible_price_tax_include]     DECIMAL (10, 2) NULL,
    [deductible_balance]               DECIMAL (10, 2) NULL,
    [discount]                         DECIMAL (10, 2) NULL,
    [discount_price]                   DECIMAL (10, 2) NULL,
    [note]                             NVARCHAR (255)  NULL,
    [suggestion]                       NVARCHAR (255)  NULL,
    [customer_name_en]                 NVARCHAR (256)  NULL,
    [contacter_name_en]                NVARCHAR (256)  NULL,
    [contacter_phone_en]               NVARCHAR (256)  NULL,
    [contacter_email_en]               NVARCHAR (256)  NULL,
    [contacter_address_en]             NVARCHAR (256)  NULL,
    [insurance_sum_price_tax]          DECIMAL (10, 2) NULL,
    [insurance_sum_price_tax_include]  DECIMAL (10, 2) NULL,
    [deductible_sum_price_tax]         DECIMAL (10, 2) NULL,
    [deductible_sum_price_tax_include] DECIMAL (10, 2) NULL,
    [is_panelpaint]                    VARCHAR (1)     NULL,
    [wom_type]                         VARCHAR (50)    NULL,
    [wom_category]                     NVARCHAR (50)   NULL,
    [external_key]                     VARCHAR (50)    NULL,
    [payment_DEP]                      NVARCHAR (255)  NULL,
    [ext_finish_time]                  DATETIME        NULL,
    [mechanic_id]                      VARCHAR (50)    NULL,
    [customerstatus]                   VARCHAR (50)    NULL,
    [mechanic_name]                    NVARCHAR (256)  NULL,
    [user_name]                        NVARCHAR (256)  NULL,
    [mechanic_name_en]                 NVARCHAR (256)  NULL,
    [estimate_time_enter]              DATETIME        NULL,
    [estimate_mileage]                 DECIMAL (10, 2) NULL,
    [position_name]                    VARCHAR (50)    NULL,
    [user_name_en]                     NVARCHAR (256)  NULL,
    CONSTRAINT [PK__WorkOrde__AA9F7C921955E580] PRIMARY KEY CLUSTERED ([wom_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否鈑烤', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'is_panelpaint';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自負總額含稅', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'deductible_sum_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自負總額稅額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'deductible_sum_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'核賠總額含稅', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_sum_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'核賠總額稅額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_sum_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建議事項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'suggestion';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'discount_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '折扣', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'discount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額餘額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'deductible_balance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'deductible_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'deductible_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '自負額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'deductible_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額餘額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_balance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額(含稅)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_price_tax_include';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額(稅額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_price_tax';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'維修清單折扣額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'rld_discount_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'維修清單總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'rld_total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保險公司聯絡人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_company_contacter_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保險公司聯絡人流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_company_contacter_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險案號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_case_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險公司名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_company_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保險公司流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'insurance_company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '離廠時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'time_leave';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '進廠時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'time_enter';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'上次進廠時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'last_time_enter';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '規格名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'format_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '規格代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'format_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'car_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'ct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型規格對照流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '里程', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'mileage';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'上次里程', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'last_mileage';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車身碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'vin_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'car_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '聯絡人地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'contacter_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'contacter_area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'contacter_city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '聯絡人信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'contacter_email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '聯絡人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'contacter_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '聯絡人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'contacter_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車主姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'customer_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車主流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職務流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'結案時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'caseclose_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'按結案的使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'caseclose_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'作廢原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'invalid_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'作廢時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'invalid_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'按作廢的使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'invalid_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '完工時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'complete_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '按完工的使用者流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'complete_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工單號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'wom_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '工單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkOrderMaster', @level2type = N'COLUMN', @level2name = N'wom_id';

