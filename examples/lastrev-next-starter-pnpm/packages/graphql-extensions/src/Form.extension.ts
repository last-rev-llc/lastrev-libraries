import gql from 'graphql-tag';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';

export const typeDefs = gql`
  extend type ElementForm {
    introText: Text
    header: Header
    footer: Footer
    path: String
    hero: Hero
    contents: [Content]
    breadcrumbs: [Link]
    footerDisclaimerOverride: RichText
  }
`;

export const mappers = {
  ElementForm: {
    ElementForm: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver
    },
    Link: {
      href: pathResolver,
      text: 'title'
    },

    NavigationItem: {
      href: pathResolver,
      text: 'title'
    }
  }
};
