# Overview

This library syncs content from contentful to the local filesystem. Can be called directly from code as a library, or as a CLI.

# Usage

## CLI

```bash
npm install -g @last-rev/cli

last-rev cms-sync -d graphql/content
```

See [Docs](../cli/src/commands/cms-sync/README.md) for details on the parameters.

## Library

```Javascript
import sync from '@last-rev/contentful-sync-to-fs'

async function () {
  await sync({
    rootDir: './graphql/content', // Root directory to sync content to
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN, // Contentful access token
    space: process.env.CONTENTFUL_SPACE_ID, // Contentful space ID
    environment: process.env.CONTENTFUL_ENV || 'master', // Contentful environment
    host = process.env.CONTENTFUL_HOST || 'cdn.contentful.com' // Contentful host
  });
};
```

# Output

The library outputs all content to the passed in `rootDir` location in the following structure:

- Entries: `{space_id}/{environment}/{preview_or_production}/entries/{entry_id}.json`
- Assets: `{space_id}/{environment}/{preview_or_production}/assets/{asset_id}.json`
- Content Types: `{space_id}/{environment}/{preview_or_production}/content_types/{contentTypeId}.json`
- Entry IDs by Content type lookup: `{space_id}/{environment}/{preview_or_production}/entry_ids_by_content_type/{entryId}` - Note, this file has no content. The titles in the directory will simply be read to get the IDs
