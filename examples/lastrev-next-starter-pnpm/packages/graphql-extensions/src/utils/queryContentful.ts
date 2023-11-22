import type { ApolloContext } from '../types';
import type { Entry } from 'contentful';

interface QueryArgs {
  contentType: string;
  filters?: { id: string; key: string }[];
  filter?: any;
  order?: any;
  limit?: number;
  skip?: number;
  ctx: ApolloContext;
}

// Function to parse filters
const parseFilters = (filter: any, filters: { id: string; key: string }[] | undefined) => {
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
};

// Modified query function
const query = async ({
  contentType,
  filters,
  filter,
  order,
  limit = 1000,
  skip = 0,
  ctx,
  total = 0
}: QueryArgs & { total?: number }): Promise<Entry<any>[]> => {
  const contentfulQuery = {
    content_type: contentType,
    limit,
    skip,
    order,
    select: 'sys.id',
    ...parseFilters(filter, filters)
  };

  const response = ctx.preview
    ? await ctx.contentful.preview.getEntries(contentfulQuery)
    : await ctx.contentful.prod.getEntries(contentfulQuery);

  let items = response.items;
  if (total === 0) total = response.total;

  const remainingItems = total - (skip + items.length);
  const newLimit = 1000;
  if (remainingItems > 0) {
    const additionalQueries = [];
    for (let newSkip = skip + newLimit; newSkip < total; newSkip += newLimit) {
      additionalQueries.push(query({ ...contentfulQuery, limit: newLimit, skip: newSkip, ctx, total }));
    }
    const additionalItems = (await Promise.all(additionalQueries)).flat();
    items = items.concat(additionalItems);
  }
  return items;
};

export const queryContentful = async (args: QueryArgs): Promise<Entry<any>[]> => {
  return query(args);
};
