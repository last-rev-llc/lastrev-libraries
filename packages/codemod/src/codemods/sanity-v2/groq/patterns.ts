/**
 * GROQ patterns to detect and transform
 */

/**
 * Patterns for document-level i18n in GROQ queries
 */
export const I18N_FILTER_PATTERNS = [
  // __i18n_lang comparisons
  /__i18n_lang\s*==\s*\$locale/g,
  /__i18n_lang\s*==\s*["'][\w-]+["']/g,
  /__i18n_lang\s*!=\s*\$locale/g,
  /__i18n_lang\s*!=\s*["'][\w-]+["']/g,

  // _translations references
  /_translations\[\]->\s*\{[^}]*\}/g,
  /_translations\[\]/g,
  /_translations->/g,

  // __i18n_refs patterns
  /__i18n_refs/g
];

/**
 * Patterns that indicate the query uses document-level i18n
 */
export const DETECTION_PATTERNS = ['__i18n_lang', '_translations', '__i18n_refs'];

/**
 * Regex to find filter conditions with i18n
 */
export const FILTER_REGEX = /&&\s*__i18n_lang\s*==\s*(?:\$locale|["'][\w-]+["'])/g;

/**
 * Regex to find projection with _translations
 */
export const TRANSLATION_PROJECTION_REGEX = /,?\s*_translations\[\]->\s*\{[^}]*\}/g;

/**
 * Simple projection for _translations
 */
export const SIMPLE_TRANSLATION_REGEX = /,?\s*_translations(?:\[\])?/g;

/**
 * Regex to find __i18n_refs patterns
 */
export const I18N_REFS_REGEX = /,?\s*__i18n_refs(?:\[\]->\s*\{[^}]*\}|\[\])?/g;
