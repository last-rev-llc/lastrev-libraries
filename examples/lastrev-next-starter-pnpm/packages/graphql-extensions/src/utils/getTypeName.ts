import type { ContentType } from 'contentful';
import { isString } from './isString';

const capitalizeFirst = (str: string): string => str?.charAt(0)?.toUpperCase() + str?.slice(1);

export const getTypeName = (contentType: ContentType | string): string => {
  const contentTypeId = isString(contentType) ? contentType : (contentType as ContentType)?.sys?.id;

  return capitalizeFirst(String(contentTypeId));
};
