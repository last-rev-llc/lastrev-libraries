import type { CodemodDefinition } from '../../types';
import { transforms } from './transforms';
import { transformGroqQuery } from './groq';
import { getPrompts } from './prompts';
import { IGNORE_PATTERNS } from './constants';

/**
 * Sanity v2 codemod - migrates from old Sanity APIs to new document-based APIs
 */
export const sanityV2Codemod: CodemodDefinition = {
  name: 'sanity-v2',
  description: 'Migrate from old Sanity APIs to new document-based APIs',
  version: '1.0.0',

  transforms: {
    loaderApi: transforms.loaderApi,
    typeChanges: transforms.typeChanges,
    directoryKeys: transforms.directoryKeys,
    removeMapper: transforms.removeMapper,
    i18nMigration: transforms.i18nMigration,
    configMigration: transforms.configMigration,
    groqTransformation: transformGroqQuery
  },

  getPrompts,

  filePatterns: {
    include: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.groq'],
    exclude: IGNORE_PATTERNS
  },

  defaultOptions: {
    useInternationalizedArrays: true,
    fallbackToDefaultLocale: false
  }
};

export default sanityV2Codemod;
export { getPrompts, processAnswers } from './prompts';
export { transforms } from './transforms';
export { transformGroqQuery } from './groq';
