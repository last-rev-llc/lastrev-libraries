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
            ├── content_type_slug_lookup.json
            ├── entry_ids_by_content_type_lookup.json
            └── content_types.json
```

The `content_type_slug_lookup.json` should be a JSON file with key value mappings of `${contentTypeId}:${slug}` to content id:

```json
{
  "pageGeneral:home": "8cvbh39fn12333",
  "pageGeneral:about": "00v83bnnju3r999g",
  "pageRecipe:burger": "00gjh3000fjf877f"
}
```

The `entry_ids_by_content_type_lookup.json` should be a JSON file with key value mappings of `contentTypeId` to content id:

```json
{
  "pageGeneral": ["8cvbh39fn12333", "gbv983nf89hdffg"],
  "pageRecipe": ["00gjh3000fjf877f", "vv92bnrff7823gf"]
}
```

# Usage

```Javascript
import createLoaders from '@last-rev/contentful-fs-loader';

async function () {
  const {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    fetchAllPages,
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
