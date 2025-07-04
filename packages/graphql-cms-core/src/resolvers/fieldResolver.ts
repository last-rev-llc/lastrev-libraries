import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext, BaseAsset, BaseEntry } from '@last-rev/types';
import getTypeName from '../utils/getTypeName';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import { TypeMapper } from '@last-rev/types';
import getLocalizedField from '../utils/getLocalizedField';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'graphql-cms-core',
  module: 'fieldResolver'
});

export type Resolver<TSource, TContext> = (
  content: TSource,
  args: any,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<any>;

type FieldResolver = (displayType: string) => Resolver<BaseEntry | BaseAsset | any, ApolloContext>;

const fieldResolver: FieldResolver = (displayTypeArg: string) => async (content, args, ctx, info) => {
  const { fieldName: field } = info;
  const { loaders, mappers, typeMappings, preview = false, displayType: overrideDisplayType } = ctx;

  const displayType = overrideDisplayType || displayTypeArg;

  const contentType = content?.sys?.contentType?.sys?.id || content?.sys?.type || '';

  const typeName = contentType ? getTypeName(contentType, typeMappings) : displayType;

  const mapper = mappers?.[typeName]?.[displayType] as TypeMapper;

  let fieldValue: any;
  if (mapper && mapper[field]) {
    const fieldMapper = mapper[field];
    if (isFunction(fieldMapper)) {
      try {
        fieldValue = await fieldMapper(content, args, ctx, info);
      } catch (err: any) {
        const scopedLoggingPrefix = `[${typeName}][${displayType}][${field}]`;
        logger.error(`GQL Extension error: ${scopedLoggingPrefix} ${err.message}`, {
          caller: 'fieldResolver',
          stack: err.stack
        });
        throw err;
      }
    } else if (isString(fieldMapper)) {
      fieldValue = getLocalizedField(content.fields, fieldMapper as string, ctx);
    } else {
      logger.error(`Unsupported mapper type for ${typeName}.${displayType}: ${typeof fieldMapper}`, {
        caller: 'fieldResolver'
      });
      return null;
    }
  } else if (content.fields) {
    fieldValue = getLocalizedField(content.fields, field, ctx);
  } else if (content[field]) {
    fieldValue = content[field];
  }

  //Check if the field is a reference then resolve it
  if (fieldValue?.sys?.linkType == 'Entry') {
    return loaders.entryLoader.load({ id: fieldValue.sys.id, preview });
  }
  if (fieldValue?.sys?.linkType == 'Asset') {
    return loaders.assetLoader.load({ id: fieldValue.sys.id, preview });
  }

  // Expand links
  if (Array.isArray(fieldValue) && fieldValue.length > 0) {
    const firstItem = fieldValue[0];
    // contentful cannot have mixed arrays, so it is okay to make assumptions based on the first item
    if (firstItem?.sys?.linkType === 'Entry') {
      return (await loaders.entryLoader.loadMany(fieldValue.map((x) => ({ id: x.sys.id, preview })))).filter(
        (r) => r !== null
      );
    }
    if (firstItem?.sys?.linkType === 'Asset') {
      return (await loaders.assetLoader.loadMany(fieldValue.map((x) => ({ id: x.sys.id, preview })))).filter(
        (r) => r !== null
      );
    }
  }

  return fieldValue;
};
export default fieldResolver;
