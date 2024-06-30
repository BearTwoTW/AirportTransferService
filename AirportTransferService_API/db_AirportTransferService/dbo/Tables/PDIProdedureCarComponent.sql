CREATE TABLE [dbo].[PDIProdedureCarComponent] (
    [cre_userid]             VARCHAR (50)    NULL,
    [cre_time]               DATETIME        NULL,
    [upd_userid]             VARCHAR (50)    NULL,
    [upd_time]               DATETIME        NULL,
    [pdi_pcc_id]             VARCHAR (50)    NOT NULL,
    [pdi_pm_id]              VARCHAR (50)    NULL,
    [stock_id]               VARCHAR (50)    NULL,
    [commodity_id]           VARCHAR (50)    NULL,
    [uc_id]                  VARCHAR (50)    NULL,
    [ccad_id_1]              VARCHAR (50)    NULL,
    [ccad_id_2]              VARCHAR (50)    NULL,
    [need_calc_stock]        VARCHAR (1)     NULL,
    [price]                  DECIMAL (10, 2) NULL,
    [count]                  DECIMAL (10, 2) NULL,
    [final_price]            DECIMAL (10, 2) NULL,
    [price_type]             VARCHAR (50)    NULL,
    [deductible_pay_price]   DECIMAL (10, 2) NULL,
    [company_pay_price]      DECIMAL (10, 2) NULL,
    [headquarters_pay_price] DECIMAL (10, 2) NULL,
    [status]                 VARCHAR (50)    NULL,
    [audit_time]             DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([pdi_pcc_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'審核時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'audit_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總公司付金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'headquarters_pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公司付金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'company_pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'自付金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'deductible_pay_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'價格類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'price_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'成交價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'final_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '單價', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '是否計算庫存', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'need_calc_stock';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '屬性細項2流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '屬性細項1流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '單位轉換流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = '配件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'stock_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI流程主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'pdi_pm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = 'PDI流程配件流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PDIProdedureCarComponent', @level2type = N'COLUMN', @level2name = N'pdi_pcc_id';

