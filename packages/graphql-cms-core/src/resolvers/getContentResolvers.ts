import { ContentType } from '@last-rev/types';
import fieldsResolver from './fieldsResolver';
import { Mappers, TypeMappings } from '@last-rev/types';
import getTypeName from '../utils/getTypeName';
import uniq from 'lodash/uniq';
import LastRevAppConfig from '@last-rev/app-config';
import { sideKickLookupResolver } from './sideKickLookupResolver';

type ContentTypeRepresentation = {
  typeName: string;
  fields: string[];
};

const collectVirtualTypes = (
  mappers: Mappers,
  existingTypes: ContentTypeRepresentation[]
): ContentTypeRepresentation[] => {
  const reduced = Object.keys(mappers).reduce((accum, mapperKey) => {
    const mapper = mappers[mapperKey];
    Object.keys(mapper).forEach((displayType) => {
      const mapperVal = mapper[displayType];
      if (existingTypes.find((t) => t.typeName === displayType)) {
        return;
      }
      Object.keys(mapperVal).forEach((key) => {
        if (!accum[displayType]) {
          accum[displayType] = [];
        }
        accum[displayType] = uniq([...accum[displayType], key]);
      });
    });
    return accum;
  }, {} as { [displayType: string]: string[] });

  return Object.keys(reduced).map((key) => ({
    typeName: key,
    fields: reduced[key]
  }));
};

const collectContentTypes = (
  contentTypes: ContentType[],
  mappers: Mappers,
  typeMappings: TypeMappings
): ContentTypeRepresentation[] => {
  return contentTypes.map((contentType) => {
    const typeName = getTypeName(contentType, typeMappings);

    // if there are any virtual fields when contentType === displayType, collect those here.
    const additionalFields = Object.keys(mappers).reduce((accum, mapperKey) => {
      const mapper = mappers[mapperKey];
      const curMapper = mapper[typeName];
      if (!curMapper) return accum;

      accum.push(...Object.keys(curMapper));

      return accum;
    }, [] as string[]);

    return {
      typeName,
      fields: uniq([...contentType.fields.map((x) => x.id), ...additionalFields])
    };
  });
};

const getContentResolvers = ({
  contentTypes,

  config
}: {
  contentTypes: ContentType[];
  config: LastRevAppConfig | { extensions: { mappers: Mappers; typeMappings: TypeMappings }; features?: any };
}): { [typeName: string]: { [fieldName: string]: Function } } => {
  const {
    features,
    extensions: { mappers, typeMappings }
  } = config;
  const contentTypeReps = collectContentTypes(contentTypes, mappers, typeMappings);
  const virtualTypeReps = collectVirtualTypes(mappers, contentTypeReps);

  const contentResolvers = [...virtualTypeReps, ...contentTypeReps].reduce((acc, { typeName, fields }) => {
    return {
      ...acc,
      [typeName]: {
        id: (content: any) => content?.sys?.id,
        ...(features?.disableCoreSidekickLookup
          ? {}
          : {
              sidekickLookup: sideKickLookupResolver(typeName, typeMappings)
            }),
        ...fieldsResolver(typeName, fields)
      }
    };
  }, {});

  return contentResolvers;
};

export default getContentResolvers;
