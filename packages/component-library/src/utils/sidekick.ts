import sidekickOriginal from 'packages/cms-sidekick-util/dist';

export default function sidekick({ contentId, fieldName, contentTypeId }: any = {}, displayText?: string) {
  return sidekickOriginal(contentId, fieldName, contentTypeId, displayText);
}
