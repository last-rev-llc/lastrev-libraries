import { sideKickLookupResolver } from './sideKickLookupResolver';
import { ContentType } from 'contentful';

import { fieldsResolver } from './createResolvers';
import { Mappers, TypeMappings } from '../types';
import capitalizeFirst from '../utils/capitalizeFirst';

const getContentResolvers = ({
  contentTypes,
  mappers,
  typeMappings
}: {
  contentTypes: ContentType[];
  mappers: Mappers;
  typeMappings: TypeMappings;
}) => {
  const contentResolvers = contentTypes.reduce((acc, contentType) => {
    const typeName = capitalizeFirst(typeMappings[contentType.sys.id] ?? contentType.sys.id);
    return {
      ...acc,
      [typeName]: {
        id: (text: any) => text?.sys?.id,
        sidekickLookup: sideKickLookupResolver(typeName, typeMappings),
        ...fieldsResolver(
          typeName,
          contentType.fields.map((x) => x.id),
          mappers
        )
      }
    };
  }, {});
  return contentResolvers;
};

export default getContentResolvers;
