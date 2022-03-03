import gql from 'graphql-tag';
import { ApolloContext } from '@last-rev/types';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ContentfulPathsGenerator } from '@last-rev/types';
import * as types from '@contentful/rich-text-types';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { createRichText } from '@last-rev/graphql-contentful-core';
import { constructObjectId } from '@last-rev/graphql-algolia-integration';
import { BLOCKS } from '@contentful/rich-text-types';

import headerResolver from './resolvers/headerResolver';
import footerResolver from './resolvers/footerResolver';
import topicNavHorizontalResolver from './resolvers/topicNavHorizontalResolver';
import createType from './utils/createType';
import createPath from './utils/createPath';
import getPathReader from './utils/getPathReader';
import parseRichTextField from './utils/parseRichTextField';
import createPermaLink from './utils/createPermaLink';
import getCategoriesForArticle from './utils/getCategoriesForArticle';
import getPathUrl from './utils/getPathUrl';

const SITE = process.env.SITE;
interface Heading {
  [key: string]: number;
}

const HEADINGS: Heading = {
  [types.BLOCKS.HEADING_1]: 1,
  [types.BLOCKS.HEADING_2]: 2,
  [types.BLOCKS.HEADING_3]: 3,
  [types.BLOCKS.HEADING_4]: 4,
  [types.BLOCKS.HEADING_5]: 5,
  [types.BLOCKS.HEADING_6]: 6
};

export const typeMappings = {};

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

const footerItemsResolver = async (article: any, _args: any, ctx: ApolloContext) => {
  // TODO Improve redirecting to a field inside a referenced field
  const siteRef: any = getLocalizedField(article.fields, 'site', ctx);
  const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? SITE_ID, preview: !!ctx.preview });
  const footerItems: any = getLocalizedField(site?.fields, 'articleDetailFooteritems', ctx);

  return footerItems;
};

export const typeDefs = gql`
  extend type Article {
    header: Header
    footer: Content
    topicNavItems: [NavigationItem]
    categories: [Link]
    relatedLinks: [Link]
    breadcrumbs: [Link]
    breadcrumbsRoot: String
    footerItems: [Content]
    sideNav: [Link]
    pubDate: Date
    link: Link
  }
`;

const articleSummaryResolver = async (article: any, _args: any, ctx: ApolloContext) => {
  const summary = await getLocalizedField(article?.fields, 'summary', ctx);

  if (summary) return createRichText(summary);

  const body = await getLocalizedField(article?.fields, 'body', ctx);

  if (!body || !body.content) return null;

  let firstParagraphContent;

  for (let item of body.content) {
    if (item.nodeType === types.BLOCKS.PARAGRAPH) {
      firstParagraphContent = item;
      break;
    }
  }

  // Convert paragraph to text to remove formatting and back into RTF
  return createRichText(documentToPlainTextString(firstParagraphContent));
};

export const mappers = {
  Article: {
    Article: {
      header: headerResolver,
      footer: footerResolver,
      footerItems: footerItemsResolver,
      topicNavItems: topicNavHorizontalResolver,
      pubDate: 'pubDate',
      breadcrumbs: async (item: any, _args: any, ctx: ApolloContext) => {
        const links: any = await getLocalizedField(item.fields, 'categories', ctx);
        if (!links) return [];
        return links;
      },
      sideNav: async (article: any, _args: any, ctx: ApolloContext) => {
        const body: any = getLocalizedField(article.fields, 'body', ctx);
        if (!body || !body.content) return [];
        const links = [];

        for (let item of body.content) {
          const headingLevel = HEADINGS[item.nodeType];

          if (!headingLevel || headingLevel !== 2) continue;
          const value = item.content[0]?.value?.trim() as string;
          if (!value || value === '') continue;

          const href = value
            // reference: https://gist.github.com/codeguy/6684588
            .normalize('NFKD')
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/[-\s]+/g, '-');

          links.push(
            createType('Link', {
              id: href,
              // TODO, this is adding a slash to the beginning of the link
              href: `#${href}`,
              text: value
            })
          );
        }
        return links;
      },
      body: async (article: any, _args: any, ctx: ApolloContext) => {
        const body = await getLocalizedField(article?.fields, 'body', ctx);
        if (!body || !body.content) return;

        for (let item of body.content) {
          const headingLevel = HEADINGS[item.nodeType];

          if (!headingLevel || headingLevel !== 2) continue;
          const value = item.content[0]?.value?.trim() as string;
          if (!value || value === '') continue;

          const href = value
            // reference: https://gist.github.com/codeguy/6684588
            .normalize('NFKD')
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/[-\s]+/g, '-');

          item.data.id = href;
        }
        return body;
      },
      link: async (article: any, _args: any, _ctx: ApolloContext) => {
        return article;
      }
    },
    Card: {
      body: articleSummaryResolver,
      link: async (article: any, _args: any, _ctx: ApolloContext) => article,
      pubDate: 'pubDate'
    },
    Link: {
      href: async (article: any, _args: any, ctx: ApolloContext) => {
        const paths = await getPathReader(ctx)?.getPathsByContentId(article.sys.id, undefined, SITE);
        if (!paths || !paths.length) return '#';
        return paths[0];
      },
      text: 'title'
    },
    NavigationItem: {
      href: async (article: any, _args: any, ctx: ApolloContext) => {
        const paths = await getPathReader(ctx)?.getPathsByContentId(article.sys.id, undefined, SITE);
        if (!paths || !paths.length) return '#';
        return paths[0];
      },
      text: 'title'
    },
    AlgoliaRecord: {
      algoliaObjects: async (article: any, _args: any, ctx: ApolloContext) => {
        const path = await getPathUrl(article, ctx);
        const url = path ? `${process.env.DOMAIN}${path}` : null;

        if (!url) return [];

        const objects = parseRichTextField(getLocalizedField(article.fields, 'body', ctx), {
          sectionDelimiter: BLOCKS.HEADING_2
        });

        const title = getLocalizedField(article.fields, 'title', ctx);

        const { categories, categoryLinks } = await getCategoriesForArticle(article, ctx);

        return objects.map(({ section, content }, objectIndex) => ({
          index: 'articles',
          data: {
            objectID: constructObjectId(article, ctx, objectIndex),
            locale: ctx.locale || ctx.defaultLocale,
            preview: !!ctx.preview,
            title,
            section,
            content,
            permalink: `${url}${createPermaLink(section)}`,
            categories,
            categoryLinks
          }
        }));
      }
    }
  }
};

const article: ContentfulPathsGenerator = async (
  articleItem,
  _loaders,
  defaultLocale,
  _locales,
  _preview = false,
  _site
) => {
  const slug = getDefaultFieldValue(articleItem, 'slug', defaultLocale);
  const fullPath = createPath('article', slug);

  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: articleItem?.sys?.id,
      excludedLocales: [],
      contentType: articleItem.sys.contentType.sys.id
    }
  };
};

export const pathsConfigs = {
  article
};
