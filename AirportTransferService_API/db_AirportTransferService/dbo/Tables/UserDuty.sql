CREATE TABLE [dbo].[UserDuty] (
    [cre_userid]          VARCHAR (50)  NULL,
    [cre_time]            DATETIME      NULL,
    [upd_userid]          VARCHAR (50)  NULL,
    [upd_time]            DATETIME      NULL,
    [ud_id]               INT           IDENTITY (1, 1) NOT NULL,
    [code]                NVARCHAR (10) NULL,
    [name]                NVARCHAR (50) NULL,
    [ul_id]               INT           NULL,
    [is_calculate_salary] VARCHAR (1)   NULL,
    CONSTRAINT [PK__UserDuty__DF1DE6A1D50F0C1F] PRIMARY KEY CLUSTERED ([ud_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否計薪', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDuty', @level2type = N'COLUMN', @level2name = N'is_calculate_salary';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職務編號(邏輯主管)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDuty', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職責名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDuty', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職責代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDuty', @level2type = N'COLUMN', @level2name = N'code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職責流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDuty', @level2type = N'COLUMN', @level2name = N'ud_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職責', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserDuty';

