import { lorem } from 'faker';

import { linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';
import { introTextMock } from '../Text/Text.mock';

import type { GridProps } from './Grid.types';

const gridDefaultMock: GridProps = {
  id: lorem.word(),
  __typename: 'Grid',
  variant: 'default',
  introText: introTextMock(),
  overline: 'This is the Grid overline',
  title: 'This is the Grid title',
  subtitle: 'This is the Grid subtitle',
  body: richTextMock({ text: 'This is the Grid body' }),
  mediaItems: [mediaBaseImageMock({ title: 'This is the Grid Media 1' })],
  actions: [
    linkButtonMock({ text: 'This is the Grid Action 1', variant: 'button-contained' }),
    linkButtonMock({ text: 'This is the Grid Action 2', variant: 'button-outlined' })
  ],
  link: linkButtonMock({ text: 'This is the Grid Link', variant: 'button-contained' })
};

export const gridBaseMock = ({ ...override } = {}) => ({
  ...gridDefaultMock,
  ...override
});

export const gridContentOnRightMock = ({ ...override } = {}) => ({
  ...gridDefaultMock,
  ...override,
  title: 'This is the grid title for "Content on Right" variant"',
  variant: 'contentOnRight'
});

export const gridContentOnRightFullBleedMock = ({ ...override } = {}) => ({
  ...gridDefaultMock,
  ...override,
  variant: 'contentOnRightFullBleed'
});

export const gridContentOnLeftMock = ({ ...override } = {}) => ({
  ...gridDefaultMock,
  ...override,
  variant: 'contentOnLeft'
});

export const gridContentOnLeftFullBleedMock = ({ ...override } = {}) => ({
  ...gridDefaultMock,
  ...override,
  variant: 'contentOnLeftFullBleed'
});

export const gridContentBelowMock = ({ ...override } = {}) => ({
  ...gridDefaultMock,
  ...override,
  variant: 'contentBelow'
});

export const gridContentAboveMock = ({ ...override } = {}) => ({
  ...gridDefaultMock,
  ...override,
  variant: 'contentAbove'
});

export default gridBaseMock;
