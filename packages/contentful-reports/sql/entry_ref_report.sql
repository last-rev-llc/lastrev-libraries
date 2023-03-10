SELECT
  ct1.name AS 'Content Type Name',
  ct1.id AS 'Content Type ID',
  ct2.name AS 'Referred Type Name',
  ct2.id AS 'Referred Type ID',
  COUNT(DISTINCT er.reference_entry_id) AS 'Count of Entries Referenced'
FROM
  content_types ct1
  INNER JOIN entries e ON ct1.id = e.content_type_id
  INNER JOIN entry_references er ON e.id = er.entry_id
  INNER JOIN entries e2 ON er.reference_entry_id = e2.id
  INNER JOIN content_types ct2 ON e2.content_type_id = ct2.id
GROUP BY
  ct1.id,
  ct2.id
ORDER BY
  ct1.name,
  ct2.name;