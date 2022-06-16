import { ApolloContext } from '@last-rev/types';

const localizationLookupResolver = async (_item: any, _args: any, ctx: ApolloContext) => {
  const entriesRef = await ctx.loaders.entriesByContentTypeLoader.load({
    id: 'commonResource',
    preview: !!ctx.preview
  });
  return entriesRef;
};

export default localizationLookupResolver;
