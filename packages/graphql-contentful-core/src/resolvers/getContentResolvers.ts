import { sideKickLookupResolver } from './sideKickLookupResolver';
import { ContentType } from 'contentful';
import { typeMappings } from '../typeMappings';

import { capitalizeFirst, fieldsResolver } from './createResolvers';
import { Mappers } from 'types';

const getContentResolvers = ({ contentTypes, mappers }: { contentTypes: ContentType[]; mappers: Mappers }) => {
  const contentResolvers = contentTypes.reduce((acc, contentType) => {
    const typeName = capitalizeFirst(typeMappings[contentType.sys.id] ?? contentType.sys.id);
    return {
      ...acc,
      [typeName]: {
        id: (text: any) => text?.sys?.id,
        sidekickLookup: sideKickLookupResolver(typeName),
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
