import gql from 'graphql-tag';

const typeDefs = gql`
  type AlgoliaObject {
    index: String!
    data: JSON!
  }

  type AlgoliaRecord implements Content {
    id: String
    theme: [Theme]
    animation: JSON
    sidekickLookup: JSON
    algoliaObjects: [AlgoliaObject]
  }
`;

export default typeDefs;
