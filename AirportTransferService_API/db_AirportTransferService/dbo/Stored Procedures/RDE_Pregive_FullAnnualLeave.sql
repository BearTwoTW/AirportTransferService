
 CREATE PROCEDURE [dbo].[RDE_Pregive_FullAnnualLeave] @user_id varchar(30),@year real
AS
  insert into LeaveRemainAnnual([cre_userid],[cre_time],[user_id]
							,[year],[day_get],[day_remain],[minute_get],[minute_remain])
select 'SYS' as cre_userid,
		convert(varchar, getdate(), 112) as cre_time,
		@user_id,
		CAST(year as int) as year,
		basic_day as day_get ,
		basic_day as day_remain ,
		basic_day*8*60 as minute_get,
		basic_day*8*60 as minute_remain
		from LeaveRuleAnnual
		where year=@year
		and convert(varchar, getdate(), 112)>=date_start and convert(varchar, getdate(), 112)<=date_end 
		and not exists(select 1 from LeaveRemainAnnual where user_id=@user_id and year=@year)
--with h as (
-- select Users.user_id , 
--		Users.on_board_date,
--		ISNULL(max(LeaveRemainAnnual.year),0)+1 as year
-- from Users 
-- left join LeaveRemainAnnual on LeaveRemainAnnual.user_id=Users.user_id
-- where Users.user_id=@user_id
-- group by Users.user_id,Users.on_board_date
--)--select * from h
--, g as (
--select  top(9999) user_id,
--		h.year as year,
--		LeaveRuleAnnual.basic_day as day_get ,
--		LeaveRuleAnnual.basic_day as day_remain ,
--		LeaveRuleAnnual.basic_day*8*60 as minute_get,
--		LeaveRuleAnnual.basic_day*8*60 as minute_remain,
--		LeaveRuleAnnual.date_start,
--		LeaveRuleAnnual.date_end
--		from h
--		left join LeaveRuleAnnual on LeaveRuleAnnual.year<=h.year
--		where  convert(varchar, getdate(), 112)>=LeaveRuleAnnual.date_start and convert(varchar, getdate(), 112)<=LeaveRuleAnnual.date_end
--		order by user_id,LeaveRuleAnnual.year
--)
--,a as(select ROW_NUMBER() over (PARTITION BY user_id ORDER BY year) as Rnum,
--		user_id,
--		year,
--		day_get,
--		day_remain,
--		minute_get,
--		minute_remain,
--		date_start,
--		date_end ,
--		count(*) over(partition by user_id) as C
--		from g
--)
--  insert into LeaveRemainAnnual([cre_userid],[cre_time],[user_id]
--							,[year],[day_get],[day_remain],[minute_get],[minute_remain])
--select 'SYS' as cre_userid,
--		convert(varchar, getdate(), 112) as cre_time,
--		user_id,
--		CAST(year as int) as year,
--		day_get,
--		day_remain,
--		minute_get,
--		minute_remain
--		from a 
--		where Rnum=C and year<>1