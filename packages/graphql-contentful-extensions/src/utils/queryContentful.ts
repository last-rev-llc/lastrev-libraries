import { ApolloContext } from '@last-rev/types';
import { Entry } from 'contentful';

interface QueryArgs {
  contentType: string;
  filters?: { id: string; key: string }[];
  filter?: any;
  order?: any;
  limit?: any;
  skip?: any;
  ctx: ApolloContext;
}
const query = async ({
  contentType,
  filters,
  filter,
  order,
  limit = 1000,
  skip = 0,
  ctx
}: QueryArgs): Promise<Entry<unknown>[]> => {
  let items;
  const contentfulQuery = {
    content_type: contentType,
    limit,
    skip,
    order,
    select: 'sys.id',
    ...parseFilters(filter, filters)
  };
  if (ctx.preview) {
    items = (await ctx.contentful!.preview.getEntries(contentfulQuery)).items;
  } else {
    items = (await ctx.contentful!.prod.getEntries(contentfulQuery)).items;
  }
  if (items.length === 1000)
    return [
      ...items,
      ...(await query({
        contentType,
        filters,
        filter,
        order,
        limit,
        skip: skip + 1000,
        ctx
      }))
    ];
  return items;
};

export const queryContentful = async ({
  contentType,
  filters,
  filter,
  order,
  limit = 1000,
  skip = 0,
  ctx
}: QueryArgs): Promise<Entry<unknown>[]> => {
  return query({
    contentType,
    filters,
    filter,
    order,
    limit,
    skip,
    ctx
  });
};

function parseFilters(filter: any, filters: { id: string; key: string }[] | undefined) {
  if (filter && filters) {
    return filters?.reduce(
      (accum, { id, key }) =>
        !!filter[id] && (Array.isArray(filter[id]) ? filter[id] : [filter[id]])?.length
          ? {
              ...accum,
              [key]: (Array.isArray(filter[id]) ? filter[id] : [filter[id]]).join(',')
            }
          : accum,
      {}
    );
  } else if (filter) {
    return filter;
  }
}
