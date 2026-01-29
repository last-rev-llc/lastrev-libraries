import { BaseEntry, ApolloContext } from '@last-rev/types';
import { get } from 'lodash';

/**
 * Get a field value from a CMS entry using the default locale.
 *
 * @deprecated Use getLocalizedField from contentUtils instead for CMS-agnostic field access.
 *
 * @param item - The CMS entry
 * @param fieldName - The field name to retrieve
 * @param defaultLocale - The default locale
 * @param ctx - Optional ApolloContext for CMS-aware field access
 */
const getDefaultFieldValue = (
  item: BaseEntry,
  fieldName: string,
  defaultLocale: string,
  ctx?: ApolloContext
): any | null => {
  // If context provided, use CMS-aware access
  if (ctx?.cms === 'Sanity') {
    // Sanity fields are directly on the document
    return get(item, [fieldName], null);
  }

  // Contentful: fields are in item.fields[fieldName][locale]
  return get(item, ['fields', fieldName, defaultLocale], null);
};

export default getDefaultFieldValue;
