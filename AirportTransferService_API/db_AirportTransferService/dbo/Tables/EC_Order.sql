CREATE TABLE [dbo].[EC_Order] (
    [cre_userid]                    VARCHAR (50)    NULL,
    [cre_time]                      DATETIME        NULL,
    [upd_userid]                    VARCHAR (50)    NULL,
    [upd_time]                      DATETIME        NULL,
    [ec_order_id]                   VARCHAR (50)    NOT NULL,
    [ec_order_code]                 VARCHAR (50)    NULL,
    [customer_id]                   VARCHAR (50)    NULL,
    [customer_name]                 NVARCHAR (400)  NULL,
    [customer_email]                NVARCHAR (400)  NULL,
    [customer_mobile_phone]         NVARCHAR (400)  NULL,
    [zip_code]                      VARCHAR (50)    NULL,
    [city]                          NVARCHAR (40)   NULL,
    [area]                          NVARCHAR (40)   NULL,
    [customer_address]              NVARCHAR (400)  NULL,
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
    [total_price]                   DECIMAL (20, 2) NULL,
    [shopping_voucher]              DECIMAL (20, 2) NULL,
    [bonus_use]                     INT             NULL,
    [bonus_get]                     INT             NULL,
    [bonus_get_time]                DATETIME        NULL,
    [refund]                        DECIMAL (20, 2) NULL,
    [refund_shopping_voucher]       DECIMAL (20, 2) NULL,
    [ship_time]                     DATETIME        NULL,
    [ship_arrive_time]              DATETIME        NULL,
    [cancel_apply_time]             DATETIME        NULL,
    [cancel_user_id]                VARCHAR (50)    NULL,
    [cancel_customer_id]            VARCHAR (50)    NULL,
    [note]                          VARCHAR (255)   NULL,
    [customer_name_en]              NVARCHAR (256)  NULL,
    [customer_mobile_phone_en]      NVARCHAR (256)  NULL,
    [customer_email_en]             NVARCHAR (256)  NULL,
    [customer_address_en]           NVARCHAR (256)  NULL,
    [contact_name_en]               NVARCHAR (256)  NULL,
    [contact_email_en]              NVARCHAR (256)  NULL,
    [contact_mobile_phone_en]       NVARCHAR (256)  NULL,
    [contact_address_en]            NVARCHAR (256)  NULL,
    [promotion_ids]                 VARCHAR (MAX)   NULL,
    [logistics_id]                  INT             NULL,
    [logistics_name]                VARCHAR (255)   NULL,
    [logistics_freight]             DECIMAL (9, 2)  NULL,
    [isfreightfree]                 VARCHAR (1)     NULL,
    [pay_time]                      DATETIME        NULL,
    [pick_time]                     DATETIME        NULL,
    [TradeNo]                       VARCHAR (255)   NULL,
    [RESPONSEMSG]                   NVARCHAR (255)  NULL,
    [RESPONSECODE]                  NVARCHAR (255)  NULL,
    [resultMsgFront]                NVARCHAR (255)  NULL,
    [resultMsgBack]                 NVARCHAR (255)  NULL,
    [ec_opm_id]                     VARCHAR (50)    NULL,
    [order_message]                 VARCHAR (255)   NULL,
    [expired_time]                  DATETIME        NULL,
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
    [transfer_account]              VARCHAR (50)    NULL,
    [transfer_account_seller]       VARCHAR (50)    NULL,
    [transfer_bank_code_seller]     VARCHAR (50)    NULL,
    [transfer_bank_name_seller]     VARCHAR (50)    NULL,
    [ec_payment]                    VARCHAR (50)    NULL,
    [paytype]                       NVARCHAR (20)   NULL,
    [paytype_id]                    VARCHAR (50)    NULL,
    [unifiedRegistrationNumber]     VARCHAR (10)    NULL,
    [carrierType]                   VARCHAR (6)     NULL,
    [carrierID1]                    VARCHAR (64)    NULL,
    [carrierID2]                    VARCHAR (64)    NULL,
    [npoban]                        NVARCHAR (10)   NULL,
    [invoiceNo]                     VARCHAR (10)    NULL,
    [invoiceDate]                   DATE            NULL,
    [invoiceRandomNumber]           VARCHAR (10)    NULL,
    [invoiceStatus]                 NVARCHAR (10)   NULL,
    [invoiceCancelReason]           NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK__Order__46596229D8E2A88A] PRIMARY KEY CLUSTERED ([ec_order_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'呼叫外部物流要求回應訊息', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'logistics_RESPONSE_MSG';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'呼叫外部物流要求回應id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'logistics_RESPONSE_ID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'系統傳去的編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'logistics_RESQUEST_ID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流箱數', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'box_quantity';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總重量(公斤)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'total_weight';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'delivery_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'系統對應編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'other_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單逾期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'expired_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'order_message';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'揀貨單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'ec_opm_id';


GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'回傳代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'RESPONSECODE';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'回傳訊息', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'RESPONSEMSG';


GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'揀貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'pick_time';


GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'pay_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否免運', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'isfreightfree';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'運費', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'logistics_freight';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'logistics_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'物流流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'logistics_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效的促銷流水號們', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'promotion_ids';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消前台操作者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'cancel_customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消後台操作者', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'cancel_user_id';


GO



GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'出貨時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'ship_time';


GO



GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'total_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'contact_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人區域(聯絡)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'contact_area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人城市(聯絡)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'contact_city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'contact_mobile_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'contact_email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'contact_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'customer_address';




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員區域(聯絡)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員城市(聯絡)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'customer_mobile_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'customer_email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'customer_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'ec_order_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'ec_order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員郵遞區號(聯絡)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'zip_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'統編', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'unifiedRegistrationNumber';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'賣家匯款銀行名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'transfer_bank_name_seller';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'賣家匯款銀行代號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'transfer_bank_code_seller';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'賣家匯款帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'transfer_account_seller';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯款帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'transfer_account';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'交易編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'TradeNo';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'購物金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'shopping_voucher';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'出貨狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'ship_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'送達時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'ship_arrive_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人郵遞區號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'return_zip_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'return_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'return_mobile_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'return_city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人地區', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'return_area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退貨人地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'return_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'授權結果(前台)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'resultMsgFront';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'授權結果(後台)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'resultMsgBack';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退購物金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'refund_shopping_voucher';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'退費', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'refund';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'揀貨狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'pick_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'pay_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'order_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'官網付款狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'officesite_pay_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'官網訂單狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'officesite_order_status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'愛心碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'npoban';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'呼叫外部逆物流要求回應訊息', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'logistics_RETURN_RESPONSE_MSG';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'呼叫外部逆物流要求回應id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'logistics_RETURN_RESPONSE_ID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'invoiceStatus';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票隨機碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'invoiceRandomNumber';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'invoiceNo';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'invoiceDate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'發票作廢原因', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'invoiceCancelReason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新竹物流重量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'hct_weight';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'ec_payment';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡人郵遞區號(聯絡)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'contact_zip_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡(取貨)時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'contact_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'載具種類', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'carrierType';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'載具編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'carrierID2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'載具編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'carrierID1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'取消申請時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'cancel_apply_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'使用的紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'bonus_use';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'紅利回饋時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'bonus_get_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'得到的紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_Order', @level2type = N'COLUMN', @level2name = N'bonus_get';

