-- This is the table for the base content types
CREATE TABLE IF NOT EXISTS content_types (
  id TEXT PRIMARY KEY,
  display_field TEXT,
  name TEXT NOT NULL,
  description TEXT
);

-- this table is for the fields of the content types. Each field has a reference to the content type to which it belongs
-- as well as the important metadata about the field
CREATE TABLE IF NOT EXISTS fields (
  id TEXT NOT NULL,
  content_type_id TEXT NOT NULL REFERENCES content_types (id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  required BOOLEAN NOT NULL,
  disabled BOOLEAN NOT NULL,
  omitted BOOLEAN NOT NULL,
  localized BOOLEAN NOT NULL,
  link_type TEXT,
  items_type TEXT,
  items_link_type TEXT,
  PRIMARY KEY (id, content_type_id)
);

-- this table represents specific validationa on content type fields.
-- specifically it only cares about the validations that are related to which 
-- content types are allowed to be referenced (linkContentType)
CREATE TABLE IF NOT EXISTS field_content_type_validations (
  field_id TEXT NOT NULL,
  content_type_id TEXT NOT NULL REFERENCES content_types (id),
  link_content_type_id TEXT NOT NULL REFERENCES content_types (id),
  PRIMARY KEY (field_id, content_type_id, link_content_type_id),
  FOREIGN KEY (field_id, content_type_id) REFERENCES fields (id, content_type_id)
);

-- this table represents the entries in the space. Each entry has a reference to the content type to which it belongs
CREATE TABLE IF NOT EXISTS entries (
  id TEXT PRIMARY KEY,
  content_type_id TEXT NOT NULL REFERENCES content_types (id),
  created_date TEXT NOT NULL,
  updated_date TEXT NOT NULL,
  published_date TEXT,
  first_published_date TEXT,
  status TEXT
);

-- this table is a collection of references from one entry to another. It references the entryId to which it belongs,
-- the fieldId of the field that contains the reference, the content type of the entry, the locale this field value reprenets
-- and the id of the entry being referenced
CREATE TABLE IF NOT EXISTS entry_references (
  entry_id TEXT NOT NULL REFERENCES entries (id),
  array_index INTEGER NOT NULL,
  field_id TEXT NOT NULL REFERENCES fields (id),
  content_type_id TEXT NOT NULL REFERENCES content_types (id),
  locale TEXT NOT NULL,
  reference_entry_id TEXT NOT NULL,
  PRIMARY KEY (entry_id, array_index, field_id, locale),
  FOREIGN KEY (field_id, content_type_id) REFERENCES fields (id, content_type_id)
);

-- this table is a collection of all of the assets of the space
CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY,
  created_date TEXT NOT NULL,
  updated_date TEXT NOT NULL,
  published_date TEXT,
  first_published_date TEXT,
  status Text
);

-- this table is a collection of all of the fields of the assets of the space
-- it is separate from the asset itself becasuse the fields can be localized,
-- so there is a reference to the asset ID as well as to the locale
CREATE TABLE IF NOT EXISTS asset_data (
  asset_id TEXT NOT NULL REFERENCES assets (id),
  locale TEXT NOT NULL,
  title TEXT,
  description TEXT,
  file_name TEXT,
  content_type TEXT,
  size INTEGER,
  url TEXT,
  PRIMARY KEY (asset_id, locale)
);

-- this table is a collection of references from one entry to an asset. It references the entryId to which it belongs,
-- the fieldId of the field that contains the reference, the content type of the entry, the locale this field value reprenets
-- and the id of the asset being referenced
CREATE TABLE IF NOT EXISTS asset_references (
  entry_id TEXT NOT NULL REFERENCES entries (id),
  array_index INTEGER NOT NULL,
  field_id TEXT NOT NULL REFERENCES fields (id),
  content_type_id TEXT NOT NULL REFERENCES content_types (id),
  locale TEXT NOT NULL,
  reference_asset_id TEXT NOT NULL,
  PRIMARY KEY (entry_id, array_index, field_id, locale),
  FOREIGN KEY (field_id, content_type_id) REFERENCES fields (id, content_type_id)
);