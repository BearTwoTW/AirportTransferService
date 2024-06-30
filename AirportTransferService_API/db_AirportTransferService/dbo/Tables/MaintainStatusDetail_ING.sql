CREATE TABLE [dbo].[MaintainStatusDetail_ING] (
    [id]              INT           IDENTITY (1, 1) NOT NULL,
    [m_id]            VARCHAR (20)  NULL,
    [status]          VARCHAR (50)  NULL,
    [position]        VARCHAR (50)  NULL,
    [EnterTime]       DATETIME      NULL,
    [ProcessPerson]   VARCHAR (255) NULL,
    [temp_stop]       VARCHAR (1)   NULL,
    [last_position]   VARCHAR (50)  NULL,
    [cre_userid]      VARCHAR (50)  NULL,
    [cre_time]        DATETIME      NULL,
    [position_detail] VARCHAR (5)   NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'狀態位置細項', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusDetail_ING', @level2type = N'COLUMN', @level2name = N'position_detail';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'上個區域', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusDetail_ING', @level2type = N'COLUMN', @level2name = N'last_position';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'人工暫停', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusDetail_ING', @level2type = N'COLUMN', @level2name = N'temp_stop';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'經手人', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusDetail_ING', @level2type = N'COLUMN', @level2name = N'ProcessPerson';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'進入時間', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusDetail_ING', @level2type = N'COLUMN', @level2name = N'EnterTime';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'位置', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusDetail_ING', @level2type = N'COLUMN', @level2name = N'position';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'狀態', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusDetail_ING', @level2type = N'COLUMN', @level2name = N'status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主項流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusDetail_ING', @level2type = N'COLUMN', @level2name = N'm_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'MaintainStatusDetail_ING', @level2type = N'COLUMN', @level2name = N'id';

