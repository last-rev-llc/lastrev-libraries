import { Entry } from 'contentful';
import every from 'lodash/every';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { GraphQLResolveInfo } from 'graphql';
import getFieldDataFetcher from '../utils/getFieldDataFetcher';
import { ApolloContext, TypeMappings } from '../types';
import capitalizeFirst from '../utils/capitalizeFirst';

export type Resolver<TSource, TContext> = (
  content: TSource,
  args: any,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<any>;

type FieldResolver = <T>(
  displayType: string,
  field: string,
  typeMappings: TypeMappings
) => Resolver<Entry<T>, ApolloContext>;

const fieldResolver: FieldResolver =
  (displayType: string, field: string, typeMappings: TypeMappings) => async (content, args, ctx, info) => {
    const { loaders, mappers } = ctx;
    // console.time(`FieldResolver:${displayType}->${field}`);
    const locale = get(info, ['infoVariables', 'locale'], get(args, 'locale', ctx.defaultLocale));

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
