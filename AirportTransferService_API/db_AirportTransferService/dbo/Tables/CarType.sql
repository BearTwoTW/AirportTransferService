CREATE TABLE [dbo].[CarType] (
    [cre_userid]    VARCHAR (50)    NULL,
    [cre_time]      DATETIME        NULL,
    [upd_userid]    VARCHAR (50)    NULL,
    [upd_time]      DATETIME        NULL,
    [ct_id]         INT             IDENTITY (1, 1) NOT NULL,
    [car_type]      NVARCHAR (255)  NULL,
    [car_type_name] NVARCHAR (255)  NULL,
    [company_rule]  DECIMAL (10, 2) NULL,
    [outer_id]      NVARCHAR (255)  NULL,
    CONSTRAINT [PK__CarType__33D47D09DB0C90C9] PRIMARY KEY CLUSTERED ([ct_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'外部id', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarType', @level2type = N'COLUMN', @level2name = N'outer_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'公司規範(最少訂金)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarType', @level2type = N'COLUMN', @level2name = N'company_rule';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型名稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarType', @level2type = N'COLUMN', @level2name = N'car_type_name';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型代碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarType', @level2type = N'COLUMN', @level2name = N'car_type';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarType', @level2type = N'COLUMN', @level2name = N'ct_id';

