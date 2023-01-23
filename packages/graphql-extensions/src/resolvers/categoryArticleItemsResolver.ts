import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { Entry } from 'contentful';

const categoryArticleItemsResolver = async (category: any, _args: any, ctx: ApolloContext) => {
  const allArticles = await ctx.loaders.entriesByContentTypeLoader.load({
    id: 'article',
    preview: !!ctx.preview
  });

  const articles = (allArticles || []).filter((article: any) => {
    const categoryIds = (getLocalizedField(article.fields, 'categories', ctx) || []).map(
      (category: any) => category?.sys.id
    );
    if (!categoryIds) return false;
    return categoryIds.includes(category.sys.id);
  });
  return articles
    .filter((a: Entry<any>) => {
      const excludeFromCategoryTopicPage = getLocalizedField(a.fields, 'excludeFromCategoryTopicPage', ctx);
      return !excludeFromCategoryTopicPage;
    })
    .sort((a: Entry<any>, b: Entry<any>) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      const aDate: Date = new Date(getLocalizedField(a.fields, 'pubDate', ctx));
      const bDate: Date = new Date(getLocalizedField(b.fields, 'pubDate', ctx));

      return bDate.getTime() - aDate.getTime();
    });
};

export default categoryArticleItemsResolver;
