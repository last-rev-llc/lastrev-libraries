import gql from 'graphql-tag';
import { ApolloContext, ContentfulPathsGenerator } from '@last-rev/types';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import * as types from '@contentful/rich-text-types';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { createRichText } from '@last-rev/graphql-contentful-core';
import { constructObjectId } from '@last-rev/graphql-algolia-integration';
import categoryArticleLinkResolver from './resolvers/categoryArticleLinkResolver';
import getCategoryArticleParentHierarchyResolver from './resolvers/getCategoryArticleParentHierarchyResolver';
import articleSeoResolver from './resolvers/articleSeoResolver';
import headerResolver from './resolvers/headerResolver';
import footerResolver from './resolvers/footerResolver';
import topicNavHorizontalResolver from './resolvers/topicNavHorizontalResolver';
import articleLinkResolver from './resolvers/articleLinkResolver';
import createType from './utils/createType';
import createPath from './utils/createPath';
import getPathReader from './utils/getPathReader';
import parseRichTextField from './utils/parseRichTextField';
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
    variant: String
    link: Link
    requiredRoles: [String]
    seo: JSON
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
      seo: articleSeoResolver,
      breadcrumbs: async (article: any, args: any, ctx: ApolloContext) => {
        if (!ctx.path) return [];

        const articleSlug: any = await getLocalizedField(article.fields, 'slug', ctx);
        const currentCategoryNode = await getPathReader(ctx)?.getNodeByPath(ctx.path.replace(articleSlug, ''), SITE);

        if (currentCategoryNode && currentCategoryNode?.data?.contentId && ctx.path.startsWith('/topics')) {
          const currentCategory = await ctx.loaders.entryLoader.load({
            id: currentCategoryNode?.data?.contentId,
            preview: !!ctx.preview
          });
          if (!currentCategory) return [];
          const hierarchy = await getCategoryArticleParentHierarchyResolver(currentCategory, args, ctx);
          if (hierarchy?.length) return hierarchy;
        }

        const categoryItemsRef: any = await getLocalizedField(article.fields, 'categories', ctx);
        if (!categoryItemsRef) return [];
        return categoryItemsRef;
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
      },
      requiredRoles: async (article: any, _args: any, ctx: ApolloContext) => {
        const ssoGroupItemsRef = await getLocalizedField(article?.fields, 'ssoGroupItems', ctx);
        if (ssoGroupItemsRef) {
          const childIds = ssoGroupItemsRef.map((content: any) => {
            return { id: content?.sys.id, preview: !!ctx.preview };
          });

          const requiredRoles = [];
          const childCategories: Array<any> = await ctx.loaders.entryLoader.loadMany(childIds);

          for (let ssoGroupItem of childCategories) {
            const groupId = await getLocalizedField(ssoGroupItem?.fields, 'groupId', ctx);
            requiredRoles.push(groupId);
          }
          return requiredRoles;
        }
        return [];
      }
    },
    Card: {
      body: articleSummaryResolver,
      link: async (article: any, _args: any, _ctx: ApolloContext) => article,
      pubDate: 'pubDate'
    },
    Link: {
      href: async (article: any, _args: any, ctx: ApolloContext) => {
        const href = articleLinkResolver(article, _args, ctx);
        if (!href) return '#';
        return href;
      },
      text: 'title'
    },
    NavigationItem: {
      href: async (article: any, _args: any, ctx: ApolloContext) => {
        const href = articleLinkResolver(article, _args, ctx);
        if (!href) return '#';
        return href;
      },
      text: 'title'
    },
    AlgoliaRecord: {
      algoliaObjects: async (article: any, args: any, ctx: ApolloContext) => {
        const path = await getPathUrl(article, ctx);

        if (!path) return [];

        const contentBody = await parseRichTextField(getLocalizedField(article.fields, 'body', ctx), ctx);

        const title = getLocalizedField(article.fields, 'title', ctx) || '';
        const summary = await parseRichTextField(await articleSummaryResolver(article, args, ctx), ctx);
        const { categories, categoryLinks } = await getCategoriesForArticle(article, ctx);
        const categoryTagsRef = getLocalizedField(article.fields, 'categoryTag', ctx);
        const categoryTagsIds = categoryTagsRef?.map((tagRef: any) => {
          return { id: tagRef?.sys.id, preview: !!ctx.preview };
        });

        const tags = !!categoryTagsIds?.length
          ? (await ctx.loaders.entryLoader.loadMany(categoryTagsIds))
              .filter(Boolean)
              .map((tag: any) => getLocalizedField(tag.fields, 'title', ctx))
          : [];

        const currentLocale = ctx.locale;
        const translatedLocales: string[] =
          getDefaultFieldValue(article, 'translatedInLocale', ctx.defaultLocale) || [];

        const translatedInLocale = !!(currentLocale && translatedLocales.includes(currentLocale));

        return [
          {
            index: process.env.ALGOLIA_INDEX_NAME,
            data: {
              objectID: constructObjectId(article, ctx),
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              title,
              summary,
              contentBody,
              path,
              categories,
              categoryLinks,
              translatedInLocale,
              tags
            }
          }
        ];
      }
    }
  }
};

