CREATE TABLE [dbo].[EC_CustomerReceiveInfo] (
    [cre_userid]             VARCHAR (50)   NULL,
    [cre_time]               DATETIME       NULL,
    [upd_userid]             VARCHAR (50)   NULL,
    [upd_time]               DATETIME       NULL,
    [ec_cri_id]              INT            NOT NULL,
    [customer_id]            VARCHAR (50)   NULL,
    [receiver_name]          VARCHAR (400)  NULL,
    [receiver_phone]         VARCHAR (400)  NULL,
    [receiver_zip_code]      VARCHAR (50)   NULL,
    [receiver_city]          VARCHAR (50)   NULL,
    [receiver_area]          VARCHAR (50)   NULL,
    [receiver_address]       VARCHAR (400)  NULL,
    [convenience_store_id]   VARCHAR (50)   NULL,
    [convenience_store_name] VARCHAR (50)   NULL,
    [receiver_name_en]       NVARCHAR (256) NULL,
    [receiver_phone_en]      NVARCHAR (256) NULL,
    [receiver_address_en]    NVARCHAR (256) NULL,
    PRIMARY KEY CLUSTERED ([ec_cri_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'便利商店名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'convenience_store_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'便利商店流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'convenience_store_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件地址', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'receiver_address';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'receiver_area';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件城市', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'receiver_city';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件郵遞區號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'receiver_zip_code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人電話', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'receiver_phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'收件人姓名', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'receiver_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'customer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'EC_CustomerReceiveInfo', @level2type = N'COLUMN', @level2name = N'ec_cri_id';

