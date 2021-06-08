import { gql } from 'apollo-server';
import { mergeTypeDefs } from '@graphql-tools/merge';
import contentTypeDefs from './content';

const baseDefs = gql`
  scalar Date
  scalar JSON

  type Query {
    page(slug: String!, locale: String): Page
    pages(locale: String): [Page!]
    content(id: String!, locale: String): Content
  }

  interface Content {
    id: String
    theme: Theme
    animation: JSON
    sidekickLookup: JSON
  }
`;

export default mergeTypeDefs([baseDefs, contentTypeDefs]);
