import gql from 'graphql-tag';

export const typeMappings = {};

export const mappers = {
  Section: {
    Section: {}
  }
};

export const typeDefs = gql`
  extend type Section {
    contents: [Content]
    background: Media
  }
`;
