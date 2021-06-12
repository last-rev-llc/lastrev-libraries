# Installation

NPM:

```bash
npm install @last-rev/graphql-contentful-core
```

Yarn:

```bash
yarn add @last-rev/graphql-contentful-core
```

# Usage

```javascript
import { getServer, getLocalizedField, getFieldDataFetcher } from '@last-rev/graphql-contentful-core';
```

# exports

## getServer

Runs the last-rev graphql server

## getLocalizedField

A utility which can be used in mappers to get the localized value of the field from the current item

## getFieldDataFetcher

A utility which returns an async function that will fetch the field data for the current field. This function will return an object with two parameters: `fieldValue`, the value of the resolved field, and `fieldName` the name of the initial field that this value came from.

# Extension file format

The extension file should be a standard javascript file which exports any of these 4 properties: `typeDefs`, `mappers`, `resolvers` and `typeMappings`.

## typeDefs

This should be a string with any additional type definitions or extensions that are different from what the CMS provides.

For example, if in your CMS, there is a type `simplePage` in which there are two single entry reference fields, but your components expect a single array of references called `content`, you might add the following to typeDefs (note, the schema type is a capitalized version of the content type ID):

```javascript
const typeDefs = `
extend type SimplePage {
  content: [Content]
}
`;

module.exports = {
  typeDefs
};
```

## mappers

Mappers are where the main extensibility of the last-rev graphql system comes into play. This is where you can map fields to other field names or display types.

Mappers are an object with three levels. The first is a set of keys of schema types. The second is displayTypes, representing what to do if a certain content type is being resolved where a different type is expected. The third level is the field names, which are the actual mappers.

A mapper can either be a string, in which case it maps the value of the named field to the keyed field name, or it can be a function that takes the standard apollo graphql [resolver arguments](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments), `parent`, `args`, `context`, `info`. Please see the [below](#resolver-context) documentation to see what is available in the `context` parameter.

Additionally, if a field is being mapped to afield with a different name, adding the property `__fieldName__` to the returned object will ensure that the sidekickLookup knows the right field. For primitive types, you will have to use an object creator instead of the primitive type.

String example:

```javascript
const mappers = {
  // type
  SomeItem: {
    // display type
    SomeItem: {
      //field name
      description: 'subTitle'
    }
  }
};

module.exports = {
  mappers
};
```

In the above example, `SomeItem`, when resolved where it is expected to be `someItem`, will have a field `description` which points to the value `subTitle` of same item.

Function example: (taking the `SimplePage` example from [typeDefs](#typedefs))

```javascript
const _ = require('lodash');
const _ = require('@last-rev/graphql-contentful-core');

const mappers = {
  SimplePage: {
    SimplePage: {
      content: async (parent, _args, ctx, _info) => {
        const heroModule = getLocalizedField(parent.fields, 'hero', ctx);
        const secondaryModule = getLocalizedField(parent.fields, 'secondaryModule', ctx);
        // nothing we can do here for the sidekickLookup, since there are two fields to point back to.
        return _.compact([heroModule, secondaryModule]);
      }
    }
  }
};

module.exports = {
  mappers
};
```

Below is another example where you want to map a `SomePage` item into a `Card`, which has 3 fields, `title`, `subTitle`, `image`;

```javascript
const _ = require('lodash');
const _ = require('@last-rev/graphql-contentful-core');
const shorten = require('../utils/shorten');

const mappers = {
  SomePage: {
    Card: {
      // title field is same, so no mapping needed
      //title: 'title'
      subTitle: async (parent, _args, ctx, _info) => {
        const fieldName = 'description';
        const description = getLocalizedField(parent.fields, fieldName, ctx);
        // using string constructor in order to add __fieldName__ prop
        // this will be used by the sidekickLookupResolver to resolve the sidekickLookup for this field
        const subTitle = new String(`${shorten(description, 80)}`);
        // will ensure that the last-rev sidekick knows that this field is derived from the 'description' field
        subTitle.__fieldName__ = fieldName;
        return subTitle;
      },
      image: 'mainImage'
    }
  }
};

module.exports = {
  mappers
};
```

## resolvers

In addition to mappers, standard [Apollo Resolvers](https://www.apollographql.com/docs/apollo-server/data/resolvers/) can be used. This should not be necessary in most scenarios, unless loading data from a different source.

## typeMappings

TypeMappings are a simple key value pair which map a contentTypeId from the cms, to a different typeId that is expected by the component (for example, when using a last-rev out-of-the-box component). This will affect both the generated schemas and mappers.

```javascript
const typeMappings = {
  promoCard: 'card'
};

module.exports = {
  typeMappings
};
```

In the example above, even though the content type is `promoCard`, the schema would create type `Card` and mappers would refer to this type:

```javascript
const mappers = {
  Card: {
    Card: {
      //...
    }
  }
};
```

# Resolver Context

The 3rd argument passed to resolver functions represents the [Apollo Resolver Context](https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument). We pass a number of things to this context to be used in resolvers and mappers.

```javascript
resolve = async (_parent, args, context, info) => {
  const {
    // locale
    // after the initial root resolution, the queried locale (or the default locale
    locale,
    defaultLocale,
    loaders,
    mappers,
    typeMappings
  } = context;

  // load an entry
  const id = '12345';
  const entry = await loaders.entries(id, locale);
  // load a page
  const slug = 'my-page';
  const page = await loaders.pages(slug, locale);
  // load an asset
  const asset = await loaders.assets(id);

  // if needed, mappers, and typeMappings are also available in the context
};
```
