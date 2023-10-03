import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type ElementForm {
    introText: Text
  }
`;

export const mappers = {
  ElementForm: {
    ElementForm: {}
  }
};
