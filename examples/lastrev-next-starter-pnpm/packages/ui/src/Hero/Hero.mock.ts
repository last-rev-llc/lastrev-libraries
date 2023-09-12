import { linkButtonMock } from '../Link/Link.mock';
import { lorem } from 'faker';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';
import { HeroProps } from './Hero.types';

const heroDefaultMock: HeroProps = {
  id: 'hero',
  __typename: 'Hero',
  variant: 'default',
  overline: 'This is the overline',
  title: 'This is the title',
  subtitle: 'This is the subtitle',
  image: mediaBaseImageMock({ title: 'Media 1' }),
  body: richTextMock({ text: 'This is the body' }),
  actions: [
    linkButtonMock({ text: 'Action 1', variant: 'button-contained' }),
    linkButtonMock({ text: 'Action 2', variant: 'button-outlined' })
  ],
  background: {
    alt: lorem.sentence(),
    file: {
      url: 'https://i.picsum.photos/id/327/2800/800.jpg?hmac=lqhEpkLvfvBfoZSxszEf8pOTbitkmHpJmZsoQYcrWkI'
    },
    title: lorem.sentence()
  },
  backgroundColor: 'white'
};

export const heroBaseMock = ({ ...override } = {}) => ({
  ...heroDefaultMock,
  ...override
});

export default heroBaseMock;
