import { lorem } from 'faker';
import { MediaProps, MediaVideoProps, Asset, File } from './Media.types';

export const mediaMock = (): MediaProps => ({
  file: {
    url: './flower-large.jpg',
    width: 920,
    height: 613
  },
  title: lorem.sentence(),
  description: lorem.sentence()
});

export const mediaVideoMock = (): MediaVideoProps => ({
  file: {
    url: './LastRev.mp4',
    width: 1280,
    height: 720
  },
  variant: 'video',
  title: lorem.sentence(),
  controls: true
});

export const assetMock = (): Asset => ({
  file: {
    url: `https://testImage-${Date.now().toString()}-${lorem.word()}-${lorem.word()}/cmp.png?h=180&r=180`
  },
  title: lorem.sentence(),
  description: lorem.sentence()
});

export const fileMock = (): File => ({
  url: `https://testImage-${Date.now().toString()}-${lorem.word()}-${lorem.word()}/cmp.png?h=180&r=180`,
  width: 180,
  height: 180
});

export const responsiveMediaMock = {
  __typename: 'Media',
  file: {
    // url: flowerLarge,
    url: './flower-large.jpg',
    width: 1728,
    height: 1152
  },
  fileTablet: {
    // url: flowerMedium,
    url: './flower-medium.jpg',
    width: 920,
    height: 613
  },
  fileMobile: {
    // url: flowerSmall,
    url: './flower-small.jpg',
    width: 540,
    height: 540
  },
  title: lorem.sentence(),
  description: lorem.sentence()
};

export const responsiveNextMediaMock = {
  __typename: 'Media',
  nextImageOptimization: true,
  file: {
    // url: flowerLarge,
    url: '/flower-large.jpg',
    width: 1728,
    height: 1152
  },
  title: lorem.sentence(),
  description: lorem.sentence()
};

export const SVGMediaMock = {
  __typename: 'Media',
  file: {
    // url: flowerLarge,
    url: './logo.svg',
    width: 1728,
    height: 1152
  },

  title: lorem.sentence(),
  description: lorem.sentence()
};

export const ExternalSVGMediaMock = {
  __typename: 'Media',
  file: {
    // url: flowerLarge,
    url: './logo.svg',
    width: 1728,
    height: 1152
  },
  disableInlineSVG: true,
  title: lorem.sentence(),
  description: lorem.sentence()
};
