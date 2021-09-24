import get from 'lodash/get';

import { TypeMappings } from '@last-rev/types';
// import getFieldDataFetcher from '../utils/getFieldDataFetcher';
import capitalizeFirst from '../utils/capitalizeFirst';

export const sideKickLookupResolver =
  (displayType: string, typeMappings: TypeMappings) => async (content: any, args: any, ctx: any, info: any) => {
    const { mappers } = ctx;
    const typeName = capitalizeFirst(
      typeMappings[content?.sys?.contentType?.sys?.id] ?? content?.sys?.contentType?.sys?.id
    );
    const lookup: { [key: string]: any } = {};

    if (content.sys && content.sys.contentType) {
      if (mappers[typeName] && mappers[typeName][displayType]) {
        await Promise.all(
          Object.keys(mappers[typeName][displayType])?.map(async (field: string) => {
            const mapper = mappers[typeName][displayType][field];

            if (typeof mapper === 'function') {
              // TODO: Implement fieldName lookup for function mappers
              //   const fieldDataFetcher = getFieldDataFetcher(typeName, displayType, field, mappers);
              // const { fieldName } = await fieldDataFetcher(content, args, ctx, info);
              // lookup[field] = {
              //   contentId: content.sys.id,
              //   contentTypeId: get(content, 'sys.contentType.sys.id'),
              //   fieldName
              // };
            }
            if (typeof mapper === 'string') {
              lookup[field] = {
                contentId: content.sys.id,
                contentTypeId: get(content, 'sys.contentType.sys.id'),
                fieldName: mapper
              };
            }
          })
        );
      } else {
        Object.keys(get(content, 'fields', {})).forEach((field: string) => {
          lookup[field] = {
            contentId: content.sys.id,
            contentTypeId: get(content, 'sys.contentType.sys.id'),
            fieldName: field
          };
        });
      }
      return {
        ...lookup,
        contentId: content?.sys?.id,
        contentTypeId: content?.sys?.contentType?.sys?.id
      };
    }
    return {
      contentId: content?.sys?.id,
      contentTypeId: content?.sys?.contentType?.sys?.id
    };
  };
