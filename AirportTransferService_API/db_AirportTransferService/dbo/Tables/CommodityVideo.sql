CREATE TABLE [dbo].[CommodityVideo] (
    [cre_userid]    VARCHAR (50)  NULL,
    [cre_time]      DATETIME      NULL,
    [upd_userid]    VARCHAR (50)  NULL,
    [upd_time]      DATETIME      NULL,
    [v_id]          INT           IDENTITY (1, 1) NOT NULL,
    [commodity_id]  VARCHAR (50)  NULL,
    [video_content] VARCHAR (MAX) NULL,
    CONSTRAINT [PK_CommodityVideo] PRIMARY KEY CLUSTERED ([v_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'影片字串', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityVideo', @level2type = N'COLUMN', @level2name = N'video_content';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'商品流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CommodityVideo', @level2type = N'COLUMN', @level2name = N'commodity_id';

