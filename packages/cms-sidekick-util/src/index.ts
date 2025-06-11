import { SidekickData, ContentData, ContentProps } from './types';
import startCase from './startCase';

const getSidekickInfo = (
  contentId?: string,
  fieldName?: string,
  contentTypeId?: string,
  displayText?: string
): SidekickData | null => {
  if (!contentId && !displayText) return null;

  const getDisplayVal = (): string => {
    if (displayText) return displayText;
    if (fieldName) return startCase(fieldName);
    if (contentTypeId) return startCase(contentTypeId);
    return 'Item';
  };

  const displayVal = getDisplayVal();

  return {
    ...(contentId && { 'data-csk-entry-id': contentId }),
    ...(fieldName && { 'data-csk-entry-field': fieldName }),
    ...(contentTypeId && { 'data-csk-entry-type': contentTypeId }),
    ...(displayVal && { 'data-csk-entry-display-text': displayVal })
  };
};

const getMergedSidekickInfo = (contentData: ContentData, displayText: string): SidekickData | null => {
  if (!contentData) {
    return getSidekickInfo(undefined, undefined, undefined, displayText);
  } else {
    const data: any = {
      ...contentData,
      ...(contentData as any)[displayText]
    };

    const fieldName = data.fieldName ?? displayText;
    return getSidekickInfo(data?.contentId, fieldName, data?.contentTypeId, startCase(displayText));
  }
};
function sidekick(contentData?: ContentData): SidekickData | null;

function sidekick(
  contentData?: string,
  fieldName?: string,
  contentTypeId?: string,
  displayText?: string
): SidekickData | null;

function sidekick(contentData?: ContentData, fieldName?: string): SidekickData | null;

function sidekick(
  contentData?: string | ContentData,
  fieldName?: string,
  contentTypeId?: string,
  displayText?: string
): SidekickData | null {
  if (typeof contentData === 'string') return getSidekickInfo(contentData, fieldName, contentTypeId, displayText);

  if (!contentData) return getSidekickInfo(undefined, fieldName, contentTypeId, displayText);

  if (contentData && fieldName) {
    return getMergedSidekickInfo(contentData, fieldName);
  }

  const { contentId: id, fieldName: name, contentTypeId: typeId, displayText: text } = contentData as ContentProps;

  return getSidekickInfo(id, name, typeId, text);
}

export default sidekick;
