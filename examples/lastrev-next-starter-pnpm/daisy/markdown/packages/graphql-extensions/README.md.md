# GraphQL Extensions

The LastRev Framework allows you to create a GraphQL schema that is based on the content models in Contentful. Most people will be able to use the generated schema without too many modifications. But if you want to add custom fields or resolver behavior, you can do so through extensions. Extensions help you define a custom GraphQL schema by adding custom fields, changing resolver behavior, or otherwise extending the auto-generated schema to suit your needs.

## Extensions Concepts

### TypeDefs

A TypeDef extension can be used to create new types or extend existing types. The graphql-tag library can be used to declare type definitions.

For example, creating a new type:

```javascript
import gql from 'graphql-tag';

export const typeDefs = gql`
  type SomeNewType {
    name: String
    description: String
    reference: Content
  }
`;
```

Or extending an existing type:

```javascript
import gql from 'graphql-tag';

// adds a new field, settingsGlobal, a reference to a SettingsGlobal type to the PageGeneral type.
export const typeDefs = gql`
  extend type PageGeneral {
    settingsGlobal: SettingsGlobal
  }
`;
```

> Note: Changing the return type of an existing field is not possible. For reference fields, this should not be a problem, since all reference fields are typed as Content. If a change is needed, a workaround would be to create a new field and use a mapper to resolve it.

### Mappers

Mappers are a construct that we use on top of the standard [Apollo GraphQL Resolvers](https://www.apollographql.com/docs/apollo-server/data/resolvers/) to allow for the resolution and mapping of fields. In most cases, mapping fields and resolving values for fields coming from Contentful can and should be done through mappers. If more complex behavior or other data sources are needed, a custom resolver can be used (see Resolvers below).

### Display Types

Mappers introduce the concept of a display type. This is a useful way to shoehorn one type into another. For Example, many times we want to display something in a Card type, but do not want to go through the trouble of creating a Card content item that has a pointer to a different item in it. Instead, we can simply use mappers to map the existing item into a Card item.

### Field Mappers

Fields can be mapped by either using a simple string, which tells the mapper to resolve the field using the value of the field name referenced in the string or using the standard [resolver function signature](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments).

### Apollo Context

The third argument of the resolver function is the context object. This is a special object that is passed to the resolver function. It contains information about the request, and some useful functions to help with the resolution of the field.

### Structure

Mappers are defined in a 3 level object structure, with the type at the top level, the display type at the second level, and the field at the third level.

Example:

```javascript
export const mappers = {
  PageGeneral: {
    PageGeneral: {
      // resolve this virtual field in pageGeneral
      settingsGlobal: async (item: any, _: never, ctx: ApolloContext) => {
        const settingsGlobal = await ctx.loaders.entryLoader.load({ id: process.env.CONTENTFUL_SETTINGS_ID, preview: !!ctx.preview});

        return settingsGlobal
      }
    }
    Card: {
      // these fields are mapped using strings
      title: 'pageTitle' // resolves from pageGeneral.fields.pageTitle
      content: 'body' // resolves from pageGeneral.fields.body
    }
  }
}
```

### Resolvers

Resolvers are useful when you need to create new queries, or whole new types that are not tied to content in Contentful.

Similar to mappers, you would use a resolver function to define the behavior of the field. The same ApolloContext object is passed in.

```javascript
export const resolvers = {
  Query: {
    tweets: async (_: never, args: { userId }, ctx: ApolloContext) => {
      const tweets = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets`);

      return tweets;
    }
  },
  Tweet: (tweet: any, _: never, ctx: ApolloContext) => {
    return {
      content: tweet.text,
      // get CMS data for the author, if it exists
      author: await ctx.loaders.entryLoader.load({ id: tweet.authorId, preview: !!ctx.preview })
    };
  }
};
```

### PathConfigs

Lastly, PathsConfigs is how you can define how your webiste paths are generated. The PathsConfigs object is a map of the content type ID to either a pathsConfig Generator function, or a string that will be the root prepended to the slug field of the item.

Path Generator Functions The path generator function gets passed the content item, loaders, default locale, locales, whether it is preview, and the site string (for setups with multiple sites).

It should return an object, keyed by the path, whose value contains the full path, whehter it is the primary path of this content item (can be used for canonical URLs), the contentID of the item, and an array of excluded locales.

The path generator function can generate complex paths with child/parent logic using the loaders to load the parent or child items.

```javascript
const pageGeneral: ContentfulPathsGenerator = async (
  pageItem,
  loaders,
  defaultLocale,
  locales,
  preview = false,
  site
) => {
  if (await validateSite({ item: pageItem, loaders, preview, site, defaultLocale, locales })) {
    const slug = getDefaultFieldValue(pageItem, 'slug', defaultLocale);
    if (!slug) return {};

    const fullPath = slug === 'home' ? '/' : `/${slug}`;

    let parentRef = getDefaultFieldValue(pageItem, 'parent', defaultLocale);

    // Go up the parent tree, prepending parent slug, until no parent is found
    while (parentRef) {
      const parentItem = await loaders.entryLoader.load({ id: parentRef.sys.id, preview });
      if (!parentItem) break;
      const parentSlug = getDefaultFieldValue(parentItem, 'slug', defaultLocale);

      fullPath = `/${parentSlug}${fullPath}`;

      parentRef = getDefaultFieldValue(parentItem, 'parent', defaultLocale);
    }

    return {
      [fullPath]: {
        fullPath,
        isPrimary: true,
        contentId: pageItem.sys.id,
        excludedLocales: []
      }
    };
  }
  return {};
};

