import type { Entry } from 'contentful';
import type { ApolloContext } from '@last-rev/types';
import Redis from 'ioredis';
// @ts-ignore
const redis = new Redis({
  port: process.env.REDIS_PORT!,
  host: process.env.REDIS_HOST!,
  password: process.env.REDIS_PASSWORD!,
  username: process.env.REDIS_USERNAME!,
  tls: {},
  keyPrefix: `${process.env.CONTENTFUL_SPACE_ID}:${process.env.CONTENTFUL_ENV}:${
    process.env.CONTENTFUL_USE_PREVIEW ? 'preview' : 'production'
  }`
}); // configure Redis client as per your setup

interface QueryArgs {
  contentType: string;
  filters?: { id: string; key: string }[];
  filter?: any;
  order?: any;
  limit?: any;
  skip?: any;
  ctx: ApolloContext;
}

const generateCacheKey = ({ contentType, filters, filter, order, limit, skip }: QueryArgs): string => {
  return `contentful:v2:${contentType}:${JSON.stringify({ filters, filter, order, limit, skip })}`;
};

const query = async (args: QueryArgs): Promise<Entry<unknown>[]> => {
  const { contentType, filters, filter, order, limit = 1000, skip = 0, ctx } = args;
  const cacheKey = generateCacheKey(args);
  let cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log('CacheHit:', cacheKey);
    return JSON.parse(cachedData);
  } else {
    console.log('CacheMISS:', cacheKey);
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
      items = (await ctx.contentful.preview.getEntries(contentfulQuery)).items;
    } else {
      items = (await ctx.contentful.prod.getEntries(contentfulQuery)).items;
    }

    await redis.set(cacheKey, JSON.stringify(items), 'EX', 3600); // Cache for 1 hour, adjust as needed

    return items;
  }
};

export const queryContentful = async (args: QueryArgs): Promise<Entry<unknown>[]> => {
  const timer = 'queryContentful:' + generateCacheKey(args) + new Date();
  console.time(timer);
  const result = await query(args);
  console.timeEnd(timer);
  return result;
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
