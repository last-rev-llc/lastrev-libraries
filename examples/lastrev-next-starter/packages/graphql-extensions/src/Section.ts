import gql from 'graphql-tag';

export const typeMappings = {};

export const mappers = {
  Section: {
    Section: {
      // contents: (content: any) => {
      //   console.log('Section', content);
      //   return content?.contents;
      // }
    }
  }
};

export const typeDefs = gql`
  extend type Section {
    contents: [Content]
    background: Media
  }
`;
