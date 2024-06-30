CREATE FUNCTION [dbo].[UserLevelTreeDESC]
(	
	@ul_id int,
	@level_min int,
	@level_max int
)
RETURNS TABLE 
AS
RETURN	
(
	WITH L AS
	(
		-- anchor:
		SELECT ul_id, code, name, parent_id, 0 AS [level] , level_audit_type
		FROM UserLevel WHERE ul_id = @ul_id
		UNION ALL
		-- recursive:
		SELECT u2.ul_id, u2.code, u2.name, u2.parent_id, [level] = L.[level] + 1 ,u2.level_audit_type
		FROM UserLevel AS u2 INNER JOIN L
		ON u2.ul_id = L.parent_id
	)
	SELECT * FROM (
		SELECT ul_id, code, name, parent_id, (SELECT max([level]) AS max_level FROM L)-[level] AS [level] ,level_audit_type FROM L
	) X
	WHERE @level_min<=[level] AND [level]<=@level_max
)