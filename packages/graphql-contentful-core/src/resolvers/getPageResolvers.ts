import { ContentType } from 'contentful';

import { TypeMappings } from '../types';
import getLocalizedField from '../utils/getLocalizedField';
import capitalizeFirst from '../utils/capitalizeFirst';

const getPageResolvers = ({
  contentTypes,
  typeMappings
}: {
  contentTypes: ContentType[];
  typeMappings: TypeMappings;
}) => {
  const contentResolvers = contentTypes.reduce((acc, contentType) => {
    const typeName = capitalizeFirst(typeMappings[contentType.sys.id] ?? contentType.sys.id);
    return {
      ...acc,
      [typeName]: {
        pathParams: async (content: any, _args: any, ctx: any, _info: any) => {
          const slug = getLocalizedField(content.fields, 'slug', ctx);
          return {
            params: {
              slug: slug.split('/')
            },
            __fieldName__: slug
          };
        }
      }
    };
  }, {});
  return contentResolvers;
};

export default getPageResolvers;
