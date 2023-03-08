SELECT
  c.name as 'Content Type Name',
  c.id as 'Content Type ID',
  count(f.id) as 'Total Number of Fields',
  count(
    CASE
      WHEN f.disabled THEN 1
    END
  ) as 'Number of Fields Disabled from Editing',
  count(
    CASE
      WHEN f.omitted THEN 1
    END
  ) as 'Number of Fields Disabled in Response'
FROM
  content_types c
  LEFT JOIN fields f ON c.id = f.content_type_id
GROUP BY
  c.id
ORDER BY
  c.name