CREATE TABLE [dbo].[PDIOrder] (
    [cre_userid]                          VARCHAR (50)    NULL,
    [cre_time]                            DATETIME        NULL,
    [upd_userid]                          VARCHAR (50)    NULL,
    [upd_time]                            DATETIME        NULL,
    [pdi_order_id]                        VARCHAR (50)    NOT NULL,
    [outer_order_id]                      VARCHAR (50)    NULL,
    [outer_order_number]                  VARCHAR (50)    NULL,
    [order_process]                       VARCHAR (50)    NULL,
    [outer_order_process]                 VARCHAR (50)    NULL,
    [order_status]                        VARCHAR (50)    NULL,
    [contract_date]                       DATE            NULL,
    [custody_user_id]                     VARCHAR (50)    NULL,
    [outer_username]                      VARCHAR (50)    NULL,
    [predict_licensed_date]               DATE            NULL,
    [licensed_date]                       DATE            NULL,
    [license_plate]                       VARCHAR (255)   NULL,
    [predict_delivery_date]               DATE            NULL,
    [delivery_date]                       DATE            NULL,
    [isdelivery]                          VARCHAR (1)     NULL,
    [delivery_check_time]                 DATETIME        NULL,
    [delivery_check_userid]               VARCHAR (50)    NULL,
    [potential_customer_id]               VARCHAR (50)    NULL,
    [outer_potential_customer_id]         VARCHAR (50)    NULL,
    [note]                                NVARCHAR (255)  NULL,
    [cs_id]                               VARCHAR (50)    NULL,
    [ctfp_id]                             INT             NULL,
    [ctep_id]                             INT             NULL,
    [ctip_id]                             INT             NULL,
    [component_price_sum]                 DECIMAL (10, 2) NULL,
    [component_subsidy_deductible_sum]    DECIMAL (10, 2) NULL,
    [component_subsidy_nondeductible_sum] DECIMAL (10, 2) NULL,
    [component_own_expense_sum]           DECIMAL (10, 2) NULL,
    [deposit_sum]                         DECIMAL (10, 2) NULL,
    [is_accounting_check]                 VARCHAR (50)    NULL,
    [accounting_check_time]               DATETIME        NULL,
    [contract_name]                       NVARCHAR (50)   NULL,
    [custom_date]                         DATE            NULL,
    PRIMARY KEY CLUSTERED ([pdi_order_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自訂日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'custom_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'合約名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'contract_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '財務確認時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'accounting_check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '財務是否確認', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'is_accounting_check';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '總訂金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'deposit_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '配件總自費', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'component_own_expense_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '配件總補助不可折', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'component_subsidy_nondeductible_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '配件總補助可折', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'component_subsidy_deductible_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '配件總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'component_price_sum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型內裝加價流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'ctip_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型外裝加價流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'ctep_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車型規格定價流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'ctfp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '外部資料潛客流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'outer_potential_customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '潛客流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'potential_customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '交車確認使用者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'delivery_check_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '交車確認時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'delivery_check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否交車', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'isdelivery';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '交車日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'delivery_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '預計交車日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'predict_delivery_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '領牌日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'licensed_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '預計領牌日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'predict_licensed_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '外部保管人帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'outer_username';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '保管人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'custody_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'簽訂日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'contract_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '訂單狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'order_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '外部資料訂單流程', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'outer_order_process';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '訂單流程', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'order_process';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '外部資料訂單號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'outer_order_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '外部資料訂單系統編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'outer_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI訂單系統編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIOrder', @level2type = N'COLUMN', @level2name = N'pdi_order_id';