const article: ContentfulPathsGenerator = async (
  articleItem,
  loaders,
  defaultLocale,
  locales,
  preview = false,
  _site
) => {
  const articleSlug = getDefaultFieldValue(articleItem, 'slug', defaultLocale);
  const articleFullPath = createPath('article', articleSlug);

  const articlePaths: { [key: string]: any } = {};

  const categoryItemsRef: any = await getDefaultFieldValue(articleItem, 'categories', defaultLocale);
  if (categoryItemsRef?.length) {
    const categoryItems = await loaders.entryLoader.loadMany(
      categoryItemsRef.map((content: any) => ({ id: content?.sys.id, preview: !!preview }))
    );

    if (categoryItems) {
      for (let category of categoryItems) {
        if (!category) continue;
        const categoryPath = await categoryArticleLinkResolver(category, null, {
          loaders,
          defaultLocale,
          locales,
          preview
        } as ApolloContext);
        if (categoryPath) {
          const fullPath = `${categoryPath}/${articleSlug}`;
          articlePaths[fullPath] = {
            fullPath: fullPath,
            contentId: articleItem?.sys?.id,
            excludedLocales: [],
            contentType: articleItem.sys.contentType.sys.id
          };
        }
      }
    }
  }

  // Sorting by key in order to get the deepest path.   This will be set as the "0" index in the paths as the default.
  const sortedPathKeys = Object.keys(articlePaths).sort((a: any, b: any) => {
    // Shortcut to find deepest path based on number of slashes.
    // If there are two equal ones at this point then it's a tossup as to which one will be returned first
    return (b.match(new RegExp('/', 'g')) || []).length - (a.match(new RegExp('/', 'g')) || []).length;
  });

  const sortedArticlePaths: { [key: string]: any } = {};

  if (!sortedPathKeys.length) {
    sortedArticlePaths[articleFullPath] = {
      fullPath: articleFullPath,
      isCanonical: true,
      isPrimary: true,
      contentId: articleItem?.sys?.id,
      excludedLocales: [],
      contentType: articleItem.sys.contentType.sys.id
    };
  } else {
    for (let key of sortedPathKeys) {
      if (Object.keys(sortedArticlePaths).length === 0) {
        sortedArticlePaths[key] = {
          ...articlePaths[key],
          isPrimary: true
        };

        sortedArticlePaths[articleFullPath] = {
          fullPath: articleFullPath,
          isCanonical: true,
          contentId: articleItem?.sys?.id,
          excludedLocales: [],
          contentType: articleItem.sys.contentType.sys.id
        };
      } else {
        sortedArticlePaths[key] = articlePaths[key];
      }
    }
  }
  return sortedArticlePaths;
};

export const pathsConfigs = {
  article
};
