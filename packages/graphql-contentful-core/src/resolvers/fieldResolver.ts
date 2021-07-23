import { Entry } from 'contentful';
import isArray from 'lodash/isArray';
import { GraphQLResolveInfo } from 'graphql';
import getFieldDataFetcher from '../utils/getFieldDataFetcher';
import { ApolloContext } from '../types';
import capitalizeFirst from '../utils/capitalizeFirst';
import map from 'lodash/map';

export type Resolver<TSource, TContext> = (
  content: TSource,
  args: any,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<any>;

type FieldResolver = <T>(displayType: string) => Resolver<Entry<T>, ApolloContext>;

const fieldResolver: FieldResolver = (displayType: string) => async (content, args, ctx, info) => {
  const { fieldName: field } = info;
  const { loaders, mappers, typeMappings } = ctx;

  const contentType = capitalizeFirst(
    content && content.sys && content.sys.contentType && content.sys.contentType.sys
      ? content.sys.contentType.sys.id
      : ''
  );
  const typeName = contentType ? capitalizeFirst(typeMappings[contentType] ?? contentType) : displayType;

  const fieldDataFetcher = getFieldDataFetcher(typeName, displayType, field, mappers);

  let { fieldValue } = await fieldDataFetcher(content, args, ctx, info);

  //Check if the field is a reference then resolve it
  if (fieldValue && fieldValue.sys && fieldValue.sys.linkType == 'Entry') {
    return loaders.entryLoader.load(fieldValue.sys.id);
  }
  if (fieldValue && fieldValue.sys && fieldValue.sys.linkType == 'Asset') {
    return loaders.assetLoader.load(fieldValue.sys.id);
  }
  //Check if the field is an reference array then resolve all of them
  // if (isArray(fieldValue) && every(fieldValue, (x) => !!x.sys && !!x.sys.id && x.sys.linkType == 'Entry')) {
  //   return loaders.entryLoader.loadMany(fieldValue.map((x: any) => x.sys.id));
  // }
  // if (isArray(fieldValue) && every(fieldValue, (x) => !!x.sys && !!x.sys.id && x.sys.linkType == 'Asset')) {
  //   return loaders.assetLoader.loadMany(fieldValue.map((x: any) => x.sys.id));
  // }

  // Expand links
  if (isArray(fieldValue)) {
    fieldValue = map(fieldValue, (x) => {
      if (!!x.sys && !!x.sys.id && x.sys.linkType == 'Entry') return loaders.entryLoader.load(x.sys.id);
      return x;
    });
    fieldValue = map(fieldValue, (x) => {
      if (!!x.sys && !!x.sys.id && x.sys.linkType == 'Asset') return loaders.assetLoader.load(x.sys.id);
      return x;
    });
  }
  // console.log('ResolveField', { displayType, content, field, typeName, contentType, fieldValue });
  // console.timeEnd(`FieldResolver:${displayType}->${field}`);
  return fieldValue;
};
export default fieldResolver;
