CREATE TABLE [dbo].[Order] (
    [cre_userid]                          VARCHAR (50)    NULL,
    [cre_time]                            DATETIME        NULL,
    [upd_userid]                          VARCHAR (50)    NULL,
    [upd_time]                            DATETIME        NULL,
    [order_id]                            VARCHAR (50)    NOT NULL,
    [order_number]                        VARCHAR (50)    NULL,
    [autodms_order_number]                VARCHAR (50)    NULL,
    [order_process]                       VARCHAR (50)    NULL,
    [order_status]                        VARCHAR (50)    NULL,
    [contract_date]                       DATE            NULL,
    [custody_unit_id]                     VARCHAR (255)   NULL,
    [custody_user_id]                     VARCHAR (255)   NULL,
    [predict_licensed_date]               DATE            NULL,
    [is_licensed_check]                   VARCHAR (1)     NULL,
    [licensed_check_time]                 DATETIME        NULL,
    [licensed_check_endorse_user_id]      VARCHAR (50)    NULL,
    [licensed_date]                       DATE            NULL,
    [license_plate]                       VARCHAR (255)   NULL,
    [extraction_date]                     DATE            NULL,
    [predict_delivery_date]               DATE            NULL,
    [delivery_date]                       DATE            NULL,
    [is_release_check]                    VARCHAR (1)     NULL,
    [release_check_time]                  DATETIME        NULL,
    [release_check_endorse_user_id]       VARCHAR (50)    NULL,
    [isabnormal]                          VARCHAR (50)    NULL,
    [abnormal_return_status]              VARCHAR (50)    NULL,
    [abnormal_return_note]                NVARCHAR (255)  NULL,
    [abnormal_return_time]                DATETIME        NULL,
    [audit_status]                        VARCHAR (50)    NULL,
    [audit_note]                          NVARCHAR (255)  NULL,
    [audit_time]                          DATETIME        NULL,
    [order_allotment_id]                  INT             NULL,
    [allotment_time]                      DATETIME        NULL,
    [ocl_id]                              VARCHAR (50)    NULL,
    [potential_is_orderer]                VARCHAR (2)     NULL,
    [potential_customer_id]               VARCHAR (50)    NULL,
    [orderer_customer_name]               NVARCHAR (400)  NULL,
    [orderer_identity_number]             NVARCHAR (400)  NULL,
    [orderer_cellphone]                   NVARCHAR (400)  NULL,
    [orderer_address_contact]             NVARCHAR (400)  NULL,
    [orderer_birthday]                    DATE            NULL,
    [orderer_email]                       NVARCHAR (400)  NULL,
    [licenser_is_orderer]                 VARCHAR (2)     NULL,
    [licenser_customer_name]              NVARCHAR (400)  NULL,
    [licenser_identity_number]            NVARCHAR (400)  NULL,
    [licenser_cellphone]                  NVARCHAR (400)  NULL,
    [licenser_address_contact]            NVARCHAR (400)  NULL,
    [licenser_birthday]                   DATE            NULL,
    [licenser_email]                      NVARCHAR (400)  NULL,
    [user_is_orderer]                     VARCHAR (2)     NULL,
    [user_customer_name]                  NVARCHAR (400)  NULL,
    [user_identity_number]                NVARCHAR (400)  NULL,
    [user_cellphone]                      NVARCHAR (400)  NULL,
    [user_address_contact]                NVARCHAR (400)  NULL,
    [user_birthday]                       DATE            NULL,
    [user_email]                          NVARCHAR (400)  NULL,
    [abnormal_sale_type]                  VARCHAR (50)    NULL,
    [note]                                NVARCHAR (255)  NULL,
    [is_self_licensed]                    VARCHAR (1)     NULL,
    [is_car_limit]                        VARCHAR (1)     NULL,
    [cs_id]                               VARCHAR (50)    NULL,
    [ctfp_id]                             INT             NULL,
    [ctep_id]                             INT             NULL,
    [ctip_id]                             INT             NULL,
    [car_type]                            NVARCHAR (255)  NULL,
    [format_code]                         NVARCHAR (255)  NULL,
    [format_name]                         NVARCHAR (255)  NULL,
    [year]                                INT             NULL,
    [year_age]                            INT             NULL,
    [car_type_price]                      DECIMAL (10, 2) NULL,
    [repayment_price]                     DECIMAL (10, 2) NULL,
    [exterior_code]                       NVARCHAR (255)  NULL,
    [exterior_color]                      NVARCHAR (255)  NULL,
    [exterior_price]                      DECIMAL (10, 2) NULL,
    [exterior_cost]                       DECIMAL (10, 2) NULL,
    [interior_code]                       NVARCHAR (255)  NULL,
    [interior_color]                      NVARCHAR (255)  NULL,
    [interior_price]                      DECIMAL (10, 2) NULL,
    [interior_cost]                       DECIMAL (10, 2) NULL,
    [cash_subsidy_deductible]             DECIMAL (10, 2) NULL,
    [cash_subsidy_nondeductible]          DECIMAL (10, 2) NULL,
    [component_price_sum]                 DECIMAL (10, 2) NULL,
    [component_subsidy_deductible_sum]    DECIMAL (10, 2) NULL,
    [component_subsidy_nondeductible_sum] DECIMAL (10, 2) NULL,
    [component_own_expense_sum]           DECIMAL (10, 2) NULL,
    [insurance_price]                     DECIMAL (10, 2) NULL,
    [insurance_company]                   NVARCHAR (255)  NULL,
    [insurance_fee_overflow]              DECIMAL (10, 2) NULL,
    [insurance_processing_fee_overflow]   DECIMAL (10, 2) NULL,
    [predict_pay_price]                   DECIMAL (10, 2) NULL,
    [actual_pay_price]                    DECIMAL (10, 2) NULL,
    [company_rule]                        DECIMAL (10, 2) NULL,
    [deposit_sum]                         DECIMAL (10, 2) NULL,
    [loan_agency]                         VARCHAR (255)   NULL,
    [loan_bank_insurance_date]            DATE            NULL,
    [loan_bank_predict_price]             DECIMAL (10, 2) NULL,
    [loan_predict_subsidy_price]          DECIMAL (10, 2) NULL,
    [loan_company_subsidy_price]          DECIMAL (10, 2) NULL,
    [predict_balance]                     DECIMAL (10, 2) NULL,
    [promotion_condition_sum]             DECIMAL (10, 2) NULL,
    [predict_actual_condition_sum]        DECIMAL (10, 2) NULL,
    [actual_actual_condition_sum]         DECIMAL (10, 2) NULL,
    [predict_difference_price]            DECIMAL (10, 2) NULL,
    [actual_difference_price]             DECIMAL (10, 2) NULL,
    [cash_nondeductible]                  DECIMAL (10, 2) NULL,
    [over_discount_price]                 DECIMAL (10, 2) NULL,
    [PR_bonus_user_id]                    VARCHAR (50)    NULL,
    [PR_bonus_price]                      DECIMAL (10, 2) NULL,
    [over_discount_note]                  NVARCHAR (255)  NULL,
    [over_discount_price_sum]             DECIMAL (10, 2) NULL,
    [is_dispatched]                       VARCHAR (50)    NULL,
    [dispatch_car_time]                   DATETIME        NULL,
    [stop_dispatch]                       VARCHAR (2)     NULL,
    [is_accounting_check]                 VARCHAR (50)    NULL,
    [accounting_check_time]               DATETIME        NULL,
    [is_invoice_check]                    VARCHAR (50)    NULL,
    [invoice_check_time]                  DATETIME        NULL,
    [first_submit_time]                   DATETIME        NULL,
    [orderer_customer_name_en]            NVARCHAR (256)  NULL,
    [orderer_identity_number_en]          NVARCHAR (256)  NULL,
    [orderer_cellphone_en]                NVARCHAR (256)  NULL,
    [orderer_address_contact_en]          NVARCHAR (256)  NULL,
    [orderer_email_en]                    NVARCHAR (256)  NULL,
    [licenser_customer_name_en]           NVARCHAR (256)  NULL,
    [licenser_identity_number_en]         NVARCHAR (256)  NULL,
    [licenser_cellphone_en]               NVARCHAR (256)  NULL,
    [licenser_address_contact_en]         NVARCHAR (256)  NULL,
    [licenser_email_en]                   NVARCHAR (256)  NULL,
    [user_customer_name_en]               NVARCHAR (256)  NULL,
    [user_identity_number_en]             NVARCHAR (256)  NULL,
    [user_cellphone_en]                   NVARCHAR (256)  NULL,
    [user_address_contact_en]             NVARCHAR (256)  NULL,
    [user_email_en]                       NVARCHAR (256)  NULL,
    CONSTRAINT [PK__Order__46596229301F538D] PRIMARY KEY CLUSTERED ([order_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'初次送審時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'first_submit_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票確認時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'invoice_check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否發票確認', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'is_invoice_check';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'財務確認時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'accounting_check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'財務是否確認', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'is_accounting_check';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'暫停配對', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'stop_dispatch';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配車時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'dispatch_car_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車管是否已配車', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'is_dispatched';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總授權超折金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'over_discount_price_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'超折備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'over_discount_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公關車交車獎金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'PR_bonus_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公關車交車獎金領受人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'PR_bonus_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'超折申請', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'over_discount_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'現金不可折', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'cash_nondeductible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'實際尚差金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'actual_difference_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預估尚差金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'predict_difference_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'實際實際條件小計', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'actual_actual_condition_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預估實際條件小計', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'predict_actual_condition_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷條件小計', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'promotion_condition_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預估餘款', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'predict_balance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'貸款公司補助補貼息', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'loan_company_subsidy_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'貸款預計補貼息', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'loan_predict_subsidy_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'貸款預計金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'loan_bank_predict_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'貸款銀行預計對保日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'loan_bank_insurance_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'貸款機構', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'loan_agency';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總訂金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'deposit_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公司規範(最少訂金)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'company_rule';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'實際繳入總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'actual_pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計繳入總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'predict_pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'規費溢收', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'insurance_processing_fee_overflow';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保費溢收', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'insurance_fee_overflow';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保險公司', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'insurance_company';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保險報價金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'insurance_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件總自費', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'component_own_expense_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件總補助不可折', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'component_subsidy_nondeductible_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件總補助可折', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'component_subsidy_deductible_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配件總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'component_price_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'現金補助不可折', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'cash_subsidy_nondeductible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'現金補助可折', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'cash_subsidy_deductible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝成本', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'interior_cost';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝加價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'interior_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝顏色名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'interior_color';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝顏色代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'interior_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝成本', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'exterior_cost';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝加價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'exterior_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝顏色名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'exterior_color';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝顏色代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'exterior_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車還款價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'repayment_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型訂價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'car_type_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年份', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'year_age';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'規格名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'format_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'規格代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'format_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'car_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型內裝加價流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'ctip_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型外裝加價流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'ctep_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型規格定價流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'ctfp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否限定車', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'is_car_limit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否自領牌', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'is_self_licensed';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'銷顧備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'異常銷售種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'abnormal_sale_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂購人信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'orderer_email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂購人生日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'orderer_birthday';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂購人地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'orderer_address_contact';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂購人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'orderer_cellphone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂購人身分證', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'orderer_identity_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂購人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'orderer_customer_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'潛客流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'potential_customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'潛客是否購買人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'potential_is_orderer';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單保管紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'ocl_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'配發時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'allotment_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單配發紀錄流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'order_allotment_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稽核時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'audit_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稽核備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'audit_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'稽核狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'audit_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'異常回報時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'abnormal_return_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'異常回報備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'abnormal_return_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'異常回報狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'abnormal_return_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否異常', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'isabnormal';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'確認放行背書使用者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'release_check_endorse_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'確認放行時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'release_check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否確認放行', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'is_release_check';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'交車時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'delivery_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計交車時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'predict_delivery_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'提車時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'extraction_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'領牌日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'licensed_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'確認領牌背書使用者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'licensed_check_endorse_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'領牌確認時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'licensed_check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否確認領牌', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'is_licensed_check';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計領牌日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'predict_licensed_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保管人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'custody_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保管單位(據點流水號)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'custody_unit_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'簽約日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'contract_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'order_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流程', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'order_process';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'AutoDMS訂單編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'autodms_order_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'order_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單系統編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Order', @level2type = N'COLUMN', @level2name = N'order_id';

