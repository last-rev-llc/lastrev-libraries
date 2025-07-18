import { BaseEntry, ContentfulClientApi } from 'contentful';
import { BaseAsset } from '@last-rev/types';

export const isRejected = (r: PromiseSettledResult<unknown>): r is PromiseRejectedResult => r.status === 'rejected';

export const makeContentfulRequest = async <T extends BaseEntry | BaseAsset>(
  client: ContentfulClientApi<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES'>,
  command: 'getEntries' | 'getAssets',
  limit: number,
  query: Record<string, any>,
  skip: number = 0,
  existing: T[] = []
): Promise<T[]> => {
  const results = await (client as any)[command]({
    ...query,
    skip,
    limit
  });

  const { items = [], total } = results;

  existing.push(...(items as T[]));
  if (existing.length >= total) {
    return existing;
  }
  return makeContentfulRequest(client, command, limit, query, skip + limit, existing as T[]);
};

export const chunk = <T>(arr: T[], chunkSize: number): T[][] => {
  const chunks = [];
  let i = 0;
  while (i < arr.length) {
    chunks.push(arr.slice(i, (i += chunkSize)));
  }
  return chunks;
};
