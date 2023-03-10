import { Entry, Asset } from 'contentful-management';

export const getStatus = (item: Entry | Asset) => {
  if (!item.sys.publishedVersion) {
    return 'draft';
  }
  if (item.sys.publishedVersion + 1 === item.sys.version) {
    return 'published';
  }
  return 'changed';
};
