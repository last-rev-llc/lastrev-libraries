import { ApolloContext, CmsEntry, ContentfulLoaders, SanityLoaders } from '@last-rev/types';

export type ReferenceInfo = {
  isReference: boolean;
  isEntry: boolean;
  isAsset: boolean;
  id: string | null;
};

/**
 * Get the ID from content entry.
 */
export const getContentId = (entry: CmsEntry, ctx: ApolloContext): string | undefined => {
  if (ctx.cms === 'Sanity') {
    return (entry as any)?._id;
  }
  return (entry as any)?.sys?.id;
};

/**
 * Get the content type from entry.
 */
export const getContentType = (entry: CmsEntry, ctx: ApolloContext): string | undefined => {
  if (ctx.cms === 'Sanity') {
    return (entry as any)?._type;
  }
  return (entry as any)?.sys?.contentType?.sys?.id || (entry as any)?.sys?.type;
};

/**
 * Get updated timestamp from entry.
 */
export const getUpdatedAt = (entry: CmsEntry, ctx: ApolloContext): string | undefined => {
  if (ctx.cms === 'Sanity') {
    return (entry as any)?._updatedAt;
  }
  return (entry as any)?.sys?.updatedAt;
};

/**
 * Extract reference info from a field value.
 */
export const getRefInfo = (value: any, ctx: ApolloContext): ReferenceInfo => {
  if (!value) return { isReference: false, isEntry: false, isAsset: false, id: null };

  if (ctx.cms === 'Sanity') {
    // Sanity references use _ref
    if (value && typeof value._ref === 'string') {
      return {
        isReference: true,
        isEntry: true, // Sanity can't distinguish; loader will handle
        isAsset: false,
        id: value._ref
      };
    }
  } else {
    // Contentful references use sys.linkType
    if (value?.sys?.linkType === 'Entry') {
      return { isReference: true, isEntry: true, isAsset: false, id: value.sys.id };
    }
    if (value?.sys?.linkType === 'Asset') {
      return { isReference: true, isEntry: false, isAsset: true, id: value.sys.id };
    }
  }

  return { isReference: false, isEntry: false, isAsset: false, id: null };
};

/**
 * Get loaders from context based on CMS type.
 */
export const getLoaders = (ctx: ApolloContext): ContentfulLoaders | SanityLoaders => {
  return ctx.cms === 'Sanity' ? ctx.sanityLoaders! : ctx.loaders;
};
