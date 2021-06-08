import { ContentType } from 'contentful';
import get from 'lodash/get';

import { TypeMappings } from '../types';
import getLocalizedField from '../utils/getLocalizedField';
import capitalizeFirst from '../utils/capitalizeFirst';

const getContentResolvers = ({
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
        pathParams: async (content: any, args: any, ctx: any, info: any) => {
          const locale = get(info, ['infoVariables', 'locale'], get(args, 'locale', ctx.defaultLocale));
          const slug = getLocalizedField(locale, content.fields, 'slug', ctx.defaultLocale);
          return {
            params: {
              slug: slug.split('/')
            }
          };
        }
      }
    };
  }, {});
  return contentResolvers;
};

export default getContentResolvers;
