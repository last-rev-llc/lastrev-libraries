import { Mappers, TypeMapper } from '../types';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import getLocalizedField from './getLocalizedField';
import { Entry } from 'contentful';
import { GraphQLResolveInfo } from 'graphql';
import { isString } from 'lodash';

const getFieldDataFetcher = <T>(typeName: string, displayType: string, field: string, mappers?: Mappers) => {
  const mapper = get(mappers, `['${typeName}']['${displayType}']`, null) as TypeMapper | null;

  return async (content: Entry<T>, args: any, ctx: any, info: GraphQLResolveInfo, locale: string) => {
    if (mapper && mapper[field]) {
      const fieldMapper = mapper[field];
      if (isFunction(fieldMapper)) {
        const fieldData = await fieldMapper(content, args, ctx, info);
        console.log('this is here:', field, fieldData, fieldData.__fieldName__);
        return { fieldValue: fieldData, fieldName: fieldData.__fieldName__ || field };
      } else if (isString(fieldMapper)) {
        return {
          fieldValue: getLocalizedField(locale, content.fields, fieldMapper as string, ctx.defaultLocale),
          fieldName: mapper[field]
        };
      }
      // other types not allowed
      throw Error(`Unsupported mapper type for ${typeName}.${displayType}: ${typeof fieldMapper}`);
    }
    if (content.fields) {
      return { fieldValue: getLocalizedField(locale, content.fields, field, ctx.defaultLocale), fieldName: field };
    }
    return {};
  };
};

export default getFieldDataFetcher;
