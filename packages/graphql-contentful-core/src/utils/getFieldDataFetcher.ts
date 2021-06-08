import { Mappers, TypeMapper } from '../types';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import getLocalizedField from './getLocalizedField';
import { Entry } from 'contentful';
import { GraphQLResolveInfo } from 'graphql';

const getFieldDataFetcher = <T>(typeName: string, displayType: string, field: string, mappers?: Mappers) => {
  const mapper = get(mappers, `['${typeName}']['${displayType}']`, null) as TypeMapper | null;

  return async (content: Entry<T>, args: any, ctx: any, info: GraphQLResolveInfo, locale: string) => {
    if (mapper && mapper[field]) {
      const fieldMapper = mapper[field];
      if (isFunction(fieldMapper)) {
        return await fieldMapper(content, args, ctx, info);
      }
      return getLocalizedField(locale, content.fields, fieldMapper as string, ctx.defaultLocale);
    }
    return content.fields ? getLocalizedField(locale, content.fields, field, ctx.defaultLocale) : null;
  };
};

export default getFieldDataFetcher;
