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

  // populate the entries table
  for (const entry of entries) {
    promises.push(
      run(
        'INSERT INTO entries (id, content_type_id, created_date, updated_date, published_date, first_published_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          entry.sys.id,
          entry.sys.contentType.sys.id,
          entry.sys.createdAt,
          entry.sys.updatedAt,
          entry.sys.publishedAt,
          entry.sys.firstPublishedAt,
          getStatus(entry)
        ]
      )
    );

    for (const [fieldName, fieldVal] of Object.entries(entry.fields as any)) {
      for (const entries of Object.entries(fieldVal as any)) {
        const [locale, val]: [string, any] = entries;
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
              }
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
      }
    }
  }
  await Promise.all(promises);
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
    const results: any[] = [];
    db.each(
      reportSql,
      (err, row) => {
        if (err) {
          reject(err);
        }
        results.push(row);
      },
      (err) => {
        if (err) {
          reject(err);
        }
        console.log(`done running report: ${report}!`);
        resolve(results);
      }
    );
  });
};
