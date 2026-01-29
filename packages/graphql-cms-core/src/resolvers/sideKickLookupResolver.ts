import { TypeMappings, ApolloContext } from '@last-rev/types';
import getTypeName from '../utils/getTypeName';
import { getContentId, getContentType } from '../utils/contentUtils';

type SideKickLookup = {
  contentId: string;
  contentTypeId: string;
  [fieldName: string]: string;
};

const emptyLookup: SideKickLookup = {
  contentId: '',
  contentTypeId: ''
};

// Sanity system fields to exclude when iterating content fields
const SANITY_SYSTEM_FIELDS = new Set([
  '_id',
  '_type',
  '_rev',
  '_createdAt',
  '_updatedAt',
  '_key'
]);

/**
 * Get field names from a content entry.
 * Contentful: fields are in content.fields object
 * Sanity: fields are directly on the document (excluding system fields)
 */
const getFieldNames = (content: any, ctx: ApolloContext): string[] => {
  if (ctx.cms === 'Sanity') {
    return Object.keys(content || {}).filter((key) => !SANITY_SYSTEM_FIELDS.has(key));
  }
  return Object.keys(content?.fields || {});
};

export const sideKickLookupResolver =
  (displayType: string, typeMappings: TypeMappings) =>
  async (content: any, _args: any, ctx: ApolloContext, _info: any): Promise<SideKickLookup> => {
    const contentTypeId = getContentType(content, ctx);
    const contentId = getContentId(content, ctx);

    if (!contentTypeId) {
      // not a real content item. return null
      return emptyLookup;
    }

    const { mappers } = ctx;
    const typeName = getTypeName(contentTypeId, typeMappings, ctx.cms);
    let lookup: { [key: string]: any } = {};

    const fieldNames = getFieldNames(content, ctx);
    lookup = fieldNames.reduce((accum, field) => {
      accum[field] = {
        contentId,
        contentTypeId,
        fieldName: field
      };

      return accum;
    }, {} as { [key: string]: any });

    if (mappers[typeName] && mappers[typeName][displayType]) {
      // TODO: figure out which fields are being queried for in the query, and map those, even if not in mappers
      lookup = {
        ...lookup,
        ...Object.keys(mappers[typeName][displayType])?.reduce((accum, field) => {
          const mapper = mappers[typeName][displayType][field];

          if (typeof mapper === 'function') {
            // TODO: Implement fieldName lookup for function mappers
          }

          if (typeof mapper === 'string') {
            accum[field] = {
              contentId,
              contentTypeId,
              fieldName: mapper
            };
          }
          return accum;
        }, {} as { [key: string]: any })
      };
    }
    return {
      ...lookup,
      contentId: contentId || '',
      contentTypeId: contentTypeId || ''
    };
  };
