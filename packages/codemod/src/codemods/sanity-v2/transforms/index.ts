export { default as loaderApiTransform } from './loaderApi';
export { default as typeChangesTransform } from './typeChanges';
export { default as directoryKeysTransform } from './directoryKeys';
export { default as removeMapperTransform } from './removeMapper';
export { default as i18nMigrationTransform } from './i18nMigration';
export { default as configMigrationTransform } from './configMigration';
export { default as utilityMigrationTransform } from './utilityMigration';
export { default as genericTypesTransform } from './genericTypes';

import loaderApiTransform from './loaderApi';
import typeChangesTransform from './typeChanges';
import directoryKeysTransform from './directoryKeys';
import removeMapperTransform from './removeMapper';
import i18nMigrationTransform from './i18nMigration';
import configMigrationTransform from './configMigration';
import utilityMigrationTransform from './utilityMigration';
import genericTypesTransform from './genericTypes';
import type { Transform } from '../../../types';

/**
 * All available transforms
 */
export const transforms: Record<string, Transform> = {
  loaderApi: loaderApiTransform,
  typeChanges: typeChangesTransform,
  directoryKeys: directoryKeysTransform,
  removeMapper: removeMapperTransform,
  i18nMigration: i18nMigrationTransform,
  configMigration: configMigrationTransform,
  utilityMigration: utilityMigrationTransform,
  genericTypes: genericTypesTransform
};

/**
 * Get transform by name
 */
export function getTransform(name: string): Transform | undefined {
  return transforms[name];
}

/**
 * Get all transform names
 */
export function getTransformNames(): string[] {
  return Object.keys(transforms);
}
