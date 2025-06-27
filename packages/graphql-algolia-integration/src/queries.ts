import { gql } from 'graphql-request';

export const algoliaQuery = gql`
  query AlgoliaQuery($filter: ContentsFilter!) {
    contents(filter: $filter) {
      ... on AlgoliaRecord {
        algoliaObjects {
          index
          data
        }
      }
    }
  }
`;

export const idsQuery = gql`
  query AlgoliaQuery($filter: ContentsFilter!) {
    contents(filter: $filter) {
      id
    }
  }
`;

export const avaliableLocalesQuery = gql`
  query AvailableLocales {
    availableLocales {
      default
      available
    }
  }
`;
