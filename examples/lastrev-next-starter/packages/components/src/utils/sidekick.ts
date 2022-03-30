import sidekickOriginal from '@last-rev/contentful-sidekick-util';

export default function sidekick({ contentId, fieldName, contentTypeId }: any = {}, displayText?: string) {
  return sidekickOriginal(contentId, fieldName, contentTypeId, displayText);
}
