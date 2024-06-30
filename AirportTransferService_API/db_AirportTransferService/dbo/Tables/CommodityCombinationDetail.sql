CREATE TABLE [dbo].[CommodityCombinationDetail] (
    [cre_userid]              VARCHAR (50)    NULL,
    [cre_time]                DATETIME        NULL,
    [upd_userid]              VARCHAR (50)    NULL,
    [upd_time]                DATETIME        NULL,
    [ccd_id]                  INT             IDENTITY (1, 1) NOT NULL,
    [commoditycombination_id] VARCHAR (50)    NULL,
    [ccad_combination_id_1]   VARCHAR (50)    NULL,
    [ccad_combination_id_2]   VARCHAR (50)    NULL,
    [commodity_id]            VARCHAR (50)    NULL,
    [uc_id]                   VARCHAR (50)    NULL,
    [ccad_id_1]               VARCHAR (50)    NULL,
    [ccad_id_2]               VARCHAR (50)    NULL,
    [count]                   DECIMAL (20, 2) NULL,
    [need_calc_stock]         VARCHAR (1)     NULL,
    CONSTRAINT [PK__Commodit__7E807BBFAF335F8E] PRIMARY KEY CLUSTERED ([ccd_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否計算庫存', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'need_calc_stock';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'數量', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'count';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品自定義屬性細項流水號2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品自定義屬性細項流水號1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'單位換算流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'uc_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'內容商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'commodity_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'組合商品自定義屬性細項流水號2', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_combination_id_2';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'組合商品自定義屬性細項流水號1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccad_combination_id_1';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'組合商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'commoditycombination_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityCombinationDetail', @level2type = N'COLUMN', @level2name = N'ccd_id';

