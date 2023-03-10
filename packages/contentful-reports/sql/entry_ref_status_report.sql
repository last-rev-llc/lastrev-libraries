SELECT
  ct.id AS 'Content Type ID',
  ct.name AS 'Referred Type Name',
  e.id as 'Entry ID',
  e.status as 'Entry Status',
  -- count number of references to entries in draft status
  COUNT(
    CASE
      WHEN e2.status = 'draft' THEN 1
    END
  ) AS 'Count of Draft Entries Referenced',
  -- count number of references to entries in published status
  COUNT(
    CASE
      WHEN e2.status = 'published' THEN 1
    END
  ) AS 'Count of Published Entries Referenced',
  -- count number of references to entries in changed status  
  COUNT(
    CASE
      WHEN e2.status = 'changed' THEN 1
    END
  ) AS 'Count of Changed Entries Referenced',
  -- count number of references to entries that are missing
  COUNT(
    CASE
      WHEN e2.id IS NULL THEN 1
    END
  ) AS 'Count of Missing Entries Referenced'
FROM
  entries e
  INNER JOIN content_types ct ON e.content_type_id = ct.id
  INNER JOIN entry_references er ON e.id = er.entry_id
  LEFT OUTER JOIN entries e2 ON er.reference_entry_id = e2.id
GROUP BY
  e.id,
  ct.id
ORDER BY
  ct.name,
  e.id;