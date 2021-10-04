import { Entry } from 'contentful';
import get from 'lodash/get';
import { ApolloContext } from '@last-rev/types';

const getLocalizedField = <T>(fields: Entry<T>['fields'], field: string, ctx: ApolloContext) => {
  const noLocaleValue = get(fields, field); // {en-US: 0}
  const defaultLocaleValue = get(fields, [field, ctx.defaultLocale]); // 0
  const localeValue = get(fields, [field, ctx.locale ?? ctx.defaultLocale]); // 0
  if (typeof localeValue !== 'undefined') return localeValue;
  if (typeof defaultLocaleValue !== 'undefined') return defaultLocaleValue;

  if (noLocaleValue && typeof noLocaleValue[ctx.defaultLocale] === 'undefined') {
    return noLocaleValue;
  }
  return null;
};

export default getLocalizedField;
