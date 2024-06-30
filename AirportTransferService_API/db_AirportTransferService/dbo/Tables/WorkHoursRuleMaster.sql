CREATE TABLE [dbo].[WorkHoursRuleMaster] (
    [cre_userid]         VARCHAR (50)  NULL,
    [cre_time]           DATETIME      NULL,
    [upd_userid]         VARCHAR (50)  NULL,
    [upd_time]           DATETIME      NULL,
    [whrm_id]            VARCHAR (50)  NOT NULL,
    [whrm_name]          VARCHAR (50)  NULL,
    [company_id]         NVARCHAR (10) NULL,
    [general_manager_id] NVARCHAR (10) NULL,
    [department_id]      NVARCHAR (10) NULL,
    [position_id]        NVARCHAR (10) NULL,
    [class_id]           NVARCHAR (10) NULL,
    [group_id]           NVARCHAR (10) NULL,
    [office_id]          NVARCHAR (10) NULL,
    [note]               VARCHAR (255) NULL,
    [visible]            VARCHAR (1)   NULL,
    [cm_id]              VARCHAR (50)  NULL,
    CONSTRAINT [PK__WorkHour__67EEA8BA9AE38415] PRIMARY KEY CLUSTERED ([whrm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否可見', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'visible';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'note';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'組級流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'group_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'課級流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'class_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'部門流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'department_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'總經理室流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'general_manager_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公司流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'company_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工時規則主項名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'whrm_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工時規則主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'WorkHoursRuleMaster', @level2type = N'COLUMN', @level2name = N'whrm_id';

