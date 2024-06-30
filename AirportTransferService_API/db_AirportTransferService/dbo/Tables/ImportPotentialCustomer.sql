﻿CREATE TABLE [dbo].[ImportPotentialCustomer] (
    [cre_userid]                 VARCHAR (50)   NULL,
    [cre_time]                   DATETIME       NULL,
    [id]                         INT            IDENTITY (1, 1) NOT NULL,
    [dealer]                     NVARCHAR (255) NULL,
    [class_name]                 NVARCHAR (255) NULL,
    [chance_number]              NVARCHAR (255) NULL,
    [saler_username]             NVARCHAR (255) NULL,
    [saler_name]                 NVARCHAR (400) NULL,
    [status]                     NVARCHAR (255) NULL,
    [isreserve]                  NVARCHAR (10)  NULL,
    [potential_customer_name]    NVARCHAR (400) NULL,
    [car_type_codes]             NVARCHAR (MAX) NULL,
    [car_type_names]             NVARCHAR (MAX) NULL,
    [source]                     NVARCHAR (255) NULL,
    [medium]                     NVARCHAR (255) NULL,
    [introducer]                 NVARCHAR (400) NULL,
    [level]                      NVARCHAR (10)  NULL,
    [contact]                    NVARCHAR (255) NULL,
    [phone1]                     NVARCHAR (400) NULL,
    [phone2]                     NVARCHAR (400) NULL,
    [cellphone]                  NVARCHAR (400) NULL,
    [address_contact]            NVARCHAR (400) NULL,
    [create_date]                DATE           NULL,
    [predict_purchase_date]      DATE           NULL,
    [update_date]                DATE           NULL,
    [project_code]               NVARCHAR (255) NULL,
    [quotation_date]             DATETIME       NULL,
    [reserve_date]               DATETIME       NULL,
    [test_drive_date]            DATETIME       NULL,
    [last_contact_date]          DATETIME       NULL,
    [last_contact_purpose]       NVARCHAR (255) NULL,
    [next_contact_date]          DATETIME       NULL,
    [next_contact_purpose]       NVARCHAR (255) NULL,
    [co_saler_name]              NVARCHAR (255) NULL,
    [email]                      NVARCHAR (400) NULL,
    [defeat_brand]               NVARCHAR (255) NULL,
    [defeat_car_type]            NVARCHAR (255) NULL,
    [defeat_reason]              NVARCHAR (MAX) NULL,
    [birthday]                   DATE           NULL,
    [industry_type]              NVARCHAR (255) NULL,
    [purchase_status]            NVARCHAR (255) NULL,
    [purchase_purpose]           NVARCHAR (255) NULL,
    [payment]                    NVARCHAR (255) NULL,
    [sale_type]                  NVARCHAR (255) NULL,
    [budget_range]               NVARCHAR (255) NULL,
    [competition_brand]          NVARCHAR (255) NULL,
    [competition_car_type]       NVARCHAR (255) NULL,
    [own_brand]                  NVARCHAR (255) NULL,
    [own_car_type]               NVARCHAR (255) NULL,
    [consider_factors]           NVARCHAR (MAX) NULL,
    [order_number]               NVARCHAR (255) NULL,
    [order_audit_date]           NVARCHAR (255) NULL,
    [order_car_type]             NVARCHAR (255) NULL,
    [note]                       NVARCHAR (MAX) NULL,
    [contact_methods]            NVARCHAR (MAX) NULL,
    [first_contact_date]         DATE           NULL,
    [first_contact_purpose]      NVARCHAR (255) NULL,
    [is_personal_info_auth]      NVARCHAR (255) NULL,
    [unauth_type]                NVARCHAR (255) NULL,
    [saler_name_en]              NVARCHAR (256) NULL,
    [potential_customer_name_en] NVARCHAR (256) NULL,
    [introducer_en]              NVARCHAR (256) NULL,
    [phone1_en]                  NVARCHAR (256) NULL,
    [phone2_en]                  NVARCHAR (256) NULL,
    [cellphone_en]               NVARCHAR (256) NULL,
    [address_contact_en]         NVARCHAR (256) NULL,
    [email_en]                   NVARCHAR (256) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);
