# Last Rev Algolia Integration

This package is a set of extensions and functions that will assist with implementing algolia indexing for a Last Rev site.

## Exports

- `typeDefs` - A set of type definitions for use in the graphql schema.
- `createAlgoliaSyncHandler` - A function that takes in a configuration object, and a graphQl URL, and outputs a content sync service that will be triggered on every content change (through a Contentful Webhook).
- `constructObjectId` - A utility function takes a contentful entry, apollo context, and an optional array of additional strings, and outputs an string that can be used for the algolia objectID.

## Binaries

Installing this package exposes the `lr-algolia-updater` binary, which can trigger the algolia webhook handler in your app to prime the indexes.

## Configuration

Configuring the Algolia integration consists of two steps:

1. Add Algolia configuration to your site's `AppConfig`
   - `applicationId` (`string`) - The Algolia application ID.
   - `adminApiKey` (`string`) - The Algolia admin API key.
   - `contentTypeIds` (`string[]`) - An array of Contentful content type IDs representing the types to index.
   - `indices` (`string[]`) - An array of the names of all the Algolia indices this implementation will use.
   - `hitsPerPage` (`number`) - Number of hits per page when querying for algolia records referencing a particular ID
2. Create `mappers` to map your content types to Algolia fields.

## Implementing the Algolia Integration

1. Add `@last-rev/graphql-algolia-integration` as a dependency to the `functions` and `graphql-extensions` projects.
2. In your project's `graphql-extensions` package, import the algolia integration `typeDefs` and merge them with your other typeDefs.

```typescript
import { typeDefs } from '@last-rev/graphql-algolia-integration';

const extensions: GraphQlExtension[] = [
  //... the rest of your extensions
  Algolia : { typeDefs }
];
```

3. In your project's `graphql-extensions` package, create and export your mappers to map specific content types to `AlgoliaRecord` objects.

```typescript
import { ApolloContext } from '@last-rev/graphql-types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

const mappers = {
  Blog: {
    AlgoliaRecord: async (item: any, _: never, ctx: ApolloContext) => {
      return [
        {
          index: 'blogs',
          data: {
            objectID: blog.sys.id,
            referencedIds: [item.sys.id, someOtherReferencedId]
            additionalFields: {
              locale: ctx.locale || ctx.defaultLocale,
              site: process.env.SITE,
              preview: !!ctx.preview,
              url: getContentUrl(item, ctx); // function defined elsewhere in project
              title: getLocalizedField(blog.fields, 'title', ctx)
            }
          }
        }
      ];
    }
  }
};
```

4. Add environment variables to your `.env` file:

```shell
ALGOLIA_APPLICATION_ID={app_id}
ALGOLIA_ADMIN_API_KEY={admin_api_key}
ALGOLIA_INDEX_DRAFT_CONTENT={true|false}
```

5. Add algolia config to your shared `config.js` in the `functions` and `graphql-runner` packages.

```javascript
require('dotenv').config();

const LastRevAppConfig = require('@last-rev/app-config');
//... other code

const config = new LastRevAppConfig({
  //... other config
  algolia: {
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    contentTypeIds: ['blog', 'article'],
    indexDraftContent: parseBooleanEnvVar(process.env.ALGOLIA_INDEX_DRAFT_CONTENT),
    indices: ['articles', 'blogs']
  },
  urs: {
    graphql: `${process.env.DOMAIN}.netlify/functions/graphql`
  }
});

module.exports = config;
```

6. In your project's `functions` package, add a new function, called `algolia-background` and configure the contentSync service.

```typescript
require('dotenv').config();

const { createAlgoliaSyncHandler } = require('@last-rev/graphql-algolia-integration');
const config = require('../../shared/config');

const URL = process.env.NETLIFY
  ? 'http://localhost:5000/graphql'
  : process.env.GRAPHQL_SERVER_URL ?? 'http://localhost:5000/graphql';

// This is helpful for testing and not going over limits
const maxRecords = process.env.ALGOLIA_MAX_RECORDS ? parseInt(process.env.ALGOLIA_MAX_RECORDS) : undefined;

module.exports.handler = createAlgoliaSyncHandler(config, URL, maxRecords);
```

7. (optional) Import `@last-rev/graphql-algolia-integration` in your project's monorepo root and add update scripts to `package.json`.

`package.json:`

```json
{
  "scripts": {
    "algolia:update": "lr-algolia-updater http://my-site.com/.netlify/functions/algolia",
    "algolia:update:local": "lr-algolia-updater http://localhost:8888/.netlify/functions/algolia"
  }
}
```
