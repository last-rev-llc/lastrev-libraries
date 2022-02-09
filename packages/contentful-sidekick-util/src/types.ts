export type SidekickData = {
  'data-csk-entry-id'?: string;
  'data-csk-entry-field'?: string;
  'data-csk-entry-type'?: string;
  'data-csk-entry-display-text'?: string;
};

export type ContentData = {
  contentId?: string,
  fieldName?: string,
  contentTypeId?: string,
  displayText?: string
};

export interface SidekickProps {
  contentData?: string | ContentData,
  fieldName?: string,
  contentTypeId?: string,
  displayText?: string
}
