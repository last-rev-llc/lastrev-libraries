import { BaseEntry, ApolloContext, SanityDocument } from '@last-rev/types';
import { get } from 'lodash';

/**
 * Get a field value from a CMS entry using the default locale.
 *
 * @param item - The CMS entry
 * @param fieldName - The field name to retrieve
 * @param ctxOrDefaultLocale - ApolloContext (required for Sanity) or default locale string (Contentful)
 */
const getDefaultFieldValue = (
  item: BaseEntry | SanityDocument,
  fieldName: string,
  ctxOrDefaultLocale: ApolloContext | string
): any | null => {
  // If string passed, treat as defaultLocale (Contentful path)
  if (typeof ctxOrDefaultLocale === 'string') {
    return get(item, ['fields', fieldName, ctxOrDefaultLocale], null);
  }

  const ctx = ctxOrDefaultLocale;

  // Sanity requires full context
  if (ctx.cms === 'Sanity') {
    // Sanity fields are directly on the document
    const val = (item as SanityDocument)[fieldName];
    if (ctx.sanityConfig?.useInternationalizedArrays && Array.isArray(val) && val[0]?._key) {
      return val;
    }
    return val;
  }

  // Contentful: fields are in item.fields[fieldName][locale]
  return get(item, ['fields', fieldName, ctx.defaultLocale], null);
};

export default getDefaultFieldValue;
