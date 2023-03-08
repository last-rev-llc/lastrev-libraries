SELECT
  c.name AS 'Content Type Name',
  c.id AS 'Content Type ID',
  f.name AS 'Field Name',
  f.id AS 'Field ID',
  CASE
    WHEN f.type = 'Link' THEN f.link_type || ' reference'
    WHEN f.type = 'Array'
    AND f.items_type = 'Link' THEN '[' || f.items_link_type || ' reference]'
    WHEN f.type = 'Array' THEN '[' || f.items_type || ']'
    ELSE f.type
  END AS 'Field Type',
  f.required AS 'Field is Required',
  f.disabled AS 'Field is Disabled from Editing',
  f.omitted AS 'Field is Diabled in Response',
  COALESCE(
    GROUP_CONCAT(DISTINCT v.link_content_type_id),
    ''
  ) AS 'Allowed Reference Types'
FROM
  fields f
  LEFT JOIN content_types c ON f.content_type_id = c.id
  LEFT JOIN field_content_type_validations v ON v.field_id = f.id
  AND v.content_type_id = c.id
GROUP BY
  c.id,
  f.id
ORDER BY
  c.name,
  f.name;