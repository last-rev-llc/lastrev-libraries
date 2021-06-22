import gql from 'graphql-tag';

export const typeMappings = {
  sectionSplitColumn: 'splitColumn'
};

export const typeDefs = gql`
  extend type SplitColumn {
    panels: [Content]
  }
`;
