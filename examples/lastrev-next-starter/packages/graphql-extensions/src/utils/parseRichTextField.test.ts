import parseRichTextField from './parseRichTextField';
import richText from './richText.mock';
import { BLOCKS } from '@contentful/rich-text-types';

describe('parseRichTextField.ts', () => {
  it('returns an empty array when there is no content', () => {
    const parsed = parseRichTextField(undefined, { sectionDelimiter: BLOCKS.HEADING_2 });
    expect(parsed).toEqual([]);
  });
  it('works when there is content', () => {
    const parsed = parseRichTextField(richText, { sectionDelimiter: BLOCKS.HEADING_2 });
    expect(parsed).toMatchSnapshot();
  });
});
