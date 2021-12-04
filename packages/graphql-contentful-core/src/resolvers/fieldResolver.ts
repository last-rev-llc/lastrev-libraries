import { Entry } from 'contentful';
import isArray from 'lodash/isArray';
import { GraphQLResolveInfo } from 'graphql';
import getFieldDataFetcher from '../utils/getFieldDataFetcher';
import { ApolloContext } from '@last-rev/types';
import capitalizeFirst from '../utils/capitalizeFirst';
import map from 'lodash/map';
import filter from 'lodash/filter';
import isNull from 'lodash/isNull';
import negate from 'lodash/negate';

export type Resolver<TSource, TContext> = (
  content: TSource,
  args: any,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<any>;

type FieldResolver = <T>(displayType: string) => Resolver<Entry<T>, ApolloContext>;

const fieldResolver: FieldResolver = (displayType: string) => async (content, args, ctx, info) => {
  const { fieldName: field } = info;
  const { loaders, mappers, typeMappings, preview = false } = ctx;

  const contentType =
    content && content.sys && content.sys.contentType && content.sys.contentType.sys
      ? content.sys.contentType.sys.id
      : '';
  // console.log('resolving field', {
  //   content,
  //   displayType,
  //   field,
  //   sys: content?.sys,
  //   contentType,
  //   typeMapping: typeMappings[contentType]
  // });
  const typeName = contentType ? capitalizeFirst(typeMappings[contentType] ?? contentType) : displayType;

  const fieldDataFetcher = getFieldDataFetcher(typeName, displayType, field, mappers);

  let { fieldValue } = await fieldDataFetcher(content, args, ctx, info);

  // console.log('fieldValue', fieldValue);

  //Check if the field is a reference then resolve it
  if (fieldValue && fieldValue.sys && fieldValue.sys.linkType == 'Entry') {
    return loaders.entryLoader.load({ id: fieldValue.sys.id, preview });
  }
  if (fieldValue && fieldValue.sys && fieldValue.sys.linkType == 'Asset') {
    return loaders.assetLoader.load({ id: fieldValue.sys.id, preview });
  }

  // Expand links
  if (isArray(fieldValue) && fieldValue.length > 0) {
    const firstItem = fieldValue[0];
    // contentful cannot have mixed arrays, so it is okay to make assumptions based on the first item
    if (firstItem?.sys?.linkType === 'Entry') {
      return filter(
        await loaders.entryLoader.loadMany(map(fieldValue, (x) => ({ id: x.sys.id, preview }))),
        negate(isNull)
      );
    }
    if (firstItem?.sys?.linkType === 'Asset') {
      return filter(
        await loaders.assetLoader.loadMany(map(fieldValue, (x) => ({ id: x.sys.id, preview }))),
        negate(isNull)
      );
    }
  }
  // console.log('ResolveField', { displayType, content, field, typeName, contentType, fieldValue });
  // console.timeEnd(`FieldResolver:${displayType}->${field}`);
  return fieldValue;
};
export default fieldResolver;
