import sidekickOriginal from '@last-rev/contentful-sidekick-util';

export const sidekick = ({ contentId, fieldName, contentTypeId }: any = {}, displayText?: string) => {
  return sidekickOriginal(contentId, fieldName, contentTypeId, displayText);
};
