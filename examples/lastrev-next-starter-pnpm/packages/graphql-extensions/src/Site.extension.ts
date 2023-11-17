import { ApolloContext } from './types';

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

export const typeMappings = {};

export const resolvers = {
  Query: {
    page: async (
      _: any,
      { path, locale, preview = false, site }: { path?: string; locale?: string; preview?: boolean; site?: string },
      ctx: ApolloContext
    ) => {
      if (!path) throw new Error('MissingArgumentPath');
      ctx.locale = locale || ctx.defaultLocale;
      ctx.preview = preview;
      ctx.path = path;

      const pathEntries = await ctx.loadEntriesForPath(path, ctx, site);

      if (!pathEntries) return null;

      ctx.pathEntries = pathEntries;

      const siteSettings = await ctx.loaders.entryLoader.load({ id: SITE_ID!, preview: !!ctx.preview });
      ctx.siteSettings = siteSettings;

      const entry = pathEntries.reduce((acc: any, curr: any) => (curr ? curr : acc), null as any);
      console.log({ path, entry });
      return entry;
    }
  }
};
