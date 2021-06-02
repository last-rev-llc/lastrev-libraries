import { Entry } from 'contentful';
import { ApolloContext, capitalizeFirst } from './createResolvers';
import { every, get, isArray } from 'lodash';
import { typeMappings } from '../typeMappings';
import { GraphQLResolveInfo } from 'graphql';
import getFieldDataFetcher from './getFieldDataFetcher';

export const getLocalizedField = (locale: string, { fields }: any, field: string) => {
  // console.log('GetLocalizedField', { locale, fields, field });
  if (fields && fields[field]) {
    if (fields[field][locale]) {
      return get(fields, `${field}.${locale}`);
    }
    if (Object.keys(fields[field]).includes('en-US')) return get(fields, [field, 'en-US']);
    return fields[field];
  }
};

export type Resolver<TSource, TContext> = (
  content: TSource,
  args: any,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<any>;

type FieldResolver = <T>(display: string, field: string) => Resolver<Entry<T>, ApolloContext>;

const fieldResolver: FieldResolver = (displayType: string, field: string) => async (content, args, ctx, info) => {
  const { loaders, mappers } = ctx;
  // console.time(`FieldResolver:${displayType}->${field}`);
  let locale = 'en-US';
  if (info && info.variableValues && info.variableValues.locale) {
    locale = info.variableValues.locale;
  }
  if (args && args.locale) {
    locale = args.locale;
  }

  const typeName =
    content && content.sys && content.sys.contentType
      ? capitalizeFirst(typeMappings[content.sys.contentType.sys.id] ?? content.sys.contentType.sys.id)
      : displayType;

  const fieldDataFetcher = getFieldDataFetcher(typeName, displayType, field, mappers);

  const fieldData = await fieldDataFetcher(content, args, ctx, info, locale);

  //Check if the field is a reference then resolve it
  if (fieldData && fieldData.sys && fieldData.sys.linkType == 'Entry') {
    return loaders.entries.load(fieldData.sys.id);
  }
  if (fieldData && fieldData.sys && fieldData.sys.linkType == 'Asset') {
    return loaders.assets.load(fieldData.sys.id);
  }
  //Check if the field is an reference array then resolve all of them
  if (isArray(fieldData) && every(fieldData, (x) => !!x.sys.id)) {
    return loaders.entries.loadMany(fieldData.map((x: any) => x.sys.id));
  }
  // console.timeEnd(`FieldResolver:${displayType}->${field}`);
  return fieldData;
};
export default fieldResolver;
