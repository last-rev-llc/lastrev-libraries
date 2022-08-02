Always save the changes to your schema.graphql file!

# Expected Environment Variables

- GRAPHQL_SERVER_URL (optional) - URL of the GraphQL server. If not provided, defaults to `http://localhost:5000/graphql`

# About

This module takes the contents of the `./src` directory and generates Typescript types and an SDK to be used in your app.

# Usage

## Schema (schema.graphql)

The GraphQL SDK code generation depends on an available Schema located in `schema.graphql` file.
When the GraphQL server is available this file can be downloaded and updated.
This is also ran as part of the `dev` and `build` scripts.

Trigger manually by running:

```
yarn download:schema
```

If the GraphQL server is not available, the existing file will be used for code generation.
It is recommended to commit the changes to the schema, as the SDK will be generated from the latest version available.

## Queries and Mutations

Define your queries and mutations in `.src/queries` and `.src/mutations`. These should be typescript files exporting graphql statements compiled with [graphql-tag](https://www.npmjs.com/package/graphql-tag).

## Fragments

If there are any reusable fragments, these can be saved in the `.src/fragments` directory and imported into a gql statement like this:

```javascript
import ContentFragment from '../fragments/content.fragment.ts';

export const MyStatement = gql`
${ContentFragment}
// ... you can now reference the fragemnt in your graphql statement
`;
```

# Output

All the queries and mutations will be used to generate SDKs specific to those queries/mutations.

For example, to generate a paths query

```javascript
import gql from 'graphql-tag';

export const PathsQuery = gql`
  query Paths($locales: [String!]) {
    paths(locales: $locales) {
      params {
        slug
        locale
      }
    }
  }
`;
```

```javascript
export const getStaticPaths = async ({ locales }: PageGetStaticPathsProps) => {
  const { data } = await sdk.Paths({ locales });

  return {
    paths: data?.paths,
    fallback: false
  };
};
```
