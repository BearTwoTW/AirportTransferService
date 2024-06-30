CREATE TABLE [dbo].[PromotionLog] (
    [cre_userid]              VARCHAR (50)    NULL,
    [cre_time]                DATETIME        NULL,
    [upd_userid]              VARCHAR (50)    NULL,
    [upd_time]                DATETIME        NULL,
    [id]                      INT             IDENTITY (1, 1) NOT NULL,
    [promotion_id]            VARCHAR (50)    NULL,
    [name]                    NVARCHAR (255)  NULL,
    [note]                    NVARCHAR (255)  NULL,
    [order]                   INT             NULL,
    [combine_other_promotion] VARCHAR (1)     NULL,
    [valid_time_start]        DATETIME        NULL,
    [valid_time_end]          DATETIME        NULL,
    [event_type]              NVARCHAR (50)   NULL,
    [count_type]              NVARCHAR (50)   NULL,
    [event_number_start]      DECIMAL (20, 2) NULL,
    [event_number_end]        DECIMAL (20, 2) NULL,
    [discount_type]           NVARCHAR (50)   NULL,
    [discount_startcount]     INT             NULL,
    [discount_maxcount]       INT             NULL,
    [discount_number]         DECIMAL (20, 2) NULL,
    [gift_object_number]      INT             NULL,
    [gift_optional_number]    INT             NULL,
    [visible]                 VARCHAR (1)     NULL,
    [ismultiple]              VARCHAR (1)     NULL,
    [isfreightfree]           VARCHAR (1)     NULL,
    [freight_discount]        DECIMAL (20, 2) NULL,
    [promotion_type]          NVARCHAR (50)   NULL,
    [discount_code]           NVARCHAR (50)   NULL,
    [istemplate]              VARCHAR (1)     NULL,
    [personal_use_limit]      INT             NULL,
    [all_use_limit]           INT             NULL,
    [cl_id]                   INT             NULL,
    [cl_level_start]          DECIMAL (10, 2) NULL,
    [cl_level_end]            DECIMAL (10, 2) NULL,
    [source_type]             NVARCHAR (50)   NULL,
    [isadvance]               VARCHAR (1)     NULL,
    [su]                      VARCHAR (1)     NULL,
    [bonus_fix]               INT             NULL,
    [bonus_percent]           DECIMAL (5, 3)  NULL,
    [is_officesite_visible]   VARCHAR (1)     NULL,
    CONSTRAINT [PK__Promotio__3213E83F390F6E88] PRIMARY KEY CLUSTERED ([id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否免運', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'isfreightfree';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否倍數計算', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'ismultiple';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'贈品(買3送1用，事件種類&數量種類要選數量&按商品細項才能用 吧)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'gift_object_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣數字', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'discount_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣最大數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'discount_maxcount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣起始數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'discount_startcount';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'折扣種類(折比例、折數字、固定金額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'discount_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'事件數字迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'event_number_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'事件數字起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'event_number_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'累計種類(總計、按商品主項、按商品細項)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'count_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'事件種類(滿件、滿額)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'event_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效時間迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'valid_time_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效時間起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'valid_time_start';


GO



GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否合併其他優惠', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'combine_other_promotion';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'順序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'order';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷活動名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'促銷活動流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'promotion_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'官網是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'is_officesite_visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'加購贈品各自任選數字', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'gift_optional_number';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'比例紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'bonus_percent';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'固定紅利', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PromotionLog', @level2type = N'COLUMN', @level2name = N'bonus_fix';