export const pathsConfigs = {
  pageGeneral,
  Blog: '/blogs' // this will autmoatically create the path config for each blog with this path: /blogs/{blog.fields.slug['en-US']}
};
```

## PathConfigs Update
As highlighted in the transcript, the pathsConfigs object now plays a crucial role in generating website paths, especially for hierarchically structured pages (e.g., About Us with a nested Contact Us page). Below is an updated illustration on utilizing pathsConfigs:

```javascript
// Import isProfilePage from utils to verify if a page is a profile page
import { isProfilePage } from './utils';

export const pathsConfigs = {
  // Other page types will call their respective functions
  PageGeneral: generatePagePaths, // Assuming generatePagePaths is a function that handles page generation logic
  CaseStudy: generateCaseStudyPaths, // Similar for Case Study content type

  // New content type path generator example
  NewContentType: async (item, loaders, defaultLocale, locales, preview, site) => {
    // Custom logic for generating paths for 'NewContentType'
    // Logic to determine the full path based on parent-child relationships or other criteria
  },

  // Example profiling different content type path
  SpecialProfilePage: (item) => {
    if (isProfilePage(item)) {
      return generateProfilePaths(item);
    }
    return {};
  }
};
```

### Debugging Extensions
For debugging, the schema GraphQL provides a snapshot of the types that GraphQL is expecting. If there are any issues, such as fragment errors or GraphQL issues with types in Contentful not matching the types generated, inspect the schema GraphQL for discrepancies. Also, the path reader utility can be used to troubleshoot path-related issues by returning the paths for a content item based on its content ID.

```javascript
// Example of a utility function to troubleshoot paths
import { getPathsByContentId } from './utils/pathReader';

export const troubleshootingUtils = {
  getPathsForContentId: async (contentId) => {
    const paths = await getPathsByContentId(contentId);
    return paths; // Returns all the paths mapped to the given content ID
  },
  // ... other utility functions
};
```

### Local Contentful Data
The .cms-sync folder within the graphql-sdk directory stores the JSON files downloaded from Contentful, ensuring you have the latest content during the build process. If troubleshooting content modeling or indexing is necessary, inspect the content stored here.
