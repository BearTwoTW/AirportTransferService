
CREATE PROCEDURE [dbo].[RDE_UserCreate_GiveVacation] @on_board_date date,@user_id varchar(10)
AS
with h_LeaveRule as(
select leave_rule_no_annual_id,basic_day,leave_type from LeaveRuleNoAnnual where leave_type='一年給幾天系列' and visible='Y'
)
insert into LeaveRemainNoAnnual (cre_userid,cre_time,user_id,year,leave_rule_no_annual_id,leave_type
								,day_get,day_remain,minute_get,minute_remain,date_start,date_end,divisible)
select 
'SYS',
GETDATE(),
@user_id,
YEAR(@on_board_date),
leave_rule_no_annual_id,
leave_type,
--計算到職日到年底比例
CEILING(CONVERT(real,DATEDIFF(day,@on_board_date,DATEADD(yy, DATEDIFF(yy, 0, YEAR(@on_board_date)) + 1, -1))/365.0*basic_day)),
CEILING(CONVERT(real,DATEDIFF(day,@on_board_date,DATEADD(yy, DATEDIFF(yy, 0, YEAR(@on_board_date)) + 1, -1))/365.0*basic_day)),
CEILING(CONVERT(real,DATEDIFF(day,@on_board_date,DATEADD(yy, DATEDIFF(yy, 0, YEAR(@on_board_date)) + 1, -1))/365.0*basic_day))*8*60,
CEILING(CONVERT(real,DATEDIFF(day,@on_board_date,DATEADD(yy, DATEDIFF(yy, 0, YEAR(@on_board_date)) + 1, -1))/365.0*basic_day))*8*60,
DATEADD(yy, DATEDIFF(yy, 0, @on_board_date), 0),
DATEADD(yy, DATEDIFF(yy, 0, @on_board_date) + 1, -1),
'Y'
from h_LeaveRule