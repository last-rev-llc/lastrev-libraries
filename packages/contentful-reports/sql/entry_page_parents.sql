SELECT
  etp.entry_id,
  etp.content_type_id,
  e.display_title AS entry_title,
  etp.top_parent_reference_entry_id,
  etp.top_parent_content_type_id,
  ep.display_title AS parent_entry_title
FROM 
    entry_top_parent_references_slug etp
JOIN 
    entries e ON e.id = etp.entry_id
JOIN 
    entries ep ON ep.id = etp.top_parent_reference_entry_id
ORDER BY 
    etp.entry_id
