import { richTextMock } from '../RichText/RichText.mock';

import randomId from '../utils/randomId';

import type { TextProps } from './Text.types';

const textDefaultMock: TextProps = {
  id: randomId(),
  __typename: 'Text',
  overline: 'This is the overline',
  title: 'This is the title',
  subtitle: 'This is the subtitle',
  body: richTextMock({ text: 'This is the body' })
};

export const bodyOnlyMock = ({ ...override } = {}): TextProps => ({
  ...textDefaultMock,
  ...override,
  overline: undefined,
  title: undefined,
  subtitle: undefined
});

export const introTextMock = ({ ...override } = {}): TextProps => ({
  ...textDefaultMock,
  overline: 'This is the intro text overline',
  title: 'This is the intro text title',
  subtitle: 'This is the intro text subtitle',
  body: richTextMock({ text: 'This is the intro text body' }),
  ...override,
  variant: 'introText'
});

export const textBaseMock = ({ ...override } = {}): TextProps => ({
  ...textDefaultMock,
  ...override
});

export const textTitleMock = ({ ...override } = {}): TextProps => ({
  ...textDefaultMock,
  ...override,
  overline: undefined,
  subtitle: undefined,
  body: undefined
});

export default textBaseMock;
