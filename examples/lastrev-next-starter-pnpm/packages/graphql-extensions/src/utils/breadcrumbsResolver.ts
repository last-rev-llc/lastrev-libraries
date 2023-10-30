import type { ApolloContext } from '../types';
import { getLocalizedField, getDefaultFieldValue } from '@last-rev/graphql-contentful-core';

import { createType } from './createType';

const generateParentPaths = async (page: any, ctx: ApolloContext, paths: any[] = []): Promise<any[]> => {
  const parentPageRef = getDefaultFieldValue(page, 'parentPage', ctx.defaultLocale);

  if (parentPageRef) {
    const parentPage = await ctx.loaders.entryLoader.load({ id: parentPageRef.sys.id, preview: !!ctx.preview });

    if (parentPage) {
      const slug = getDefaultFieldValue(parentPage as any, 'slug', ctx.defaultLocale);
      paths.unshift({
        id: parentPage?.sys?.id,
        slug,
        text: getLocalizedField(parentPage.fields, 'name', ctx) ?? getLocalizedField(parentPage.fields, 'title', ctx)
      });
      return generateParentPaths(parentPage, ctx, paths);
    }
  }

  return paths;
};

export const breadcrumbsResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const slug: any = getLocalizedField(item.fields, 'slug', ctx);
  const title: any = getLocalizedField(item.fields, 'name', ctx) ?? getLocalizedField(item.fields, 'title', ctx);
  const paths = await generateParentPaths(item, ctx);
  const links = [];
  let prevSlug = '';

  for (let path of paths) {
    prevSlug = path.slug !== '/' ? `${prevSlug}/${path.slug}` : prevSlug;

    links.push(
      createType('Link', {
        id: path.id,
        text: path.text,
        manualUrl: prevSlug
      })
    );
  }

  links.push(
    createType('Link', {
      id: item?.sys?.id,
      text: title,
      manualUrl: slug !== '/' ? `${prevSlug}/${slug}` : prevSlug
    })
  );

  return links;
};
