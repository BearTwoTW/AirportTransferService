CREATE TABLE [dbo].[CarStock] (
    [cre_userid]                      VARCHAR (50)   NULL,
    [cre_time]                        DATETIME       NULL,
    [upd_userid]                      VARCHAR (50)   NULL,
    [upd_time]                        DATETIME       NULL,
    [cs_id]                           VARCHAR (50)   NOT NULL,
    [license_plate]                   VARCHAR (255)  NULL,
    [classification]                  NVARCHAR (255) NULL,
    [status]                          NVARCHAR (255) NULL,
    [produce_station]                 NVARCHAR (255) NULL,
    [dealer]                          NVARCHAR (255) NULL,
    [cw_id]                           NVARCHAR (50)  NULL,
    [order_id]                        NVARCHAR (50)  NULL,
    [custody_user_id]                 NVARCHAR (50)  NULL,
    [ct_id]                           INT            NULL,
    [ctf_id]                          INT            NULL,
    [ctfp_id]                         INT            NULL,
    [year]                            INT            NULL,
    [year_age]                        INT            NULL,
    [ctep_id]                         INT            NULL,
    [ce_id]                           INT            NULL,
    [ctip_id]                         INT            NULL,
    [ci_id]                           INT            NULL,
    [day]                             INT            NULL,
    [manufacture_date]                DATE           NULL,
    [predict_offline_date]            DATE           NULL,
    [predict_dispatch_date]           DATE           NULL,
    [dispatch_date]                   DATE           NULL,
    [leave_factory_date]              DATE           NULL,
    [onboard_date]                    DATE           NULL,
    [predict_arrive_port_date]        DATE           NULL,
    [arrive_port_date]                DATE           NULL,
    [data_transfer_date]              DATE           NULL,
    [check_date]                      DATE           NULL,
    [general_agent_dispatch_datetime] DATETIME       NULL,
    [repayment_date]                  DATE           NULL,
    [stock_usage]                     NVARCHAR (255) NULL,
    [brand]                           NVARCHAR (255) NULL,
    [SIDO_no]                         NVARCHAR (255) NULL,
    [vin_no]                          NVARCHAR (255) NULL,
    [engine_no]                       NVARCHAR (255) NULL,
    [body_code_no]                    NVARCHAR (255) NULL,
    [transaction_type]                NVARCHAR (255) NULL,
    [transaction_code]                NVARCHAR (255) NULL,
    [car_owner_name]                  NVARCHAR (400) NULL,
    [saler_name]                      NVARCHAR (255) NULL,
    [transaction_datetime]            DATETIME       NULL,
    [transaction_date]                DATE           NULL,
    [employee_name]                   NVARCHAR (255) NULL,
    [reserve_reason]                  NVARCHAR (255) NULL,
    [reserve_department]              NVARCHAR (255) NULL,
    [reserve_employee]                NVARCHAR (255) NULL,
    [reserve_note]                    NVARCHAR (255) NULL,
    [stock_card_code]                 NVARCHAR (255) NULL,
    [target]                          NVARCHAR (255) NULL,
    [deposit_code]                    NVARCHAR (255) NULL,
    [deposit_date]                    DATE           NULL,
    [quality_control_date]            DATE           NULL,
    [quality_control_mileage]         INT            NULL,
    [quality_control_reason]          NVARCHAR (255) NULL,
    [car_species]                     NVARCHAR (255) NULL,
    [licensed_date]                   DATE           NULL,
    [saleable]                        NVARCHAR (1)   NULL,
    [layoff_date]                     DATE           NULL,
    [suspension_date]                 DATE           NULL,
    [asset_type]                      NVARCHAR (255) NULL,
    [special_equipment]               NVARCHAR (255) NULL,
    [note]                            NVARCHAR (255) NULL,
    [invoice_date]                    DATE           NULL,
    [visible]                         VARCHAR (1)    NULL,
    CONSTRAINT [PK__CarStock__138C55F4C99EA6D7] PRIMARY KEY CLUSTERED ([cs_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'invoice_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'特殊配備', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'special_equipment';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'財產種類(貨品、資產)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'asset_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'停牌日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'suspension_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'停駛日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'layoff_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可銷售', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'saleable';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'領牌日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'licensed_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車種', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'car_species';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'品管記錄原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'quality_control_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'品管紀錄里程', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'quality_control_mileage';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'品管紀錄日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'quality_control_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'寄存日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'deposit_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'寄存區代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'deposit_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'對象', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'target';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存卡號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'stock_card_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保留備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'reserve_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保留員工', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'reserve_employee';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保留部門', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'reserve_department';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保留原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'reserve_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'員工姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'employee_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'交易日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'transaction_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'交易時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'transaction_datetime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'銷售人員姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'saler_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車主姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'car_owner_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'交易單號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'transaction_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'交易類別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'transaction_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車身號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'body_code_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'引擎號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'engine_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'VIN號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'vin_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'SIDO號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'SIDO_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'品牌', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'brand';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'庫存用途', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'stock_usage';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'還款日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'repayment_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總代理配車日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'general_agent_dispatch_datetime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'點收日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'check_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'資料轉入日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'data_transfer_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'到港日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'arrive_port_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計到港日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'predict_arrive_port_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'出船日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'onboard_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'出廠日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'leave_factory_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'出車日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'dispatch_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計出車日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'predict_dispatch_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計下線日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'predict_offline_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'製造年月', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'manufacture_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'天數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'day';


GO



GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型內裝加價流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'ctip_id';


GO



GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型外裝加價流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'ctep_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年份', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'year_age';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'year';


GO



GO



GO



GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型規格定價流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'ctfp_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型規格流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'ct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'保管人編號(跟倉庫的管理人不一樣)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'custody_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車倉儲流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'cw_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經銷商', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'dealer';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生產站別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'produce_station';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車輛分類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'classification';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車庫存流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'cs_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內裝流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'ci_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外裝流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarStock', @level2type = N'COLUMN', @level2name = N'ce_id';

