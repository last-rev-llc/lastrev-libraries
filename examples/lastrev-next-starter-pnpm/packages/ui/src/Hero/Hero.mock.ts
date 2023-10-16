import { linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';

import { randomId } from '../utils/randomId';

import { type HeroProps, HeroVariants } from './Hero.types';

const heroDefaultMock: HeroProps = {
  id: randomId(),
  __typename: 'Hero',
  variant: HeroVariants.default,
  overline: 'This is the Hero overline',
  title: 'This is the Hero title',
  subtitle: 'This is the Hero subtitle',
  body: richTextMock({ text: 'This is the Hero body' }),
  images: [mediaBaseImageMock({ title: 'This is the Hero Media 1', width: 900, height: 900 })],
  actions: [
    linkButtonMock({ text: 'This is the Hero Action 1', variant: 'buttonOutlined', color: 'primary' })
    // linkButtonMock({ text: 'This is the Hero Action 2', variant: 'buttonOutlined' })
  ]
  // background: mediaBaseImageMock(),
  // backgroundColor: 'black'
};

export const heroBaseMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  ...override
});

export const heroMediaOnRightMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media on Right" title',
  ...override,
  variant: HeroVariants.mediaOnRight
});

export const heroMediaOnRightFullBleedMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media on Right Full Bleed" title',
  ...override,
  variant: HeroVariants.mediaOnRightFullBleed
});

export const heroMediaOnLeftMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media on Left" title',
  ...override,
  variant: HeroVariants.mediaOnLeft
});

export const heroMediaOnLeftFullBleedMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media on Left Full Bleed" title',
  ...override,
  variant: HeroVariants.mediaOnLeftFullBleed
});

export const heroMediaBelowMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media Below" title',
  ...override,
  variant: HeroVariants.mediaBelow
});

export const heroMediaAboveMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  title: 'This is the "Hero Media Above" title',
  ...override,
  variant: HeroVariants.mediaAbove
});

export default heroBaseMock;
