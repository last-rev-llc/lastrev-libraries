
# Schema downloading

The GraphQL SDK code generation depends on the `schema.grpahql` file.
When the GraphQL server is available this file will be automatically downloaded.
If the GraphQL server is not available, the existing file will be used for code generation.

Always save the changes to your schema.graphql file!

# Expected Environment Variables

- GRAPHQL_SERVER_URL (optional) - URL of the GraphQL server. If not provided, defaults to `http://localhost:5000/graphql`1

# About

This module takes the contents of the `./src` directory and generates Typescript types and an SDK to be used in your app.

# Usage

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
