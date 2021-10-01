import { Entry } from 'contentful';
import get from 'lodash/get';
import { ApolloContext } from '@last-rev/types';

const getLocalizedField = <T>(fields: Entry<T>['fields'], field: string, ctx: ApolloContext) => {
  const noLocaleValue = get(fields, field);
  const defaultLocaleValue = get(fields, [field, ctx.defaultLocale]);
  const localeValue = get(fields, [field, ctx.locale ?? ctx.defaultLocale]);
  if (localeValue || defaultLocaleValue) return localeValue ?? defaultLocaleValue;
  if (noLocaleValue && !noLocaleValue[ctx.defaultLocale]) {
    return noLocaleValue;
  }
  return null;
};

export default getLocalizedField;
