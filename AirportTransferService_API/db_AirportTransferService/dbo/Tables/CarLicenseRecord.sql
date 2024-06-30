CREATE TABLE [dbo].[CarLicenseRecord] (
    [cre_time]      DATETIME     NULL,
    [clr_id]        INT          IDENTITY (1, 1) NOT NULL,
    [license_plate] VARCHAR (50) NULL,
    [cam_ip]        VARCHAR (50) NULL,
    [position_id]   VARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([clr_id] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'據點流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarLicenseRecord', @level2type = N'COLUMN', @level2name = N'position_id';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'攝影機ip', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarLicenseRecord', @level2type = N'COLUMN', @level2name = N'cam_ip';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'車牌號碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarLicenseRecord', @level2type = N'COLUMN', @level2name = N'license_plate';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'流水號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'CarLicenseRecord', @level2type = N'COLUMN', @level2name = N'clr_id';

