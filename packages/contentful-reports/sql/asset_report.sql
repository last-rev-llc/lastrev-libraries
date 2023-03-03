-- Generate a report that contains the asset ID, the name, the filetype, the file size, the create date, and the number of items that are referencing the asset
SELECT
  a.id AS 'Asset ID',
  ad.locale AS 'Asset Locale',
  ad.title AS 'Asset Name',
  ad.content_type AS 'Asset Content-Type',
  ad.size AS 'Asset Size',
  a.created_date AS 'Asset Created Date',
  COUNT(ar.reference_asset_id) AS "Times Referenced"
FROM
  assets a
  INNER JOIN asset_data ad ON a.id = ad.asset_id
  LEFT JOIN asset_references ar ON a.id = ar.reference_asset_id
GROUP BY
  a.id,
  ad.locale
ORDER BY
  ad.title,
  ad.locale;