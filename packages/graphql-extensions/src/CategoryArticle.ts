import gql from 'graphql-tag';
import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

export const typeDefs = gql`
  extend type CategoryArticle {
    header: Header
    footer: Content
    subCategories: [CategoryArticle]
    articles: [Article]
  }
`;

export const mappers: any = {
  CategoryArticle: {
    CategoryArticle: {
      subCategories: 'categoryItems',
      articles: async (category: any, _: never, ctx: ApolloContext) => {
        const allArticles = await ctx.loaders.entriesByContentTypeLoader.load({
          id: 'article',
          preview: !!ctx.preview
        });
        const articles = (allArticles || []).filter((article: any) => {
          const categoryIds = (getLocalizedField(article.fields, 'categories', ctx) || []).map(
            (category: any) => category?.sys.id
          );
          return categoryIds.includes(category.sys.id);
        });

        return articles;
      }
    },
    Link: {
      href: 'slug',
      text: 'title'
      // variant: () => {
      //   return 'button-contained';
      // }
    }
  }
};
