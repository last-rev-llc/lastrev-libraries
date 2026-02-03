import type { QuestionCollection } from 'inquirer';
import type { CodemodRunOptions } from '../../types';

/**
 * Transform options for sanity-v2 codemod
 */
export interface SanityV2Options {
  loaderApi: boolean;
  typeChanges: boolean;
  i18nMigration: boolean;
  directoryKeys: boolean;
  configMigration: boolean;
  groqTransformation: boolean;
  removeMapper: boolean;
  utilityMigration: boolean;
  genericTypes: boolean;
  sysPropertyAccess: boolean;
  useInternationalizedArrays: boolean;
  fallbackToDefaultLocale: boolean;
}

/**
 * Get interactive prompts for sanity-v2 codemod
 */
export function getPrompts(options: CodemodRunOptions): QuestionCollection {
  // If --all flag is set, or --transforms specified, skip prompts
  if (options.all || options.nonInteractive || options.transforms) {
    return [];
  }

  return [
    {
      type: 'checkbox',
      name: 'selectedTransforms',
      message: 'Select migrations to apply:',
      choices: [
        { name: 'Loader API changes (entry → document)', value: 'loaderApi', checked: true },
        { name: 'Type changes (Entry → SanityDocument)', value: 'typeChanges', checked: true },
        { name: 'I18n migration (document → field-level)', value: 'i18nMigration', checked: true },
        { name: 'Directory/key constants', value: 'directoryKeys', checked: true },
        { name: 'Config file updates', value: 'configMigration', checked: true },
        { name: 'GROQ query transformation', value: 'groqTransformation', checked: true },
        { name: 'Remove sanity-mapper (convertSanityDoc, etc.)', value: 'removeMapper', checked: true },
        { name: 'Utility migration (entry.fields → entry)', value: 'utilityMigration', checked: true },
        { name: 'Generic types (add <SanityDocument> parameter)', value: 'genericTypes', checked: true },
        { name: 'Sys property access (.sys.id → ._id, .sys.contentType.sys.id → ._type)', value: 'sysPropertyAccess', checked: true }
      ]
    },
    {
      type: 'confirm',
      name: 'useInternationalizedArrays',
      message: 'Do you use internationalized array fields (sanity-plugin-internationalized-array)?',
      default: true,
      when: (answers: Record<string, unknown>) =>
        Array.isArray(answers.selectedTransforms) && answers.selectedTransforms.includes('i18nMigration')
    },
    {
      type: 'confirm',
      name: 'fallbackToDefaultLocale',
      message: 'Fallback to default locale for missing translations?',
      default: false,
      when: (answers: Record<string, unknown>) =>
        Array.isArray(answers.selectedTransforms) && answers.selectedTransforms.includes('i18nMigration')
    },
    {
      type: 'confirm',
      name: 'dryRun',
      message: 'Run in dry-run mode first (no changes written)?',
      default: true,
      when: () => !options.dryRun
    }
  ];
}

/**
 * Process prompt answers into options
 */
export function processAnswers(answers: Record<string, unknown>): Partial<SanityV2Options> {
  const selectedTransforms = (answers.selectedTransforms as string[]) || [];

  return {
    loaderApi: selectedTransforms.includes('loaderApi'),
    typeChanges: selectedTransforms.includes('typeChanges'),
    i18nMigration: selectedTransforms.includes('i18nMigration'),
    directoryKeys: selectedTransforms.includes('directoryKeys'),
    configMigration: selectedTransforms.includes('configMigration'),
    groqTransformation: selectedTransforms.includes('groqTransformation'),
    removeMapper: selectedTransforms.includes('removeMapper'),
    utilityMigration: selectedTransforms.includes('utilityMigration'),
    genericTypes: selectedTransforms.includes('genericTypes'),
    sysPropertyAccess: selectedTransforms.includes('sysPropertyAccess'),
    useInternationalizedArrays: answers.useInternationalizedArrays as boolean ?? true,
    fallbackToDefaultLocale: answers.fallbackToDefaultLocale as boolean ?? false
  };
}
