import sqlite3 from 'sqlite3';
import { ensureDir, readFile } from 'fs-extra';
import { promisify } from 'util';
import { join, resolve } from 'path';
import { homedir } from 'os';
import { ContentfulData } from './parseExport';
import { getStatus } from './utils';

const configDir = join(homedir(), '.config', 'lr-contentful-report');

const schemaFile = resolve(__dirname, '../sql/db.schema.sql');

type RunAsync = (sql: string, params?: any[]) => Promise<void>;

const populateDb = async ({ entries, assets, contentTypes }: ContentfulData, db: sqlite3.Database) => {
  const run = promisify(db.run).bind(db) as RunAsync;
  console.log('Populating database...');

  const promises = [];
  // populate the content_types table
  for (const contentType of contentTypes) {
    promises.push(
      run('INSERT INTO content_types (id, display_field, name, description) VALUES (?, ?, ?, ?)', [
        contentType.sys.id,
        contentType.displayField,
        contentType.name,
        contentType.description
      ])
    );
    // populate the fields table
    for (const field of contentType.fields) {
      promises.push(
        run(
          'INSERT INTO fields (id, content_type_id, name, type, required, disabled, omitted, localized, link_type, items_type, items_link_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            field.id,
            contentType.sys.id,
            field.name,
            field.type,
            field.required,
            field.disabled,
            field.omitted,
            field.localized,
            field.linkType,
            field.items?.type,
            field.items?.linkType
          ]
        )
      );
    }
  }

  // populate the field_content_type_validations table
  // needs to be done after all the content types, since there are references to them
  for (const contentType of contentTypes) {
    for (const field of contentType.fields) {
      const validations = field.type === 'Array' ? field.items?.validations : field.validations;
      const linkContentTypeValidation = validations?.find((v) => v.linkContentType);
      if (linkContentTypeValidation) {
        const linkContentTypes = linkContentTypeValidation.linkContentType!;
        for (const linkContentType of linkContentTypes) {
          promises.push(
            run(
              'INSERT INTO field_content_type_validations (field_id, content_type_id, link_content_type_id) VALUES (?, ?, ?)',
              [field.id, contentType.sys.id, linkContentType]
            )
          );
        }
      }
    }
  }

  // populate the assets table
  for (const asset of assets) {
    promises.push(
      run('INSERT INTO assets (id, created_date, updated_date, status) VALUES (?, ?, ?, ?)', [
        asset.sys.id,
        asset.sys.createdAt,
        asset.sys.updatedAt,
        getStatus(asset)
      ])
    );
    const dataByLocale = {} as Record<string, any>;
    for (const [fieldName, fieldVal] of Object.entries(asset.fields)) {
      for (const [locale, val] of Object.entries(fieldVal)) {
        if (!dataByLocale[locale]) {
          dataByLocale[locale] = {};
        }
        dataByLocale[locale][fieldName] = val;
      }
    }
    for (const [locale, data] of Object.entries(dataByLocale)) {
      promises.push(
        run(
          'INSERT INTO asset_data (asset_id, locale, title, description, file_name, content_type, size, url) VALUES (?, ?, ?, ?, ? ,?, ?, ?)',
          [
            asset.sys.id,
            locale,
            data.title,
            data.description,
            data.file?.fileName,
            data.file?.contentType,
            data.file?.details?.size,
            data.file?.url
          ]
        )
      );
    }
  }

  const foundLocales = new Set<string>();

  // populate the entries table
  for (const entry of entries) {
    const entryDisplayTitle = entry?.fields?.internalTitle?.['en-US'] || entry?.fields?.title?.['en-US'] || 'Unknown';
    promises.push(
      run(
        'INSERT INTO entries (id, content_type_id, created_date, updated_date, published_date, first_published_date, display_title, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          entry.sys.id,
          entry.sys.contentType.sys.id,
          entry.sys.createdAt,
          entry.sys.updatedAt,
          entry.sys.publishedAt,
          entry.sys.firstPublishedAt,
          entryDisplayTitle,
          getStatus(entry)
        ]
      )
    );

    for (const [fieldName, fieldVal] of Object.entries(entry.fields as any)) {
      for (const localeValues of Object.entries(fieldVal as any)) {
        const [locale, val]: [string, any] = localeValues;
        foundLocales.add(locale); // add to our found locales set
        if (Array.isArray(val)) {
          for (let i = 0; i < val.length; i++) {
            if (val[i]?.sys?.type === 'Link') {
              if (val[i].sys.linkType === 'Entry') {
                promises.push(
                  run(
                    'INSERT INTO entry_references (entry_id, array_index, field_id, content_type_id, locale, reference_entry_id) VALUES (?, ?, ?, ?, ?, ?)',
                    [entry.sys.id, i, fieldName, entry.sys.contentType.sys.id, locale, val[i].sys.id]
                  )
                );
              } else if (val[i]?.sys?.linkType === 'Asset') {
                promises.push(
                  run(
                    'INSERT INTO asset_references (entry_id, array_index, field_id, content_type_id, locale, reference_asset_id) VALUES (?, ?, ?, ?, ?, ?)',
                    [entry.sys.id, i, fieldName, entry.sys.contentType.sys.id, locale, val[i].sys.id]
                  )
                );
              } // Check for non entry array values
            }
          }
        } else if (val?.sys?.type === 'Link') {
          if (val.sys.linkType === 'Entry') {
            promises.push(
              run(
                'INSERT INTO entry_references (entry_id, array_index, field_id, content_type_id, locale, reference_entry_id) VALUES (?, ?, ?, ?, ?, ?)',
                [entry.sys.id, 0, fieldName, entry.sys.contentType.sys.id, locale, val.sys.id]
              )
            );
          } else if (val?.sys?.linkType === 'Asset') {
            promises.push(
              run(
                'INSERT INTO asset_references (entry_id, array_index, field_id, content_type_id, locale, reference_asset_id) VALUES (?, ?, ?, ?, ?, ?)',
                [entry.sys.id, 0, fieldName, entry.sys.contentType.sys.id, locale, val.sys.id]
              )
            );
          }
        }
        promises.push(
          run('INSERT INTO entry_fields_has_value (entry_id, field_id, content_type_id, locale) VALUES (?, ?, ?, ?)', [
            entry.sys.id,
            fieldName,
            entry.sys.contentType.sys.id,
            locale
          ])
        );
      }
    }
  }

  // Populates all the unique found locales
  for (const locale of foundLocales) {
    promises.push(run('INSERT INTO locales (locale) VALUES (?)', [locale]));
  }

  await Promise.all(promises);

  // This was much more efficient to run after the initial tables were populated.
  // It's run before the postInsertPromises as there are queries that relay on this one.
  await run(
    `INSERT OR IGNORE INTO entry_parent_references (entry_id, content_type_id, parent_reference_entry_id, parent_content_type_id)
      SELECT DISTINCT e2.id, e2.content_type_id, e1.id, e1.content_type_id
      FROM entry_references er
      JOIN entries e1 ON e1.id = er.entry_id
      JOIN entries e2 ON e2.id = er.reference_entry_id
      ORDER BY e2.id;`
  );

  // Any queries here are reliant on the queries run above
  const postInsertPromises = [];

  /* Developer Notes:
  *
  The provided SQL code block performs several operations. It first identifies
  the content types associated with slugs and stores them in a temporary table.
  Then, it recursively retrieves the parent-child relationships between entries,
  applying depth limits and excluding entries related to slug content types. The
  resulting relationships are stored in another temporary table. Next, it
  identifies the top-level parents of entries that have slug content types and
  stores them in yet another temporary table. Finally, it inserts or ignores
  records into the target table, including entry IDs, content type IDs, and the
  top-level parent information obtained from the join between the entry parent
  references and the top slug parent tables. Overall, this code block populates
  the target table with the top parent references for entries, considering the
  specific relationships and constraints related to slug content types.
  */
  postInsertPromises.push(
    run(
      `WITH RECURSIVE slug_content_types AS (
        SELECT DISTINCT content_type_id 
        FROM fields 
        WHERE id = 'slug'
      ),
      parent_of(id, parent_id, content_type_id, depth, parent_content_type_id) AS (
        SELECT entry_id, parent_reference_entry_id, content_type_id, 1, parent_content_type_id 
        FROM entry_parent_references
        WHERE content_type_id NOT IN (SELECT * FROM slug_content_types)
        UNION ALL
        SELECT parent_of.id, epr.parent_reference_entry_id, epr.content_type_id, parent_of.depth + 1, epr.parent_content_type_id
        FROM parent_of
        JOIN entry_parent_references epr ON parent_of.parent_id = epr.entry_id
        WHERE (parent_of.depth < 5) 
              AND (epr.content_type_id NOT IN (SELECT * FROM slug_content_types) OR epr.content_type_id != parent_of.content_type_id)
              AND (epr.parent_content_type_id NOT IN (SELECT * FROM slug_content_types) OR epr.parent_content_type_id != epr.content_type_id)
      ),
      top_slug_parent AS (
        SELECT id, parent_id, parent_content_type_id
        FROM parent_of
        WHERE parent_content_type_id IN (SELECT * FROM slug_content_types)
      )
      
      INSERT OR IGNORE INTO entry_top_parent_references_slug (entry_id, content_type_id, top_parent_reference_entry_id, top_parent_content_type_id)
      SELECT epr.entry_id, epr.content_type_id, tsp.parent_id AS parent_reference_entry_id, tsp.parent_content_type_id
      FROM entry_parent_references epr
      LEFT JOIN top_slug_parent tsp ON epr.entry_id = tsp.id
      WHERE tsp.parent_id IS NOT NULL
      GROUP BY epr.entry_id, epr.content_type_id, parent_reference_entry_id, tsp.parent_content_type_id;`
    )
  );
  await Promise.all(postInsertPromises);
  console.log('done populating database!');
};

export const initDb = async (data: ContentfulData) => {
  // Read the SQL schema file
  const schema = await readFile(schemaFile, 'utf8');

  await ensureDir(configDir);

  // Open a new database connection
  const db = new sqlite3.Database(':memory:');
  // const db = new sqlite3.Database("test.db");

  const serialize = promisify(db.serialize).bind(db);
  const exec = promisify(db.exec).bind(db);

  await serialize();

  await exec(schema);

  await populateDb(data, db);

  return db;
};

export const runReport = async (reportSql: string, db: sqlite3.Database, report?: string): Promise<any[]> => {
  console.log(`running report: ${report || 'External Report'}...`);

  return new Promise((resolve, reject) => {
    db.all(reportSql, [], (err, rows) => {
      if (err) {
        console.log(`Error running report: ${report}!`);
        reject(err);
      } else {
        console.log(`done running report: ${report}!`);
        if (!rows.length) reject('No data found');
        else resolve(rows);
      }
    });
  });
};
