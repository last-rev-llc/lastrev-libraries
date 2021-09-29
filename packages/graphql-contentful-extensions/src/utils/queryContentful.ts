import { ApolloContext } from '@last-rev/types';
import { Entry } from 'contentful';

export const queryContentful = async ({
  contentType,
  filters,
  filter,
  ctx
}: {
  contentType: string;
  filters: { id: string; key: string }[];
  filter: any;
  ctx: ApolloContext;
}): Promise<Entry<unknown>[]> => {
  // TODO: handle more than 1000 items
  const contentfulQuery = {
    content_type: contentType,
    limit: 1000,
    ...(!!filter &&
      filters.reduce(
        (accum, { id, key }) =>
          !!filter[id] && (Array.isArray(filter[id]) ? filter[id] : [filter[id]])?.length
            ? {
                ...accum,
                [key]: (Array.isArray(filter[id]) ? filter[id] : [filter[id]]).join(',')
              }
            : accum,
        {}
      ))
  };
  console.log('queryContentful', { filter, filters, contentType, contentfulQuery });
  let items;
  if (ctx.preview) {
    items = (await ctx.contentful.preview.getEntries(contentfulQuery)).items;
  } else {
    items = (await ctx.contentful.prod.getEntries(contentfulQuery)).items;
  }
  return items;
};
