import get from 'lodash/get';
import { ApolloContext } from '@last-rev/types';

const getLocalizedField = (fields: any, field: string, ctx: ApolloContext) => {
  const defaultLocaleValue = get(fields, [field, ctx.defaultLocale]); // undefined
  const localeValue = get(fields, [field, ctx.locale ?? ctx.defaultLocale]); // "value""
  if (typeof localeValue !== 'undefined') return localeValue;
  if (typeof defaultLocaleValue !== 'undefined') return defaultLocaleValue;

  return null;
};

export default getLocalizedField;
