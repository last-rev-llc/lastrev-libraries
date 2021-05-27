import { sideKickLookupResolver } from './sideKickLookupResolver';
import { ContentType } from 'contentful';
import { typeMappings } from '../typeMappings';

import { capitalizeFirst, fieldsResolver } from './createResolvers';

const getContentResolvers = ({ contentTypes }: { contentTypes: ContentType[] }) => {
  const contentResolvers = contentTypes.reduce((acc, contentType) => {
    const typeName = capitalizeFirst(typeMappings[contentType.sys.id] ?? contentType.sys.id);
    return {
      ...acc,
      [typeName]: {
        id: (text: any) => text?.sys?.id,
        sidekickLookup: sideKickLookupResolver(typeName),
        ...fieldsResolver(
          typeName,
          contentType.fields.map((x) => x.id)
        )
      }
    };
  }, {});
  return contentResolvers;
};

export default getContentResolvers;
