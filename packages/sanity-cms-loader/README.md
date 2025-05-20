# Overview

This library exports a single default function which creates a set of data loaders and fetchers for loading sanity structured content from Sanity's CDN.

# Usage

```Javascript
import createLoaders from '@last-rev/sanity-cms-loader';

async function () {
  const {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    fetchAllPages,
    fetchAllContentTypes
  } = await createLoaders(
    // TODO
  );
}
```

`entryLoader`, `assetLoader`, and `entriesByContentTypeLoader` are all instances of [dataloader](https://github.com/graphql/dataloader). `entryLoader` and `assetLoader` are both keyed by Sanity ID (`string`), and `entriesByContentTypeLoader` is keyed by a Sanity content type ID (`string`).

```Javascript
const myEntry = await entryLoader('my-content-id-1234');
const myAsset = await assetLoader('my-asset-id-5432');
const myEntries =  await entriesByContentTypeLoader('pageGeneral');
```

the other two functions, `fetchAllPages` and `fetchAllContent` are just convenience functions that return a list of all page content items (entries which have a slug field) and all content types.
