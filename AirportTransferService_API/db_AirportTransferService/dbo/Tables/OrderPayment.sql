CREATE TABLE [dbo].[OrderPayment] (
    [cre_userid]                VARCHAR (50)    NULL,
    [cre_time]                  DATETIME        NULL,
    [upd_userid]                VARCHAR (50)    NULL,
    [upd_time]                  DATETIME        NULL,
    [op_id]                     INT             IDENTITY (1, 1) NOT NULL,
    [order_id]                  VARCHAR (50)    NULL,
    [isdeposit]                 VARCHAR (1)     NULL,
    [payment]                   NVARCHAR (50)   NULL,
    [transfer_out_bank]         NVARCHAR (255)  NULL,
    [transfer_out_account]      NVARCHAR (255)  NULL,
    [transfer_in_date]          DATE            NULL,
    [transfer_in_price]         DECIMAL (10, 2) NULL,
    [check_pay_bank]            NVARCHAR (255)  NULL,
    [check_number]              NVARCHAR (255)  NULL,
    [check_receive_bank]        NVARCHAR (255)  NULL,
    [check_receive_date]        DATE            NULL,
    [check_expired_date]        DATE            NULL,
    [check_price]               DECIMAL (10, 2) NULL,
    [swipe_in_bank]             NVARCHAR (255)  NULL,
    [swipe_in_account]          NVARCHAR (255)  NULL,
    [swipe_price]               DECIMAL (10, 2) NULL,
    [swipe_handling_fee]        DECIMAL (10, 2) NULL,
    [innertransfer_out_bank]    NVARCHAR (255)  NULL,
    [innertransfer_out_date]    DATE            NULL,
    [innertransfer_out_price]   DECIMAL (10, 2) NULL,
    [innertransfer_out_method]  NVARCHAR (255)  NULL,
    [innertransfer_summon_code] NVARCHAR (255)  NULL,
    [note]                      VARCHAR (255)   NULL,
    [is_accounting]             VARCHAR (1)     NULL,
    PRIMARY KEY CLUSTERED ([op_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否會計', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'is_accounting';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內轉轉出傳票號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'innertransfer_summon_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內轉轉出方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'innertransfer_out_method';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內轉轉出金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'innertransfer_out_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內轉轉出日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'innertransfer_out_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內轉轉出銀行', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'innertransfer_out_bank';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'刷卡手續費', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'swipe_handling_fee';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'刷卡入金金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'swipe_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'刷卡轉入帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'swipe_in_account';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'刷卡轉入銀行', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'swipe_in_bank';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'支票入金金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'check_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'支票到期日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'check_expired_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'支票貸收日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'check_receive_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'支票貸收銀行', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'check_receive_bank';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'支票票號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'check_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'支票付款銀行', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'check_pay_bank';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯款入金金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'transfer_in_price';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯款轉入日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'transfer_in_date';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯款轉出帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'transfer_out_account';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'匯款轉出銀行', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'transfer_out_bank';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'付款方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'payment';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否訂金', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'isdeposit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'訂單流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'order_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'OrderPayment', @level2type = N'COLUMN', @level2name = N'op_id';

