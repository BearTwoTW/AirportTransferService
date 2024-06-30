CREATE TABLE [dbo].[LackMaterialMaster] (
    [cre_userid]          VARCHAR (50)   NULL,
    [cre_time]            DATETIME       NULL,
    [upd_userid]          VARCHAR (50)   NULL,
    [upd_time]            DATETIME       NULL,
    [lmm_id]              VARCHAR (50)   NOT NULL,
    [lmm_code]            VARCHAR (50)   NULL,
    [POS]                 VARCHAR (50)   NULL,
    [car_id]              VARCHAR (50)   NULL,
    [reception_userid]    VARCHAR (50)   NULL,
    [lm_date]             DATE           NULL,
    [order_date]          DATE           NULL,
    [est_arrival_date]    DATE           NULL,
    [actual_arrival_date] DATE           NULL,
    [receive_date]        DATE           NULL,
    [reserve_enter_date]  DATE           NULL,
    [caseclose_userid]    VARCHAR (50)   NULL,
    [caseclose_time]      DATETIME       NULL,
    [invalid_time]        DATETIME       NULL,
    [status]              NVARCHAR (50)  NULL,
    [note]                NVARCHAR (255) NULL,
    CONSTRAINT [PK_LackMaterialMaster] PRIMARY KEY CLUSTERED ([lmm_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'領料日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'LackMaterialMaster', @level2type = N'COLUMN', @level2name = N'receive_date';

