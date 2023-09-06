import { lorem } from 'faker';
import { MediaProps, MediaVideoProps, Asset, File } from './Media.types';

export const mediaMock = (override = {}): MediaProps => ({
  id: 'mediaMock',
  alt: lorem.word(),
  __typename: 'Media',
  file: {
    url: 'https://source.unsplash.com/random/920x613',
    width: 920,
    height: 613
  },
  title: lorem.sentence(),
  description: lorem.sentence(),
  ...override
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
    url: `https://source.unsplash.com/random/1920x1080`,
    width: 1920,
    height: 1080
  },
  title: lorem.sentence(),
  description: lorem.sentence()
});

export const fileMock = (): File => ({
  url: `https://source.unsplash.com/random/180x180`,
  width: 180,
  height: 180
});

export const responsiveMediaMock = {
  __typename: 'Media',
  file: {
    // url: flowerLarge,
    url: 'https://source.unsplash.com/random/1920x1080',
    width: 1920,
    height: 1080
  },
  fileTablet: {
    // url: flowerMedium,
    url: 'https://source.unsplash.com/random/920x620',
    width: 920,
    height: 613
  },
  fileMobile: {
    // url: flowerSmall,
    url: 'https://source.unsplash.com/random/540x540',
    width: 540,
    height: 540
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
