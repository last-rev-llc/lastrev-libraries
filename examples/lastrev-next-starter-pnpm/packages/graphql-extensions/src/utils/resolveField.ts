import type { ApolloContext } from '../types';

import { isEmpty } from './isEmpty';
import { pruneEmpty } from './pruneEmpty';
import { getLocalizedFieldReference } from './getLocalizedFieldReference';

/*
 * @param { string | string[] | { [key: string]: string }} setting
 *
 *
 *
 * Simple
 *   items: resolveField('cards')
 * Nested Field
 *   items: resolveField('relatedItems.items')
 * Create object
 *   itemCollection: resolveField({
 *     title: 'collectionTitle',
 *     items: 'collectionItems',
 *   })
 * Create object with advanced resolution
 *   itemCollection: resolveField({
 *     title: 'collectionTitle',
 *     items: (root:any, args:any, ctx:ApolloContext) => [],
 *   })
 * Fallback
 *   items: resolveField(['cards', 'items', {...} ])
 *
 *
 *
 */

type Setting = string | Setting[] | { [key: string]: string } | ((root: any, arg: any, ctx: ApolloContext) => any);
export const resolveField =
  (setting: Setting): any =>
  async (root: any, args: any, ctx: ApolloContext) => {
    if (typeof setting === 'string') {
      // If the settings is a string, resolve to that field
      // If there are multiple segments, resolve each segment from the previous value
      const segments = setting.split('.');
      let parent = root;
      let value;
      for (const segment of segments) {
        if (parent?.fields) {
          value = await getLocalizedFieldReference(parent.fields, segment, ctx);
          parent = value;
        }
      }

      return value;
    } else if (Array.isArray(setting)) {
      // If the settings is an array, fallback resolution in order
      for (const field of setting) {
        const value = await resolveField(field)(root, args, ctx);
        if (value) {
          return value;
        }
      }
    } else if (typeof setting === 'object') {
      // If the setting is an object, resolve each key recursively
      const acc: any = {};

      await Promise.all(
        Object.keys(setting).map(async (key) => {
          acc[key] = await resolveField(setting[key])(root, args, ctx);
          return acc[key];
        })
      );

      if (!isEmpty(pruneEmpty(acc))) return acc;
    } else if (typeof setting === 'function') {
      // If the setting is a function, resolve the field by calling it as a resolver
      return setting(root, args, ctx);
    }
  };
