import { ApolloContext, CmsEntry, ContentfulLoaders, SanityLoaders, ItemKey } from '@last-rev/types';

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

/**
 * Load a document/entry by ID, CMS-agnostic.
 * For Sanity: uses documentLoader (unified document model)
 * For Contentful: uses entryLoader or assetLoader based on isAsset flag
 */
export const loadDocument = async (
  ctx: ApolloContext,
  id: string,
  preview: boolean,
  isAsset: boolean = false
): Promise<any> => {
  if (ctx.cms === 'Sanity') {
    // Sanity uses unified documentLoader for all document types
    return ctx.sanityLoaders!.documentLoader.load({ id, preview });
  }
  // Contentful has separate loaders for entries and assets
  const loader = isAsset ? ctx.loaders.assetLoader : ctx.loaders.entryLoader;
  return loader.load({ id, preview });
};

/**
 * Load multiple documents/entries by IDs, CMS-agnostic.
 * For Sanity: uses documentLoader (unified document model)
 * For Contentful: uses entryLoader or assetLoader based on isAsset flag
 */
export const loadDocuments = async (ctx: ApolloContext, keys: ItemKey[], isAsset: boolean = false): Promise<any[]> => {
  if (ctx.cms === 'Sanity') {
    // Sanity uses unified documentLoader for all document types
    const results = await ctx.sanityLoaders!.documentLoader.loadMany(keys);
    return results.filter((r) => r !== null && !(r instanceof Error));
  }
  // Contentful has separate loaders for entries and assets
  const loader = isAsset ? ctx.loaders.assetLoader : ctx.loaders.entryLoader;
  const results = await loader.loadMany(keys);
  return results.filter((r) => r !== null && !(r instanceof Error));
};

/**
 * Load documents by content type/_type, CMS-agnostic.
 * For Sanity: uses documentsByTypeLoader
 * For Contentful: uses entriesByContentTypeLoader
 */
export const loadDocumentsByType = async (ctx: ApolloContext, typeId: string, preview: boolean): Promise<any[]> => {
  if (ctx.cms === 'Sanity') {
    return ctx.sanityLoaders!.documentsByTypeLoader.load({ id: typeId, preview });
  }
  return ctx.loaders.entriesByContentTypeLoader.load({ id: typeId, preview });
};

/**
 * Load document by field value, CMS-agnostic.
 * For Sanity: uses documentByFieldValueLoader
 * For Contentful: uses entryByFieldValueLoader
 */
export const loadDocumentByFieldValue = async (
  ctx: ApolloContext,
  contentType: string,
  field: string,
  value: string,
  preview: boolean
): Promise<any> => {
  if (ctx.cms === 'Sanity') {
    return ctx.sanityLoaders!.documentByFieldValueLoader.load({ contentType, field, value, preview });
  }
  return ctx.loaders.entryByFieldValueLoader.load({ contentType, field, value, preview });
};

/**
 * Load documents that reference a given document, CMS-agnostic.
 * For Sanity: uses documentsRefByLoader
 * For Contentful: uses entriesRefByLoader
 */
export const loadDocumentsRefBy = async (
  ctx: ApolloContext,
  contentType: string,
  field: string,
  id: string,
  preview: boolean
): Promise<any[]> => {
  if (ctx.cms === 'Sanity') {
    return ctx.sanityLoaders!.documentsRefByLoader.load({ contentType, field, id, preview });
  }
  return ctx.loaders.entriesRefByLoader.load({ contentType, field, id, preview });
};
