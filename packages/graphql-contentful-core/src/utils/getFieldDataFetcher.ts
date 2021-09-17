import { Mappers, TypeMapper } from '@last-rev/types';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import getLocalizedField from './getLocalizedField';
import { Entry } from 'contentful';
import { GraphQLResolveInfo } from 'graphql';
import { isString } from 'lodash';

const getFieldDataFetcher = <T>(typeName: string, displayType: string, field: string, mappers?: Mappers) => {
  const mapper = get(mappers, [typeName, displayType], {}) as TypeMapper;

  return async (content: Entry<T>, args: any, ctx: any, info: GraphQLResolveInfo) => {
    if (mapper && mapper[field]) {
      const fieldMapper = mapper[field];
      if (isFunction(fieldMapper)) {
        const fieldData = await fieldMapper(content, args, ctx, info);
        if (!fieldData) return {};
        return { fieldValue: fieldData, fieldName: fieldData.__fieldName__ || field };
      } else if (isString(fieldMapper)) {
        return {
          fieldValue: getLocalizedField(content.fields, fieldMapper as string, ctx),
          fieldName: mapper[field]
        };
      }
      // other types not allowed
      throw Error(`Unsupported mapper type for ${typeName}.${displayType}: ${typeof fieldMapper}`);
    }
    if (content.fields) {
      return { fieldValue: getLocalizedField(content.fields, field, ctx), fieldName: field };
    }
    return {};
  };
};

export default getFieldDataFetcher;
