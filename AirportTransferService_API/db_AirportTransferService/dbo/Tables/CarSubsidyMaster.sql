CREATE TABLE [dbo].[CarSubsidyMaster] (
    [cre_userid]          VARCHAR (50)   NULL,
    [cre_time]            DATETIME       NULL,
    [upd_userid]          VARCHAR (50)   NULL,
    [upd_time]            DATETIME       NULL,
    [csm_id]              VARCHAR (50)   NOT NULL,
    [ct_id]               INT            NULL,
    [ctf_id]              INT            NULL,
    [year]                INT            NULL,
    [year_age]            INT            NULL,
    [valid_time_start]    DATE           NULL,
    [valid_time_end]      DATE           NULL,
    [licensed_time_start] DATE           NULL,
    [licensed_time_end]   DATE           NULL,
    [note]                NVARCHAR (255) NULL,
    [visible]             VARCHAR (1)    NULL,
    [seq]                 INT            NULL,
    PRIMARY KEY CLUSTERED ([csm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'順序', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'seq';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'領牌時間迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'licensed_time_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'領牌時間起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'licensed_time_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效時間迄', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'valid_time_end';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生效時間起', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'valid_time_start';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年份', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'year_age';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'年式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'year';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型規格流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'ctf_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'ct_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車補助主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarSubsidyMaster', @level2type = N'COLUMN', @level2name = N'csm_id';

