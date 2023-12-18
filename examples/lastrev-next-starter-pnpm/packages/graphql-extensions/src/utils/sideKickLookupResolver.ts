import { getTypeName } from './getTypeName';

type SideKickLookup = {
  contentId: string;
  contentTypeId: string;
  [fieldName: string]: string;
};

const emptyLookup: SideKickLookup = {
  contentId: '',
  contentTypeId: ''
};

export const sideKickLookupResolver = async (
  content: any,
  _args: any,
  ctx: any,
  info: any
): Promise<SideKickLookup> => {
  const contentTypeId = content?.sys?.contentType?.sys?.id;
  const displayType = content?.displayType || info?.parentType || contentTypeId;
  if (!contentTypeId) {
    // not a real content item. return null
    return emptyLookup;
  }

  const { mappers } = ctx;
  const typeName = getTypeName(content?.sys?.contentType);
  let lookup: { [key: string]: any } = {};

  // lookup = Object.keys(content?.fields || {}).reduce((accum, field) => {
  //   accum[field] = {
  //     contentId: content.sys.id,
  //     contentTypeId: content?.sys?.contentType?.sys?.id,
  //     fieldName: field
  //   };

  //   return accum;
  // }, {} as { [key: string]: any });

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
            // contentId: content.sys.id,
            // contentTypeId: content?.sys?.contentType?.sys?.id,
            fieldName: mapper
          };
        }
        return accum;
      }, {} as { [key: string]: any })
    };
  }
  return {
    ...lookup,
    contentId: content?.sys?.id,
    contentTypeId: content?.sys?.contentType?.sys?.id
  };
};
