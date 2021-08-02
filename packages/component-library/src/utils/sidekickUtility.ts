import sidekick from '@last-rev/contentful-sidekick-util';

export default function sidekickUtility({ sys, _id, _contentTypeId, id, contentTypeId, __typename }) {
  return {
    sidekick,
    sidekicker: (displayText, fieldId, fieldContentTypeId) =>
      sidekick(
        fieldId || sys?.id || _id || id,
        null,
        fieldContentTypeId || __typename || _contentTypeId || contentTypeId,
        displayText
      )
  };
}
