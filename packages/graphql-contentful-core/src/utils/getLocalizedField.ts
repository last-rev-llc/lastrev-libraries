import { Entry } from 'contentful';
import get from 'lodash/get';
import has from 'lodash/has';
import { ApolloContext } from '@last-rev/types';

const getLocalizedField = <T>(fieldsOrItem: Entry<T> | Entry<T>['fields'], field: string, ctx: ApolloContext): any => {
  const fields =
    has(fieldsOrItem, 'fields') && has(fieldsOrItem, 'sys') ? (fieldsOrItem as Entry<T>).fields : fieldsOrItem;
  const defaultLocaleValue = get(fields, [field, ctx.defaultLocale]); // undefined
  const localeValue = get(fields, [field, ctx.locale ?? ctx.defaultLocale]); // "value""
  if (typeof localeValue !== 'undefined') return localeValue;
  if (typeof defaultLocaleValue !== 'undefined') return defaultLocaleValue;

  return null;
};

export default getLocalizedField;
