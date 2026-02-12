import { TypeMappings, ContentType, SchemaType } from '@last-rev/types';
import isString from 'lodash/isString';
import capitalizeFirst from './capitalizeFirst';

type CmsType = 'Contentful' | 'Sanity';

/**
 * Get the type name from a content type definition.
 */
const getTypeName = (
  contentType: ContentType | SchemaType | string,
  typeMappings: TypeMappings,
  cms: CmsType = 'Contentful'
): string => {
  let contentTypeId: string;

  if (isString(contentType)) {
    contentTypeId = contentType;
  } else if (cms === 'Sanity') {
    contentTypeId = (contentType as SchemaType).name;
  } else {
    contentTypeId = (contentType as ContentType).sys.id;
  }

  return capitalizeFirst(typeMappings[contentTypeId] ?? contentTypeId);
};

export default getTypeName;
