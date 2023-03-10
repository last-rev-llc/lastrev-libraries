-- a report showing what content types another type is allowed to be referenced by
SELECT
  ct2.name AS 'Content Type Name',
  ct2.id AS 'Content Type ID',
  COALESCE(GROUP_CONCAT(DISTINCT ct1.id), '') AS 'Types that can reference this type'
FROM
  field_content_type_validations
  LEFT JOIN content_types ct1 ON field_content_type_validations.content_type_id = ct1.id
  LEFT JOIN content_types ct2 ON field_content_type_validations.link_content_type_id = ct2.id
GROUP BY
  ct2.id
ORDER BY
  ct2.name