import { Entry } from '@last-rev/types';
import { get } from 'lodash';

const getDefaultFieldValue = (item: Entry<any>, fieldName: string, defaultLocale: string): any | null =>
  get(item, ['fields', fieldName, defaultLocale], null);

export default getDefaultFieldValue;
