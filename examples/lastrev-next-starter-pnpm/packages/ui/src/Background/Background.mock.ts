import { linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';

import type { BackgroundProps } from './Background.types';

import randomId from '../utils/randomId';

const backgroundDefaultMock: BackgroundProps = {
  id: randomId(),
  __typename: 'Background',
  variant: 'default',
  overline: 'This is the Background overline',
  title: 'This is the Background title',
  subtitle: 'This is the Background subtitle',
  body: richTextMock({ text: 'This is the Background body' }),
  images: [mediaBaseImageMock({ title: 'This is the Background Media 1' })],
  actions: [
    linkButtonMock({ text: 'This is the Background Action 1', variant: 'button-outlined', color: 'primary' })
    // linkButtonMock({ text: 'This is the Background Action 2', variant: 'button-outlined' })
  ],
  // background: mediaBaseImageMock(),
  backgroundColor: 'backkgrou'
};

export const backgroundBaseMock = ({ ...override } = {}) => ({
  ...backgroundDefaultMock,
  ...override
});

export const backgroundMediaOnRightMock = ({ ...override } = {}) => ({
  ...backgroundDefaultMock,
  title: 'This is the "Background Media on Right" title',
  ...override,
  variant: 'mediaOnRight'
});

export const backgroundMediaOnRightFullBleedMock = ({ ...override } = {}) => ({
  ...backgroundDefaultMock,
  title: 'This is the "Background Media on Right Full Bleed" title',
  ...override,
  variant: 'mediaOnRightFullBleed'
});

export const backgroundMediaOnLeftMock = ({ ...override } = {}) => ({
  ...backgroundDefaultMock,
  title: 'This is the "Background Media on Left" title',
  ...override,
  variant: 'mediaOnLeft'
});

export const backgroundMediaOnLeftFullBleedMock = ({ ...override } = {}) => ({
  ...backgroundDefaultMock,
  title: 'This is the "Background Media on Left Full Bleed" title',
  ...override,
  variant: 'mediaOnLeftFullBleed'
});

export const backgroundMediaBelowMock = ({ ...override } = {}) => ({
  ...backgroundDefaultMock,
  title: 'This is the "Background Media Below" title',
  ...override,
  variant: 'mediaBelow'
});

export const backgroundMediaAboveMock = ({ ...override } = {}) => ({
  ...backgroundDefaultMock,
  title: 'This is the "Background Media Above" title',
  ...override,
  variant: 'mediaAbove'
});

export default backgroundBaseMock;
