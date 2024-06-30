CREATE TABLE [dbo].[ECGreenPay_TEST] (
    [id]     INT            IDENTITY (1, 1) NOT NULL,
    [retMsg] NVARCHAR (MAX) NULL,
    [cre_dt] DATETIME       CONSTRAINT [DF_ECGreenPay_TEST_cre_dt] DEFAULT (getdate()) NULL
);

