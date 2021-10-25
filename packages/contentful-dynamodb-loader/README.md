# Overview

This library exports a single default function which creates a set of data loaders and fetchers for loading contentful structured content from a file system.

# Requirements

You must have a directory to which Contentful content has been synced. Please see the [documentation](../cli/src/commands/cms-sync/README.md) for LastRev's `cms-sync` CLI which will generate this structure for you.

The directory should follow the following structure

```text
dir
└── {contentful space id}
    └── { contentful environment name}
        └── { preview|production }
            ├── assets
            |   ├── {assetId}.json
            |   └── ...
            ├── entries
            |   ├── {entryId}.json
            |   └── ...
            ├── entry_ids_by_content_type
            |   ├── {entryId}
            |   └── ...
            └── content_types
                ├── {contentTypeId}.json
                └── ...
```

# Usage

```Javascript
import createLoaders from '@last-rev/contentful-dynamodb-loader';

async function () {
  const {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    fetchAllContentTypes
  } = await createLoaders(
    './graphql/content' // root directory
    'saasdfgb34r8ffg7rtt', // contentful space ID
    'master', // contentful environment
    'preview' // one of 'preview' or 'production'
  );
}
```

`entryLoader`, `assetLoader`, and `entriesByContentTypeLoader` are all instances of [dataloader](https://github.com/graphql/dataloader). `entryLoader` and `assetLoader` are both keyed by contentful ID (`string`), and `entriesByContentTypeLoader` is keyed by a Contentful content type ID (`string`).

```Javascript
const myEntry = await entryLoader('my-content-id-1234');
const myAsset = await assetLoader('my-asset-id-5432');
const myEntries =  await entriesByContentTypeLoader('pageGeneral');
```

the other two functions, `fetchAllPages` and `fetchAllContent` are just convenience functions that return a list of all page content items (entries which have a slug field) and all content types.
