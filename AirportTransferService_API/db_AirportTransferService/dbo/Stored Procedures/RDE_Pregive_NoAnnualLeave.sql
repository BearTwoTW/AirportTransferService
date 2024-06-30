
CREATE PROCEDURE [dbo].[RDE_Pregive_NoAnnualLeave] @leave_rule_no_annual_id int,@user_id varchar(10),@year varchar(4)
AS
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
 select 'SYS'
 ,convert(varchar, getdate(), 112) as cre_time
 ,@user_id
 ,@year
 ,leave_rule_no_annual_id
 ,leave_type
 ,basic_day
 ,basic_day
 ,basic_day*8*60
 ,basic_day*8*60
 ,@year+'0101'
 ,@year+'1231'
 ,divisible
 from LeaveRuleNoAnnual
 where leave_rule_no_annual_id=@leave_rule_no_annual_id