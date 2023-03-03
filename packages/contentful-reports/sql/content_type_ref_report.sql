SELECT
  ct1.name AS 'Content Type Name',
  ct1.id AS 'Content Type ID',
  f.name AS 'Field Name',
  f.id AS 'Field ID',
  ct2.name AS 'Allowed Type Name',
  ct2.id AS 'Allowed Type ID'
FROM
  field_content_type_validations
  LEFT JOIN content_types ct1 ON field_content_type_validations.content_type_id = ct1.id
  LEFT JOIN content_types ct2 ON field_content_type_validations.link_content_type_id = ct2.id
  LEFT JOIN fields f ON field_content_type_validations.field_id = f.id
GROUP BY
  ct1.id,
  ct2.id,
  f.id
ORDER BY
  ct1.name,
  f.name,
  ct2.name;