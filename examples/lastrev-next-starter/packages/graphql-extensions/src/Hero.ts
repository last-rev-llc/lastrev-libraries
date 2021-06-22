import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Hero {
    ctas: [Link]
  }
`;

export const typeMappings = { sectionHero: 'hero' };
