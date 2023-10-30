import gql from 'graphql-tag';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';
import { defaultResolver } from './utils/defaultResolver';
import { siteAddressResolver } from './utils/siteAddressResolver';
import { siteEmailResolver } from './utils/siteEmailResolver';

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
    formDisclaimerText: RichText
    address: JSON
    email: String
  }
`;

export const mappers = {
  ElementForm: {
    ElementForm: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,
      variant: defaultResolver('variant'),
      formLayout: defaultResolver('formLayout'),
      address: siteAddressResolver,
      email: siteEmailResolver
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
