import { TypeMappings } from '@last-rev/types';
import { ContentType } from 'contentful';
import isString from 'lodash/isString';
import capitalizeFirst from './capitalizeFirst';

const getTypeName = (contentType: ContentType | string, typeMappings: TypeMappings): string => {
  let contentTypeId = isString(contentType) ? contentType : contentType.sys.id;

  // Sanity migrations may prefix types with "Contentful_". Normalize these back
  // to the original name so that existing code expecting the Contentful styled
  // names continues to work.
  if (/^Contentful_/i.test(contentTypeId)) {
    contentTypeId = contentTypeId.replace(/^Contentful_/i, '');
  }

  return capitalizeFirst(typeMappings[contentTypeId] ?? contentTypeId);
};

export default getTypeName;
