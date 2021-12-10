import { ApolloContext } from '@last-rev/types';
import { Entry } from 'contentful';
import get from 'lodash/get';
import isString from 'lodash/isString';

const getDefaultFieldValue = (
  item: Entry<any>,
  fieldName: string,
  contextOrLocale: ApolloContext | string
): any | null => {
  const defaultLocale = isString(contextOrLocale) ? contextOrLocale : contextOrLocale.defaultLocale;
  get(item, ['fields', fieldName, defaultLocale], null);
};

export default getDefaultFieldValue;
