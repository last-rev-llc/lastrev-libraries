SELECT
  ct.name AS 'Content Type Name',
  ct.id AS 'Content Type ID',
  COUNT(e.id) AS 'Total Count of Entries',
  COUNT(
    CASE
      WHEN e.status = 'draft' THEN 1
    END
  ) AS 'Count of Draft Entries',
  COUNT(
    CASE
      WHEN e.status = 'published' THEN 1
    END
  ) AS 'Count of Published Entries',
  COUNT(
    CASE
      WHEN e.status = 'changed' THEN 1
    END
  ) AS 'Count of Changed Entries'
FROM
  entries e
  LEFT OUTER JOIN content_types ct ON e.content_type_id = ct.id
GROUP BY
  ct.id
ORDER BY
  ct.name