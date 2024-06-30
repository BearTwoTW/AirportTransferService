CREATE TABLE [dbo].[EinvBlankInvoice] (
    [cre_userid]           VARCHAR (255) DEFAULT ('') NULL,
    [cre_time]             DATETIME      DEFAULT ('') NULL,
    [upd_userid]           VARCHAR (255) DEFAULT ('') NULL,
    [upd_time]             DATETIME      DEFAULT ('') NULL,
    [einv_blankinvoice_id] INT           DEFAULT ('') NOT NULL,
    [headBan]              VARCHAR (255) DEFAULT ('') NULL,
    [branchBan]            VARCHAR (255) DEFAULT ('') NULL,
    [invoiceType]          VARCHAR (255) DEFAULT ('') NULL,
    [yearMonth]            VARCHAR (255) DEFAULT ('') NULL,
    [invoiceTrack]         VARCHAR (255) DEFAULT ('') NULL,
    [invoiceBeginNo]       VARCHAR (255) DEFAULT ('') NULL,
    [invoiceEndNo]         VARCHAR (255) DEFAULT ('') NULL,
    PRIMARY KEY CLUSTERED ([einv_blankinvoice_id] ASC)
);

