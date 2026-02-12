import {
  DETECTION_PATTERNS,
  FILTER_REGEX,
  TRANSLATION_PROJECTION_REGEX,
  SIMPLE_TRANSLATION_REGEX,
  I18N_REFS_REGEX
} from './patterns';

/**
 * Result of transforming a GROQ query
 */
export interface GroqTransformResult {
  query: string;
  changed: boolean;
  warnings: string[];
}

/**
 * Transform a GROQ query to remove document-level i18n patterns
 *
 * @param query The GROQ query string
 * @returns The transformed query and metadata
 */
export function transformGroqI18n(query: string): GroqTransformResult {
  const warnings: string[] = [];
  let changed = false;
  let result = query;

  // Check if query contains i18n patterns
  const hasI18n = DETECTION_PATTERNS.some((pattern) => query.includes(pattern));

  if (!hasI18n) {
    return { query, changed: false, warnings };
  }

  // Remove __i18n_lang filter conditions
  if (FILTER_REGEX.test(result)) {
    result = result.replace(FILTER_REGEX, '');
    changed = true;
    warnings.push('__i18n_lang filter removed - field-level i18n does not filter by language at document level');
  }

  // Reset regex lastIndex
  FILTER_REGEX.lastIndex = 0;

  // Remove _translations projections
  if (TRANSLATION_PROJECTION_REGEX.test(result)) {
    result = result.replace(TRANSLATION_PROJECTION_REGEX, '');
    changed = true;
    warnings.push('_translations projection removed - translations are now at field level');
  }

  // Reset regex lastIndex
  TRANSLATION_PROJECTION_REGEX.lastIndex = 0;

  // Remove simple _translations references
  if (SIMPLE_TRANSLATION_REGEX.test(result)) {
    result = result.replace(SIMPLE_TRANSLATION_REGEX, '');
    changed = true;
    warnings.push('_translations reference removed - translations are now at field level');
  }

  // Reset regex lastIndex
  SIMPLE_TRANSLATION_REGEX.lastIndex = 0;

  // Remove __i18n_refs references
  if (I18N_REFS_REGEX.test(result)) {
    result = result.replace(I18N_REFS_REGEX, '');
    changed = true;
    warnings.push('__i18n_refs reference removed - i18n references are now at field level');
  }

  // Reset regex lastIndex
  I18N_REFS_REGEX.lastIndex = 0;

  // Clean up any double && or empty filters
  result = cleanupQuery(result);

  // Add warning about remaining __i18n patterns
  if (result.includes('__i18n')) {
    warnings.push('Query still contains __i18n patterns that could not be automatically transformed');
  }

  return { query: result, changed, warnings };
}

/**
 * Clean up a query after transformation
 */
function cleanupQuery(query: string): string {
  let result = query;

  // Remove double &&
  result = result.replace(/&&\s*&&/g, '&&');

  // Remove && at the end of filters (before ])
  result = result.replace(/&&\s*\]/g, ']');

  // Remove && at the start of filters (after [)
  result = result.replace(/\[\s*&&/g, '[');

  // Remove empty filter conditions [  ]
  result = result.replace(/\[\s*\]/g, '');

  // Clean up multiple spaces
  result = result.replace(/\s+/g, ' ');

  // Clean up space before ]
  result = result.replace(/\s+\]/g, ']');

  // Clean up space after [
  result = result.replace(/\[\s+/g, '[');

  return result.trim();
}

/**
 * Check if a string appears to be a GROQ query
 */
export function isGroqQuery(str: string): boolean {
  // Basic heuristics for GROQ detection
  const groqPatterns = [
    /^\s*\*\[/, // Starts with *[
    /_type\s*==/, // Has _type filter
    /\.\.\./g, // Has spread operator
    /->\s*\{/, // Has reference projection
    /\|\s*order\(/, // Has order
    /\[\s*\d+\s*\.\.\s*\d+\s*\]/ // Has slice
  ];

  return groqPatterns.some((pattern) => pattern.test(str));
}

/**
 * Extract GROQ queries from a template literal or string
 */
export function extractGroqFromString(str: string): string[] {
  const queries: string[] = [];

  // If the whole string looks like a GROQ query
  if (isGroqQuery(str)) {
    queries.push(str);
    return queries;
  }

  // Try to find GROQ queries within the string
  const groqRegex = /\*\[[^\]]*\](?:\s*\{[^}]*\})?/g;
  let match;

  while ((match = groqRegex.exec(str)) !== null) {
    queries.push(match[0]);
  }

  return queries;
}
