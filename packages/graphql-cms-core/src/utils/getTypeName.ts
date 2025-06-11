import { TypeMappings, ContentType } from '@last-rev/types';
import isString from 'lodash/isString';
import capitalizeFirst from './capitalizeFirst';

const getTypeName = (contentType: ContentType | string, typeMappings: TypeMappings): string => {
  const contentTypeId = isString(contentType) ? contentType : contentType.sys.id;

  return capitalizeFirst(typeMappings[contentTypeId] ?? contentTypeId);
};

export default getTypeName;
