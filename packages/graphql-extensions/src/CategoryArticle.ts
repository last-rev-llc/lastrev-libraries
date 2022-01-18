import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type CategoryArticle {
    header: Header
    footer: Content
  }
`;

export const mappers: any = {
  CategoryArticle: {
    Link: {
      href: 'slug',
      text: 'title',
      // variant: () => {
      //   return 'button-contained';
      // }
    }
  }
};
