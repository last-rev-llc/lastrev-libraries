import { lorem } from 'faker';
import { SEOProps } from './SEO';

const seoDefaultMock: SEOProps = {
  seo: {
    title: {
      name: 'title',
      value: lorem.sentence()
    },
    keywords: {
      name: 'keywords',
      value: `${lorem.word()}, ${lorem.word()}, ${lorem.word()}`
    },
    canonical: {
      name: 'canonical',
      value: `https://${lorem.word()}.com/${lorem.word()}`
    },
    description: {
      name: 'description',
      value: lorem.sentence()
    },
    robots: {
      name: 'robots',
      value: 'noindex, nofollow'
    }
  },
  enableAntiFlicker: false
};

export const seoBaseMock = ({ ...override } = {}) => ({
  ...seoDefaultMock,
  ...override
});

export const seoWithAntiFlickerMock = ({ ...override } = {}) => ({
  ...seoDefaultMock,
  ...override,
  enableAntiFlicker: true
});

export const seoWithoutAntiFlickerMock = ({ ...override } = {}) => ({
  ...seoDefaultMock,
  ...override,
  enableAntiFlicker: false
});

export default seoDefaultMock;
