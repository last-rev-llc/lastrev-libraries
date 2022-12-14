import { ContentType } from 'contentful';
import isString from 'lodash/isString';

const capitalizeFirst = (str: string): string => str?.charAt(0)?.toUpperCase() + str?.slice(1);

const getTypeName = (contentType: ContentType | string): string => {
  const contentTypeId = isString(contentType) ? contentType : contentType.sys.id;

  return capitalizeFirst(contentTypeId);
};

export default getTypeName;
