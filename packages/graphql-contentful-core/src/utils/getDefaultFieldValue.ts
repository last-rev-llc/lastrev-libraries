import { CmsEntry } from '@last-rev/types';
import { get } from 'lodash';

const getDefaultFieldValue = (item: CmsEntry<any>, fieldName: string, defaultLocale: string): any | null =>
  get(item, ['fields', fieldName, defaultLocale], null);

export default getDefaultFieldValue;
