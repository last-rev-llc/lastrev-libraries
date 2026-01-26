import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext, CmsEntry } from '@last-rev/types';
import getTypeName from '../utils/getTypeName';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import { TypeMapper } from '@last-rev/types';
import getLocalizedField from '../utils/getLocalizedField';
import { getRefInfo, getContentType, getLoaders } from '../utils/contentUtils';
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

type FieldResolver = (displayType: string) => Resolver<CmsEntry | any, ApolloContext>;

const fieldResolver: FieldResolver = (displayTypeArg: string) => async (content, args, ctx, info) => {
  const { fieldName: field } = info;
  const { mappers, typeMappings, preview = false, displayType: overrideDisplayType } = ctx;

  const displayType = overrideDisplayType || displayTypeArg;

  // Utilities read ctx.cms internally - no cms variable needed
  const loaders = getLoaders(ctx);
  const contentType = getContentType(content, ctx) || '';
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
      // String mapper: use as alternate field name
      fieldValue = getLocalizedField(content, fieldMapper as string, ctx);
    } else {
      logger.error(`Unsupported mapper type for ${typeName}.${displayType}: ${typeof fieldMapper}`, {
        caller: 'fieldResolver'
      });
      return null;
    }
  } else {
    // Default field access - utility handles CMS differences
    fieldValue = getLocalizedField(content, field, ctx);
  }

  // Resolve single reference
  const refInfo = getRefInfo(fieldValue, ctx);
  if (refInfo.isReference && refInfo.id) {
    if (refInfo.isAsset) {
      return loaders.assetLoader.load({ id: refInfo.id, preview });
    }
    return loaders.entryLoader.load({ id: refInfo.id, preview });
  }

  // Resolve array of references
  if (Array.isArray(fieldValue) && fieldValue.length > 0) {
    const firstRefInfo = getRefInfo(fieldValue[0], ctx);
    if (firstRefInfo.isReference) {
      const ids = fieldValue
        .map((item) => getRefInfo(item, ctx))
        .filter((info) => info.isReference && info.id)
        .map((info) => ({ id: info.id!, preview }));

      if (firstRefInfo.isAsset) {
        return (await loaders.assetLoader.loadMany(ids)).filter((r) => r !== null);
      }
      return (await loaders.entryLoader.loadMany(ids)).filter((r) => r !== null);
    }
  }

  return fieldValue;
};

export default fieldResolver;
