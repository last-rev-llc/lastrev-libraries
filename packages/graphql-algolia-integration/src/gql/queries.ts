import gql from 'graphql-tag';

export const algoliaQuery = gql`
  query AlgoliaQuery($filter: ContentsFilter!) {
    contents(filter: $filter) {
      ... on AlgoliaRecord {
        id
        algoliaObjects {
          index
          objectId
          referencedIds
          additionalFields
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
