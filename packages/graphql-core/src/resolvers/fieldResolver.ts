import { Entry } from 'contentful';
import { ApolloContext, capitalizeFirst } from './createResolvers';
import { every, get, isArray } from 'lodash';
import { typeMappings } from '../typeMappings';
import MAPPERS from '../mappers';
import { GraphQLResolveInfo } from 'graphql';

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
  const { loaders } = ctx;
  // console.time(`FieldResolver:${displayType}->${field}`);
  let locale = 'en-US';
  if (info && info.variableValues && info.variableValues.locale) {
    locale = info.variableValues.locale;
  }
  if (args && args.locale) {
    locale = args.locale;
  }
  let fieldData = content.fields ? getLocalizedField(locale, content, field) : null;
  console.log(`FieldResolver:${displayType}->${field}:${JSON.stringify(fieldData, null, 2)}`, content);
  //IF what we have a reference field we might need to map it

  const typeName =
    content && content.sys && content.sys.contentType
      ? capitalizeFirst(typeMappings[content.sys.contentType.sys.id] ?? content.sys.contentType.sys.id)
      : displayType;
  // Check if we have a mapper for this DisplayType
  const mapper = MAPPERS[typeName] ? MAPPERS[typeName][displayType] : null;
  if (mapper && mapper[field] && typeof mapper[field] == 'function') {
    console.log(`FieldResolver:MAPPERFUNCTION:${typeName}->${displayType}:${field}=${mapper}`);
    fieldData = await mapper[field](content, args, ctx, info);
  } else if (mapper && mapper[field] && typeof mapper[field] == 'string') {
    // console.log(`FieldResolver:MAPPER:${typeName}->${displayType}:${field}=${mapper}`);
    fieldData = getLocalizedField(locale, content, mapper[field]);
  }

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
