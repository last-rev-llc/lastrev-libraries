import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Block {
    introText: Text
    mediaItems: [Media]
    actions: [Link]
    link: Link
    backgroundColor: String
  }
`;

export const mappers = {
  Block: {
    Block: {}
  }
};
