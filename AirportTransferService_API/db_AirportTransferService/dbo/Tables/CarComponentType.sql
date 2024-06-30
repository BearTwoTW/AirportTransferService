﻿CREATE TABLE [dbo].[CarComponentType] (
    [cre_userid]     VARCHAR (50)   NULL,
    [cre_time]       DATETIME       NULL,
    [upd_userid]     VARCHAR (50)   NULL,
    [upd_time]       DATETIME       NULL,
    [cct_id]         INT            IDENTITY (1, 1) NOT NULL,
    [component_type] NVARCHAR (255) NULL,
    [visible]        VARCHAR (1)    NULL,
    PRIMARY KEY CLUSTERED ([cct_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponentType', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'類型名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponentType', @level2type = N'COLUMN', @level2name = N'component_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarComponentType', @level2type = N'COLUMN', @level2name = N'cct_id';

