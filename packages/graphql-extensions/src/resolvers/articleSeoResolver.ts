import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import pageCanonicalUrlResolver from './seoCanonicalUrlResolver';

const articleSeoResolver = async (article: any, _args: any, ctx: ApolloContext) => {
  const locale = ctx.locale || ctx.defaultLocale;
  const articleSEO = getLocalizedField(article.fields, 'seo', ctx) || {};

  if (!articleSEO[locale]?.canonical?.value) {
    const canonicalUrl = pageCanonicalUrlResolver(article, _args, ctx);
    if (canonicalUrl) {
      articleSEO.canonical = { name: 'canonical', value: canonicalUrl };
    }
  }

  if (!articleSEO?.title?.value) {
    const title = getLocalizedField(article.fields, 'title', ctx);
    if (title) {
      articleSEO.title = { name: 'title', value: title };
    }
  }

  if (!articleSEO?.description?.value) {
    const description = getLocalizedField(article.fields, 'summary', ctx);
    if (description) articleSEO.description = { name: 'description', value: description };
  }

  return articleSEO;
};

export default articleSeoResolver;
