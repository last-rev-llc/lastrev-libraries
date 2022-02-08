import { SidekickData } from './types';
import startCase from './startCase';

export default (
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
