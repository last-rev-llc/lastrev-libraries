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

/**
 * Extract field names from content type (handles both Contentful and Sanity)
 */
const getFieldNames = (contentType: any): string[] => {
  // Contentful: contentType.fields[].id
  if (contentType.fields && Array.isArray(contentType.fields) && contentType.fields[0]?.id) {
    return contentType.fields.map((x: any) => x.id);
  }
  // Sanity: contentType.fields[].name
  if (contentType.fields && Array.isArray(contentType.fields) && contentType.fields[0]?.name) {
    return contentType.fields.map((x: any) => x.name);
  }
  return [];
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
  contentTypes: any[],
  mappers: Mappers,
  typeMappings: TypeMappings,
  cms: 'Contentful' | 'Sanity'
): ContentTypeRepresentation[] => {
  return contentTypes.map((contentType) => {
    const typeName = getTypeName(contentType, typeMappings, cms);

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
      fields: uniq([...getFieldNames(contentType), ...additionalFields])
    };
  });
};

type MinimalConfig = {
  cms?: 'Contentful' | 'Sanity';
  extensions: { mappers: Mappers; typeMappings: TypeMappings };
  features?: { disableCoreSidekickLookup?: boolean };
};

const getContentResolvers = ({
  contentTypes,
  config
}: {
  contentTypes: any[];
  config: LastRevAppConfig | MinimalConfig;
}): { [typeName: string]: { [fieldName: string]: Function } } => {
  const cms = config.cms ?? 'Contentful';
  const features = config.features;
  const { mappers, typeMappings } = config.extensions;
  const contentTypeReps = collectContentTypes(contentTypes, mappers, typeMappings, cms);
  const virtualTypeReps = collectVirtualTypes(mappers, contentTypeReps);

  const idResolver = cms === 'Sanity' ? (content: any) => content?._id : (content: any) => content?.sys?.id;

  const contentResolvers = [...virtualTypeReps, ...contentTypeReps].reduce((acc, { typeName, fields }) => {
    return {
      ...acc,
      [typeName]: {
        id: idResolver,
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
