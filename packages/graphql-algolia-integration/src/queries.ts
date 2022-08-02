import gql from 'graphql-tag';

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

export const avaliableLocalesQuery = gql`
  query AvailableLocales {
    availableLocales {
      default
      available
    }
  }
`;
