import type { LoaderMapping, TypeMapping } from '../../types';

/**
 * Loader API mappings from old Contentful-style to new Sanity-native
 */
export const LOADER_MAPPINGS: LoaderMapping[] = [
  { old: 'entryLoader', new: 'documentLoader', objectPath: 'ctx.loaders' },
  { old: 'assetLoader', new: 'documentLoader', objectPath: 'ctx.loaders' },
  { old: 'entriesByContentTypeLoader', new: 'documentsByTypeLoader', objectPath: 'ctx.loaders' },
  { old: 'entryByFieldValueLoader', new: 'documentByFieldValueLoader', objectPath: 'ctx.loaders' },
  { old: 'entriesRefByLoader', new: 'documentsRefByLoader', objectPath: 'ctx.loaders' }
];

/**
 * Methods that should be removed (not renamed)
 */
export const REMOVED_METHODS = ['fetchAllContentTypes'];

/**
 * Object path mapping for loaders
 */
export const LOADER_OBJECT_MAPPINGS: Record<string, string> = {
  'ctx.loaders': 'ctx.sanityLoaders',
  'loaders': 'sanityLoaders',
  'context.loaders': 'context.sanityLoaders'
};

/**
 * Type mappings from Contentful-style to Sanity-native
 */
export const TYPE_MAPPINGS: TypeMapping[] = [
  { old: 'Entry', new: 'SanityDocument', source: '@last-rev/types' },
  { old: 'BaseEntry', new: 'SanityDocument', source: '@last-rev/types' },
  { old: 'Asset', new: 'SanityDocument', source: '@last-rev/types' },
  { old: 'BaseAsset', new: 'SanityDocument', source: '@last-rev/types' },
  { old: 'ContentfulLoaders', new: 'SanityLoaders', source: '@last-rev/types' },
  { old: 'CmsLoaders', new: 'SanityLoaders', source: '@last-rev/types' }
];

/**
 * Directory and key constant mappings
 */
export const DIRECTORY_MAPPINGS: Record<string, string> = {
  'entries': 'documents',
  'assets': 'documents',
  'entry_ids_by_content_type': 'document_ids_by_type'
};

/**
 * Redis key pattern mappings
 */
export const REDIS_KEY_MAPPINGS: Record<string, string> = {
  'entries:': 'documents:',
  'assets:': 'documents:',
  'entry_ids_by_content_type:': 'document_ids_by_type:'
};

/**
 * Imports to remove from @last-rev/sanity-mapper
 */
export const SANITY_MAPPER_IMPORTS = [
  'convertSanityDoc',
  'mapSanityTypesToContentfulTypes',
  'processTranslations'
];

/**
 * Package to remove from dependencies
 */
export const SANITY_MAPPER_PACKAGE = '@last-rev/sanity-mapper';

/**
 * I18n field patterns to detect and transform
 */
export const I18N_FIELD_PATTERNS = [
  '__i18n_lang',
  '_translations',
  '__i18n_refs'
];

/**
 * GROQ patterns for i18n that should be removed
 */
export const GROQ_I18N_PATTERNS = [
  '__i18n_lang == $locale',
  '__i18n_lang == "',
  '_translations[]->'
];

/**
 * File extensions to process
 */
export const SUPPORTED_EXTENSIONS = {
  typescript: ['.ts', '.tsx'],
  javascript: ['.js', '.jsx', '.mjs'],
  groq: ['.groq'],
  config: ['.json', '.yaml', '.yml']
};

/**
 * Config file patterns to detect
 */
export const CONFIG_FILE_PATTERNS = [
  'lastrev.config.ts',
  'lastrev.config.js',
  '.lastrevrc.json',
  '.lastrevrc.yaml',
  '.lastrevrc.yml',
  'sanity.config.ts',
  'sanity.config.js'
];

/**
 * Glob patterns for finding files
 */
export const GLOB_PATTERNS = {
  typescript: '**/*.{ts,tsx}',
  javascript: '**/*.{js,jsx,mjs}',
  groq: '**/*.groq',
  config: '**/lastrev.config.{ts,js}',
  packageJson: '**/package.json'
};

/**
 * Directories to ignore during file search
 */
export const IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/.cache/**',
  '**/coverage/**'
];
