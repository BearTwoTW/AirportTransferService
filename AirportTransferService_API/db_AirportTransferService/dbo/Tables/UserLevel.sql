CREATE TABLE [dbo].[UserLevel] (
    [cre_userid]                VARCHAR (50)   NULL,
    [cre_time]                  DATETIME       NULL,
    [upd_userid]                VARCHAR (50)   NULL,
    [upd_time]                  DATETIME       NULL,
    [ul_id]                     INT            IDENTITY (1, 1) NOT NULL,
    [code]                      NVARCHAR (10)  NULL,
    [name]                      NVARCHAR (40)  NULL,
    [parent_id]                 INT            NULL,
    [company_id]                NVARCHAR (10)  NULL,
    [general_manager_id]        NVARCHAR (10)  NULL,
    [department_id]             NVARCHAR (10)  NULL,
    [position_id]               NVARCHAR (10)  NULL,
    [class_id]                  NVARCHAR (10)  NULL,
    [group_id]                  NVARCHAR (10)  NULL,
    [office_id]                 NVARCHAR (10)  NULL,
    [email]                     NVARCHAR (255) NULL,
    [phone]                     NVARCHAR (50)  NULL,
    [salary_type]               NVARCHAR (10)  NULL,
    [title]                     NVARCHAR (40)  NULL,
    [maximum]                   INT            NULL,
    [note]                      NVARCHAR (MAX) NULL,
    [lowest_ucr_id]             INT            NULL,
    [lowest_career_level]       INT            NULL,
    [leave_day_audit]           INT            NULL,
    [level_audit_type]          NVARCHAR (MAX) NULL,
    [perfect_attendance_bonus]  DECIMAL (9, 2) NULL,
    [order_over_discount_audit] DECIMAL (9, 2) NULL,
    [pdi_price_audit]           DECIMAL (9, 2) NULL,
    CONSTRAINT [PK_UserLevel] PRIMARY KEY CLUSTERED ([ul_id] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'pdi審核金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'pdi_price_audit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'超折審核金額', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'order_over_discount_audit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'請假超過幾天就要審核(不會自動綁職責)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'leave_day_audit';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最低職級', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'lowest_career_level';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'最低職等', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'lowest_ucr_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'可編制人數上限', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'maximum';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'title';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'薪水種類(時薪、月薪)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'salary_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'聯絡方式', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'phone';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職務信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'email';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'辦公室流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'office_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'組級流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'group_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'課級流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'class_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'部門流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'department_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總經理室流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'general_manager_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公司流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'母層級編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'parent_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'code';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'ul_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'upd_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'更新帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'upd_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增日期時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'cre_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新增帳號編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel', @level2type = N'COLUMN', @level2name = N'cre_userid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'職務(包含層級)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'UserLevel';



