import gql from 'graphql-tag';
import { ApolloContext, ContentfulPathsGenerator } from '@last-rev/types';
import headerResolver from './resolvers/headerResolver';
import footerResolver from './resolvers/footerResolver';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import categoryArticleLinkResolver from './resolvers/categoryArticleLinkResolver';
import topicNavHorizontalResolver from './resolvers/topicNavHorizontalResolver';
import categoryArticleHeroResolver from './resolvers/categoryArticleHeroResolver';
import categoryArticleFeaturedArticlesResolver from './resolvers/categoryArticleFeaturedArticlesResolver';
import categoryArticleItemsResolver from './resolvers/categoryArticleItemsResolver';
import categoryArticleHierarchyResolver from './resolvers/categoryArticleHierarchyResolver';
import categoryArticleLevelResolver from './resolvers/categoryArticleLevelResolver';
import getPathReader from './utils/getPathReader';
import { Entry } from 'contentful';

const SITE = process.env.SITE;

export const typeDefs = gql`
  extend type CategoryArticle {
    id: String
    header: Header
    footer: Content
    hero: Hero
    topicNavItems: [NavigationItem]
    categoryItems: [CategoryArticle]
    categoryHierarchyLinks: [NavigationItem]
    subCategories: [CategoryArticle]
    articles: [Card]
    featuredArticles: [Card]
    link: Link
    level: Int
    seo: JSON
  }
`;

export const mappers: any = {
  CategoryArticle: {
    CategoryArticle: {
      header: headerResolver,
      footer: footerResolver,
      title: 'title',
      level: categoryArticleLevelResolver,
      topicNavItems: topicNavHorizontalResolver,
      hero: categoryArticleHeroResolver,
      pubDate: 'pubDate',
      seo: 'seo',
      subCategories: async (category: any, _args: any, ctx: ApolloContext) => {
        const getAllCategoryChildrenIds = async (categoryArticle?: Entry<any>): Promise<any> => {
          const childCategoriesRef = getLocalizedField(categoryArticle?.fields, 'categoryItems', ctx);

          if (childCategoriesRef) {
            const childIds = childCategoriesRef.map((content: any) => {
              childrenCategoryArticleIds.push(content?.sys.id);
              return { id: content?.sys.id, preview: !!ctx.preview };
            });

            const childCategories = (await ctx.loaders.entryLoader.loadMany(childIds)).filter(Boolean);
            if (childCategories && childCategories.length) {
              for (let childCategory of childCategories) {
                if (childCategory && !(childCategory instanceof Error)) await getAllCategoryChildrenIds(childCategory);
              }
            }
          }
        };

        const childrenCategoryArticleIds: Array<string> = [category.sys.id];

        if (!childrenCategoryArticleIds) return [];

        await getAllCategoryChildrenIds(category);

        const allArticles = await ctx.loaders.entriesByContentTypeLoader.load({
          id: 'article',
          preview: !!ctx.preview
        });

        validArticleLoop: for (let article of allArticles) {
          const articleCats = getLocalizedField(article.fields, 'categories', ctx);
          if (!articleCats) continue;

          for (let articleCat of articleCats) {
            if (childrenCategoryArticleIds.includes(articleCat.sys.id)) {
              return getLocalizedField(category.fields, 'categoryItems', ctx);
            }
          }
        }

        return [];
      },
      categoryHierarchyLinks: categoryArticleHierarchyResolver,
      articles: categoryArticleItemsResolver,
      featuredArticles: categoryArticleFeaturedArticlesResolver,
      link: async (category: any, _args: any, _ctx: ApolloContext) => {
        return category;
      }
    },
    Card: {
      pubDate: 'pubDate'
    },
    Link: {
      href: async (category: any, _args: any, ctx: ApolloContext) => {
        const paths = await getPathReader(ctx)?.getPathsByContentId(category.sys.id, undefined, SITE);
        if (!paths || !paths.length) return '#';

        return paths[0];
      },
      text: 'title'
    },
    NavigationItem: {
      href: async (category: any, _args: any, ctx: ApolloContext) => {
        const paths = await getPathReader(ctx)?.getPathsByContentId(category.sys.id, undefined, SITE);
        if (!paths || !paths.length) return '#';

        return paths[0];
      },
      text: 'title',
      subNavigation: 'categoryItems'
    }
  }
};

const categoryArticle: ContentfulPathsGenerator = async (
  categoryArticleItem,
  loaders,
  defaultLocale,
  locales,
  preview = false,
  _site
) => {
  const fullPath = await categoryArticleLinkResolver(categoryArticleItem, null, {
    loaders,
    defaultLocale,
    locales,
    preview
  } as ApolloContext);

  if (!fullPath) return {};

  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: categoryArticleItem.sys.id,
      excludedLocales: [],
      contentType: categoryArticleItem.sys.contentType.sys.id
    }
  };
};

export const pathsConfigs = {
  categoryArticle
};
