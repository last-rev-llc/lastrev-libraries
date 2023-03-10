> ⚠️ Reports are run against an in-memory sqlite3 database that is populated from the synced entries/assets and content types from Contentful

## Requirements

You must first have a file location of an existing contentful export, using the [contentful-cli](https://www.npmjs.com/package/contentful-cli)
Run the following steps to generate the export:

```sh
contentful login
contentful space export --space-id {spaceId} --environment-id {envId} --export-dir {exportDir} --inlcude-drafts
```

## Adding a report

The file `sql/db.schema` has all the data we can build reports from.
Each report lives on a separate SQL query under `sql/{reportName}.sql`.
In we want to capture more data from Contentful to build new reports, we can add new tables or add columns to the already existing ones and then create a new report file with the query for it.
