SELECT 
    ct.name AS content_type_name, 
    e.id AS entry_id, 
    e.display_title AS entry_title,
    f.name AS field_name, 
    IFNULL(l.locale, 'false') AS locale, 
    CASE WHEN efhv.entry_id IS NULL THEN 'false' ELSE 'true' END AS field_has_value,
    tp.top_parent_reference_entry_id,
    ep.display_title AS top_parent_entry_title,
    ctp.name as top_parent_content_type_name
FROM 
    content_types ct
JOIN 
    entries e ON e.content_type_id = ct.id
JOIN 
    entries ep ON ep.id = tp.top_parent_reference_entry_id
JOIN 
    entry_top_parent_references_slug tp ON e.id = tp.entry_id
JOIN 
    content_types ctp ON ctp.id = tp.top_parent_content_type_id
JOIN 
    fields f ON f.content_type_id = ct.id AND f.localized = 1
LEFT JOIN 
    locales l ON 1=1
LEFT JOIN 
    entry_fields_has_value efhv ON efhv.entry_id = e.id AND efhv.field_id = f.id AND efhv.locale = l.locale
ORDER BY 
    e.id, f.name, l.locale;
