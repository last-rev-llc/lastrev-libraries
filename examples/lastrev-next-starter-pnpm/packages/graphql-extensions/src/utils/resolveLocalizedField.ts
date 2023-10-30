import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';
import type { Asset, Entry } from 'contentful';

interface FieldReferenceValue {
  sys: { linkType: string };
}
export type ResolvedValue = Asset | Entry<any> | null | Array<Asset | Entry<any> | null>;

export const resolveLocalizedField = async (fields: any, field: string, ctx: ApolloContext): Promise<ResolvedValue> => {
  const { loaders, preview } = ctx;
  let value: FieldReferenceValue | any = getLocalizedField(fields, field, ctx);
  // Expand  array links
  if (Array.isArray(value) && value.length > 0) {
    const firstItem = value[0];

    if (firstItem?.sys?.linkType === 'Entry') {
      // contentful cannot have mixed arrays, so it is okay to make assumptions based on the first item
      return (await loaders.entryLoader.loadMany(value.map((x) => ({ id: x.sys.id, preview: !!preview }))))
        .filter((r) => r !== null)
        .map((r) => r as Entry<any>);
    }
    if (firstItem?.sys?.linkType === 'Asset') {
      return (await loaders.assetLoader.loadMany(value.map((x) => ({ id: x.sys.id, preview: !!preview }))))
        .filter((r) => r !== null)
        .map((r) => r as Entry<any>);
    }
  }

  //Check if the field is a reference then resolve it
  if (value?.sys?.linkType == 'Entry') {
    return loaders.entryLoader.load({ id: value.sys.id, preview: !!preview });
  }
  if (value?.sys?.linkType == 'Asset') {
    return loaders.assetLoader.load({ id: value.sys.id, preview: !!preview });
  }

  return value;
};
