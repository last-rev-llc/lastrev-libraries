import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Hero {
    actions: [Link]
    # Uncomment if using Media reference
    # image: [Media]

    # Comment this fields if added in Contentful
    contentHeight: String
    background: Media
  }
`;
