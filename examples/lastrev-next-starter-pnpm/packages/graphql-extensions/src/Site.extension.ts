import { Entry } from 'contentful';
import { ApolloContext } from './types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import gql from 'graphql-tag';

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

export const typeDefs = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
  extend type Query {
    page(path: String!, locale: String, preview: Boolean, site: String): Content @cacheControl(maxAge: 60)
  }
`;
export const typeMappings = {};

export const resolvers = {
  Query: {
    page: async (
      _: any,
      { path, locale, preview = false, site }: { path?: string; locale?: string; preview?: boolean; site?: string },
      ctx: ApolloContext
    ) => {
      if (!path) {
        console.error('Missing argument: path');
        throw new Error('MissingArgumentPath');
      }

      ctx.locale = locale || ctx.defaultLocale;
      ctx.preview = preview;
      ctx.path = path;

      try {
        const pathEntries = await ctx.loadEntriesForPath(path, ctx, site);
        if (!pathEntries) {
          console.warn(`No entries found for path: ${path}`);
          return null;
        }

        ctx.pathEntries = pathEntries;

        const siteSettings = await ctx.loaders.entryLoader.load({ id: SITE_ID!, preview: !!ctx.preview });
        ctx.siteSettings = siteSettings;

        const entry = pathEntries.reduce((acc: any, curr: any) => (curr ? curr : acc), null as any);
        console.log(`Loading entry for path: ${path}`);
        const loadedIds = new Set();
        // await loadReferencedEntries(entry, ctx, loadedIds);
        console.log({ loadedIds });
        return entry;
      } catch (error) {
        console.error(`Error resolving page query for path ${path}:`, error);
        throw error;
      }
    }
  }
};

async function loadReferencedEntries(aEntry: Entry<any>, ctx: ApolloContext, loadedIds: Set<string>) {
  if (!aEntry || typeof aEntry !== 'object' || !aEntry.fields) {
    return;
  }

  const promises = [];

  for (const fieldName in aEntry.fields) {
    const fieldValue = getLocalizedField(aEntry.fields, fieldName, ctx);
    if (!fieldValue) continue;

    try {
      if (isContentfulLink(fieldValue) && !loadedIds.has(fieldValue.sys.id)) {
        promises.push(processLink(fieldValue, ctx, loadedIds));
      } else if (Array.isArray(fieldValue)) {
        fieldValue.forEach((item) => {
          if (isContentfulLink(item) && !loadedIds.has(item.sys.id)) {
            promises.push(processLink(item, ctx, loadedIds));
          }
        });
      }
    } catch (error) {
      console.error(`Error loading referenced entries for field ${fieldName}:`, error);
    }
  }

  await Promise.all(promises);
}

function isContentfulLink(field: Entry<any>) {
  return field && field.sys && field.sys.type === 'Link';
}

async function processLink(link: Entry<any>, ctx: ApolloContext, loadedIds: Set<string>) {
  loadedIds.add(link.sys.id);
  const refEntry = await ctx.loaders.entryLoader.load({ id: link.sys.id, preview: ctx.preview! });
  if (refEntry) {
    console.log(`Loading referenced entry with ID: ${link.sys.id}`);
    return loadReferencedEntries(refEntry, ctx, loadedIds);
  }
}
