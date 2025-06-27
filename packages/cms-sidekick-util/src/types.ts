export type SidekickData = {
  'data-csk-entry-id'?: string;
  'data-csk-entry-field'?: string;
  'data-csk-entry-type'?: string;
  'data-csk-entry-display-text'?: string;
};

export type ContentProps = {
  contentId?: string;
  fieldName?: string;
  contentTypeId?: string;
  displayText?: string;
};

export type ContentData =
  | ContentProps
  | {
      [key: string]: ContentProps;
    };

export interface SidekickProps {
  contentData?: string | ContentData;
  fieldName?: string;
  contentTypeId?: string;
  displayText?: string;
}
