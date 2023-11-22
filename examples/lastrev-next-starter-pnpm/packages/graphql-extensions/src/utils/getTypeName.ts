import type { ContentType } from 'contentful';
import { isString } from './isString';
import { capitalizeFirst } from './capitalizeFirst';

export const getTypeName = (contentType: ContentType | string): string | null => {
  const contentTypeId = isString(contentType) ? contentType : (contentType as ContentType)?.sys?.id;
  if (!contentTypeId) return null;
  return capitalizeFirst(String(contentTypeId));
};
