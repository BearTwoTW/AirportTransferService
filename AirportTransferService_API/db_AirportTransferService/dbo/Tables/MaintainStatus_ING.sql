CREATE TABLE [dbo].[MaintainStatus_ING] (
    [id]                   VARCHAR (20)   NOT NULL,
    [StartDate]            DATETIME       NULL,
    [license_plate]        VARCHAR (10)   NULL,
    [wrk_no]               VARCHAR (20)   NULL,
    [plant]                VARCHAR (10)   NULL,
    [EndTime]              DATETIME       NULL,
    [predict_worktime]     DECIMAL (9, 1) NULL,
    [actual_worktime]      DECIMAL (9, 1) NULL,
    [efficiency]           VARCHAR (20)   NULL,
    [cre_userid]           VARCHAR (50)   NULL,
    [cre_time]             DATETIME       NULL,
    [upd_userid]           VARCHAR (50)   NULL,
    [upd_time]             DATETIME       NULL,
    [isopen]               VARCHAR (1)    NULL,
    [OverTime]             DATETIME       NULL,
    [wash_time]            DECIMAL (9, 1) NULL,
    [stay_time]            DECIMAL (9, 1) NULL,
    [isappointment]        VARCHAR (1)    NULL,
    [technician]           VARCHAR (20)   NULL,
    [receptionist]         VARCHAR (20)   NULL,
    [fix_items]            VARCHAR (100)  NULL,
    [price_level]          VARCHAR (10)   NULL,
    [status]               VARCHAR (50)   NULL,
    [position_detail]      VARCHAR (50)   NULL,
    [position]             VARCHAR (50)   NULL,
    [predict_OverTime]     DATETIME       NULL,
    [predict_worktime_new] DECIMAL (9, 2) NULL,
    [model]                VARCHAR (50)   NULL,
    [test_drive]           VARCHAR (50)   NULL,
    [late_reason]          NVARCHAR (MAX) NULL,
    CONSTRAINT [PK__Maintain__3213E83F4C103DC9] PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'備註說明', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'late_reason';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否試車放行', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'test_drive';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車型', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'model';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'新的預估工時(DMS標準工時總和)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'predict_worktime_new';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預計完工時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'predict_OverTime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'位置', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'position';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'位置狀態細項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'position_detail';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預估金額等級', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'price_level';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'維修項目', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'fix_items';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'接待', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'receptionist';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'技師', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'technician';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'是否預約', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'isappointment';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'待修時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'stay_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'洗車時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'wash_time';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'完工時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'OverTime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'效率', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'efficiency';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'實際工時', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'actual_worktime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'預估工時', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'predict_worktime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'結束時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'EndTime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'廠別', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'plant';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工單號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'wrk_no';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'開始時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'StartDate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatus_ING', @level2type = N'COLUMN', @level2name = N'id';

