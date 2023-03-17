SELECT
  content_types.name AS 'Content Type Name',
  content_types.id AS 'Content Type ID',
  entries.published_date AS 'Last Published Date',
  entries.id AS 'Entry ID'
FROM
  content_types
  INNER JOIN entries ON content_types.id = entries.content_type_id
  LEFT JOIN entry_references ON entries.id = entry_references.reference_entry_id
WHERE
  entry_references.entry_id IS NULL
GROUP BY
  entries.id
ORDER BY
  content_types.name,
  entries.published_date