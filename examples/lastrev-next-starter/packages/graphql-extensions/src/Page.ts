import gql from 'graphql-tag';

export const typeMappings = {
  landingPage: 'page'
};

export const mappers = {
  Page: {
    Page: {
      contents: 'sections'
    }
  }
};

export const typeDefs = gql`
  extend type Page {
    parentLandingPage: Page
    contents: [Content]
  }
`;

export const pathsConfigs = {
  page: '/'
};
