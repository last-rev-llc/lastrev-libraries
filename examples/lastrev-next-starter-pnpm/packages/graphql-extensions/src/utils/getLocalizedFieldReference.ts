import { ApolloContext } from '@last-rev/types';
import { Entry, Asset } from 'contentful';

const { getLocalizedField } = require('@last-rev/graphql-contentful-core');

export const getLocalizedFieldReference = async (fields: any, fieldName: string, ctx: ApolloContext) => {
  const value = getLocalizedField(fields, fieldName, ctx);

  if (Array.isArray(value) && value?.length && value?.some((v) => v?.sys?.type === 'Link')) {
    if (value.includes((x: Entry<any> | Asset) => !x?.sys?.id)) return value;

    const valueEntries = await ctx.loaders.entryLoader.loadMany(
      value?.map((item) => ({ id: item?.sys?.id, preview: !!ctx.preview }))
    );
    return valueEntries?.filter((x) => !!x);
  }

  if (!value?.sys?.id) return value;
  return ctx.loaders.entryLoader.load({
    id: value.sys.id,
    preview: !!ctx.preview
  });
};

export default getLocalizedFieldReference;