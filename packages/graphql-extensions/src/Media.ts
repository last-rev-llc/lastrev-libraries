import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Media {
    controls: Boolean
  }
`;

export const mappers: any = {
  Media: {
    Media: {
      // NOTE: if needed, this can be modified based on conditions (eg. variant)
      controls: () => true
    }
  }
};
