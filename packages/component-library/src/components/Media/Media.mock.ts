import { lorem } from 'faker';

export const mediaMock = () => ({
  id: lorem.word(),
  __typename: 'Media',
  file: {
    url: './flower-large.jpg',
    width: '920',
    height: '613'
  },
  title: lorem.sentence(),
  description: lorem.sentence()
});

export const responsiveMediaMock = {
  __typename: 'Media',
  file: {
    // url: flowerLarge,
    url: './flower-large.jpg',
    width: '1728px',
    height: '1152px'
  },
  fileTablet: {
    // url: flowerMedium,
    url: './flower-medium.jpg',
    width: '920',
    height: '613'
  },
  fileMobile: {
    // url: flowerSmall,
    url: './flower-small.jpg',
    width: '540',
    height: '540'
  },
  title: lorem.sentence(),
  description: lorem.sentence()
};

export const SVGMediaMock = {
  __typename: 'Media',
  file: {
    // url: flowerLarge,
    url: './logo.svg',
    width: '1728px',
    height: '1152px'
  },

  title: lorem.sentence(),
  description: lorem.sentence()
};

export const ExternalSVGMediaMock = {
  __typename: 'Media',
  file: {
    // url: flowerLarge,
    url: './logo.svg',
    width: '1728px',
    height: '1152px'
  },
  disableInlineSVG: true,
  title: lorem.sentence(),
  description: lorem.sentence()
};
