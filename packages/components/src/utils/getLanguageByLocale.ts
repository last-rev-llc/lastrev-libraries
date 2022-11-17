/**
 * Purpose: track locale language in GA
 * 1. Get locale path from function param or URL
 * 2. Check if it exists in localeMapping
 * 3. Return language value
 * Used by:
 * - web/_app.tsx
 * - NavigationItem component
 */

/**
 * Add new locales below
 * -- Keys should match those at i18n.locales in /web/next.config.js
 */
const localeMapping = {
  'en-US': 'English',
  'es-419': 'Spanish',
  'pt-BR': 'Portuguese',
  'ja-JP': 'Japanese',
  'de-DE': 'German',
  'fr-FR': 'French',
  'it-IT': 'Italian',
  'id-ID': 'Indonesian',
  'zh-CN': 'Chinese',
  'vi-VN': 'Vietnamese',
  'th-TH': 'Thai',
  'ko-KR': 'Korean'
};

const getLanguageByLocale = (locale?: string): string => {
  const localePath = locale || window.location.pathname.split('/')[1];
  return localeMapping[localePath as keyof typeof localeMapping] || 'English';
};

export default getLanguageByLocale;
