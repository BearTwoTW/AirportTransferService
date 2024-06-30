CREATE TABLE [dbo].[MRD] (
    [Plant]        VARCHAR (10)    NOT NULL,
    [mrd_id]       VARCHAR (50)    NOT NULL,
    [mrm_id]       VARCHAR (50)    NOT NULL,
    [op_code]      VARCHAR (8)     NULL,
    [wrk_detail]   VARCHAR (255)   NULL,
    [pay_code]     VARCHAR (2)     NULL,
    [charge_type]  CHAR (2)        NULL,
    [wrk_hours]    DECIMAL (18, 2) NULL,
    [technician]   VARCHAR (50)    NULL,
    [discount]     DECIMAL (18, 2) NULL,
    [wage]         DECIMAL (18, 2) NULL,
    [wage_type]    VARCHAR (4)     NULL,
    [sub_contract] VARCHAR (1)     NULL,
    [job_no]       VARCHAR (2)     NULL,
    CONSTRAINT [PK_MRD] PRIMARY KEY CLUSTERED ([Plant] ASC, [mrd_id] ASC, [mrm_id] ASC)
);

