import { linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';

import type { HeroProps } from './Hero.types';

import { randomId } from '../utils/randomId';

const heroDefaultMock: HeroProps = {
  id: randomId(),
  __typename: 'Hero',
  variant: 'default',
  overline: 'This is the Hero overline',
  title: 'This is the Hero title',
  subtitle: 'This is the Hero subtitle',
  body: richTextMock({ text: 'This is the Hero body' }),
  images: [mediaBaseImageMock({ title: 'This is the Hero Media 1', width: 900, height: 900 })],
  actions: [
    linkButtonMock({ text: 'This is the Hero Action 1', variant: 'button-outlined', color: 'primary' })
    // linkButtonMock({ text: 'This is the Hero Action 2', variant: 'button-outlined' })
  ],
  // background: mediaBaseImageMock(),
  backgroundColor: 'primary'
};

export const heroBaseMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  ...override
});

export const heroMediaOnRightMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media on Right" title',
  ...override,
  variant: 'mediaOnRight'
});

export const heroMediaOnRightFullBleedMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media on Right Full Bleed" title',
  ...override,
  variant: 'mediaOnRightFullBleed'
});

export const heroMediaOnLeftMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media on Left" title',
  ...override,
  variant: 'mediaOnLeft'
});

export const heroMediaOnLeftFullBleedMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media on Left Full Bleed" title',
  ...override,
  variant: 'mediaOnLeftFullBleed'
});

export const heroMediaBelowMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media Below" title',
  ...override,
  variant: 'mediaBelow'
});

export const heroMediaAboveMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media Above" title',
  ...override,
  variant: 'mediaAbove'
});

export default heroBaseMock;
