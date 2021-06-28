import { Entry } from 'contentful';
import get from 'lodash/get';
import { ApolloContext } from '../types';

const getLocalizedField = <T>(fields: Entry<T>['fields'], field: string, ctx: ApolloContext) => {
  return get(fields, `${field}['${ctx.locale}']`, get(fields, [field, ctx.defaultLocale]));
};

export default getLocalizedField;
