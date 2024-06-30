CREATE TABLE [dbo].[EC_OrderLogistics] (
    [cre_userid]                    VARCHAR (50)    NULL,
    [cre_time]                      DATETIME        NULL,
    [upd_userid]                    VARCHAR (50)    NULL,
    [upd_time]                      DATETIME        NULL,
    [ec_order_logistics_id]         VARCHAR (50)    NOT NULL,
    [ec_order_id]                   VARCHAR (50)    NULL,
    [contact_name]                  NVARCHAR (400)  NULL,
    [contact_email]                 NVARCHAR (400)  NULL,
    [contact_mobile_phone]          NVARCHAR (400)  NULL,
    [contact_zip_code]              VARCHAR (50)    NULL,
    [contact_city]                  NVARCHAR (40)   NULL,
    [contact_area]                  NVARCHAR (40)   NULL,
    [contact_address]               NVARCHAR (400)  NULL,
    [contact_time]                  DATETIME        NULL,
    [return_name]                   NVARCHAR (400)  NULL,
    [return_mobile_phone]           NVARCHAR (400)  NULL,
    [return_zip_code]               VARCHAR (50)    NULL,
    [return_city]                   NVARCHAR (40)   NULL,
    [return_area]                   NVARCHAR (40)   NULL,
    [return_address]                NVARCHAR (400)  NULL,
    [refund]                        DECIMAL (20, 2) NULL,
    [refund_shopping_voucher]       DECIMAL (20, 2) NULL,
    [ship_time]                     DATETIME        NULL,
    [ship_arrive_time]              DATETIME        NULL,
    [cancel_apply_time]             DATETIME        NULL,
    [cancel_apply_note]             NVARCHAR (255)  NULL,
    [cancel_user_id]                VARCHAR (50)    NULL,
    [cancel_customer_id]            VARCHAR (50)    NULL,
    [cancel_check_time]             DATETIME        NULL,
    [cancel_check_note]             NVARCHAR (MAX)  NULL,
    [cancel_check_agree]            VARCHAR (2)     NULL,
    [return_apply_time]             DATETIME        NULL,
    [return_apply_note]             NVARCHAR (255)  NULL,
    [return_user_id]                VARCHAR (50)    NULL,
    [return_customer_id]            VARCHAR (50)    NULL,
    [return_check_time]             DATETIME        NULL,
    [return_check_note]             NVARCHAR (MAX)  NULL,
    [return_check_agree]            VARCHAR (2)     NULL,
    [note]                          VARCHAR (255)   NULL,
    [contact_name_en]               NVARCHAR (256)  NULL,
    [contact_email_en]              NVARCHAR (256)  NULL,
    [contact_mobile_phone_en]       NVARCHAR (256)  NULL,
    [contact_address_en]            NVARCHAR (256)  NULL,
    [logistics_id]                  INT             NULL,
    [logistics_name]                VARCHAR (255)   NULL,
    [logistics_freight]             DECIMAL (9, 2)  NULL,
    [isfreightfree]                 VARCHAR (1)     NULL,
    [pick_time]                     DATETIME        NULL,
    [pick_complete_time]            DATETIME        NULL,
    [ec_opm_id]                     VARCHAR (50)    NULL,
    [order_message]                 VARCHAR (255)   NULL,
    [other_code]                    VARCHAR (50)    NULL,
    [delivery_code]                 VARCHAR (50)    NULL,
    [total_weight]                  DECIMAL (10, 2) NULL,
    [hct_weight]                    VARCHAR (50)    NULL,
    [box_quantity]                  INT             NULL,
    [logistics_RESQUEST_ID]         VARCHAR (50)    NULL,
    [logistics_RESPONSE_ID]         VARCHAR (50)    NULL,
    [logistics_RESPONSE_MSG]        VARCHAR (255)   NULL,
    [logistics_RETURN_RESPONSE_ID]  VARCHAR (50)    NULL,
    [logistics_RETURN_RESPONSE_MSG] VARCHAR (255)   NULL,
    [officesite_pay_status]         VARCHAR (50)    NULL,
    [officesite_order_status]       VARCHAR (50)    NULL,
    [pay_status]                    VARCHAR (50)    NULL,
    [pick_status]                   VARCHAR (50)    NULL,
    [ship_status]                   VARCHAR (50)    NULL,
    [order_status]                  VARCHAR (50)    NULL,
    [return_confirm_time]           DATETIME        NULL,
    [return_receive_time]           DATETIME        NULL,
    [return_accept_time]            DATETIME        NULL,
    [refund_over_time]              DATETIME        NULL,
    [ec_refund_payment]             VARCHAR (50)    NULL,
    [refund_note]                   NVARCHAR (MAX)  NULL,
    [transfer_account_return]       VARCHAR (50)    NULL,
    [transfer_bank_code_return]     VARCHAR (50)    NULL,
    [transfer_bank_name_return]     VARCHAR (50)    NULL,
    [LogisticsSubType]              VARCHAR (50)    NULL,
    [ScheduledDeliveryTime]         VARCHAR (1)     NULL,
    [return_box_quantity]           INT             NULL,
    CONSTRAINT [PK_EC_OrderLogistics] PRIMARY KEY CLUSTERED ([ec_order_logistics_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'希望送達時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'ScheduledDeliveryTime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流子類型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'LogisticsSubType';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退款匯款銀行名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'transfer_bank_name_return';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退款匯款銀行代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'transfer_bank_code_return';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退款匯款帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'transfer_account_return';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退款備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'refund_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退款付款方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'ec_refund_payment';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退款完成時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'refund_over_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨驗貨完成時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_accept_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收到退貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_receive_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'確認退貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_confirm_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'order_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'出貨狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'ship_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'揀貨狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'pick_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'pay_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'官網訂單狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'officesite_order_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'官網付款狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'officesite_pay_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'呼叫外部逆物流要求回應訊息', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'logistics_RETURN_RESPONSE_MSG';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'呼叫外部逆物流要求回應id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'logistics_RETURN_RESPONSE_ID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'呼叫外部物流要求回應訊息', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'logistics_RESPONSE_MSG';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'呼叫外部物流要求回應id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'logistics_RESPONSE_ID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'系統傳去的編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'logistics_RESQUEST_ID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流箱數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'box_quantity';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新竹物流重量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'hct_weight';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總重量(公斤)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'total_weight';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'delivery_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'系統對應編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'other_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'order_message';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'揀貨單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'ec_opm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'完成揀貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'pick_complete_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'開始揀貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'pick_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否免運', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'isfreightfree';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'運費', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'logistics_freight';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'logistics_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'logistics_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨是否同意', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_check_agree';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨確認備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_check_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'確認退貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨前台操作者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨後台操作者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨申請備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_apply_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨申請時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_apply_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消是否同意', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'cancel_check_agree';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消確認備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'cancel_check_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消確認時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'cancel_check_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消前台操作者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'cancel_customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消後台操作者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'cancel_user_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消申請備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'cancel_apply_note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消申請時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'cancel_apply_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'送達時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'ship_arrive_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'出貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'ship_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退購物金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'refund_shopping_voucher';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退費', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'refund';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人地區', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人郵遞區號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_zip_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_mobile_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'return_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡(取貨)時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'contact_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'contact_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人區域(聯絡)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'contact_area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人城市(聯絡)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'contact_city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人郵遞區號(聯絡)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'contact_zip_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'contact_mobile_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'contact_email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'contact_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'ec_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單物流流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_OrderLogistics', @level2type = N'COLUMN', @level2name = N'ec_order_logistics_id';

