import { lorem } from 'faker';
import { TextProps } from './Text.types';
import { richTextMock } from '../RichText/RichText.mock';

const textDefaultMock: TextProps = {
  id: lorem.word(),
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

export const introTextMock = ({ ...override } = {}) => ({
  ...textDefaultMock,
  overline: 'This is the intro text overline',
  title: 'This is the intro text title',
  subtitle: 'This is the intro text subtitle',
  body: richTextMock({ text: 'This is the intro text body' }),
  ...override,
  variant: 'introText'
});

export const textBaseMock = ({ ...override } = {}) => ({
  ...textDefaultMock,
  ...override
});

export default textBaseMock;
