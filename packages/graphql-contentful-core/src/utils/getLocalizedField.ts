import { Entry } from 'contentful';
import get from 'lodash/get';
import { ApolloContext } from '../types';

const getLocalizedField = <T>(fields: Entry<T>['fields'], field: string, ctx: ApolloContext) => {
  const noLocaleValue = get(fields, field);
  const defaultLocaleValue = get(fields, [field, ctx.defaultLocale]);
  const localeValue = get(fields, [field, ctx.locale ?? ctx.defaultLocale]);
  return localeValue ?? defaultLocaleValue ?? noLocaleValue;
};

export default getLocalizedField;
