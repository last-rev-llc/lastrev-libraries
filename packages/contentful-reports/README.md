> ⚠️ Reports are run against an in-memory sqlite3 database that is populated form the synced entries/assets and content types from Contentful

## Requirements

You must first have a file location of an existing contentful export, using the [contentful-cli](https://www.npmjs.com/package/contentful-cli)
Run the following steps to generate the export:

```sh
contentful login
contentful space export --space-id {spaceId} --environment-id {envId} --export-dir {exportDir} --inlcude-drafts
```

## Adding a report

Take a look at the schema at `sql/db.schema`.
Create a new report under `sql/{reportname}.sql`
