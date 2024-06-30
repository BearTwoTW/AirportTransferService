

CREATE PROCEDURE [dbo].[RDE_Pregive_HalfAnnualLeave] @user_id varchar(30)
AS
with h as (
 select Users.user_id , 
		ISNULL(max(LeaveRemainAnnual.year),-0.5)+1 as year
 from Users 
 left join LeaveRemainAnnual on LeaveRemainAnnual.user_id=Users.user_id
 where Users.user_id=@user_id
 group by Users.user_id
)
insert into LeaveRemainAnnual([cre_userid],[cre_time],[user_id]
							,[year],[day_get],[day_remain],[minute_get],[minute_remain])
		select
		'SYS' as cre_userid,
		convert(varchar, getdate(), 112) as cre_time,
		h.user_id,
		LeaveRuleAnnual.year,
		LeaveRuleAnnual.basic_day as day_get,
		LeaveRuleAnnual.basic_day as day_remain,
		LeaveRuleAnnual.basic_day*8*60 as minute_get,
		LeaveRuleAnnual.basic_day*8*60 as minute_remain
		from h
		left join LeaveRuleAnnual on LeaveRuleAnnual.[year]=h.year
		where LeaveRuleAnnual.year=0.5
		and convert(varchar, getdate(), 112)>=LeaveRuleAnnual.date_start and convert(varchar, getdate(), 112)<=LeaveRuleAnnual.date_end