
CREATE PROCEDURE [dbo].[RDE_NoAnnual_Anniversary] @leave_type varchar(30)
AS

with h as (
 select 'SYS' as cre_userid
 ,convert(varchar, getdate(), 112) as cre_time
 ,user_id
 ,SUBSTRING(CONVERT(varchar,GETDATE(),112),1,4) as year
 ,leave_rule_no_annual_id
 ,leave_type
 ,LeaveRuleNoAnnual.basic_day as day_get
 ,LeaveRuleNoAnnual.basic_day as day_remain
 ,LeaveRuleNoAnnual.basic_day*8*60 as minute_get
 ,LeaveRuleNoAnnual.basic_day*8*60 as minute_remain
 ,SUBSTRING(CONVERT(varchar,GETDATE(),112),1,4)+'0101' as date_start
 ,SUBSTRING(CONVERT(varchar,GETDATE(),112),1,4)+'1231' as date_end
 ,LeaveRuleNoAnnual.divisible as divisible
 from Users
 left join (select leave_rule_no_annual_id,leave_type,basic_day,divisible 
			from LeaveRuleNoAnnual 
			where leave_type=@leave_type
			) as LeaveRuleNoAnnual on 1=1
  and LeaveRuleNoAnnual.basic_day is not null
)
 insert into LeaveRemainNoAnnual ([cre_userid]
      ,[cre_time]
      ,[user_id]
      ,[year]
	  ,[leave_rule_no_annual_id]
      ,[leave_type]
      ,[day_get]
      ,[day_remain]
      ,[minute_get]
      ,[minute_remain]
      ,[date_start]
      ,[date_end]
      ,[divisible])
select * from h where not exists(select 1 from LeaveRemainNoAnnual 
								where LeaveRemainNoAnnual.user_id=h.user_id
								and LeaveRemainNoAnnual.leave_type=h.leave_type
								and LeaveRemainNoAnnual.leave_rule_no_annual_id=h.leave_rule_no_annual_id
								and LeaveRemainNoAnnual.year=h.year)