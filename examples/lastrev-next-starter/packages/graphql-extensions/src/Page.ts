import gql from 'graphql-tag';
import { ContentfulPathsGenerator, getDefaultFieldValue } from '@last-rev/graphql-contentful-core';
import { isNull } from 'lodash';
export const typeMappings = {};

export const mappers = {
  Page: {
    Link: {
      href: 'slug',
      text: 'internalTitle'
    },
    Page: {
      // contents: (page: any, _args: any, ctx: ApolloContext) => {
      //   // Extract the hero into the Page contents
      //   const contents: any = getLocalizedField(page.fields, 'contents', ctx) || [];
      //   const hero: any = getLocalizedField(page.fields, 'hero', ctx);
      //   const heroSection = {
      //     ...hero,
      //     sys: { ...hero.sys, contentType: { sys: { id: 'Section' } } }
      //   };
      //   console.log(hero);
      //   console.log(heroSection);
      //   return [heroSection, ...contents];
      // }
    }
  }
};

export const typeDefs = gql`
  extend type Page {
    header: Header
    footer: Content
    contents: [Content]
    hero: Hero
    mailchimpForm: MailchimpForm
  }
`;

const page: ContentfulPathsGenerator = async (pageItem, loaders, defaultLocale, _locales, preview = false, site) => {
  const siteRef = getDefaultFieldValue(pageItem, 'site', defaultLocale);

  if (!siteRef) {
    // page not published to a site
    return {};
  }

  const siteKey = { id: siteRef.sys.id, preview };
  const resolvedSite = await loaders.entryLoader.load(siteKey);

  if (isNull(resolvedSite)) {
    // site item may nhave been deleted
    return {};
  }

  const resolvedSiteName = getDefaultFieldValue(resolvedSite, 'internalTitle', defaultLocale);

  if (site !== resolvedSiteName) {
    // page not published to this site
    return {};
  }

  const slug = getDefaultFieldValue(pageItem, 'slug', defaultLocale);

  return {
    [slug]: pageItem.sys.id
  };
};

export const pathsConfigs = {
  page
};
