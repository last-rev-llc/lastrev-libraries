import gql from 'graphql-tag';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';
import { defaultResolver } from './utils/defaultResolver';
import { siteAddressResolver } from './utils/siteAddressResolver';
import { siteEmailResolver } from './utils/siteEmailResolver';
import { sitePhoneResolver } from './utils/sitePhoneResolver';
import { ApolloContext } from './types';

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
    phone: String
    submissionContentItems: [Content]
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
      address: async (form: any, args: any, ctx: ApolloContext) => {
        const address = await siteAddressResolver(form, args, ctx);
        const parts: (string | null | undefined)[] = [
          `${address.streetAddress}${address.streetAddress2 ? `, ${address.streetAddress2}` : ''}`,
          `${address.city || ''}${address.state ? `, ${address.state}` : ''} ${address.postalCode || ''}`
        ];

        return parts.filter((part) => part != null && part !== '').join('\n');
      },
      phone: async (form: any, args: any, ctx: ApolloContext) => {
        const phone = await sitePhoneResolver(form, args, ctx);
        return phone.phoneNumber;
      },
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
