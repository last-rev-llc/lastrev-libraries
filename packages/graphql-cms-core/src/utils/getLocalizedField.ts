import get from 'lodash/get';
import { ApolloContext, CmsEntry } from '@last-rev/types';

/**
 * Get localized field value from any CMS entry.
 * Reads ctx.cms to determine access pattern.
 *
 * @param entry - The full entry (Sanity doc or Contentful entry)
 * @param field - Field name to access
 * @param ctx - Apollo context (must have `cms` set)
 */
const getLocalizedField = (entry: CmsEntry, field: string, ctx: ApolloContext): any => {
  if (ctx.cms === 'Sanity') {
    return getSanityField(entry, field, ctx);
  }
  return getContentfulField(entry, field, ctx);
};

/**
 * Get field from Sanity document.
 *
 * Config options (from ctx.sanityConfig):
 * - useInternationalizedArrays (default: true)
 *   - true: Fields use [{ _key: 'en', value: ... }] format
 *   - false: Fields accessed directly (doc.field)
 *
 * - fallbackToDefaultLocale (default: false)
 *   - true: If requested locale not found, try default locale
 *   - false: Return null if requested locale not found
 */
const getSanityField = (doc: any, field: string, ctx: ApolloContext): any => {
  if (!doc) return null;
  const fieldValue = doc[field];
  if (fieldValue === undefined) return null;

  // Check config for i18n strategy
  const useI18nArrays = ctx.sanityConfig?.useInternationalizedArrays ?? true;
  const fallbackToDefault = ctx.sanityConfig?.fallbackToDefaultLocale ?? false;

  if (!useI18nArrays) {
    // Direct access - no i18n array processing
    return fieldValue;
  }

  // Check if this is an i18n array format
  // i18n arrays have both _key (locale code) AND value property
  // Regular Sanity arrays have _key (random ID) but no value property
  if (!Array.isArray(fieldValue) || !fieldValue[0]?._key || !('value' in fieldValue[0])) {
    // Not an i18n array - return as-is (supports regular arrays, references, etc.)
    return fieldValue;
  }

  // i18n array format: find by locale key
  const locale = ctx.locale ?? ctx.defaultLocale;
  const localized = fieldValue.find((v: any) => v._key === locale);
  if (localized?.value !== undefined) return localized.value;

  // Only fallback to default locale if configured
  if (fallbackToDefault && locale !== ctx.defaultLocale) {
    const defaultLocalized = fieldValue.find((v: any) => v._key === ctx.defaultLocale);
    if (defaultLocalized?.value !== undefined) return defaultLocalized.value;
  }

  return null;
};

/**
 * Get field from Contentful entry.
 * Expects entry.fields[fieldName][locale] structure.
 */
const getContentfulField = (entry: any, field: string, ctx: ApolloContext): any => {
  const fields = entry.fields;
  if (!fields) return null;

  const defaultLocaleValue = get(fields, [field, ctx.defaultLocale]);
  const localeValue = get(fields, [field, ctx.locale ?? ctx.defaultLocale]);
  if (typeof localeValue !== 'undefined') return localeValue;
  if (typeof defaultLocaleValue !== 'undefined') return defaultLocaleValue;
  return null;
};

export { getSanityField, getContentfulField };
export default getLocalizedField;
