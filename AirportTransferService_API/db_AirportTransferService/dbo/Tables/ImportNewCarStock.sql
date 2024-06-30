CREATE TABLE [dbo].[ImportNewCarStock] (
    [cre_userid]                      VARCHAR (50)  NULL,
    [cre_time]                        DATETIME      NULL,
    [id]                              INT           IDENTITY (1, 1) NOT NULL,
    [classification]                  VARCHAR (255) NULL,
    [status]                          VARCHAR (255) NULL,
    [produce_station]                 VARCHAR (255) NULL,
    [dealer]                          VARCHAR (255) NULL,
    [store_department]                VARCHAR (255) NULL,
    [store_space]                     VARCHAR (255) NULL,
    [car_type]                        VARCHAR (255) NULL,
    [car_type_name]                   VARCHAR (255) NULL,
    [format_code]                     VARCHAR (255) NULL,
    [format_name]                     VARCHAR (255) NULL,
    [year]                            INT           NULL,
    [year_age]                        INT           NULL,
    [exterior_code]                   VARCHAR (255) NULL,
    [exterior_color]                  VARCHAR (255) NULL,
    [interior_code]                   VARCHAR (255) NULL,
    [interior_color]                  VARCHAR (255) NULL,
    [day]                             INT           NULL,
    [manufacture_date]                DATE          NULL,
    [predict_offline_date]            DATE          NULL,
    [predict_dispatch_date]           DATE          NULL,
    [dispatch_date]                   DATE          NULL,
    [leave_factory_date]              DATE          NULL,
    [onboard_date]                    DATE          NULL,
    [predict_arrive_port_date]        DATE          NULL,
    [arrive_port_date]                DATE          NULL,
    [data_transfer_date]              DATE          NULL,
    [check_date]                      DATE          NULL,
    [general_agent_dispatch_datetime] DATETIME      NULL,
    [repayment_date]                  DATE          NULL,
    [stock_usage]                     VARCHAR (255) NULL,
    [brand]                           VARCHAR (255) NULL,
    [SIDO_no]                         VARCHAR (255) NULL,
    [vin_no]                          VARCHAR (255) NULL,
    [engine_no]                       VARCHAR (255) NULL,
    [body_code_no]                    VARCHAR (255) NULL,
    [transaction_type]                VARCHAR (255) NULL,
    [transaction_code]                VARCHAR (255) NULL,
    [car_owner_name]                  VARCHAR (255) NULL,
    [saler_name]                      VARCHAR (255) NULL,
    [transaction_datetime]            DATETIME      NULL,
    [transaction_date]                DATE          NULL,
    [employee_name]                   VARCHAR (255) NULL,
    [reserve_reason]                  VARCHAR (255) NULL,
    [reserve_department]              VARCHAR (255) NULL,
    [reserve_employee]                VARCHAR (255) NULL,
    [reserve_note]                    VARCHAR (255) NULL,
    [stock_card_code]                 VARCHAR (255) NULL,
    [target]                          VARCHAR (255) NULL,
    [deposit_code]                    VARCHAR (255) NULL,
    [deposit_date]                    VARCHAR (255) NULL,
    [quality_control_date]            DATE          NULL,
    [quality_control_mileage]         INT           NULL,
    [quality_control_reason]          VARCHAR (255) NULL,
    CONSTRAINT [PK__ImportNe__3213E83FD16A7824] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年份', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportNewCarStock', @level2type = N'COLUMN', @level2name = N'year_age';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportNewCarStock', @level2type = N'COLUMN', @level2name = N'car_type_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ImportNewCarStock', @level2type = N'COLUMN', @level2name = N'car_type';

