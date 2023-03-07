> ⚠️ Reports are run against an in-memory sqlite3 database that is populated form the synced entries/assets and content types from Contentful

## Current Limitations

Only using published content right now, so the updated/created dates apply to when content was published.

In order to use draft content too, we would need to do two syncs, one to the preview API and one to the delivery API. This would require having two API keys.

In order to run reports that require us knowing about draft vs published items, the above changes would be required.

### Adding a report

Take a look at the schema at `sql/db.schema`.
Create a new report under `sql/{reportname}.sql`
