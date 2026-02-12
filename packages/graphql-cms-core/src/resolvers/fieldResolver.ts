import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext, CmsEntry } from '@last-rev/types';
import getTypeName from '../utils/getTypeName';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import { TypeMapper } from '@last-rev/types';
import getLocalizedField from '../utils/getLocalizedField';
import { getRefInfo, getContentType, loadDocument, loadDocuments } from '../utils/contentUtils';
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

  const contentType = getContentType(content, ctx) || '';

  // Handle Sanity assets - align with __resolveType in createResolvers
  let typeName: string;
  if (
    ctx.cms === 'Sanity' &&
    (contentType === 'sanity.imageAsset' ||
      contentType === 'sanity.fileAsset' ||
      contentType === 'image' ||
      contentType === 'file')
  ) {
    typeName = 'Media';
  } else {
    typeName = contentType ? getTypeName(contentType, typeMappings) : displayType;
  }

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

  // Resolve single reference - uses CMS-aware loadDocument utility
  const refInfo = getRefInfo(fieldValue, ctx);
  if (refInfo.isReference && refInfo.id) {
    return loadDocument(ctx, refInfo.id, preview, refInfo.isAsset);
  }

  // Resolve array of references - uses CMS-aware loadDocuments utility
  if (Array.isArray(fieldValue) && fieldValue.length > 0) {
    const firstRefInfo = getRefInfo(fieldValue[0], ctx);
    if (firstRefInfo.isReference) {
      const ids = fieldValue
        .map((item) => getRefInfo(item, ctx))
        .filter((info) => info.isReference && info.id)
        .map((info) => ({ id: info.id!, preview }));

      return loadDocuments(ctx, ids, firstRefInfo.isAsset);
    }
  }

  // Handle Sanity slug fields - extract .current value
  if (ctx.cms === 'Sanity' && fieldValue?._type === 'slug' && fieldValue?.current !== undefined) {
    return fieldValue.current;
  }

  return fieldValue;
};

export default fieldResolver;
