import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { camelCase } from './camelCase';

interface DefaultResolverParams {
  defaultValue?: string;
  mappings?: {
    [key: string]: string | number | null;
  };
  noCamelCase?: boolean;
}

export const defaultResolver =
  (field: string, params: DefaultResolverParams = {}) =>
  (ref: any, _args: any, ctx: ApolloContext) => {
    const item = getLocalizedField(ref?.fields, field, ctx);
    if (params.mappings?.[item] || params.mappings?.[item] === null) return params.mappings?.[item];
    if (item) return params.noCamelCase ? item : camelCase(item);
    if (params.defaultValue) return params.noCamelCase ? params.defaultValue : camelCase(params.defaultValue);
    return;
  };
